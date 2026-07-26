import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import {
    FiCalendar, FiPlus, FiTrash2, FiSearch, FiBook, FiFileText, FiLogOut, FiLock
} from 'react-icons/fi';
import { storeFile, deleteFile } from '../utils/db';
import '../styles/admin-dashboard.css';

const ADMIN_PASSWORD = 'admin1';
const AUTH_KEY = 'mec_admin_auth';

const TABS = {
    DATESHEETS: 'datesheets',
    NOTIFICATIONS: 'notifications',
    QUESTION_PAPERS: 'question_papers',
};

const DEFAULT_DATESHEETS = [
    { id: 'ds1', title: 'B.Tech End Semester Theory Examination Datesheet (Regular/Re-appear) - Dec 2025', date: '05 Dec 2025', size: '240 KB', department: 'All B.Tech' },
    { id: 'ds2', title: 'B.Tech Regular & Re-appear Practical/Viva-Voce Examination Schedule - Nov 2025', date: '28 Nov 2025', size: '180 KB', department: 'All B.Tech' },
    { id: 'ds3', title: 'Diploma in Engineering Semester Examination Datesheet - Dec 2025', date: '02 Dec 2025', size: '215 KB', department: 'Diploma' },
    { id: 'ds4', title: 'B.Tech Special Mercy Chance Examination Schedule - Jan 2026', date: '20 Dec 2025', size: '145 KB', department: 'All B.Tech' }
];

const DEFAULT_NOTIFICATIONS = [
    { id: 'not1', title: 'Instructions to Candidates for End Semester Written Examinations', date: '10 Dec 2025', urgent: true, refNo: 'MEC/EXAM/2025/112' },
    { id: 'not2', title: 'Online Submission of Regular/Re-appear Examination Forms - June 2026 Cycle', date: '12 May 2026', urgent: true, refNo: 'MEC/EXAM/2026/045' },
    { id: 'not3', title: 'Application Form for Re-evaluation & Photocopy of Evaluated Answer Scripts', date: '18 Jul 2025', urgent: false, refNo: 'MEC/EXAM/REVAL/98' },
    { id: 'not4', title: 'Corrigendum: Revision in Friday Examination Session Timings (Afternoon Shift)', date: '08 Dec 2025', urgent: false, refNo: 'MEC/EXAM/2025/118' }
];

