import { useEffect, useState } from 'react'
import '../styles/dashboard-starfield.css'
import '../styles/dashboard-dark-theme.css'
import { useNavigate } from 'react-router-dom'
import {
    FiUser, FiBook, FiClock, FiLogOut, FiTrendingUp,
    FiChevronRight, FiCalendar, FiAlertCircle, FiAward,
    FiFileText, FiCheckCircle, FiList
} from 'react-icons/fi'
import SEO from '../components/SEO'

import { fetchSubjects, fetchExams, fetchAttendance, fetchSyllabus } from '../lib/supabase'

const MaintenanceView = ({ title, message }) => (
    <div className="maintenance-view" style={{ 
        textAlign: 'center', 
        padding: '40px 20px', 
        background: 'rgba(255,255,255,0.03)', 
        borderRadius: '16px', 
        border: '1px dashed rgba(255,255,255,0.1)' 
    }}>
        <FiAlertCircle size={48} style={{ color: 'var(--accent)', marginBottom: '16px', opacity: 0.5 }} />
        <h3 style={{ color: '#fff', marginBottom: '8px' }}>{title || 'Module Under Construction'}</h3>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
            {message || 'Our administrators are currently updating this module. Please check back later.'}
        </p>
    </div>
);

const VIEWS = {
    OVERVIEW: 'overview',
    SYLLABUS: 'syllabus',
    EXAMS: 'exams',
}

