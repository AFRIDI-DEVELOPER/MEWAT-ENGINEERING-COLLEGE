import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiCalendar, FiClock, FiSearch, FiFileText, FiDownload, FiInfo, FiBookOpen } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'
import { getFile } from '../utils/db'
import '../styles/dashboard-starfield.css'

// Valid 1-page blank PDF bytes
const MOCK_PDF_BYTES = new Uint8Array([
    37, 80, 68, 70, 45, 49, 46, 52, 10, 49, 32, 48, 32, 111, 98, 106, 10, 60, 60, 47, 84, 121, 112, 101, 47, 67, 97, 116, 97, 108, 111, 103, 47, 80, 97, 103, 101, 115, 32, 50, 32, 48, 32, 82, 62, 62, 10, 101, 110, 100, 111, 98, 106, 10, 52, 32, 48, 32, 111, 98, 106, 10, 60, 60, 47, 84, 121, 112, 101, 47, 80, 97, 103, 101, 115, 47, 75, 105, 100, 115, 91, 51, 32, 48, 32, 82, 93, 47, 67, 111, 117, 110, 116, 32, 49, 62, 62, 10, 101, 110, 100, 111, 98, 106, 10, 51, 32, 48, 32, 111, 98, 106, 10, 60, 60, 47, 84, 121, 112, 101, 47, 80, 97, 103, 101, 47, 80, 97, 114, 101, 110, 116, 32, 50, 32, 48, 32, 82, 47, 77, 101, 100, 105, 97, 66, 111, 120, 91, 48, 32, 48, 32, 54, 49, 50, 32, 55, 57, 50, 93, 62, 62, 10, 101, 110, 100, 111, 98, 106, 10, 120, 114, 101, 102, 10, 48, 32, 52, 10, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 32, 54, 53, 53, 51, 53, 32, 102, 10, 48, 48, 48, 48, 48, 48, 48, 48, 49, 53, 32, 48, 48, 48, 48, 48, 32, 110, 10, 48, 48, 48, 48, 48, 48, 48, 48, 55, 52, 32, 48, 48, 48, 48, 48, 32, 110, 10, 48, 48, 48, 48, 48, 48, 48, 49, 52, 52, 32, 48, 48, 48, 48, 48, 32, 110, 10, 116, 114, 97, 105, 108, 101, 114, 10, 60, 60, 47, 83, 105, 122, 101, 32, 53, 47, 82, 111, 111, 116, 32, 49, 32, 48, 32, 82, 62, 62, 10, 115, 116, 97, 114, 116, 120, 114, 101, 102, 10, 50, 50, 52, 10, 37, 37, 69, 79, 70
]);

// Fallback Mock Data
const DEFAULT_DATESHEETS = [
    { id: 'ds1', title: 'B.Tech End Semester Theory Examination Datesheet (Regular/Re-appear) - Dec 2025', date: '05 Dec 2025', size: '240 KB', department: 'All B.Tech' },
    { id: 'ds2', title: 'B.Tech Regular & Re-appear Practical/Viva-Voce Examination Schedule - Nov 2025', date: '28 Nov 2025', size: '180 KB', department: 'All B.Tech' },
    { id: 'ds3', title: 'Diploma in Engineering Semester Examination Datesheet - Dec 2025', date: '02 Dec 2025', size: '215 KB', department: 'Diploma' },
    { id: 'ds4', title: 'B.Tech Special Mercy Chance Examination Schedule - Jan 2026', date: '20 Dec 2025', size: '145 KB', department: 'All B.Tech' }
]