const DEFAULT_QUESTION_PAPERS = [
    { id: 'qp1', title: 'Data Structures (CSE-201) - B.Tech CSE (3rd Sem) - Dec 2024', subject: 'Data Structures', code: 'CSE-201', dept: 'CSE', sem: '3rd', year: '2024' },
    { id: 'qp2', title: 'Thermodynamics (ME-203) - B.Tech ME (3rd Sem) - Dec 2024', subject: 'Thermodynamics', code: 'ME-203', dept: 'ME', sem: '3rd', year: '2024' },
    { id: 'qp3', title: 'Fluid Mechanics (CE-205) - B.Tech CE (3rd Sem) - Dec 2024', subject: 'Fluid Mechanics', code: 'CE-205', dept: 'CE', sem: '3rd', year: '2024' },
    { id: 'qp4', title: 'Analog Electronics (ECE-202) - B.Tech ECE (4th Sem) - May 2025', subject: 'Analog Electronics', code: 'ECE-202', dept: 'ECE', sem: '4th', year: '2025' },
    { id: 'qp5', title: 'Engineering Physics (AS-101) - B.Tech (1st Sem) - Dec 2024', subject: 'Engineering Physics', code: 'AS-101', dept: 'Applied Sciences', sem: '1st', year: '2024' },
    { id: 'qp6', title: 'Database Management Systems (CSE-301) - B.Tech CSE (5th Sem) - Dec 2024', subject: 'DBMS', code: 'CSE-301', dept: 'CSE', sem: '5th', year: '2024' },
    { id: 'qp7', title: 'Power Systems (EE-302) - B.Tech EE (6th Sem) - May 2025', subject: 'Power Systems', code: 'EE-302', dept: 'EE', sem: '6th', year: '2025' }
];

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(() =>
        sessionStorage.getItem(AUTH_KEY) === 'true'
    );
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const [activeTab, setActiveTab] = useState(TABS.DATESHEETS);
    const [showAddForm, setShowAddForm] = useState(false);
    
    // Exam cell data
    const [datesheets, setDatesheets] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [questionPapers, setQuestionPapers] = useState([]);

    // File Upload States
    const [datesheetFile, setDatesheetFile] = useState(null);
    const [notificationFile, setNotificationFile] = useState(null);
    const [qpFile, setQpFile] = useState(null);

    const [newDatesheet, setNewDatesheet] = useState({ title: '', department: 'All B.Tech' });
    const [newNotification, setNewNotification] = useState({ title: '', refNo: '', urgent: false });
    const [newQP, setNewQP] = useState({ subject: '', code: '', dept: 'CSE', sem: '1st', year: String(new Date().getFullYear()) });

    const [confirmModal, setConfirmModal] = useState({ show: false, title: '', message: '', onConfirm: null, type: 'danger' });

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

    // ─── DATA SYNC ────────────────────────────────────────────────────────────
    useEffect(() => {
        if (isAuthenticated) {
            const localDS = localStorage.getItem('mec_datesheets');
            const localNot = localStorage.getItem('mec_notifications');
            const localQP = localStorage.getItem('mec_qpapers');

            if (localDS) setDatesheets(JSON.parse(localDS));
            else {
                setDatesheets(DEFAULT_DATESHEETS);
                localStorage.setItem('mec_datesheets', JSON.stringify(DEFAULT_DATESHEETS));
            }

            if (localNot) setNotifications(JSON.parse(localNot));
            else {
                setNotifications(DEFAULT_NOTIFICATIONS);
                localStorage.setItem('mec_notifications', JSON.stringify(DEFAULT_NOTIFICATIONS));
            }

            if (localQP) setQuestionPapers(JSON.parse(localQP));
            else {
                setQuestionPapers(DEFAULT_QUESTION_PAPERS);
                localStorage.setItem('mec_qpapers', JSON.stringify(DEFAULT_QUESTION_PAPERS));
            }
        }
    }, [isAuthenticated]);

    const switchTab = (tab) => {
        setActiveTab(tab);
        setShowAddForm(false);
    };

    const closeModal = () => setConfirmModal(prev => ({ ...prev, show: false }));

    // ─── EXAMINATION CELL CRUD HANDLERS ───────────────────────────────────────
    const handleAddDatesheet = async (e) => {
        e.preventDefault();
        if (!datesheetFile) return alert('Please select a PDF file to upload.');

        const dsId = 'ds_' + Date.now();
        const size = Math.round(datesheetFile.size / 1024) + ' KB';

        try {
            await storeFile('file_' + dsId, datesheetFile);
            
            const ds = {
                id: dsId,
                title: newDatesheet.title,
                department: newDatesheet.department,
                size: size,
                date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
                hasFile: true
            };
            const updated = [ds, ...datesheets];
            setDatesheets(updated);
            localStorage.setItem('mec_datesheets', JSON.stringify(updated));
            setNewDatesheet({ title: '', department: 'All B.Tech' });
            setDatesheetFile(null);
            setShowAddForm(false);
        } catch (err) {
            alert('Error storing file: ' + err.message);
        }
    };

    const handleDeleteDatesheet = async (id) => {
        const updated = datesheets.filter(d => d.id !== id);
        setDatesheets(updated);
        localStorage.setItem('mec_datesheets', JSON.stringify(updated));
        await deleteFile('file_' + id);
    };

    const handleAddNotification = async (e) => {
        e.preventDefault();
        if (!notificationFile) return alert('Please select a PDF file to upload.');

        const notId = 'not_' + Date.now();
        const size = Math.round(notificationFile.size / 1024) + ' KB';

        try {
            await storeFile('file_' + notId, notificationFile);

            const not = {
                id: notId,
                title: newNotification.title,
                refNo: newNotification.refNo || `MEC/EXAM/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`,
                urgent: newNotification.urgent,
                size: size,
                date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
                hasFile: true
            };
            const updated = [not, ...notifications];
            setNotifications(updated);
            localStorage.setItem('mec_notifications', JSON.stringify(updated));
            setNewNotification({ title: '', refNo: '', urgent: false });
            setNotificationFile(null);
            setShowAddForm(false);
        } catch (err) {
            alert('Error storing file: ' + err.message);
        }
    };

    const handleDeleteNotification = async (id) => {
        const updated = notifications.filter(n => n.id !== id);
        setNotifications(updated);
        localStorage.setItem('mec_notifications', JSON.stringify(updated));
        await deleteFile('file_' + id);
    };

    const handleAddQP = async (e) => {
        e.preventDefault();
        if (!qpFile) return alert('Please select a PDF file to upload.');

        const qpId = 'qp_' + Date.now();
        const size = Math.round(qpFile.size / 1024) + ' KB';

        try {
            await storeFile('file_' + qpId, qpFile);

            const qp = {
                id: qpId,
                title: `${newQP.subject} (${newQP.code}) - B.Tech ${newQP.dept} (${newQP.sem} Sem) - Dec ${newQP.year}`,
                subject: newQP.subject,
                code: newQP.code,
                dept: newQP.dept,
                sem: newQP.sem,
                year: newQP.year,
                size: size,
                hasFile: true
            };
            const updated = [qp, ...questionPapers];
            setQuestionPapers(updated);
            localStorage.setItem('mec_qpapers', JSON.stringify(updated));
            setNewQP({ subject: '', code: '', dept: 'CSE', sem: '1st', year: String(new Date().getFullYear()) });
            setQpFile(null);
            setShowAddForm(false);
        } catch (err) {
            alert('Error storing file: ' + err.message);
        }
    };

    const handleDeleteQP = async (id) => {
        const updated = questionPapers.filter(q => q.id !== id);
        setQuestionPapers(updated);
        localStorage.setItem('mec_qpapers', JSON.stringify(updated));
        await deleteFile('file_' + id);
    };

    // ─── RENDERS ──────────────────────────────────────────────────────────────
    const renderDatesheetsTab = () => (
        <div className="admin-tab-content">
            <div className="admin-header-row">
                <h1>Datesheet Management</h1>
                <button className="primary-btn" onClick={() => setShowAddForm(!showAddForm)}>
                    <FiPlus /> {showAddForm ? 'Cancel' : 'Add Datesheet'}
                </button>
            </div>

            {showAddForm && (
                <div className="admin-form-container">
                    <form onSubmit={handleAddDatesheet}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Datesheet Title</label>
                                <input 
                                    type="text" 
                                    value={newDatesheet.title} 
                                    onChange={e => setNewDatesheet({...newDatesheet, title: e.target.value})} 
                                    placeholder="e.g. B.Tech Theory Datesheet Dec 2025" 
                                    required 
                                />
                            </div>
                            <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', gridColumn: 'span 2' }}>
                                <div className="form-group">
                                    <label>Target Department / Stream</label>
                                    <select 
                                        value={newDatesheet.department} 
                                        onChange={e => setNewDatesheet({...newDatesheet, department: e.target.value})} 
                                        required
                                    >
                                        {['All B.Tech', 'Diploma', 'CSE', 'ME', 'CE', 'ECE', 'EE', 'Applied Sciences'].map(d => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Upload PDF Document</label>
                                    <input 
                                        type="file" 
                                        accept="application/pdf"
                                        onChange={e => setDatesheetFile(e.target.files[0])}
                                        style={{ border: 'none', background: 'none', padding: '8px 0' }}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="primary-btn" style={{ marginTop: '1rem' }}>Upload & Save Datesheet</button>
                    </form>
                </div>
            )}

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Department</th>
                            <th>Publish Date</th>
                            <th>Size</th>
                            <th style={{ width: '100px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datesheets.length > 0 ? datesheets.map(ds => (
                            <tr key={ds.id}>
                                <td style={{ fontWeight: '600' }}>{ds.title}</td>
                                <td><span className="dept-tag">{ds.department}</span></td>
                                <td>{ds.date}</td>
                                <td>{ds.size}</td>
                                <td>
                                    <button 
                                        className="icon-btn delete" 
                                        onClick={() => {
                                            setConfirmModal({
                                                show: true, title: 'Delete Datesheet',
                                                message: `Are you sure you want to delete datesheet "${ds.title}"?`,
                                                type: 'danger',
                                                onConfirm: () => { handleDeleteDatesheet(ds.id); closeModal(); }
                                            });
                                        }}
                                    >
                                        <FiTrash2 />
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="5" style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No datesheets added yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderNotificationsTab = () => (
        <div className="admin-tab-content">
            <div className="admin-header-row">
                <h1>Exam Notification Management</h1>
                <button className="primary-btn" onClick={() => setShowAddForm(!showAddForm)}>
                    <FiPlus /> {showAddForm ? 'Cancel' : 'Add Notification'}
                </button>
            </div>

            {showAddForm && (
                <div className="admin-form-container">
                    <form onSubmit={handleAddNotification}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Notification Title</label>
                                <input 
                                    type="text" 
                                    value={newNotification.title} 
                                    onChange={e => setNewNotification({...newNotification, title: e.target.value})} 
                                    placeholder="e.g. Online Submission of Exam Forms Regular/Re-appear" 
                                    required 
                                />
                            </div>
                            <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', gridColumn: 'span 2' }}>
                                <div className="form-group">
                                    <label>Reference Number (Optional)</label>
                                    <input 
                                        type="text" 
                                        value={newNotification.refNo} 
                                        onChange={e => setNewNotification({...newNotification, refNo: e.target.value})} 
                                        placeholder="e.g. MEC/EXAM/2026/045" 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Upload PDF Document</label>
                                    <input 
                                        type="file" 
                                        accept="application/pdf"
                                        onChange={e => setNotificationFile(e.target.files[0])}
                                        style={{ border: 'none', background: 'none', padding: '8px 0' }}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', gridColumn: 'span 2', marginTop: '6px' }}>
                                <input 
                                    type="checkbox" 
                                    id="urgent"
                                    checked={newNotification.urgent} 
                                    onChange={e => setNewNotification({...newNotification, urgent: e.target.checked})} 
                                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                />
                                <label htmlFor="urgent" style={{ cursor: 'pointer', margin: 0, fontWeight: '600' }}>Mark as Urgent Notification</label>
                            </div>
                        </div>
                        <button type="submit" className="primary-btn" style={{ marginTop: '1rem' }}>Publish Notification</button>
                    </form>
                </div>
            )}

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Ref Number</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Publish Date</th>
                            <th style={{ width: '100px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notifications.length > 0 ? notifications.map(not => (
                            <tr key={not.id}>
                                <td style={{ fontWeight: '600', fontFamily: 'monospace' }}>{not.refNo}</td>
                                <td>{not.title}</td>
                                <td>
                                    {not.urgent ? (
                                        <span style={{ background: '#fef2f2', color: '#dc2626', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700' }}>URGENT</span>
                                    ) : (
                                        <span style={{ background: '#f8fafc', color: '#64748b', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600' }}>Standard</span>
                                    )}
                                </td>
                                <td>{not.date}</td>
                                <td>
                                    <button 
                                        className="icon-btn delete" 
                                        onClick={() => {
                                            setConfirmModal({
                                                show: true, title: 'Delete Notification',
                                                message: `Are you sure you want to delete notification "${not.title}"?`,
                                                type: 'danger',
                                                onConfirm: () => { handleDeleteNotification(not.id); closeModal(); }
                                            });
                                        }}
                                    >
                                        <FiTrash2 />
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="5" style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No notifications added yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderQuestionPapersTab = () => (
        <div className="admin-tab-content">
            <div className="admin-header-row">
                <h1>Question Paper Repository</h1>
                <button className="primary-btn" onClick={() => setShowAddForm(!showAddForm)}>
                    <FiPlus /> {showAddForm ? 'Cancel' : 'Add Question Paper'}
                </button>
            </div>

            {showAddForm && (
                <div className="admin-form-container">
                    <form onSubmit={handleAddQP}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Subject / Course Title</label>
                                <input 
                                    type="text" 
                                    value={newQP.subject} 
                                    onChange={e => setNewQP({...newQP, subject: e.target.value})} 
                                    placeholder="e.g. Data Structures, Thermodynamics" 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Subject Code</label>
                                <input 
                                    type="text" 
                                    value={newQP.code} 
                                    onChange={e => setNewQP({...newQP, code: e.target.value})} 
                                    placeholder="e.g. CSE-201, ME-203" 
                                    required 
                                />
                            </div>
                            <div className="form-grid-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', gridColumn: 'span 2' }}>
                                <div className="form-group">
                                    <label>Department</label>
                                    <select value={newQP.dept} onChange={e => setNewQP({...newQP, dept: e.target.value})} required>
                                        {['CSE', 'ME', 'CE', 'ECE', 'EE', 'Applied Sciences'].map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Semester</label>
                                    <select value={newQP.sem} onChange={e => setNewQP({...newQP, sem: e.target.value})} required>
                                        {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'].map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Session / Examination Year</label>
                                    <input 
                                        type="number" 
                                        value={newQP.year} 
                                        onChange={e => setNewQP({...newQP, year: e.target.value})} 
                                        min="2010" 
                                        max="2035" 
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                <label>Upload PDF Document</label>
                                <input 
                                    type="file" 
                                    accept="application/pdf"
                                    onChange={e => setQpFile(e.target.files[0])}
                                    style={{ border: 'none', background: 'none', padding: '8px 0' }}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="primary-btn" style={{ marginTop: '1rem' }}>Upload Question Paper Details</button>
                    </form>
                </div>
            )}

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Code</th>
                            <th>Dept</th>
                            <th>Sem</th>
                            <th>Session</th>
                            <th style={{ width: '100px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionPapers.length > 0 ? questionPapers.map(qp => (
                            <tr key={qp.id}>
                                <td style={{ fontWeight: '600' }}>{qp.subject}</td>
                                <td style={{ fontFamily: 'monospace' }}>{qp.code}</td>
                                <td><span className="dept-tag">{qp.dept}</span></td>
                                <td>{qp.sem} Sem</td>
                                <td>Dec {qp.year}</td>
                                <td>
                                    <button 
                                        className="icon-btn delete" 
                                        onClick={() => {
                                            setConfirmModal({
                                                show: true, title: 'Delete Question Paper',
                                                message: `Are you sure you want to delete question paper for "${qp.subject}"?`,
                                                type: 'danger',
                                                onConfirm: () => { handleDeleteQP(qp.id); closeModal(); }
                                            });
                                        }}
                                    >
                                        <FiTrash2 />
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="6" style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>No question papers added yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    // ─── LOGIN SCREEN ─────────────────────────────────────────────────────────
    if (!isAuthenticated) {
        return (
            <div className="admin-dashboard-login" style={{ background: '#f3f4f6', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                <SEO title="Admin Login" description="MEC Administrative Login" />
                <div className="login-card glass-card" style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '2.5rem', width: '100%', maxWidth: '400px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{ background: '#eff6ff', color: '#2563eb', width: '56px', height: '56px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', marginBottom: '1rem' }}>
                            <FiLock />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>MEC Admin Panel</h2>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '6px' }}>Enter password to access control panel</p>
                    </div>

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>Password</label>
                            <input
                                type="password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                placeholder="••••••••"
                                style={{ width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none', transition: 'border-color 0.2s' }}
                                required
                            />
                        </div>
                        {loginError && <p style={{ color: '#ef4444', fontSize: '0.8rem', margin: 0 }}>{loginError}</p>}
                        <button type="submit" className="primary-btn" style={{ width: '100%', padding: '12px', borderRadius: '8px', fontWeight: 600, display: 'flex', justifyContent: 'center' }}>
                            Access Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // ─── LAYOUT ───────────────────────────────────────────────────────────────
    return (
        <div className="admin-dashboard">
            <SEO title="Admin Dashboard" description="MEC Administrative Control Panel" />
            <div className="admin-container">
                <aside className="admin-sidebar">
                    <div className="admin-sidebar-header"><h2>MEC ADMIN</h2></div>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button className={`admin-nav-btn ${activeTab === TABS.DATESHEETS ? 'active' : ''}`} onClick={() => switchTab(TABS.DATESHEETS)}><FiCalendar /> Datesheets</button>
                        <button className={`admin-nav-btn ${activeTab === TABS.NOTIFICATIONS ? 'active' : ''}`} onClick={() => switchTab(TABS.NOTIFICATIONS)}><FiFileText /> Notices</button>
                        <button className={`admin-nav-btn ${activeTab === TABS.QUESTION_PAPERS ? 'active' : ''}`} onClick={() => switchTab(TABS.QUESTION_PAPERS)}><FiBook /> Past Papers</button>
                        <button className="admin-nav-btn" style={{ color: '#ef4444', marginTop: '4rem' }} onClick={handleLogout}><FiLogOut /> Logout</button>
                    </nav>
                </aside>

                <main className="admin-main-content">
                    {activeTab === TABS.DATESHEETS && renderDatesheetsTab()}
                    {activeTab === TABS.NOTIFICATIONS && renderNotificationsTab()}
                    {activeTab === TABS.QUESTION_PAPERS && renderQuestionPapersTab()}
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
