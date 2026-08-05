import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import {
    FiCalendar, FiPlus, FiTrash2, FiSearch, FiBook, FiFileText, FiLogOut, FiLock, FiUploadCloud, FiCheckCircle, FiUsers, FiEye, FiDownload
} from 'react-icons/fi';
import { storeFile, deleteFile, getFile } from '../utils/db';
import '../styles/admin-dashboard.css';

const ADMIN_PASSWORD_HASH = '6818edff7f6c8acdd47f3edd613dea76bf741ee4cfe1af170155ee077599f7bd';
const AUTH_KEY = 'mec_admin_auth';

const TABS = {
    DATESHEETS: 'datesheets',
    NOTIFICATIONS: 'notifications',
    QUESTION_PAPERS: 'question_papers',
    ONLINE_ADMISSIONS: 'online_admissions',
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
    const [onlineAdmissions, setOnlineAdmissions] = useState([]);

    // File Upload States
    const [datesheetFile, setDatesheetFile] = useState(null);
    const [notificationFile, setNotificationFile] = useState(null);
    const [qpFile, setQpFile] = useState(null);

    const [newDatesheet, setNewDatesheet] = useState({ title: '', department: 'All B.Tech' });
    const [newNotification, setNewNotification] = useState({ title: '', type: 'event' });
    const [newQP, setNewQP] = useState({ subject: '', code: '', dept: 'CSE', sem: '1st', year: String(new Date().getFullYear()) });

    const [confirmModal, setConfirmModal] = useState({ show: false, title: '', message: '', onConfirm: null, type: 'danger' });

    // Hidden file input refs
    const datesheetFileRef = useRef(null);
    const notificationFileRef = useRef(null);
    const qpFileRef = useRef(null);

    const navigate = useNavigate();

    // ─── AUTH ─────────────────────────────────────────────────────────────────
    const handleLogin = async (e) => {
        e.preventDefault();
        
        // Hash the entered password securely
        const encoder = new TextEncoder();
        const data = encoder.encode(loginPassword);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        if (hashHex === ADMIN_PASSWORD_HASH) {
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

            const localAdmissions = localStorage.getItem('mec_online_admissions');
            if (localAdmissions) setOnlineAdmissions(JSON.parse(localAdmissions));
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

        const notId = 'not_' + Date.now();
        const size = notificationFile ? Math.round(notificationFile.size / 1024) + ' KB' : null;

        try {
            if (notificationFile) {
                await storeFile('file_' + notId, notificationFile);
            }

            const not = {
                id: notId,
                title: newNotification.title,
                type: newNotification.type,
                size: size,
                date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
                hasFile: !!notificationFile
            };
            const updated = [not, ...notifications];
            setNotifications(updated);
            localStorage.setItem('mec_notifications', JSON.stringify(updated));
            setNewNotification({ title: '', type: 'event' });
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

    const handleDeleteAdmission = (id) => {
        const updated = onlineAdmissions.filter(a => a.id !== id);
        setOnlineAdmissions(updated);
        localStorage.setItem('mec_online_admissions', JSON.stringify(updated));
    };

    const [viewingAdmission, setViewingAdmission] = useState(null);

    const handleViewDocument = async (fileKey, fileName, fileType) => {
        try {
            const fileData = await getFile(fileKey);
            if (fileData) {
                const url = URL.createObjectURL(fileData);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName || 'document';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setTimeout(() => URL.revokeObjectURL(url), 1000);
            } else {
                alert("File not found in storage.");
            }
        } catch (e) {
            console.error("Error retrieving file:", e);
        }
    };

    // ─── RENDERS ──────────────────────────────────────────────────────────────
    const renderOnlineAdmissionsTab = () => (
        <div className="admin-tab-content">
            <div className="admin-header-row">
                <h1>Online Admissions Inquiries</h1>
            </div>

            <div className="admin-list glass-card">
                {onlineAdmissions.length === 0 ? (
                    <div className="empty-state">No online admission inquiries yet.</div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Contact</th>
                                <th>Course</th>
                                <th>Marks (10th/12th)</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {onlineAdmissions.map(adm => (
                                <tr key={adm.id}>
                                    <td style={{ color: '#666', fontSize: '0.9rem' }}>
                                        {new Date(adm.submittedAt).toLocaleDateString()}
                                    </td>
                                    <td><strong>{adm.name}</strong></td>
                                    <td>
                                        <div>{adm.email}</div>
                                        <div style={{ color: '#666', fontSize: '0.85rem' }}>{adm.phone}</div>
                                    </td>
                                    <td><span className="dept-badge">{(adm.program || adm.course)} {adm.branch ? `- ${adm.branch}` : ''}</span></td>
                                    <td>
                                        {adm.highestQualification ? (
                                            <>{adm.highestQualification}: {adm.percentage}</>
                                        ) : (
                                            <>
                                                10th: {adm.tenthMarks}%<br/>
                                                12th: {adm.twelfthMarks || 'N/A'}%
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button 
                                                className="icon-btn edit" 
                                                title="View Details"
                                                onClick={() => setViewingAdmission(adm)}
                                            >
                                                <FiEye />
                                            </button>
                                            <button 
                                                className="icon-btn delete" 
                                                title="Delete Inquiry"
                                                onClick={() => setConfirmModal({
                                                    show: true,
                                                    title: 'Delete Inquiry',
                                                    message: `Are you sure you want to delete the admission inquiry from ${adm.name}?`,
                                                    type: 'danger',
                                                    onConfirm: () => {
                                                        handleDeleteAdmission(adm.id);
                                                        closeModal();
                                                    }
                                                })}
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Application Details Modal */}
            {viewingAdmission && (
                <div className="modal-overlay" onClick={() => setViewingAdmission(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '800px', width: '90%', maxHeight: '90vh', overflowY: 'auto', padding: '30px' }}>
                        <h2 style={{ marginBottom: '20px', borderBottom: '2px solid #eaeaea', paddingBottom: '10px' }}>Application Details</h2>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                            <div>
                                <h3 style={{ color: '#b8933b', marginBottom: '10px' }}>Personal Info</h3>
                                <p><strong>Name:</strong> {viewingAdmission.name}</p>
                                <p><strong>Father:</strong> {viewingAdmission.fatherName}</p>
                                <p><strong>Mother:</strong> {viewingAdmission.motherName}</p>
                                <p><strong>Email:</strong> {viewingAdmission.email}</p>
                                <p><strong>Phone:</strong> {viewingAdmission.phone}</p>
                                <p><strong>Gender:</strong> {viewingAdmission.gender}</p>
                                <p><strong>DOB:</strong> {viewingAdmission.dob}</p>
                                <p><strong>Aadhar:</strong> {viewingAdmission.aadharNumber}</p>
                            </div>
                            <div>
                                <h3 style={{ color: '#b8933b', marginBottom: '10px' }}>Course & Preferences</h3>
                                <p><strong>Program:</strong> {viewingAdmission.program}</p>
                                <p><strong>Branch:</strong> {viewingAdmission.branch}</p>
                                <p><strong>Hostel Required:</strong> {viewingAdmission.hostelRequired}</p>
                                <p><strong>Transport Required:</strong> {viewingAdmission.transportRequired}</p>
                                <p><strong>Category:</strong> {viewingAdmission.category}</p>
                                <p><strong>Religion:</strong> {viewingAdmission.religion}</p>
                                <p><strong>Nationality:</strong> {viewingAdmission.nationality}</p>
                                <p><strong>Marital Status:</strong> {viewingAdmission.maritalStatus}</p>
                            </div>
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                            <h3 style={{ color: '#b8933b', marginBottom: '10px' }}>Contact Address</h3>
                            <p>{viewingAdmission.address}, {viewingAdmission.city}, {viewingAdmission.state} - {viewingAdmission.postalCode}</p>
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                            <h3 style={{ color: '#b8933b', marginBottom: '10px' }}>Academic Records</h3>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ background: '#f5f5f5' }}>
                                        <th style={{ padding: '8px' }}>Qualification</th>
                                        <th style={{ padding: '8px' }}>Board / University</th>
                                        <th style={{ padding: '8px' }}>Passing Year</th>
                                        <th style={{ padding: '8px' }}>Percentage / CGPA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid #ddd' }}>
                                        <td style={{ padding: '8px' }}>{viewingAdmission.highestQualification}</td>
                                        <td style={{ padding: '8px' }}>{viewingAdmission.board}</td>
                                        <td style={{ padding: '8px' }}>{viewingAdmission.passingYear}</td>
                                        <td style={{ padding: '8px' }}>{viewingAdmission.percentage}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {viewingAdmission.files && Object.keys(viewingAdmission.files).length > 0 && (
                            <div style={{ marginBottom: '20px' }}>
                                <h3 style={{ color: '#b8933b', marginBottom: '10px' }}>Uploaded Documents</h3>
                                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                                    {Object.entries(viewingAdmission.files).map(([type, fileMeta]) => (
                                        <button 
                                            key={type} 
                                            onClick={() => handleViewDocument(fileMeta.key, fileMeta.name, fileMeta.type)}
                                            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 15px', border: '1px solid #ccc', borderRadius: '6px', background: '#fff', cursor: 'pointer' }}
                                        >
                                            <FiDownload /> Download {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                            <button className="primary-btn" onClick={() => setViewingAdmission(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

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
                                        ref={datesheetFileRef}
                                        type="file" 
                                        accept="application/pdf"
                                        onChange={e => setDatesheetFile(e.target.files[0])}
                                        style={{ display: 'none' }}
                                    />
                                    <button 
                                        type="button"
                                        className={`custom-file-btn ${datesheetFile ? 'has-file' : ''}`}
                                        onClick={() => datesheetFileRef.current?.click()}
                                    >
                                        {datesheetFile ? (
                                            <><FiCheckCircle className="file-icon selected" /> <span className="file-name">{datesheetFile.name}</span></>
                                        ) : (
                                            <><FiUploadCloud className="file-icon" /> <span>Choose PDF file...</span></>
                                        )}
                                    </button>
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
                <h1>News & Events Management</h1>
                <button className="primary-btn" onClick={() => setShowAddForm(!showAddForm)}>
                    <FiPlus /> {showAddForm ? 'Cancel' : 'Add New'}
                </button>
            </div>

            {showAddForm && (
                <div className="admin-form-container">
                    <form onSubmit={handleAddNotification}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Title</label>
                                <input 
                                    type="text" 
                                    value={newNotification.title} 
                                    onChange={e => setNewNotification({...newNotification, title: e.target.value})} 
                                    placeholder="e.g. Annual Sports Meet 2026" 
                                    required 
                                />
                            </div>
                            <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', gridColumn: 'span 2' }}>
                                <div className="form-group">
                                    <label>Upload PDF Document</label>
                                    <input 
                                        ref={notificationFileRef}
                                        type="file" 
                                        accept="application/pdf"
                                        onChange={e => setNotificationFile(e.target.files[0])}
                                        style={{ display: 'none' }}
                                    />
                                    <button 
                                        type="button"
                                        className={`custom-file-btn ${notificationFile ? 'has-file' : ''}`}
                                        onClick={() => notificationFileRef.current?.click()}
                                    >
                                        {notificationFile ? (
                                            <><FiCheckCircle className="file-icon selected" /> <span className="file-name">{notificationFile.name}</span></>
                                        ) : (
                                            <><FiUploadCloud className="file-icon" /> <span>Choose PDF file...</span></>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="urgent-toggle-row" style={{ gridColumn: 'span 2' }}>
                                <div className="form-group">
                                    <label>Type</label>
                                    <select 
                                        value={newNotification.type} 
                                        onChange={e => setNewNotification({...newNotification, type: e.target.value})}
                                        style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd', width: '100%' }}
                                    >
                                        <option value="event">Event (Shows in Events column)</option>
                                        <option value="important">Important Notification</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="primary-btn" style={{ marginTop: '1rem' }}>Publish</button>
                    </form>
                </div>
            )}

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Publish Date</th>
                            <th style={{ width: '100px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notifications.length > 0 ? notifications.map(not => (
                            <tr key={not.id}>
                                <td>{not.title}</td>
                                <td>
                                    {not.type === 'important' ? (
                                        <span style={{ background: '#fef2f2', color: '#dc2626', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700' }}>IMPORTANT</span>
                                    ) : not.type === 'event' ? (
                                        <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600' }}>EVENT</span>
                                    ) : (
                                        <span style={{ background: '#f8fafc', color: '#64748b', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600' }}>STANDARD</span>
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
                                    ref={qpFileRef}
                                    type="file" 
                                    accept="application/pdf"
                                    onChange={e => setQpFile(e.target.files[0])}
                                    style={{ display: 'none' }}
                                />
                                <button 
                                    type="button"
                                    className={`custom-file-btn ${qpFile ? 'has-file' : ''}`}
                                    onClick={() => qpFileRef.current?.click()}
                                >
                                    {qpFile ? (
                                        <><FiCheckCircle className="file-icon selected" /> <span className="file-name">{qpFile.name}</span></>
                                    ) : (
                                        <><FiUploadCloud className="file-icon" /> <span>Choose PDF file...</span></>
                                    )}
                                </button>
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
                        <button className={`admin-nav-btn ${activeTab === TABS.ONLINE_ADMISSIONS ? 'active' : ''}`} onClick={() => switchTab(TABS.ONLINE_ADMISSIONS)}><FiUsers /> Admissions</button>
                        <button className="admin-nav-btn" style={{ color: '#ef4444', marginTop: '4rem' }} onClick={handleLogout}><FiLogOut /> Logout</button>
                    </nav>
                </aside>

                <main className="admin-main-content">
                    {activeTab === TABS.DATESHEETS && renderDatesheetsTab()}
                    {activeTab === TABS.NOTIFICATIONS && renderNotificationsTab()}
                    {activeTab === TABS.QUESTION_PAPERS && renderQuestionPapersTab()}
                    {activeTab === TABS.ONLINE_ADMISSIONS && renderOnlineAdmissionsTab()}
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