const DEFAULT_NOTIFICATIONS = [
    { id: 'not1', title: 'Instructions to Candidates for End Semester Written Examinations', date: '10 Dec 2025', urgent: true, refNo: 'MEC/EXAM/2025/112' },
    { id: 'not2', title: 'Online Submission of Regular/Re-appear Examination Forms - June 2026 Cycle', date: '12 May 2026', urgent: true, refNo: 'MEC/EXAM/2026/045' },
    { id: 'not3', title: 'Application Form for Re-evaluation & Photocopy of Evaluated Answer Scripts', date: '18 Jul 2025', urgent: false, refNo: 'MEC/EXAM/REVAL/98' },
    { id: 'not4', title: 'Corrigendum: Revision in Friday Examination Session Timings (Afternoon Shift)', date: '08 Dec 2025', urgent: false, refNo: 'MEC/EXAM/2025/118' }
]

const DEFAULT_QUESTION_PAPERS = [
    { id: 'qp1', title: 'Data Structures (CSE-201) - B.Tech CSE (3rd Sem) - Dec 2024', subject: 'Data Structures', code: 'CSE-201', dept: 'CSE', sem: '3rd', year: '2024' },
    { id: 'qp2', title: 'Thermodynamics (ME-203) - B.Tech ME (3rd Sem) - Dec 2024', subject: 'Thermodynamics', code: 'ME-203', dept: 'ME', sem: '3rd', year: '2024' },
    { id: 'qp3', title: 'Fluid Mechanics (CE-205) - B.Tech CE (3rd Sem) - Dec 2024', subject: 'Fluid Mechanics', code: 'CE-205', dept: 'CE', sem: '3rd', year: '2024' },
    { id: 'qp4', title: 'Analog Electronics (ECE-202) - B.Tech ECE (4th Sem) - May 2025', subject: 'Analog Electronics', code: 'ECE-202', dept: 'ECE', sem: '4th', year: '2025' },
    { id: 'qp5', title: 'Engineering Physics (AS-101) - B.Tech (1st Sem) - Dec 2024', subject: 'Engineering Physics', code: 'AS-101', dept: 'Applied Sciences', sem: '1st', year: '2024' },
    { id: 'qp6', title: 'Database Management Systems (CSE-301) - B.Tech CSE (5th Sem) - Dec 2024', subject: 'DBMS', code: 'CSE-301', dept: 'CSE', sem: '5th', year: '2024' },
    { id: 'qp7', title: 'Power Systems (EE-302) - B.Tech EE (6th Sem) - May 2025', subject: 'Power Systems', code: 'EE-302', dept: 'EE', sem: '6th', year: '2025' }
]

