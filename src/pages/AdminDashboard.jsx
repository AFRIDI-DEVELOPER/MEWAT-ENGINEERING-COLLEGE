import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, addStudent, fetchDepartments } from '../lib/supabase';
import SEO from '../components/SEO';
import {
    FiUsers, FiCalendar, FiClock, FiPlus, FiTrash2,
    FiEdit2, FiSearch, FiGrid, FiBook, FiFileText,
    FiLogOut, FiMail, FiLock
} from 'react-icons/fi';
import '../styles/admin-dashboard.css';

const ADMIN_PASSWORD = 'mec@admin2024';
const AUTH_KEY = 'mec_admin_auth';

const TABS = {
    OVERVIEW:   'overview',
    STUDENTS:   'students',
    SUBJECTS:   'subjects',
    EXAMS:      'exams',
    ATTENDANCE: 'attendance',
    SYLLABUS:   'syllabus',
    MESSAGES:   'messages',
};

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(() =>
        sessionStorage.getItem(AUTH_KEY) === 'true'
    );
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const [activeTab, setActiveTab]           = useState(TABS.OVERVIEW);
    const [students, setStudents]             = useState([]);
    const [departments, setDepartments]       = useState([]);
    const [subjects, setSubjects]             = useState([]);
    const [exams, setExams]                   = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [syllabusData, setSyllabusData]     = useState([]);
    const [messages, setMessages]             = useState([]);
    const [isLoading, setIsLoading]           = useState(true);
    const [showAddForm, setShowAddForm]       = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [studentSearch, setStudentSearch]   = useState('');
    const [confirmModal, setConfirmModal]     = useState({ show: false, title: '', message: '', onConfirm: null, type: 'danger' });

    const [newStudent, setNewStudent] = useState({
        roll_no: '', name: '', department_id: '', year: 1, semester: 1, password_text: 'mec@123'
    });
    const [newSubject, setNewSubject] = useState({
        department_id: '', semester: 1, subject_name: '', subject_code: '', credits: 3, type: 'Core'
    });
    const [newExam, setNewExam] = useState({
        subject_id: '', exam_date: '', start_time: '', duration: '3 Hours', venue: 'Main Hall', exam_type: 'End-Sem'
    });
    const [newAttendance, setNewAttendance] = useState({
        student_roll_no: '',
        month_name: MONTHS[new Date().getMonth()],
        year: new Date().getFullYear(),
        total_working_days: 26,
        days_attended: 0
    });
    const [newSyllabus, setNewSyllabus] = useState({
        subject_id: '', unit_no: 1, title: '', topics: ''
    });

    const navigate = useNavigate();

    // ─── AUTH ─────────────────────────────────────────────────────────────────

    const handleLogin = (e) => {
        e.preventDefault();
        if (loginPassword === ADMIN_PASSWORD) {
            sessionStorage.setItem(AUTH_KEY, 'true');
            setIsAuthenticated(true);
            setLoginError('');
        } else {
            setLoginError('Incorrect password. Please try again.');
            setLoginPassword('');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem(AUTH_KEY);
        setIsAuthenticated(false);
        navigate('/');
    };

    // ─── DATA ─────────────────────────────────────────────────────────────────

    useEffect(() => {
        if (isAuthenticated) loadData();
    }, [isAuthenticated]);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [studentsRes, subjectsRes, examsRes, attRes, syllabusRes, deptsData, messagesRes] = await Promise.all([
                supabase.from('students').select('*, departments(name)'),
                supabase.from('subjects').select('*, departments(name)'),
                supabase.from('exams').select('*, subjects(subject_name, subject_code)'),
                supabase.from('monthly_attendance').select('*, students(name)'),
                supabase.from('syllabus').select('*, subjects(subject_name)').order('unit_no', { ascending: true }),
                fetchDepartments(),
                supabase.from('contact_submissions').select('*').order('created_at', { ascending: false })
            ]);

            setStudents(studentsRes.data || []);
            setSubjects(subjectsRes.data || []);
            setExams(examsRes.data || []);
            setAttendanceData(attRes.data || []);
            setSyllabusData(syllabusRes.data || []);
            setDepartments(deptsData || []);
            setMessages(messagesRes.data || []);

            const firstDeptId = deptsData?.[0]?.id || '';
            setNewStudent(prev => prev.department_id ? prev : { ...prev, department_id: firstDeptId });
            setNewSubject(prev => prev.department_id ? prev : { ...prev, department_id: firstDeptId });
        } catch {
            // data stays empty; tables will show empty state
        } finally {
            setIsLoading(false);
        }
    };

    const switchTab = (tab) => {
        setActiveTab(tab);
        setShowAddForm(false);
        setEditingStudent(null);
    };

    const closeModal = () => setConfirmModal(prev => ({ ...prev, show: false }));

    // ─── HANDLERS ─────────────────────────────────────────────────────────────

    const handleAddStudent = async (e) => {
        e.preventDefault();
        if (!newStudent.roll_no || !newStudent.name) return alert('Please fill in Roll No and Name');
        try {
            const payload = {
                roll_no: newStudent.roll_no,
                name: newStudent.name,
                department_id: newStudent.department_id,
                year: newStudent.year,
                semester: newStudent.semester,
                password_text: newStudent.password_text
            };
            if (editingStudent) {
                const { error } = await supabase.from('students').update(payload).eq('id', editingStudent.id);
                if (error) throw error;
            } else {
                await addStudent(payload);
            }
            setShowAddForm(false);
            setEditingStudent(null);
            setNewStudent({ roll_no: '', name: '', department_id: departments[0]?.id || '', year: 1, semester: 1, password_text: 'mec@123' });
            loadData();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    const handleAddSubject = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase.from('subjects').insert([newSubject]);
            if (error) throw error;
            setShowAddForm(false);
            loadData();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    const handleAddExam = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase.from('exams').insert([newExam]);
            if (error) throw error;
            setShowAddForm(false);
            loadData();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    const handleAddAttendance = async (e) => {
        e.preventDefault();
        if (!newAttendance.student_roll_no) return alert('Please select a student first');
        try {
            const { error } = await supabase.from('monthly_attendance').upsert(newAttendance, {
                onConflict: 'student_roll_no,month_name,year'
            });
            if (error) throw error;
            loadData();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    const handleAddSyllabus = async (e) => {
        e.preventDefault();
        if (!newSyllabus.subject_id) return alert('Please select a subject first');
        if (!newSyllabus.title) return alert('Please enter a unit title');
        try {
            const { data: currentUnits, error: fetchError } = await supabase
                .from('syllabus')
                .select('unit_no')
                .eq('subject_id', newSyllabus.subject_id)
                .order('unit_no', { ascending: false })
                .limit(1);
            if (fetchError) throw fetchError;

            const nextUnitNo = currentUnits?.length > 0 ? currentUnits[0].unit_no + 1 : 1;
            const formattedSyllabus = {
                ...newSyllabus,
                unit_no: nextUnitNo,
                topics: newSyllabus.topics.split(',').map(t => t.trim()).filter(t => t !== '')
            };
            const { error: insertError } = await supabase.from('syllabus').insert([formattedSyllabus]);
            if (insertError) throw insertError;
            setNewSyllabus({ ...newSyllabus, title: '', topics: '' });
            loadData();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    const handleDeleteStudent = (studentId) => {
        setConfirmModal({
            show: true, title: 'Delete Student',
            message: 'Are you sure you want to delete this student? This action cannot be undone.',
            type: 'danger',
            onConfirm: async () => {
                try {
                    const { error } = await supabase.from('students').delete().eq('id', studentId);
                    if (error) throw error;
                    loadData(); closeModal();
                } catch (error) { alert(`Error: ${error.message}`); }
            }
        });
    };

    const handleEditStudent = (s) => {
        setEditingStudent(s);
        setNewStudent({ roll_no: s.roll_no, name: s.name, department_id: s.department_id, year: s.year, semester: s.semester, password_text: s.password_text });
        setShowAddForm(true);
    };

    // ─── LOGIN SCREEN ─────────────────────────────────────────────────────────

    if (!isAuthenticated) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6', paddingTop: '80px' }}>
                <SEO title="Admin Login" description="MEC Admin Login" />
                <div style={{ background: '#fff', borderRadius: '16px', padding: '2.5rem', width: '100%', maxWidth: '400px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.5rem', color: '#2563eb' }}>
                            <FiLock />
                        </div>
                        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>Admin Login</h2>
                        <p style={{ margin: '0.5rem 0 0', color: '#6b7280', fontSize: '0.9rem' }}>MEC Administrative Panel</p>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label>Password</label>
                            <input
                                type="password"
                                value={loginPassword}
                                onChange={e => { setLoginPassword(e.target.value); setLoginError(''); }}
                                placeholder="Enter admin password"
                                autoFocus
                            />
                        </div>
                        {loginError && (
                            <p style={{ color: '#dc2626', fontSize: '0.85rem', margin: '0 0 1rem', fontWeight: '500' }}>{loginError}</p>
                        )}
                        <button type="submit" className="primary-btn" style={{ width: '100%', justifyContent: 'center' }}>
                            <FiLock /> Sign In
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // ─── TABS ─────────────────────────────────────────────────────────────────

    const renderOverview = () => {
        const deptBreakdown = departments.map(d => ({
            name: d.name,
            count: students.filter(s => s.department_id === d.id).length
        })).filter(d => d.count > 0);

        return (
            <div className="admin-tab-content">
                <div className="admin-header-row"><h1>Dashboard Overview</h1></div>
                <div className="admin-stats-grid">
                    <div className="admin-stat-card">
                        <div className="stat-icon"><FiUsers /></div>
                        <div className="stat-info"><h4>Total Students</h4><p className="stat-value">{students.length}</p></div>
                    </div>
                    <div className="admin-stat-card">
                        <div className="stat-icon"><FiBook /></div>
                        <div className="stat-info"><h4>Total Subjects</h4><p className="stat-value">{subjects.length}</p></div>
                    </div>
                    <div className="admin-stat-card">
                        <div className="stat-icon"><FiCalendar /></div>
                        <div className="stat-info"><h4>Scheduled Exams</h4><p className="stat-value">{exams.length}</p></div>
                    </div>
                    <div className="admin-stat-card">
                        <div className="stat-icon" style={{ background: '#f0fdf4', color: '#16a34a' }}><FiMail /></div>
                        <div className="stat-info"><h4>Contact Messages</h4><p className="stat-value">{messages.length}</p></div>
                    </div>
                </div>

                {deptBreakdown.length > 0 && (
                    <div>
                        <h3 style={{ color: '#374151', marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>Students by Department</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {deptBreakdown.map(d => (
                                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ width: '180px', fontSize: '0.875rem', color: '#6b7280', flexShrink: 0 }}>{d.name}</span>
                                    <div style={{ flex: 1, background: '#f3f4f6', borderRadius: '99px', height: '8px', overflow: 'hidden' }}>
                                        <div style={{ width: `${students.length ? (d.count / students.length * 100) : 0}%`, background: '#2563eb', height: '100%', borderRadius: '99px', transition: 'width 0.6s ease' }} />
                                    </div>
                                    <span style={{ width: '32px', textAlign: 'right', fontWeight: '700', fontSize: '0.875rem', color: '#111827' }}>{d.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const filteredStudents = students.filter(s =>
        !studentSearch ||
        s.name?.toLowerCase().includes(studentSearch.toLowerCase()) ||
        s.roll_no?.toLowerCase().includes(studentSearch.toLowerCase())
    );

    const renderStudentsTab = () => (
        <div className="admin-tab-content">
            <div className="admin-header-row">
                <h1>Student Management</h1>
                <button
                    className={showAddForm ? 'secondary-btn' : 'primary-btn'}
                    onClick={() => {
                        if (showAddForm) { setEditingStudent(null); setNewStudent({ roll_no: '', name: '', department_id: departments[0]?.id || '', year: 1, semester: 1, password_text: 'mec@123' }); }
                        setShowAddForm(!showAddForm);
                    }}
                >
                    <FiPlus /> {showAddForm ? 'Cancel' : 'Add Student'}
                </button>
            </div>

            {showAddForm && (
                <div className="admin-form-container">
                    <form onSubmit={handleAddStudent}>
                        <div className="form-grid">
                            <div className="form-group"><label>Roll Number</label><input type="text" required value={newStudent.roll_no} onChange={e => setNewStudent({...newStudent, roll_no: e.target.value})} /></div>
                            <div className="form-group"><label>Full Name</label><input type="text" required value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} /></div>
                            <div className="form-group"><label>Portal Password</label><input type="text" required value={newStudent.password_text} onChange={e => setNewStudent({...newStudent, password_text: e.target.value})} /></div>
                            <div className="form-group"><label>Department</label>
                                <select value={newStudent.department_id} onChange={e => setNewStudent({...newStudent, department_id: e.target.value})}>
                                    {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                            </div>
                            <div className="form-group"><label>Semester</label>
                                <select value={newStudent.semester} onChange={e => { const sem = parseInt(e.target.value); setNewStudent({...newStudent, semester: sem, year: Math.ceil(sem / 2)}); }}>
                                    {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
                                </select>
                            </div>
                        </div>
                        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <button type="submit" className="primary-btn">{editingStudent ? 'Update Student' : 'Save Student'}</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px 14px' }}>
                <FiSearch color="#9ca3af" />
                <input
                    type="text"
                    placeholder="Search by name or roll number…"
                    value={studentSearch}
                    onChange={e => setStudentSearch(e.target.value)}
                    style={{ border: 'none', background: 'transparent', outline: 'none', flex: 1, fontSize: '0.95rem', color: '#374151' }}
                />
                {studentSearch && <button onClick={() => setStudentSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: '1rem' }}>✕</button>}
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead><tr><th>Roll No</th><th>Name</th><th>Dept</th><th>Sem</th><th>Password</th><th>Actions</th></tr></thead>
                    <tbody>
                        {filteredStudents.length > 0 ? filteredStudents.map(s => (
                            <tr key={s.id}>
                                <td>{s.roll_no}</td><td>{s.name}</td><td>{s.departments?.name}</td><td>{s.semester}</td>
                                <td><code>{s.password_text}</code></td>
                                <td><div className="action-btns">
                                    <button className="icon-btn edit" onClick={() => handleEditStudent(s)}><FiEdit2 /></button>
                                    <button className="icon-btn delete" onClick={() => handleDeleteStudent(s.id)}><FiTrash2 /></button>
                                </div></td>
                            </tr>
                        )) : (
                            <tr><td colSpan="6" style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>
                                {studentSearch ? 'No students match your search.' : 'No students added yet.'}
                            </td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderSubjectsTab = () => (
        <div className="admin-tab-content">
            <div className="admin-header-row">
                <h1>Subjects</h1>
                <button className="primary-btn" onClick={() => setShowAddForm(!showAddForm)}><FiPlus /> Add Subject</button>
            </div>
            {showAddForm && (
                <div className="admin-form-container">
                    <form onSubmit={handleAddSubject}>
                        <div className="form-grid">
                            <div className="form-group"><label>Code</label><input type="text" required value={newSubject.subject_code} onChange={e => setNewSubject({...newSubject, subject_code: e.target.value})} /></div>
                            <div className="form-group"><label>Name</label><input type="text" required value={newSubject.subject_name} onChange={e => setNewSubject({...newSubject, subject_name: e.target.value})} /></div>
                            <div className="form-group"><label>Department</label>
                                <select value={newSubject.department_id} onChange={e => setNewSubject({...newSubject, department_id: e.target.value})}>
                                    {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                            </div>
                            <div className="form-group"><label>Semester</label>
                                <select value={newSubject.semester} onChange={e => setNewSubject({...newSubject, semester: parseInt(e.target.value)})}>
                                    {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
                                </select>
                            </div>
                            <div className="form-group"><label>Credits</label><input type="number" min="1" max="6" value={newSubject.credits} onChange={e => setNewSubject({...newSubject, credits: parseInt(e.target.value)})} /></div>
                            <div className="form-group"><label>Type</label>
                                <select value={newSubject.type} onChange={e => setNewSubject({...newSubject, type: e.target.value})}>
                                    <option value="Core">Core</option>
                                    <option value="Elective">Elective</option>
                                    <option value="Lab">Lab / Practical</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="primary-btn" style={{ marginTop: '1rem' }}>Save Subject</button>
                    </form>
                </div>
            )}
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead><tr><th>Code</th><th>Name</th><th>Department</th><th>Sem</th><th>Credits</th><th>Actions</th></tr></thead>
                    <tbody>
                        {subjects.length > 0 ? subjects.map(s => (
                            <tr key={s.id}>
                                <td>{s.subject_code}</td><td>{s.subject_name}</td><td>{s.departments?.name}</td><td>{s.semester}</td><td>{s.credits}</td>
                                <td><button className="icon-btn delete" onClick={() => {
                                    setConfirmModal({
                                        show: true, title: 'Delete Subject',
                                        message: `Are you sure you want to delete ${s.subject_name}?`,
                                        type: 'danger',
                                        onConfirm: async () => {
                                            try { await supabase.from('subjects').delete().eq('id', s.id); loadData(); closeModal(); }
                                            catch (err) { alert(err.message); }
                                        }
                                    });
                                }}><FiTrash2 /></button></td>
                            </tr>
                        )) : (
                            <tr><td colSpan="6" style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No subjects added yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderExamsTab = () => (
        <div className="admin-tab-content">
            <div className="admin-header-row">
                <h1>Exam Scheduling</h1>
                <button className="primary-btn" onClick={() => setShowAddForm(!showAddForm)}><FiPlus /> Schedule Exam</button>
            </div>
            {showAddForm && (
                <div className="admin-form-container">
                    <form onSubmit={handleAddExam}>
                        <div className="form-grid">
                            <div className="form-group"><label>Subject</label>
                                <select value={newExam.subject_id} onChange={e => setNewExam({...newExam, subject_id: e.target.value})} required>
                                    <option value="">-- Select Subject --</option>
                                    {subjects.map(s => <option key={s.id} value={s.id}>{s.subject_name} ({s.subject_code})</option>)}
                                </select>
                            </div>
                            <div className="form-group"><label>Exam Date</label><input type="date" required value={newExam.exam_date} onChange={e => setNewExam({...newExam, exam_date: e.target.value})} /></div>
                            <div className="form-group"><label>Start Time</label><input type="time" required value={newExam.start_time} onChange={e => setNewExam({...newExam, start_time: e.target.value})} /></div>
                            <div className="form-group"><label>Duration</label><input type="text" value={newExam.duration} onChange={e => setNewExam({...newExam, duration: e.target.value})} /></div>
                            <div className="form-group"><label>Venue</label><input type="text" value={newExam.venue} onChange={e => setNewExam({...newExam, venue: e.target.value})} /></div>
                            <div className="form-group"><label>Exam Type</label>
                                <select value={newExam.exam_type} onChange={e => setNewExam({...newExam, exam_type: e.target.value})}>
                                    <option value="Sessional-I">Sessional I</option>
                                    <option value="Sessional-II">Sessional II</option>
                                    <option value="End-Sem">End-Sem</option>
                                    <option value="Practical">Practical</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="primary-btn" style={{ marginTop: '1rem' }}>Save Exam Schedule</button>
                    </form>
                </div>
            )}
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead><tr><th>Subject</th><th>Type</th><th>Date</th><th>Time</th><th>Venue</th><th>Actions</th></tr></thead>
                    <tbody>
                        {exams.length > 0 ? exams.map(e => (
                            <tr key={e.id}>
                                <td>{e.subjects?.subject_name}</td><td>{e.exam_type}</td>
                                <td>{new Date(e.exam_date).toLocaleDateString()}</td>
                                <td>{e.start_time}</td><td>{e.venue}</td>
                                <td><button className="icon-btn delete" onClick={() => {
                                    setConfirmModal({
                                        show: true, title: 'Cancel Exam',
                                        message: 'Are you sure you want to cancel this exam?',
                                        type: 'danger',
                                        onConfirm: async () => {
                                            try { await supabase.from('exams').delete().eq('id', e.id); loadData(); closeModal(); }
                                            catch (err) { alert(err.message); }
                                        }
                                    });
                                }}><FiTrash2 /></button></td>
                            </tr>
                        )) : (
                            <tr><td colSpan="6" style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No exams scheduled yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderAttendanceTab = () => (
        <div className="admin-tab-content">
            <div className="admin-header-row"><h1>Monthly Attendance</h1></div>
            <div className="admin-form-container">
                <form onSubmit={handleAddAttendance}>
                    <div className="form-grid">
                        <div className="form-group"><label>Student</label>
                            <select value={newAttendance.student_roll_no} onChange={e => setNewAttendance({...newAttendance, student_roll_no: e.target.value})} required>
                                <option value="">-- Select Student --</option>
                                {students.map(s => <option key={s.roll_no} value={s.roll_no}>{s.roll_no} — {s.name}</option>)}
                            </select>
                        </div>
                        <div className="form-group"><label>Month</label>
                            <select value={newAttendance.month_name} onChange={e => setNewAttendance({...newAttendance, month_name: e.target.value})}>
                                {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>
                        <div className="form-group"><label>Year</label>
                            <input type="number" min="2020" max="2030" value={newAttendance.year} onChange={e => setNewAttendance({...newAttendance, year: parseInt(e.target.value)})} />
                        </div>
                        <div className="form-group"><label>Working Days</label>
                            <input type="number" min="1" max="31" value={newAttendance.total_working_days} onChange={e => setNewAttendance({...newAttendance, total_working_days: parseInt(e.target.value)})} />
                        </div>
                        <div className="form-group"><label>Days Attended</label>
                            <input type="number" min="0" max={newAttendance.total_working_days} value={newAttendance.days_attended} onChange={e => setNewAttendance({...newAttendance, days_attended: parseInt(e.target.value)})} />
                        </div>
                    </div>
                    <button type="submit" className="primary-btn" style={{ marginTop: '1rem' }}>Save Monthly Data</button>
                </form>
            </div>
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead><tr><th>Student</th><th>Month</th><th>Year</th><th>Attended / Total</th><th>%</th><th>Actions</th></tr></thead>
                    <tbody>
                        {attendanceData.length > 0 ? attendanceData.map(a => {
                            const pct = a.total_working_days ? Math.round(a.days_attended / a.total_working_days * 100) : 0;
                            return (
                                <tr key={a.id}>
                                    <td>{a.students?.name}</td>
                                    <td>{a.month_name}</td>
                                    <td>{a.year}</td>
                                    <td>{a.days_attended}/{a.total_working_days}</td>
                                    <td><span style={{ fontWeight: '700', color: pct >= 75 ? '#16a34a' : '#dc2626' }}>{pct}%</span></td>
                                    <td><button className="icon-btn delete" onClick={() => {
                                        setConfirmModal({
                                            show: true, title: 'Delete Attendance',
                                            message: 'Remove this attendance record?',
                                            type: 'danger',
                                            onConfirm: async () => {
                                                try { await supabase.from('monthly_attendance').delete().eq('id', a.id); loadData(); closeModal(); }
                                                catch (err) { alert(err.message); }
                                            }
                                        });
                                    }}><FiTrash2 /></button></td>
                                </tr>
                            );
                        }) : (
                            <tr><td colSpan="6" style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No attendance records yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderSyllabusTab = () => (
        <div className="admin-tab-content">
            <div className="admin-header-row"><h1>Syllabus Management</h1></div>
            <div className="admin-form-container">
                <form onSubmit={handleAddSyllabus}>
                    <div className="form-grid">
                        <div className="form-group"><label>Subject</label>
                            <select value={newSyllabus.subject_id} onChange={e => setNewSyllabus({...newSyllabus, subject_id: e.target.value})} required>
                                <option value="">-- Select Subject --</option>
                                {subjects.map(s => <option key={s.id} value={s.id}>{s.subject_name}</option>)}
                            </select>
                        </div>
                        <div className="form-group"><label>Unit Title</label>
                            <input type="text" value={newSyllabus.title} onChange={e => setNewSyllabus({...newSyllabus, title: e.target.value})} />
                        </div>
                        <div className="form-group" style={{ gridColumn: 'span 2' }}><label>Topics (comma separated)</label>
                            <textarea value={newSyllabus.topics} onChange={e => setNewSyllabus({...newSyllabus, topics: e.target.value})} />
                        </div>
                    </div>
                    {newSyllabus.subject_id && (
                        <div style={{ marginTop: '1rem', color: '#2563eb', fontWeight: '600', fontSize: '0.9rem' }}>
                            Next unit will be saved as <strong>Unit {
                                syllabusData.filter(s => s.subject_id === newSyllabus.subject_id).length > 0
                                    ? Math.max(...syllabusData.filter(s => s.subject_id === newSyllabus.subject_id).map(u => u.unit_no)) + 1
                                    : 1
                            }</strong>
                        </div>
                    )}
                    <button type="submit" className="primary-btn" style={{ marginTop: '1rem' }}>Add Unit</button>
                </form>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {subjects.filter(sub => syllabusData.some(s => s.subject_id === sub.id)).map(subject => (
                    <div key={subject.id} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                        <div style={{ padding: '12px 20px', background: '#f8fafc', borderBottom: '1px solid #e5e7eb', fontWeight: '700', color: '#1f2937' }}>
                            {subject.subject_name} ({subject.subject_code})
                        </div>
                        <table className="admin-table" style={{ border: 'none', boxShadow: 'none' }}>
                            <thead><tr><th style={{ width: '100px' }}>Unit</th><th>Title</th><th style={{ width: '100px' }}>Actions</th></tr></thead>
                            <tbody>
                                {syllabusData.filter(s => s.subject_id === subject.id).sort((a,b) => a.unit_no - b.unit_no).map(s => (
                                    <tr key={s.id}>
                                        <td style={{ fontWeight: '600' }}>Unit {s.unit_no}</td>
                                        <td>{s.title}</td>
                                        <td><button className="icon-btn delete" onClick={() => {
                                            setConfirmModal({
                                                show: true, title: 'Delete Syllabus Unit',
                                                message: `Delete Unit ${s.unit_no} of ${subject.subject_name}?`,
                                                type: 'danger',
                                                onConfirm: async () => {
                                                    try { await supabase.from('syllabus').delete().eq('id', s.id); loadData(); closeModal(); }
                                                    catch (err) { alert(err.message); }
                                                }
                                            });
                                        }}><FiTrash2 /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
                {subjects.filter(sub => syllabusData.some(s => s.subject_id === sub.id)).length === 0 && (
                    <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No syllabus added yet. Select a subject above and add units.</div>
                )}
            </div>
        </div>
    );

    const renderMessagesTab = () => (
        <div className="admin-tab-content">
            <div className="admin-header-row">
                <h1>Contact Messages</h1>
                <span style={{ background: '#eff6ff', color: '#2563eb', padding: '4px 14px', borderRadius: '20px', fontWeight: '600', fontSize: '0.875rem' }}>
                    {messages.length} total
                </span>
            </div>
            {messages.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#9ca3af', padding: '3rem' }}>No messages received yet.</div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {messages.map(m => (
                        <div key={m.id} style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.25rem 1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                                <span style={{ fontWeight: '700', color: '#111827', fontSize: '1rem' }}>{m.name}</span>
                                <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{m.created_at ? new Date(m.created_at).toLocaleString() : ''}</span>
                            </div>
                            <div style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '8px', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                                <a href={`mailto:${m.email}`} style={{ color: '#2563eb' }}>{m.email}</a>
                                {m.phone && <span>{m.phone}</span>}
                                {m.subject && <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', textTransform: 'capitalize' }}>{m.subject}</span>}
                            </div>
                            <p style={{ margin: 0, color: '#374151', fontSize: '0.925rem', lineHeight: '1.6' }}>{m.message}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    // ─── LAYOUT ───────────────────────────────────────────────────────────────

    return (
        <div className="admin-dashboard">
            <SEO title="Admin Dashboard" description="MEC Administrative Control Panel" />
            <div className="admin-container">
                <aside className="admin-sidebar">
                    <div className="admin-sidebar-header"><h2>MEC ADMIN</h2></div>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button className={`admin-nav-btn ${activeTab === TABS.OVERVIEW   ? 'active' : ''}`} onClick={() => switchTab(TABS.OVERVIEW)}><FiGrid />     Overview</button>
                        <button className={`admin-nav-btn ${activeTab === TABS.STUDENTS   ? 'active' : ''}`} onClick={() => switchTab(TABS.STUDENTS)}><FiUsers />    Students</button>
                        <button className={`admin-nav-btn ${activeTab === TABS.SUBJECTS   ? 'active' : ''}`} onClick={() => switchTab(TABS.SUBJECTS)}><FiBook />     Subjects</button>
                        <button className={`admin-nav-btn ${activeTab === TABS.EXAMS      ? 'active' : ''}`} onClick={() => switchTab(TABS.EXAMS)}><FiCalendar />   Exams</button>
                        <button className={`admin-nav-btn ${activeTab === TABS.ATTENDANCE ? 'active' : ''}`} onClick={() => switchTab(TABS.ATTENDANCE)}><FiClock />  Attendance</button>
                        <button className={`admin-nav-btn ${activeTab === TABS.SYLLABUS   ? 'active' : ''}`} onClick={() => switchTab(TABS.SYLLABUS)}><FiFileText /> Syllabus</button>
                        <button className={`admin-nav-btn ${activeTab === TABS.MESSAGES   ? 'active' : ''}`} onClick={() => switchTab(TABS.MESSAGES)}>
                            <FiMail /> Messages
                            {messages.length > 0 && <span style={{ background: '#2563eb', color: '#fff', borderRadius: '99px', padding: '1px 7px', fontSize: '0.7rem', marginLeft: 'auto' }}>{messages.length}</span>}
                        </button>
                        <button className="admin-nav-btn" style={{ color: '#ef4444', marginTop: '2rem' }} onClick={handleLogout}><FiLogOut /> Logout</button>
                    </nav>
                </aside>

                <main className="admin-main-content">
                    {isLoading ? <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>Loading…</div> : (
                        <>
                            {activeTab === TABS.OVERVIEW   && renderOverview()}
                            {activeTab === TABS.STUDENTS   && renderStudentsTab()}
                            {activeTab === TABS.SUBJECTS   && renderSubjectsTab()}
                            {activeTab === TABS.EXAMS      && renderExamsTab()}
                            {activeTab === TABS.ATTENDANCE && renderAttendanceTab()}
                            {activeTab === TABS.SYLLABUS   && renderSyllabusTab()}
                            {activeTab === TABS.MESSAGES   && renderMessagesTab()}
                        </>
                    )}
                </main>
            </div>

            {confirmModal.show && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal glass-card">
                        <div className="admin-modal-header"><h3>{confirmModal.title}</h3></div>
                        <div className="admin-modal-body"><p>{confirmModal.message}</p></div>
                        <div className="admin-modal-footer">
                            <button className="secondary-btn" onClick={closeModal}>Cancel</button>
                            <button
                                className={confirmModal.type === 'danger' ? 'primary-btn delete-btn' : 'primary-btn'}
                                onClick={confirmModal.onConfirm}
                                style={confirmModal.type === 'danger' ? { background: '#ef4444' } : {}}
                            >
                                {confirmModal.type === 'danger' ? 'Confirm Delete' : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