export default function Dashboard() {
    const [user, setUser] = useState(null)
    const [activeView, setActiveView] = useState(VIEWS.OVERVIEW)
    const [activeSubject, setActiveSubject] = useState(null)
    const [syllabus, setSyllabus] = useState([])
    const [exams, setExams] = useState([])
    const [attendance, setAttendance] = useState([])
    const [loading, setLoading] = useState(true)
    const [unitData, setUnitData] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const authData = localStorage.getItem('student_auth')
        if (!authData) {
            navigate('/student-portal')
        } else {
            const student = JSON.parse(authData)
            setUser(student)
            loadStudentData(student)
        }
    }, [navigate])

    const loadStudentData = async (student) => {
        try {
            setLoading(true)
            // Fetch subjects for this dept and semester
            const subjectsData = await fetchSubjects(student.department_id, student.semester)
            setSyllabus(subjectsData)

            // Fetch exams
            const examsData = await fetchExams()
            // Filter exams for student's subjects
            const studentSubjectIds = subjectsData.map(s => s.id)
            const filteredExams = examsData.filter(e => studentSubjectIds.includes(e.subject_id))
            setExams(filteredExams)

            // Fetch attendance
            const attData = await fetchAttendance(student.rollNo)
            setAttendance(attData)

        } catch (error) {
            console.error('Error loading dashboard data:', error)
        } finally {
            setLoading(false)
        }
    }

    const calculateAttendance = () => {
        if (!attendance || attendance.length === 0) return 0
        const totalWorking = attendance.reduce((acc, curr) => acc + (curr.total_working_days || 0), 0);
        const totalAttended = attendance.reduce((acc, curr) => acc + (curr.days_attended || 0), 0);
        if (totalWorking === 0) return 0;
        return Math.round((totalAttended / totalWorking) * 100);
    }

    const handleLogout = () => {
        localStorage.removeItem('student_auth')
        navigate('/')
    }

    const toggleSubject = async (subjectId) => {
        if (activeSubject === subjectId) {
            setActiveSubject(null);
            return;
        }
        
        setActiveSubject(subjectId);
        
        // Fetch syllabus units if not already loaded
        if (!unitData[subjectId]) {
            try {
                const data = await fetchSyllabus(subjectId);
                setUnitData(prev => ({ ...prev, [subjectId]: data }));
            } catch (error) {
                console.error('Error fetching syllabus:', error);
            }
        }
    }

    if (!user) return null

    return (
        <div className="dashboard-page">
            <SEO title="Dashboard" description="View your academic progress, syllabus, and exam schedule." />
            {/* CSS Starfield Background */}
            <div className="dashboard-starfield">
                <div id="dashboard-stars"></div>
                <div id="dashboard-stars2"></div>
                <div id="dashboard-stars3"></div>
            </div>
            <div className="container">

                {/* Dashboard Grid */}
                <div className="dashboard-grid">
                    {/* Left: Profile Card */}
                    <div className="profile-card glass-card">
                        <div className="profile-img">
                            <FiUser size={40} />
                        </div>
                        <h3>{user.name}</h3>
                        <p className="roll-no">{user.rollNo}</p>
                        <hr />
                        <div className="profile-info">
                            <div className="info-item">
                                <span className="label">Department</span>
                                <span className="value">{user.dept}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Year</span>
                                <span className="value">{user.year || 1}{user.year === 1 ? 'st' : user.year === 2 ? 'nd' : user.year === 3 ? 'rd' : 'th'} Year</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Attendance</span>
                                <span className="value">{calculateAttendance()}%</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Semester</span>
                                <span className="value">{user.semester || 1}{user.semester === 1 ? 'st' : user.semester === 2 ? 'nd' : 'rd'} Sem</span>
                            </div>
                        </div>

                        {/* Desktop-only nav (hidden on mobile) */}
                        <hr className="desktop-only-hr" />
                        <div className="desktop-nav-links">
                            <button
                                className={`view-link${activeView === VIEWS.OVERVIEW ? ' active-link' : ''}`}
                                onClick={() => setActiveView(VIEWS.OVERVIEW)}
                                style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8 }}
                            >
                                <FiList size={14} /> Overview
                            </button>
                            <button
                                className={`view-link${activeView === VIEWS.SYLLABUS ? ' active-link' : ''}`}
                                onClick={() => { setActiveView(VIEWS.SYLLABUS); setActiveSubject(null) }}
                                style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8 }}
                            >
                                <FiBook size={14} /> Syllabus Explorer
                            </button>
                            <button
                                className={`view-link${activeView === VIEWS.EXAMS ? ' active-link' : ''}`}
                                onClick={() => setActiveView(VIEWS.EXAMS)}
                                style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8 }}
                            >
                                <FiCalendar size={14} /> Exam Schedule
                            </button>
                        </div>
                    </div>

                    {/* Mobile-only floating nav tabs (below hero card) */}
                    <div className="mobile-nav-tabs">
                        <button
                            className={`mobile-tab-btn${activeView === VIEWS.OVERVIEW ? ' active' : ''}`}
                            onClick={() => setActiveView(VIEWS.OVERVIEW)}
                        >
                            <FiList size={16} />
                            <span>Overview</span>
                        </button>
                        <button
                            className={`mobile-tab-btn${activeView === VIEWS.SYLLABUS ? ' active' : ''}`}
                            onClick={() => { setActiveView(VIEWS.SYLLABUS); setActiveSubject(null) }}
                        >
                            <FiBook size={16} />
                            <span>Syllabus</span>
                        </button>
                        <button
                            className={`mobile-tab-btn${activeView === VIEWS.EXAMS ? ' active' : ''}`}
                            onClick={() => setActiveView(VIEWS.EXAMS)}
                        >
                            <FiCalendar size={16} />
                            <span>Exams</span>
                        </button>
                    </div>

                    {/* Right: Main Content Area */}
                    <div className="content-area glass-card">

                        {/* ---- OVERVIEW ---- */}
                        {activeView === VIEWS.OVERVIEW && (
                            <>
                                <div className="section-title-row">
                                    <h3><FiCalendar style={{ marginRight: 10 }} />Upcoming Examinations</h3>
                                    <button className="view-link" onClick={() => setActiveView(VIEWS.EXAMS)}>
                                        View All →
                                    </button>
                                </div>
                                <div className="exam-list">
                                    {exams.length > 0 ? (
                                        exams.slice(0, 2).map((exam, i) => (
                                            <div className="exam-item" key={i}>
                                                <div className="exam-date">
                                                    {new Date(exam.exam_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}
                                                </div>
                                                <div className="exam-info">
                                                    <h4>{exam.subjects?.subject_name}</h4>
                                                    <p>Time: {exam.start_time} &bull; Venue: {exam.venue} &bull; <strong>{exam.subjects?.subject_code}</strong></p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <MaintenanceView 
                                            title="No Upcoming Exams" 
                                            message="Exam schedules for this semester haven't been published yet." 
                                        />
                                    )}
                                </div>

                                <div className="section-title-row" style={{ marginTop: 40 }}>
                                    <h3><FiFileText style={{ marginRight: 10 }} />Recent Assignments</h3>
                                    <button className="view-link" onClick={() => { setActiveView(VIEWS.SYLLABUS) }}>
                                        All Courses →
                                    </button>
                                </div>
                                <div className="assignment-grid">
                                    <MaintenanceView 
                                        title="Assignments Module" 
                                        message="Assignment tracking and submission portal is under maintenance." 
                                    />
                                </div>

                                <div className="section-title-row" style={{ marginTop: 40 }}>
                                    <h3><FiAward style={{ marginRight: 10 }} />Academic Summary</h3>
                                </div>
                                <div className="assignment-grid">
                                    <div className="mini-assign-card">
                                        <div className="assign-header">
                                            <span className="assign-title">Total Credits Enrolled</span>
                                        </div>
                                        <div className="deadline"><FiCheckCircle size={12} /> 19 credits this semester</div>
                                    </div>
                                    <div className="mini-assign-card">
                                        <div className="assign-header">
                                            <span className="assign-title">Assignments Submitted</span>
                                        </div>
                                        <div className="deadline"><FiCheckCircle size={12} /> 7 of 14 completed</div>
                                    </div>
                                    <div className="mini-assign-card">
                                        <div className="assign-header">
                                            <span className="assign-title">Best Performing Subject</span>
                                        </div>
                                        <div className="deadline"><FiAward size={12} /> OOP — 92% marks</div>
                                    </div>
                                    <div className="mini-assign-card">
                                        <div className="assign-header">
                                            <span className="assign-title">Attendance Status</span>
                                        </div>
                                        <div className="deadline"><FiClock size={12} /> {calculateAttendance()}% — {calculateAttendance() >= 75 ? 'Above' : 'Below'} threshold</div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* ---- SYLLABUS EXPLORER ---- */}
                        {activeView === VIEWS.SYLLABUS && (
                            <div className="syllabus-explorer">
                                <div className="section-title-row">
                                    <h3><FiBook style={{ marginRight: 10 }} />Syllabus Explorer</h3>
                                    <span style={{ fontSize: '0.82rem', color: 'var(--dark-gray)' }}>Click a subject to expand</span>
                                </div>
                                <div className="syllabus-header-info">
                                    <h4>Semester {user.semester} — {user.dept}</h4>
                                    <p>{syllabus.length} subjects &bull; Academic Year 2025–26</p>
                                </div>
                                <div className="subject-list">
                                    {syllabus.length > 0 ? (
                                        syllabus.map(subj => (
                                            <div
                                                key={subj.id}
                                                className={`subject-item${activeSubject === subj.id ? ' active' : ''}`}
                                            >
                                                <div
                                                    className="subject-summary"
                                                    onClick={() => toggleSubject(subj.id)}
                                                >
                                                    <div className="subj-icon-box"><FiBook size={16} /></div>
                                                    <div className="subj-title-box">
                                                        <span className="subj-code">{subj.subject_code} &bull; {subj.is_practical ? 'Practical' : 'Theory'}</span>
                                                        <span className="subj-name">{subj.subject_name}</span>
                                                    </div>
                                                    <FiChevronRight className="chevron" size={18} />
                                                </div>

                                                {activeSubject === subj.id && (
                                                    <div className="subject-details">
                                                        {unitData[subj.id] && unitData[subj.id].length > 0 ? (
                                                            unitData[subj.id].map((unit, idx) => (
                                                                <div key={idx} className="topics-section" style={{ marginBottom: '20px' }}>
                                                                    <h5><FiList size={13} /> Unit {unit.unit_no}: {unit.title}</h5>
                                                                    <ul style={{ gridTemplateColumns: '1fr' }}>
                                                                        {Array.isArray(unit.topics) && unit.topics.map((t, i) => (
                                                                            <li key={i}>{t}</li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <MaintenanceView 
                                                                title="Syllabus Details Unavailable" 
                                                                message="Unit-wise syllabus and topics are currently being updated for this course." 
                                                            />
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <MaintenanceView 
                                            title="No Course Data" 
                                            message="Your course subjects haven't been mapped in the portal yet." 
                                        />
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ---- EXAM SCHEDULE ---- */}
                        {activeView === VIEWS.EXAMS && (
                            <>
                                <div className="section-title-row">
                                    <h3><FiCalendar style={{ marginRight: 10 }} />Full Exam Schedule</h3>
                                    <span style={{ fontSize: '0.82rem', color: 'var(--dark-gray)' }}>Semester 2 — 2025–26</span>
                                </div>
                                <div className="syllabus-header-info">
                                    <h4>End Semester Examinations</h4>
                                    <p>{exams.length} exams scheduled &bull; Refer to hall ticket for latest updates</p>
                                </div>
                                <div className="exam-list" style={{ flexDirection: 'column' }}>
                                    {exams.length > 0 ? (
                                        exams.map((exam, i) => (
                                            <div className="exam-item" key={i} style={{ width: '100%', maxWidth: '100%' }}>
                                                <div className="exam-date">
                                                    {new Date(exam.exam_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}
                                                </div>
                                                <div className="exam-info" style={{ flex: 1 }}>
                                                    <h4>{exam.subjects?.subject_name}</h4>
                                                    <p>
                                                        Time: <strong>{exam.start_time}</strong> &bull;&nbsp;
                                                        Venue: <strong>{exam.venue}</strong> &bull;&nbsp;
                                                        Code: <strong>{exam.subjects?.subject_code}</strong>
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <MaintenanceView 
                                            title="Schedules Unavailable" 
                                            message="There are no upcoming examinations scheduled in the portal for your semester." 
                                        />
                                    )}
                                </div>
                                <div style={{
                                    marginTop: 28, padding: '16px 20px',
                                    background: 'rgba(200,169,81,0.08)',
                                    borderRadius: 12, border: '1px dashed rgba(200,169,81,0.3)',
                                    fontSize: '0.85rem', color: 'var(--dark-gray)'
                                }}>
                                    <FiAlertCircle size={14} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                                    Bring your college ID card and hall ticket to the examination hall. Report 30 minutes before the exam.
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