export default function ExaminationCell() {
    const [activeTab, setActiveTab] = useState('datesheet')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedDept, setSelectedDept] = useState('All')

    const [datesheets, setDatesheets] = useState([])
    const [notifications, setNotifications] = useState([])
    const [questionPapers, setQuestionPapers] = useState([])

    // Load data from localStorage on mount
    useEffect(() => {
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
    }, [])

    const handleDownload = async (item) => {
        let fileBlob = null;
        if (item.hasFile) {
            fileBlob = await getFile('file_' + item.id);
        }
        
        if (!fileBlob) {
            // Fallback for default mock items: use mock PDF
            fileBlob = new Blob([MOCK_PDF_BYTES], { type: 'application/pdf' });
        }

        const url = URL.createObjectURL(fileBlob);
        const a = document.createElement('a');
        a.href = url;
        const safeTitle = (item.title || item.subject || 'document').replace(/[^a-z0-9]/gi, '_').toLowerCase();
        a.download = `${safeTitle}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Filter Question papers by department
    const filteredQuestionPapers = questionPapers.filter(qp => {
        const matchesSearch = qp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              qp.code.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesDept = selectedDept === 'All' || qp.dept === selectedDept
        return matchesSearch && matchesDept
    })

    const filteredDatesheets = datesheets.filter(ds => 
        ds.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const filteredNotifications = notifications.filter(not => 
        not.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (not.refNo && not.refNo.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    return (
        <div className="exam-cell-page" style={{ background: '#0a0d14', minHeight: '100vh', color: '#fff', padding: '120px 0 60px', position: 'relative' }}>
            <SEO title="Examination Cell" description="Access B.Tech and Diploma datesheets, examination notifications, and previous year question papers." />
            
            {/* Background Starfield */}
            <div className="dashboard-starfield" style={{ opacity: 0.5 }}>
                <div id="dashboard-stars"></div>
                <div id="dashboard-stars2"></div>
                <div id="dashboard-stars3"></div>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--gold)', textDecoration: 'none', marginBottom: '24px', fontSize: '0.9rem', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateX(-4px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}>
                    <FiArrowLeft /> Back to Home
                </Link>

                <div style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(200, 169, 81, 0.1)', border: '1px solid rgba(200, 169, 81, 0.25)', borderRadius: '100px', padding: '6px 16px', color: 'var(--gold-light)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
                        <FiInfo size={14} /> Academic Administration
                    </div>
                    <h1 style={{ fontFamily: "'Kanit', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #fff 30%, #c9a84c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Examination Cell
                    </h1>
                    <p style={{ color: 'rgba(255, 255, 255, 0.65)', maxWidth: '650px', fontSize: '1.05rem', lineHeight: 1.6 }}>
                        Access all official schedules, important notifications, guidelines, and archive materials of Mewat Engineering College examinations.
                    </p>
                </div>

                {/* Tabs & Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', pb: '20px', marginBottom: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <button 
                                onClick={() => { setActiveTab('datesheet'); setSearchQuery(''); }}
                                style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: activeTab === 'datesheet' ? 'var(--gold)' : 'transparent', color: activeTab === 'datesheet' ? '#000' : 'rgba(255,255,255,0.7)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s' }}
                            >
                                Datesheet
                            </button>
                            <button 
                                onClick={() => { setActiveTab('notification'); setSearchQuery(''); }}
                                style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: activeTab === 'notification' ? 'var(--gold)' : 'transparent', color: activeTab === 'notification' ? '#000' : 'rgba(255,255,255,0.7)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s' }}
                            >
                                Exam Notifications
                            </button>
                            <button 
                                onClick={() => { setActiveTab('questionpaper'); setSearchQuery(''); }}
                                style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: activeTab === 'questionpaper' ? 'var(--gold)' : 'transparent', color: activeTab === 'questionpaper' ? '#000' : 'rgba(255,255,255,0.7)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s' }}
                            >
                                Exam Question Papers
                            </button>
                        </div>

                        {/* Search Bar */}
                        <div className="search-box" style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
                            <FiSearch style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                            <input 
                                type="text" 
                                placeholder={activeTab === 'datesheet' ? 'Search datesheets...' : activeTab === 'notification' ? 'Search notifications...' : 'Search question papers...'} 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ width: '100%', padding: '12px 16px 12px 46px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', color: '#fff', outline: 'none', transition: 'border-color 0.3s' }}
                                onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                            />
                        </div>
                    </div>

                    {/* Department filter for Question papers */}
                    {activeTab === 'questionpaper' && (
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
                            {['All', 'CSE', 'ME', 'CE', 'ECE', 'EE', 'Applied Sciences'].map(d => (
                                <button
                                    key={d}
                                    onClick={() => setSelectedDept(d)}
                                    style={{
                                        padding: '6px 14px',
                                        borderRadius: '100px',
                                        border: '1px solid',
                                        borderColor: selectedDept === d ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
                                        background: selectedDept === d ? 'rgba(200, 169, 81, 0.15)' : 'transparent',
                                        color: selectedDept === d ? 'var(--gold)' : 'rgba(255,255,255,0.6)',
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Content Grid */}
                <div style={{ minHeight: '350px' }}>
                    <AnimatePresence mode="wait">
                        {/* ── DATESHEETS ── */}
                        {activeTab === 'datesheet' && (
                            <motion.div
                                key="datesheet"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3 }}
                                style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}
                            >
                                {filteredDatesheets.length > 0 ? (
                                    filteredDatesheets.map((ds) => (
                                        <div key={ds.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)', backdropFilter: 'blur(10px)', flexWrap: 'wrap', gap: '20px' }}>
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1 }}>
                                                <div style={{ background: 'rgba(200,169,81,0.1)', color: 'var(--gold-light)', padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <FiCalendar size={22} />
                                                </div>
                                                <div>
                                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '8px', lineHeight: 1.4 }}>{ds.title}</h3>
                                                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}>
                                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><FiClock size={12} /> Published: {ds.date}</span>
                                                        <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', color: '#fff', fontWeight: 500 }}>{ds.department}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>PDF ({ds.size})</span>
                                                <button onClick={() => handleDownload(ds)} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', background: 'rgba(200, 169, 81, 0.1)', border: '1px solid rgba(200, 169, 81, 0.25)', borderRadius: '10px', color: 'var(--gold)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = '#000'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(200, 169, 81, 0.1)'; e.currentTarget.style.color = 'var(--gold)'; }}>
                                                    <FiDownload size={14} /> Download
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '60px 20px', color: 'rgba(255,255,255,0.4)' }}>No Datesheets found matching your query.</div>
                                )}
                            </motion.div>
                        )}

                        {/* ── NOTIFICATIONS ── */}
                        {activeTab === 'notification' && (
                            <motion.div
                                key="notification"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3 }}
                                style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}
                            >
                                {filteredNotifications.length > 0 ? (
                                    filteredNotifications.map((not) => (
                                        <div key={not.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)', backdropFilter: 'blur(10px)', flexWrap: 'wrap', gap: '20px' }}>
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1 }}>
                                                <div style={{ background: not.urgent ? 'rgba(255, 71, 87, 0.1)' : 'rgba(255,255,255,0.03)', color: not.urgent ? '#FF4757' : 'rgba(255,255,255,0.6)', padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <FiFileText size={22} />
                                                </div>
                                                <div>
                                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap' }}>
                                                        {not.urgent && <span style={{ background: '#FF4757', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Urgent</span>}
                                                        <span style={{ fontSize: '0.75rem', color: 'var(--gold-light)', fontWeight: 500 }}>Ref: {not.refNo}</span>
                                                    </div>
                                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '8px', lineHeight: 1.4 }}>{not.title}</h3>
                                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}><FiClock size={12} /> Issued on: {not.date}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <button onClick={() => handleDownload(not)} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff'; }}>
                                                    View Document
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ textAAalign: 'center', padding: '60px 20px', color: 'rgba(255,255,255,0.4)' }}>No notifications found matching your query.</div>
                                )}
                            </motion.div>
                        )}

                        {/* ── QUESTION PAPERS ── */}
                        {activeTab === 'questionpaper' && (
                            <motion.div
                                key="questionpaper"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3 }}
                                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}
                            >
                                {filteredQuestionPapers.length > 0 ? (
                                    filteredQuestionPapers.map((qp) => (
                                        <div key={qp.id} className="glass-card" style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', transition: 'transform 0.3s, border-color 0.3s' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(200, 169, 81, 0.3)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}>
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                                                    <span style={{ background: 'rgba(200,169,81,0.1)', color: 'var(--gold-light)', fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px', borderRadius: '6px' }}>{qp.dept}</span>
                                                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>Sem: {qp.sem}</span>
                                                </div>
                                                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#fff', marginBottom: '8px', lineHeight: 1.4, height: '48px', overflow: 'hidden' }}>{qp.subject}</h3>
                                                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', marginBottom: '20px' }}>
                                                    Code: <strong style={{ color: 'rgba(255,255,255,0.7)' }}>{qp.code}</strong> • Session: {qp.year}
                                                </p>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}><FiBookOpen size={14} /> Past Paper</span>
                                                <button onClick={() => handleDownload(qp)} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--gold)', background: 'none', border: 'none', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'var(--gold)'}>
                                                    Download PDF <FiDownload size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', color: 'rgba(255,255,255,0.4)' }}>No question papers found matching your query.</div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
