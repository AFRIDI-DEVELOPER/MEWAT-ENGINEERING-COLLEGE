import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { departments as staticDepartments } from '../data/content'
import { useDepartment } from '../hooks/useSupabase'
import LoadingSpinner from '../components/LoadingSpinner'
import { FiArrowLeft, FiUser, FiBookOpen, FiCpu, FiLayers, FiAward, FiUsers, FiGrid, FiChevronRight } from 'react-icons/fi'
import { getAssetPath } from '../utils/assets'

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
    })
}

// Department-specific color themes
const deptThemes = {
    cse: {
        primary: '#0ea5e9',
        primaryLight: 'rgba(14, 165, 233, 0.18)',
        gradient: 'linear-gradient(135deg, #0c1929 0%, #0d2847 40%, #0f3460 100%)',
        accent: '#38bdf8',
        accentGlow: 'rgba(14, 165, 233, 0.3)',
        tagBg: 'rgba(14, 165, 233, 0.08)',
        tagBorder: 'rgba(14, 165, 233, 0.15)',
        label: 'Computer Science & Engineering'
    },
    civil: {
        primary: '#d97706',
        primaryLight: 'rgba(217, 119, 6, 0.18)',
        gradient: 'linear-gradient(135deg, #1a1207 0%, #2d1f0a 40%, #3d2a10 100%)',
        accent: '#fbbf24',
        accentGlow: 'rgba(217, 119, 6, 0.3)',
        tagBg: 'rgba(217, 119, 6, 0.08)',
        tagBorder: 'rgba(217, 119, 6, 0.15)',
        label: 'Civil Engineering'
    },
    mechanical: {
        primary: '#dc2626',
        primaryLight: 'rgba(220, 38, 38, 0.18)',
        gradient: 'linear-gradient(135deg, #1a0a0a 0%, #2d1010 40%, #3d1515 100%)',
        accent: '#f87171',
        accentGlow: 'rgba(220, 38, 38, 0.3)',
        tagBg: 'rgba(220, 38, 38, 0.08)',
        tagBorder: 'rgba(220, 38, 38, 0.15)',
        label: 'Mechanical Engineering'
    },
    eee: {
        primary: '#0891b2',
        primaryLight: 'rgba(8, 145, 178, 0.18)',
        gradient: 'linear-gradient(135deg, #0a1a1f 0%, #0d2630 40%, #103040 100%)',
        accent: '#22d3ee',
        accentGlow: 'rgba(8, 145, 178, 0.3)',
        tagBg: 'rgba(8, 145, 178, 0.08)',
        tagBorder: 'rgba(8, 145, 178, 0.15)',
        label: 'Electrical & Electronics Engineering'
    },
    ece: {
        primary: '#7c3aed',
        primaryLight: 'rgba(124, 58, 237, 0.18)',
        gradient: 'linear-gradient(135deg, #120a29 0%, #1a1040 40%, #251555 100%)',
        accent: '#a78bfa',
        accentGlow: 'rgba(124, 58, 237, 0.3)',
        tagBg: 'rgba(124, 58, 237, 0.08)',
        tagBorder: 'rgba(124, 58, 237, 0.15)',
        label: 'Electronics & Communication Engineering'
    },
    ash: {
        primary: '#059669',
        primaryLight: 'rgba(5, 150, 105, 0.18)',
        gradient: 'linear-gradient(135deg, #071a14 0%, #0d2a1f 40%, #103828 100%)',
        accent: '#34d399',
        accentGlow: 'rgba(5, 150, 105, 0.3)',
        tagBg: 'rgba(5, 150, 105, 0.08)',
        tagBorder: 'rgba(5, 150, 105, 0.15)',
        label: 'Applied Sciences & Humanities'
    }
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

    const dept = staticDept || normalizeDept(sbDept) // Use static data as primary source
    const theme = deptThemes[id] || deptThemes.cse

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
        <div className="dept-detail-page" style={{
            '--dept-primary': theme.primary,
            '--dept-primary-light': theme.primaryLight,
            '--dept-accent': theme.accent,
            '--dept-accent-glow': theme.accentGlow,
            '--dept-tag-bg': theme.tagBg,
            '--dept-tag-border': theme.tagBorder,
        }}>
            {/* ═══ HERO SECTION ═══ */}
            <section className="dept-hero" style={{ background: theme.gradient, padding: '100px 0 90px' }}>
                {/* Animated grid pattern */}
                <div className="dept-hero-grid-pattern" />
                {/* Glow orb */}
                <div className="dept-hero-orb" style={{ background: `radial-gradient(circle, ${theme.accentGlow}, transparent 70%)` }} />

                <div className="container" style={{ position: 'relative', zIndex: 5 }}>
                    <motion.div initial="hidden" animate="visible">
                        <motion.div variants={fadeUp} custom={0}>
                            <Link to="/departments" className="dept-back-link">
                                <FiArrowLeft /> All Departments
                            </Link>
                        </motion.div>

                        <motion.div className="dept-hero-badge" variants={fadeUp} custom={0.5}
                            style={{ borderColor: `${theme.primary}40`, background: `${theme.primary}15` }}
                        >
                            <span className="dept-hero-badge-dot" style={{ background: theme.accent }} />
                            {dept.shortName} Department
                        </motion.div>

                        <motion.h1 className="dept-hero-title" variants={fadeUp} custom={1}>
                            {dept.name}
                        </motion.h1>

                        <motion.p className="dept-hero-desc" variants={fadeUp} custom={2}>
                            {dept.description}
                        </motion.p>

                        {/* Quick Stats Row */}
                        <motion.div className="dept-hero-stats" variants={fadeUp} custom={3}>
                            {dept.seats && (
                                <div className="dept-hero-stat">
                                    <span className="dept-hero-stat-value" style={{ color: theme.accent }}>{dept.seats}</span>
                                    <span className="dept-hero-stat-label">Seats</span>
                                </div>
                            )}
                            <div className="dept-hero-stat">
                                <span className="dept-hero-stat-value" style={{ color: theme.accent }}>{dept.faculty.length}</span>
                                <span className="dept-hero-stat-label">Faculty</span>
                            </div>
                            <div className="dept-hero-stat">
                                <span className="dept-hero-stat-value" style={{ color: theme.accent }}>{dept.labs.length}</span>
                                <span className="dept-hero-stat-label">Labs</span>
                            </div>
                            <div className="dept-hero-stat">
                                <span className="dept-hero-stat-value" style={{ color: theme.accent }}>{dept.subjects.length}</span>
                                <span className="dept-hero-stat-label">Subjects</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ═══ HIGHLIGHTS STRIP ═══ */}
            <section className="dept-highlights-strip">
                <div className="container">
                    <div className="dept-highlights-row">
                        {dept.highlights.map((h, i) => (
                            <motion.div
                                key={i}
                                className="dept-highlight-chip"
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.4 }}
                            >
                                <FiGrid className="dept-highlight-icon" />
                                {h}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ MAIN CONTENT ═══ */}
            <section className="section dept-content-section">
                <div className="container">
                    <div className="dept-grid">

                        {/* ── LEFT COLUMN ── */}
                        <div className="dept-main">

                            {/* HOD Card */}
                            <motion.div
                                className="dept-hod-card"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="dept-hod-card-glow" style={{ background: `radial-gradient(circle at 0% 0%, ${theme.primaryLight}, transparent 60%)` }} />
                                <div className="dept-section-label">
                                    <FiUser /> Head of Department
                                </div>
                                <div className="dept-hod-content">
                                    <div className="dept-hod-avatar" style={{ background: theme.gradient }}>
                                        <span>{dept.hod.image}</span>
                                    </div>
                                    <div className="dept-hod-info">
                                        <h3>{dept.hod.name}</h3>
                                        <p className="dept-hod-designation">{dept.hod.designation}</p>
                                        <div className="dept-hod-meta">
                                            <div className="dept-hod-meta-item">
                                                <span className="dept-hod-meta-label">Experience</span>
                                                <span className="dept-hod-meta-value">{dept.hod.experience}</span>
                                            </div>
                                            <div className="dept-hod-meta-divider" />
                                            <div className="dept-hod-meta-item">
                                                <span className="dept-hod-meta-label">Education</span>
                                                <span className="dept-hod-meta-value">{dept.hod.education}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Faculty Section */}
                            <div className="dept-faculty-section">
                                <div className="dept-section-header">
                                    <div className="dept-section-label">
                                        <FiUsers /> Our Faculty
                                    </div>
                                    <div className="dept-section-line" />
                                </div>
                                <div className="faculty-grid">
                                    {dept.faculty.map((f, i) => (
                                        <motion.div
                                            key={i}
                                            className="dept-faculty-card"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.08, duration: 0.5 }}
                                        >
                                            <div className="dept-faculty-accent" />
                                            <h4>{f.name}</h4>
                                            <p className="dept-faculty-role">{f.designation}</p>
                                            <div className="dept-faculty-tags">
                                                <span className="dept-faculty-tag">{f.specialization}</span>
                                                <span className="dept-faculty-tag">{f.experience}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ── RIGHT SIDEBAR ── */}
                        <div className="dept-sidebar">

                            {/* Labs Card */}
                            <motion.div
                                className="dept-sidebar-card"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="dept-section-label">
                                    <FiCpu /> Laboratory Infrastructure
                                </div>
                                <div className="dept-lab-list">
                                    {dept.labs.map((lab, i) => (
                                        <motion.div
                                            key={i}
                                            className="dept-lab-item"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <div className="dept-lab-number" style={{ color: theme.accent }}>{String(i + 1).padStart(2, '0')}</div>
                                            <div className="dept-lab-info">
                                                <h4>{lab.name}</h4>
                                                <p>{lab.resources}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Subjects Card */}
                            <motion.div
                                className="dept-sidebar-card"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.15 }}
                            >
                                <div className="dept-section-label">
                                    <FiBookOpen /> Core Subjects
                                </div>
                                <div className="dept-subject-grid">
                                    {dept.subjects.map((sub, i) => (
                                        <span key={i} className="dept-subject-tag">{sub}</span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* CTA */}
                            <motion.div
                                className="dept-cta-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                style={{ background: theme.gradient }}
                            >
                                <div className="dept-cta-content">
                                    <h3>Ready to Join?</h3>
                                    <p>Start your engineering journey with the {dept.shortName} department</p>
                                    <Link to="/admissions" className="dept-cta-btn">
                                        Apply for Admission <FiChevronRight />
                                    </Link>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
