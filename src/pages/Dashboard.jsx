import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    FiUser, FiBook, FiClock, FiLogOut, FiTrendingUp,
    FiChevronRight, FiCalendar, FiAlertCircle, FiAward,
    FiFileText, FiCheckCircle, FiList
} from 'react-icons/fi'

const syllabusData = [
    {
        code: 'CS-201',
        name: 'Data Structures & Algorithms',
        credits: 4,
        faculty: 'Dr. Rajan Sharma',
        type: 'Core',
        topics: [
            'Arrays & Linked Lists', 'Stacks & Queues', 'Trees & Graphs',
            'Sorting Algorithms', 'Hashing & Heaps', 'Dynamic Programming',
            'Greedy Algorithms', 'Backtracking'
        ],
        assignments: [
            { title: 'Implement AVL Tree', deadline: '18 Apr', status: 'submitted' },
            { title: 'Graph BFS/DFS', deadline: '25 Apr', status: 'pending' },
            { title: 'Sorting Comparison', deadline: '10 Apr', status: 'evaluated' },
            { title: 'DP Problems Set', deadline: '30 Apr', status: 'in-progress' },
        ]
    },
    {
        code: 'MA-201',
        name: 'Discrete Mathematics',
        credits: 3,
        faculty: 'Prof. A. K. Singh',
        type: 'Core',
        topics: [
            'Set Theory', 'Relations & Functions', 'Graph Theory',
            'Combinatorics', 'Logic & Proofs', 'Boolean Algebra'
        ],
        assignments: [
            { title: 'Proof Techniques', deadline: '20 Apr', status: 'completed' },
            { title: 'Graph Coloring', deadline: '28 Apr', status: 'pending' },
            { title: 'Combinatorics Problems', deadline: '12 Apr', status: 'evaluated' },
        ]
    },
    {
        code: 'CS-203',
        name: 'Object Oriented Programming',
        credits: 4,
        faculty: 'Dr. Priya Mehta',
        type: 'Core',
        topics: [
            'Classes & Objects', 'Inheritance', 'Polymorphism',
            'Encapsulation', 'Abstraction', 'Design Patterns',
            'Exception Handling', 'File I/O'
        ],
        assignments: [
            { title: 'Design Pattern Demo', deadline: '22 Apr', status: 'in-progress' },
            { title: 'Inheritance Exercise', deadline: '5 Apr', status: 'evaluated' },
            { title: 'Mini Project', deadline: '5 May', status: 'pending' },
        ]
    },
    {
        code: 'EC-201',
        name: 'Digital Electronics',
        credits: 3,
        faculty: 'Prof. M. R. Khan',
        type: 'Elective',
        topics: [
            'Logic Gates', 'Combinational Circuits', 'Sequential Circuits',
            'Flip-Flops', 'Counters', 'Shift Registers'
        ],
        assignments: [
            { title: 'Logic Circuit Design', deadline: '19 Apr', status: 'submitted' },
            { title: 'Sequential Circuits Lab', deadline: '26 Apr', status: 'pending' },
        ]
    },
    {
        code: 'CS-205',
        name: 'Computer Organization',
        credits: 3,
        faculty: 'Dr. S. Kapoor',
        type: 'Core',
        topics: [
            'Number Systems', 'ALU Design', 'Memory Organization',
            'I/O Interface', 'Instruction Set Architecture', 'Pipelining'
        ],
        assignments: [
            { title: 'ALU Simulation', deadline: '21 Apr', status: 'completed' },
            { title: 'Memory Mapping', deadline: '29 Apr', status: 'pending' },
        ]
    },
    {
        code: 'HS-201',
        name: 'Professional Communication',
        credits: 2,
        faculty: 'Dr. Fatima Zaidi',
        type: 'Humanities',
        topics: [
            'Technical Writing', 'Presentation Skills', 'Email Etiquette',
            'Group Discussion', 'Interview Skills', 'Report Writing'
        ],
        assignments: [
            { title: 'Technical Report', deadline: '17 Apr', status: 'submitted' },
            { title: 'Mock Interview', deadline: '2 May', status: 'pending' },
        ]
    }
]

const examSchedule = [
    { date: 'APR 22', subject: 'Data Structures & Algorithms', time: '10:00 AM', venue: 'Hall A', code: 'CS-201' },
    { date: 'APR 25', subject: 'Discrete Mathematics', time: '02:00 PM', venue: 'Hall B', code: 'MA-201' },
    { date: 'APR 28', subject: 'Object Oriented Programming', time: '10:00 AM', venue: 'Hall A', code: 'CS-203' },
    { date: 'MAY 02', subject: 'Digital Electronics', time: '02:00 PM', venue: 'Hall C', code: 'EC-201' },
    { date: 'MAY 05', subject: 'Computer Organization', time: '10:00 AM', venue: 'Hall B', code: 'CS-205' },
]

const VIEWS = {
    OVERVIEW: 'overview',
    SYLLABUS: 'syllabus',
    EXAMS: 'exams',
}

