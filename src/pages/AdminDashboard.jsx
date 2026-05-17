import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, fetchStudents, addStudent, fetchDepartments } from '../lib/supabase';
import SEO from '../components/SEO';
import { 
    FiUsers, FiBookOpen, FiCalendar, FiClock, 
    FiCheckSquare, FiSettings, FiPlus, FiTrash2, 
    FiEdit2, FiSearch, FiGrid, FiBook, FiFileText, FiLogOut, FiChevronRight
} from 'react-icons/fi';
import '../styles/admin-dashboard.css';

const TABS = {
    OVERVIEW: 'overview',
    STUDENTS: 'students',
    SUBJECTS: 'subjects',
    EXAMS: 'exams',
    ATTENDANCE: 'attendance',
    SYLLABUS: 'syllabus'
};

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState(TABS.OVERVIEW);
    const [students, setStudents] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [exams, setExams] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [syllabusData, setSyllabusData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [confirmModal, setConfirmModal] = useState({ show: false, title: '', message: '', onConfirm: null, type: 'danger' });
    
    // Form States
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
        student_roll_no: '', month_name: 'January', year: new Date().getFullYear(), total_working_days: 26, days_attended: 0
    });

    const [newSyllabus, setNewSyllabus] = useState({
        subject_id: '', unit_no: 1, title: '', topics: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [studentsRes, subjectsRes, examsRes, attRes, syllabusRes, deptsData] = await Promise.all([
                supabase.from('students').select('*, departments(name)'),
                supabase.from('subjects').select('*, departments(name)'),
                supabase.from('exams').select('*, subjects(subject_name, subject_code)'),
                supabase.from('monthly_attendance').select('*, students(name)'),
                supabase.from('syllabus').select('*, subjects(subject_name)').order('unit_no', { ascending: true }),
                fetchDepartments()
            ]);

            setStudents(studentsRes.data || []);
            setSubjects(subjectsRes.data || []);
            setExams(examsRes.data || []);
            setAttendanceData(attRes.data || []);
            setSyllabusData(syllabusRes.data || []);
            setDepartments(deptsData || []);

            // Set initial department_id defaults from loaded data
            const firstDeptId = deptsData?.[0]?.id || '';
            setNewStudent(prev => prev.department_id ? prev : { ...prev, department_id: firstDeptId });
            setNewSubject(prev => prev.department_id ? prev : { ...prev, department_id: firstDeptId });
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // ─── HANDLERS ─────────────────────────────────────────────────────────────

    const handleAddStudent = async (e) => {
        e.preventDefault();
        if (!newStudent.roll_no || !newStudent.name) return alert('Please fill in Roll No and Name');
        
        try {
            // Only send editable fields to Supabase
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
                alert('Student updated successfully!');
            } else {
                await addStudent(payload);
                alert('Student added successfully!');
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
            alert('Subject added!');
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
            alert('Exam scheduled!');
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
            alert('Attendance record updated successfully!');
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
            // RELIABLE FIX: Fetch the latest unit number from the DB directly 
            // instead of relying on local state, to prevent any duplicates.
            const { data: currentUnits, error: fetchError } = await supabase
                .from('syllabus')
                .select('unit_no')
                .eq('subject_id', newSyllabus.subject_id)
                .order('unit_no', { ascending: false })
                .limit(1);

            if (fetchError) throw fetchError;

            const nextUnitNo = (currentUnits && currentUnits.length > 0) 
                ? currentUnits[0].unit_no + 1 
                : 1;

            const formattedSyllabus = {
                ...newSyllabus,
                unit_no: nextUnitNo,
                topics: newSyllabus.topics.split(',').map(t => t.trim()).filter(t => t !== '')
            };

            const { error: insertError } = await supabase.from('syllabus').insert([formattedSyllabus]);
            if (insertError) throw insertError;

            alert(`Successfully saved as Unit ${nextUnitNo}!`);
            setNewSyllabus({ ...newSyllabus, title: '', topics: '', unit_no: nextUnitNo + 1 });
            loadData();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    const handleDeleteStudent = (studentId) => {
        setConfirmModal({
            show: true,
            title: 'Delete Student',
            message: 'Are you sure you want to delete this student? This action cannot be undone.',
            type: 'danger',
            onConfirm: async () => {
                try {
                    const { error } = await supabase.from('students').delete().eq('id', studentId);
                    if (error) throw error;
                    loadData();
                    setConfirmModal({ ...confirmModal, show: false });
                } catch (error) {
                    alert(`Error deleting student: ${error.message}`);
                }
            }
        });
    };

    const handleEditStudent = (s) => {
        setEditingStudent(s);
        // Only copy editable fields — NOT id, created_at, departments relation
        setNewStudent({
            roll_no: s.roll_no,
            name: s.name,
            department_id: s.department_id,
            year: s.year,
            semester: s.semester,
            password_text: s.password_text
        });
        setShowAddForm(true);
    };

    // ─── RENDER TABS ──────────────────────────────────────────────────────────

    const renderOverview = () => (
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
            </div>
        </div>
    );

    const renderStudentsTab = () => (
        <div className="admin-tab-content">
            <div className="admin-header-row">
                <h1>Student Management</h1>
                <button className={showAddForm ? "secondary-btn" : "primary-btn"} onClick={() => { setShowAddForm(!showAddForm); if (showAddForm) { setEditingStudent(null); setNewStudent({ roll_no: '', name: '', department_id: departments[0]?.id || '', year: 1, semester: 1, password_text: 'mec@123' }); } }}>
                    <FiPlus /> {showAddForm ? 'Cancel' : 'Add Student'}
                </button>
            </div>
            {showAddForm && (
                <div className="admin-form-container">
                    <form onSubmit={handleAddStudent}><div className="form-grid">
                        <div className="form-group"><label>Roll Number</label><input type="text" required value={newStudent.roll_no} onChange={e => setNewStudent({...newStudent, roll_no: e.target.value})} /></div>
                        <div className="form-group"><label>Full Name</label><input type="text" required value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} /></div>
                        <div className="form-group"><label>Portal Password</label><input type="text" required value={newStudent.password_text} onChange={e => setNewStudent({...newStudent, password_text: e.target.value})} /></div>
                        <div className="form-group"><label>Department</label><select value={newStudent.department_id} onChange={e => setNewStudent({...newStudent, department_id: e.target.value})}>{departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}</select></div>
                        <div className="form-group"><label>Semester</label><select value={newStudent.semester} onChange={e => {
                            const sem = parseInt(e.target.value);
                            setNewStudent({...newStudent, semester: sem, year: Math.ceil(sem / 2)});
                        }}>{[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}</select></div>
                    </div><div style={{marginTop:'1.5rem',display:'flex',justifyContent:'flex-end'}}><button type="submit" className="primary-btn">{editingStudent ? 'Update Student' : 'Save Student'}</button></div></form>
                </div>
            )}
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead><tr><th>Roll No</th><th>Name</th><th>Dept</th><th>Sem</th><th>Password</th><th>Actions</th></tr></thead>
                    <tbody>{students.map(s => (
                        <tr key={s.id}>
                            <td>{s.roll_no}</td><td>{s.name}</td><td>{s.departments?.name}</td><td>{s.semester}</td>
                            <td><code>{s.password_text}</code></td>
                            <td><div className="action-btns">
                                <button className="icon-btn edit" onClick={() => handleEditStudent(s)}><FiEdit2 /></button>
                                <button className="icon-btn delete" onClick={() => handleDeleteStudent(s.id)}><FiTrash2 /></button>
                            </div></td>
                        </tr>
                    ))}</tbody>
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
                    <form onSubmit={handleAddSubject}><div className="form-grid">
                        <div className="form-group"><label>Code</label><input type="text" required value={newSubject.subject_code} onChange={e => setNewSubject({...newSubject, subject_code: e.target.value})} /></div>
                        <div className="form-group"><label>Name</label><input type="text" required value={newSubject.subject_name} onChange={e => setNewSubject({...newSubject, subject_name: e.target.value})} /></div>
                        <div className="form-group"><label>Department</label><select value={newSubject.department_id} onChange={e => setNewSubject({...newSubject, department_id: e.target.value})}>{departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}</select></div>
                        <div className="form-group"><label>Semester</label><select value={newSubject.semester} onChange={e => setNewSubject({...newSubject, semester: parseInt(e.target.value)})}>{[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}</select></div>
                        <div className="form-group"><label>Credits</label><input type="number" min="1" max="6" value={newSubject.credits} onChange={e => setNewSubject({...newSubject, credits: parseInt(e.target.value)})} /></div>
                        <div className="form-group"><label>Type</label><select value={newSubject.type} onChange={e => setNewSubject({...newSubject, type: e.target.value})}><option value="Core">Core</option><option value="Elective">Elective</option><option value="Lab">Lab / Practical</option></select></div>
                    </div><button type="submit" className="primary-btn" style={{marginTop:'1rem'}}>Save Subject</button></form>
                </div>
            )}
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead><tr><th>Code</th><th>Name</th><th>Department</th><th>Sem</th><th>Credits</th><th>Actions</th></tr></thead>
                    <tbody>{subjects.map(s => <tr key={s.id}><td>{s.subject_code}</td><td>{s.subject_name}</td><td>{s.departments?.name}</td><td>{s.semester}</td><td>{s.credits}</td><td><button className="icon-btn delete" onClick={() => {
                        setConfirmModal({
                            show: true,
                            title: 'Delete Subject',
                            message: `Are you sure you want to delete ${s.subject_name}?`,
                            type: 'danger',
                            onConfirm: async () => {
                                try {
                                    await supabase.from('subjects').delete().eq('id', s.id);
                                    loadData();
                                    setConfirmModal({ ...confirmModal, show: false });
                                } catch (err) { console.error(err); }
                            }
                        });
                    }}><FiTrash2 /></button></td></tr>)}</tbody>
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
                    <form onSubmit={handleAddExam}><div className="form-grid">
                        <div className="form-group">
                            <label>Subject</label>
                            <select value={newExam.subject_id} onChange={e => setNewExam({...newExam, subject_id: e.target.value})} required>
                                <option value="">-- Select Subject --</option>
                                {subjects.map(s => <option key={s.id} value={s.id}>{s.subject_name} ({s.subject_code})</option>)}
                            </select>
                        </div>
                        <div className="form-group"><label>Exam Date</label><input type="date" required value={newExam.exam_date} onChange={e => setNewExam({...newExam, exam_date: e.target.value})} /></div>
                        <div className="form-group"><label>Start Time</label><input type="time" required value={newExam.start_time} onChange={e => setNewExam({...newExam, start_time: e.target.value})} /></div>
                        <div className="form-group"><label>Duration</label><input type="text" value={newExam.duration} onChange={e => setNewExam({...newExam, duration: e.target.value})} /></div>
                        <div className="form-group"><label>Venue</label><input type="text" value={newExam.venue} onChange={e => setNewExam({...newExam, venue: e.target.value})} /></div>
                        <div className="form-group"><label>Exam Type</label><select value={newExam.exam_type} onChange={e => setNewExam({...newExam, exam_type: e.target.value})}><option value="Sessional-I">Sessional I</option><option value="Sessional-II">Sessional II</option><option value="End-Sem">End-Sem</option><option value="Practical">Practical</option></select></div>
                    </div><button type="submit" className="primary-btn" style={{marginTop:'1rem'}}>Save Exam Schedule</button></form>
                </div>
            )}
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead><tr><th>Subject</th><th>Type</th><th>Date</th><th>Time</th><th>Venue</th><th>Actions</th></tr></thead>
                    <tbody>{exams.map(e => (
                        <tr key={e.id}>
                            <td>{e.subjects?.subject_name}</td>
                            <td>{e.exam_type}</td>
                            <td>{new Date(e.exam_date).toLocaleDateString()}</td>
                            <td>{e.start_time}</td>
                            <td>{e.venue}</td>
                            <td><button className="icon-btn delete" onClick={() => {
                                setConfirmModal({
                                    show: true,
                                    title: 'Delete Exam',
                                    message: 'Are you sure you want to cancel this exam?',
                                    type: 'danger',
                                    onConfirm: async () => {
                                        try {
                                            await supabase.from('exams').delete().eq('id', e.id);
                                            loadData();
                                            setConfirmModal({ ...confirmModal, show: false });
                                        } catch (err) { console.error(err); }
                                    }
                                });
                            }}><FiTrash2 /></button></td>
                        </tr>
                    ))}</tbody>
                </table>
            </div>
        </div>
    );

    const renderAttendanceTab = () => (
        <div className="admin-tab-content">
            <div className="admin-header-row"><h1>Monthly Attendance</h1></div>
            <div className="admin-form-container">
                <form onSubmit={handleAddAttendance}><div className="form-grid">
                    <div className="form-group">
                        <label>Student</label>
                        <select 
                            value={newAttendance.student_roll_no} 
                            onChange={e => setNewAttendance({...newAttendance, student_roll_no: e.target.value})}
                            required
                        >
                            <option value="">-- Select Student --</option>
                            {students.map(s => (
                                <option key={s.roll_no} value={s.roll_no}>{s.roll_no} - {s.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group"><label>Working Days</label><input type="number" value={newAttendance.total_working_days} onChange={e => setNewAttendance({...newAttendance, total_working_days: parseInt(e.target.value)})} /></div>
                    <div className="form-group"><label>Days Attended</label><input type="number" value={newAttendance.days_attended} onChange={e => setNewAttendance({...newAttendance, days_attended: parseInt(e.target.value)})} /></div>
                </div><button type="submit" className="primary-btn" style={{marginTop:'1rem'}}>Save Monthly Data</button></form>
            </div>
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead><tr><th>Student</th><th>Month</th><th>Attended/Total</th><th>Actions</th></tr></thead>
                    <tbody>{attendanceData.map(a => <tr key={a.id}><td>{a.students?.name}</td><td>{a.month_name}</td><td>{a.days_attended}/{a.total_working_days}</td><td><button className="icon-btn delete" onClick={() => {
                        setConfirmModal({
                            show: true,
                            title: 'Delete Attendance',
                            message: 'Remove this attendance record?',
                            type: 'danger',
                            onConfirm: async () => {
                                try {
                                    await supabase.from('monthly_attendance').delete().eq('id', a.id);
                                    loadData();
                                    setConfirmModal({ ...confirmModal, show: false });
                                } catch (err) { console.error(err); }
                            }
                        });
                    }}><FiTrash2 /></button></td></tr>)}</tbody>
                </table>
            </div>
        </div>
    );

    const renderSyllabusTab = () => (
        <div className="admin-tab-content">
            <div className="admin-header-row"><h1>Syllabus Management</h1></div>
            <div className="admin-form-container">
                <form onSubmit={handleAddSyllabus}><div className="form-grid">
                    <div className="form-group">
                        <label>Subject</label>
                        <select 
                            value={newSyllabus.subject_id} 
                            onChange={e => setNewSyllabus({...newSyllabus, subject_id: e.target.value})}
                            required
                        >
                            <option value="">-- Select Subject --</option>
                            {subjects.map(s => (
                                <option key={s.id} value={s.id}>{s.subject_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group"><label>Unit Title</label><input type="text" value={newSyllabus.title} onChange={e => setNewSyllabus({...newSyllabus, title: e.target.value})} /></div>
                    <div className="form-group" style={{gridColumn:'span 2'}}><label>Topics (comma separated)</label><textarea value={newSyllabus.topics} onChange={e => setNewSyllabus({...newSyllabus, topics: e.target.value})} /></div>
                </div>
                {newSyllabus.subject_id && (
                    <div style={{marginTop:'1rem', color:'#2563eb', fontWeight:'600', fontSize:'0.9rem'}}>
                        Status: Next unit for this subject will be automatically saved as <strong>Unit {
                            (syllabusData.filter(s => s.subject_id === newSyllabus.subject_id).length > 0 
                                ? Math.max(...syllabusData.filter(s => s.subject_id === newSyllabus.subject_id).map(u => u.unit_no)) + 1 
                                : 1)
                        }</strong>
                    </div>
                )}
                <button type="submit" className="primary-btn" style={{marginTop:'1rem'}}>Add Unit</button></form>
            </div>
            <div className="admin-table-container" style={{background:'transparent', border:'none', boxShadow:'none'}}>
                {subjects.filter(sub => syllabusData.some(s => s.subject_id === sub.id)).map(subject => (
                    <div key={subject.id} style={{marginBottom:'2rem', background:'#fff', borderRadius:'12px', border:'1px solid #e5e7eb', overflow:'hidden'}}>
                        <div style={{padding:'12px 20px', background:'#f8fafc', borderBottom:'1px solid #e5e7eb', fontWeight:'700', color:'#1f2937'}}>
                            {subject.subject_name} ({subject.subject_code})
                        </div>
                        <table className="admin-table" style={{border:'none', boxShadow:'none'}}>
                            <thead><tr><th style={{width:'100px'}}>Unit</th><th>Title</th><th style={{width:'100px'}}>Actions</th></tr></thead>
                            <tbody>
                                {syllabusData
                                    .filter(s => s.subject_id === subject.id)
                                    .sort((a,b) => a.unit_no - b.unit_no)
                                    .map(s => (
                                        <tr key={s.id}>
                                            <td style={{fontWeight:'600'}}>Unit {s.unit_no}</td>
                                            <td>{s.title}</td>
                                            <td><button className="icon-btn delete" onClick={() => {
                                                setConfirmModal({
                                                    show: true,
                                                    title: 'Delete Syllabus Unit',
                                                    message: `Delete Unit ${s.unit_no} of ${subject.subject_name}?`,
                                                    type: 'danger',
                                                    onConfirm: async () => {
                                                        try {
                                                            await supabase.from('syllabus').delete().eq('id', s.id);
                                                            loadData();
                                                            setConfirmModal({ ...confirmModal, show: false });
                                                        } catch (err) { console.error(err); }
                                                    }
                                                });
                                            }}><FiTrash2 /></button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="admin-dashboard">
            <SEO title="Admin Dashboard" description="MEC Administrative Control Panel" />
            <div className="admin-container">
                <aside className="admin-sidebar">
                    <div className="admin-sidebar-header"><h2>MEC ADMIN</h2></div>
                    <nav style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                        <button className={`admin-nav-btn ${activeTab === TABS.OVERVIEW ? 'active' : ''}`} onClick={() => setActiveTab(TABS.OVERVIEW)}><FiGrid /> Overview</button>
                        <button className={`admin-nav-btn ${activeTab === TABS.STUDENTS ? 'active' : ''}`} onClick={() => setActiveTab(TABS.STUDENTS)}><FiUsers /> Students</button>
                        <button className={`admin-nav-btn ${activeTab === TABS.SUBJECTS ? 'active' : ''}`} onClick={() => setActiveTab(TABS.SUBJECTS)}><FiBook /> Subjects</button>
                        <button className={`admin-nav-btn ${activeTab === TABS.EXAMS ? 'active' : ''}`} onClick={() => setActiveTab(TABS.EXAMS)}><FiCalendar /> Exams</button>
                        <button className={`admin-nav-btn ${activeTab === TABS.ATTENDANCE ? 'active' : ''}`} onClick={() => setActiveTab(TABS.ATTENDANCE)}><FiClock /> Attendance</button>
                        <button className={`admin-nav-btn ${activeTab === TABS.SYLLABUS ? 'active' : ''}`} onClick={() => setActiveTab(TABS.SYLLABUS)}><FiFileText /> Syllabus</button>
                        <button className="admin-nav-btn" style={{color:'#ef4444',marginTop:'2rem'}} onClick={() => navigate('/')}><FiLogOut /> Logout</button>
                    </nav>
                </aside>
                <main className="admin-main-content">
                    {isLoading ? <div style={{textAlign:'center',padding:'3rem'}}>Loading...</div> : (
                        <>
                            {activeTab === TABS.OVERVIEW && renderOverview()}
                            {activeTab === TABS.STUDENTS && renderStudentsTab()}
                            {activeTab === TABS.SUBJECTS && renderSubjectsTab()}
                            {activeTab === TABS.EXAMS && renderExamsTab()}
                            {activeTab === TABS.ATTENDANCE && renderAttendanceTab()}
                            {activeTab === TABS.SYLLABUS && renderSyllabusTab()}
                        </>
                    )}
                </main>
            </div>

            {/* Custom Confirmation Modal */}
            {confirmModal.show && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal glass-card">
                        <div className="admin-modal-header">
                            <h3>{confirmModal.title}</h3>
                        </div>
                        <div className="admin-modal-body">
                            <p>{confirmModal.message}</p>
                        </div>
                        <div className="admin-modal-footer">
                            <button className="secondary-btn" onClick={() => setConfirmModal({ ...confirmModal, show: false })}>Cancel</button>
                            <button 
                                className={confirmModal.type === 'danger' ? "primary-btn delete-btn" : "primary-btn"} 
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
