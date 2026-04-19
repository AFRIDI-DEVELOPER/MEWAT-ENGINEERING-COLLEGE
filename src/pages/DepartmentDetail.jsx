import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { departments as staticDepartments } from '../data/content'
import { useDepartment } from '../hooks/useSupabase'
import LoadingSpinner from '../components/LoadingSpinner'

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
    })
}

export default function DepartmentDetail() {
    const { id } = useParams()
    const { data: sbDept, loading } = useDepartment(id)
    const staticDept = staticDepartments.find(d => d.id === id)

    // Normalize Supabase flat fields into nested shape used by UI
    const normalizeDept = (raw) => {
        if (!raw) return null
        return {
            ...raw,
            hod: raw.hod || {
                name: raw.hod_name,
                designation: raw.hod_designation,
                experience: raw.hod_experience,
                education: raw.hod_education,
                image: raw.hod_image || '👨‍💼'
            },
            highlights: raw.highlights || [],
            subjects: raw.subjects || [],
            faculty: raw.faculty || [],
            labs: raw.labs || [],
        }
    }

    const dept = normalizeDept(sbDept) || staticDept

    if (loading && !dept) {
        return <LoadingSpinner message="Loading department..." />
    }

    if (!dept) {
        return (
            <div className="container section" style={{ textAlign: 'center' }}>
                <h2>Department Not Found</h2>
                <Link to="/departments" className="btn btn-primary">Back to Departments</Link>
            </div>
        )
    }

    return (
        <div className="dept-detail-page">
            {/* Header Section */}
            <section className="dept-hero" style={{ color: 'white', padding: '120px 0 80px' }}>
                <div className="container">
                    <motion.div initial="hidden" animate="visible">
                        <motion.div className="hero-badge" variants={fadeUp} style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--gold-light)' }}>
                            Department of Science & Technology
                        </motion.div>
                        <motion.h1 variants={fadeUp} custom={1} style={{ color: 'white', marginBottom: '20px' }}>
                            {dept.name}
                        </motion.h1>
                        <motion.p variants={fadeUp} custom={2} style={{ maxWidth: '700px', fontSize: '1.2rem', opacity: 0.9 }}>
                            {dept.description}
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="dept-grid">
                        {/* Left Column: HOD & Faculty */}
                        <div className="dept-main">
                            <motion.div 
                                className="hod-feature-card"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="hod-header">
                                    <div className="hod-avatar">{dept.hod.image}</div>
                                    <div className="hod-info">
                                        <span className="badge-small">Head of Department</span>
                                        <h3>{dept.hod.name}</h3>
                                        <p>{dept.hod.designation}</p>
                                    </div>
                                </div>
                                <div className="hod-stats">
                                    <div className="hod-stat">
                                        <label>Experience</label>
                                        <span>{dept.hod.experience}</span>
                                    </div>
                                    <div className="hod-stat">
                                        <label>Education</label>
                                        <span>{dept.hod.education}</span>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="faculty-section" style={{ marginTop: '60px' }}>
                                <h2 className="section-title">Our Expert Faculty</h2>
                                <div className="faculty-grid">
                                    {dept.faculty.map((f, i) => (
                                        <motion.div 
                                            key={i} 
                                            className="faculty-card-mini"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <h4>{f.name}</h4>
                                            <p className="f-designation">{f.designation}</p>
                                            <div className="f-meta">
                                                <span>{f.specialization}</span>
                                                <span className="dot"></span>
                                                <span>{f.experience} Exp.</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Labs & Subjects */}
                        <div className="dept-sidebar">
                            <div className="sidebar-card lab-card">
                                <h3>Laboratory Infrastructure</h3>
                                <div className="lab-list">
                                    {dept.labs.map((lab, i) => (
                                        <div key={i} className="lab-item">
                                            <h4>{lab.name}</h4>
                                            <p>{lab.resources}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="sidebar-card subjects-card" style={{ marginTop: '30px' }}>
                                <h3>Core Subjects</h3>
                                <div className="subject-tags">
                                    {dept.subjects.map((sub, i) => (
                                        <span key={i} className="subject-tag">{sub}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="sidebar-cta" style={{ marginTop: '30px' }}>
                                <Link to="/admissions" className="btn btn-accent" style={{ width: '100%' }}>Apply for Admission</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