export default function Dashboard() {
    const [user, setUser] = useState(null)
    const [activeView, setActiveView] = useState(VIEWS.OVERVIEW)
    const [activeSubject, setActiveSubject] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const authData = localStorage.getItem('student_auth')
        if (!authData) {
            navigate('/student-portal')
        } else {
            setUser(JSON.parse(authData))
        }
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('student_auth')
        navigate('/')
    }

    const toggleSubject = (code) => {
        setActiveSubject(prev => prev === code ? null : code)
    }

    if (!user) return null

    return (
        <div className="dashboard-page">
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
                                <span className="value">1st Year</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Attendance</span>
                                <span className="value">85%</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Semester</span>
                                <span className="value">2nd Sem</span>
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
                                    {examSchedule.slice(0, 2).map((exam, i) => (
                                        <div className="exam-item" key={i}>
                                            <div className="exam-date">{exam.date}</div>
                                            <div className="exam-info">
                                                <h4>{exam.subject}</h4>
                                                <p>Time: {exam.time} &bull; Venue: {exam.venue} &bull; <strong>{exam.code}</strong></p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="section-title-row" style={{ marginTop: 40 }}>
                                    <h3><FiFileText style={{ marginRight: 10 }} />Recent Assignments</h3>
                                    <button className="view-link" onClick={() => { setActiveView(VIEWS.SYLLABUS) }}>
                                        All Courses →
                                    </button>
                                </div>
                                <div className="assignment-grid">
                                    {syllabusData.slice(0, 4).flatMap(s => s.assignments.slice(0, 1)).map((a, i) => (
                                        <div className="mini-assign-card" key={i}>
                                            <div className="assign-header">
                                                <span className="assign-title">{a.title}</span>
                                                <span className={`status-badge ${a.status}`}>{a.status}</span>
                                            </div>
                                            <div className="deadline">
                                                <FiAlertCircle size={12} /> Deadline: {a.deadline}
                                            </div>
                                        </div>
                                    ))}
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
                                        <div className="deadline"><FiClock size={12} /> 85% — Above threshold</div>
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
                                    <h4>Semester 2 — Computer Science Engineering</h4>
                                    <p>6 subjects &bull; 19 credits total &bull; Academic Year 2025–26</p>
                                </div>
                                <div className="subject-list">
                                    {syllabusData.map(subj => (
                                        <div
                                            key={subj.code}
                                            className={`subject-item${activeSubject === subj.code ? ' active' : ''}`}
                                        >
                                            <div
                                                className="subject-summary"
                                                onClick={() => toggleSubject(subj.code)}
                                            >
                                                <div className="subj-icon-box"><FiBook size={16} /></div>
                                                <div className="subj-title-box">
                                                    <span className="subj-code">{subj.code} &bull; {subj.type}</span>
                                                    <span className="subj-name">{subj.name}</span>
                                                </div>
                                                <FiChevronRight className="chevron" size={18} />
                                            </div>

                                            {activeSubject === subj.code && (
                                                <div className="subject-details">
                                                    {/* Meta */}
                                                    <div className="subject-meta">
                                                        <div className="meta-tag credits">
                                                            <span className="label">Credits</span>
                                                            <span className="value">{subj.credits}</span>
                                                        </div>
                                                        <div className="meta-tag faculty">
                                                            <span className="label">Faculty</span>
                                                            <span className="value">{subj.faculty}</span>
                                                        </div>
                                                        <div className="meta-tag">
                                                            <span className="label">Type</span>
                                                            <span className="value">{subj.type}</span>
                                                        </div>
                                                    </div>

                                                    {/* Topics */}
                                                    <div className="topics-section">
                                                        <h5><FiList size={13} /> Topics Covered</h5>
                                                        <ul>
                                                            {subj.topics.map((t, i) => (
                                                                <li key={i}>{t}</li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Assignments */}
                                                    <div>
                                                        <h5><FiFileText size={13} /> Assignments</h5>
                                                        <div className="assignment-grid">
                                                            {subj.assignments.map((a, i) => (
                                                                <div className="mini-assign-card" key={i}>
                                                                    <div className="assign-header">
                                                                        <span className="assign-title">{a.title}</span>
                                                                        <span className={`status-badge ${a.status}`}>{a.status}</span>
                                                                    </div>
                                                                    <div className="deadline">
                                                                        <FiAlertCircle size={12} /> Deadline: {a.deadline}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
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
                                    <p>5 exams scheduled &bull; Refer to hall ticket for latest updates</p>
                                </div>
                                <div className="exam-list" style={{ flexDirection: 'column' }}>
                                    {examSchedule.map((exam, i) => (
                                        <div className="exam-item" key={i} style={{ width: '100%', maxWidth: '100%' }}>
                                            <div className="exam-date">{exam.date}</div>
                                            <div className="exam-info" style={{ flex: 1 }}>
                                                <h4>{exam.subject}</h4>
                                                <p>
                                                    Time: <strong>{exam.time}</strong> &bull;&nbsp;
                                                    Venue: <strong>{exam.venue}</strong> &bull;&nbsp;
                                                    Code: <strong>{exam.code}</strong>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
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
