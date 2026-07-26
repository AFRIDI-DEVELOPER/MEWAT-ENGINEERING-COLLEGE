import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedCounter from '../components/AnimatedCounter'
import { useRecruiters } from '../hooks/useSupabase'
import { recruiters as staticRecruiters, placementAlumni, proudAlumni, industryCollaborations } from '../data/content'
import SEO from '../components/SEO'
import { FaBriefcase, FaTrophy, FaBuilding, FaChartLine, FaCheck, FaGraduationCap, FaUserTie, FaHandshake, FaChevronDown, FaChevronUp, FaLandmark, FaRocket } from 'react-icons/fa6'

// Emoji avatars for students without photos
const AVATARS = ['👨‍🎓', '👩‍🎓', '🧑‍💻', '👨‍💼', '👩‍💼', '🧑‍🔬', '👨‍🏫', '👩‍🏫', '🧑‍🎓', '👨‍🔬']

export default function Placements() {
    const { data: supabaseRecruiters } = useRecruiters()
    const [expandedCollab, setExpandedCollab] = useState(null)
    const [showAllAlumni, setShowAllAlumni] = useState(false)

    const recruiters = staticRecruiters

    const placementStats = [
        { icon: <FaBriefcase />, number: 500, suffix: '+', text: 'Students Placed', color: '#3a5a40' },
        { icon: <FaTrophy />, number: 48, suffix: '', text: 'Best GATE AIR', color: '#c9a84c' },
        { icon: <FaBuilding />, number: 30, suffix: '+', text: 'Recruiting Companies', color: '#2563eb' },
        { icon: <FaChartLine />, number: 100, suffix: '%', text: 'Placement Assistance', color: '#16a34a' }
    ]

    const leaderAlumni = proudAlumni.filter(a => a.category === 'leader')
    const corporateAlumni = proudAlumni.filter(a => a.category === 'corporate')
    const govtAlumni = proudAlumni.filter(a => a.category === 'govt')

    const displayedGovt = showAllAlumni ? govtAlumni : govtAlumni.slice(0, 8)

    return (
        <>
            <SEO title="Placements" description="Discover our placement success stories, proud alumni, GATE qualifiers, recruiting companies, and industry collaborations at Mewat Engineering College." />

            {/* ── 1. HERO BANNER ── */}
            <section className="placement-hero">
                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    <motion.span
                        className="section-label" style={{ color: '#c9a84c' }}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    >Career Excellence</motion.span>
                    <motion.h1
                        className="placement-hero-title"
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                    >Placements at MEC</motion.h1>
                    <motion.p
                        className="placement-hero-sub"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Bridging the gap between academics and industry — empowering students with skills, mentoring, and placement support to launch exceptional careers.
                    </motion.p>
                </div>
                <div className="placement-hero-gradient" />
            </section>

            {/* ── 2. STATS ROW ── */}
            <section className="section" style={{ background: 'var(--off-white)', paddingTop: '50px', paddingBottom: '50px' }}>
                <div className="container">
                    <div className="placements-stats-grid">
                        {placementStats.map((stat, i) => (
                            <motion.div
                                className="placement-stat-card"
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="stat-icon" style={{ color: stat.color }}>{stat.icon}</div>
                                <div className="stat-number" style={{ color: stat.color }}>
                                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                                </div>
                                <div className="stat-text">{stat.text}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3. ABOUT PLACEMENT CELL ── */}
            <section className="section" style={{ background: '#fff' }}>
                <div className="container">
                    <div className="placement-about-grid">
                        <motion.div
                            className="placement-about-content"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="section-label">Placement Cell</span>
                            <h2 style={{ fontFamily: "'Kanit', sans-serif", fontWeight: 800, color: 'var(--primary-dark, #1b2a1e)', marginBottom: '1.2rem' }}>Your Career Partner</h2>
                            <p style={{ color: '#444', lineHeight: 1.8, marginBottom: '16px' }}>
                                Mewat Engineering College provides innovative and career-oriented academic environment. The placement cell is equipped with appropriate infrastructure to execute the placement process. Arrangements of pre-placement talks, written tests, group discussion, interview etc. are handled by staff at the TPO office in coordination with the respective departments.
                            </p>
                            <p style={{ color: '#444', lineHeight: 1.8, marginBottom: '20px' }}>
                                The Placement Cell constantly strives towards bridging the gap that exists between industry and academia. It provides necessary guidelines to students for them to decide their career paths by way of counselling, guiding, motivating and mentoring. Training and Placement Officer of Mewat Engineering College has written a booklet on "Placement Strategies for Engineering Students", especially for the benefit of college students.
                            </p>
                            <div className="placement-features-row">
                                {['Resume Building Workshops', 'Mock Interview Sessions', 'Industry Expert Talks', 'Soft Skills Training'].map((f, i) => (
                                    <div className="placement-feature-chip" key={i}>
                                        <FaCheck style={{ color: '#16a34a', flexShrink: 0 }} />
                                        <span>{f}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div
                            className="placement-about-visual"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="placement-visual-card">
                                <div className="placement-visual-icon">🎯</div>
                                <h3>Our Mission</h3>
                                <p>To make every student industry-ready through holistic training, career guidance, and world-class placement support.</p>
                            </div>
                            <div className="placement-visual-card highlight-card">
                                <div className="placement-visual-icon">🏆</div>
                                <h3>GATE Excellence</h3>
                                <p>Over <strong>50+ students</strong> have qualified GATE. Best rank: <strong>AIR 48</strong> — a testament to academic quality at MEC.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── 4. PLACEMENT & HIGHER STUDIES ── */}
            <section className="section" style={{ background: 'var(--off-white)' }}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Academic Achievements</span>
                        <h2>Our Placement & Higher Studies</h2>
                        <p>Students who have excelled in GATE, pursued M.Tech, Ph.D. and beyond</p>
                    </div>
                    <div className="achievers-grid">
                        {placementAlumni.map((student, i) => (
                            <motion.div
                                className="achiever-card"
                                key={i}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.03 }}
                            >
                                <div className="achiever-avatar" style={{ background: `hsl(${(i * 37) % 360}, 65%, 92%)` }}>
                                    <span>{AVATARS[i % AVATARS.length]}</span>
                                </div>
                                <h4 className="achiever-name">{student.name}</h4>
                                <div className="achiever-tag">{student.achievement}</div>
                                <p className="achiever-details">{student.details}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 5. PROUD ALUMNI ── */}
            <section className="section" style={{ background: '#fff' }}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Alumni Network</span>
                        <h2>Our Proud Alumni</h2>
                        <p>Entrepreneurs, leaders, and professionals making an impact worldwide</p>
                    </div>

                    {/* Leaders & Entrepreneurs */}
                    <div className="alumni-category-header">
                        <FaRocket style={{ color: '#c9a84c' }} />
                        <h3>Entrepreneurs & Leaders</h3>
                    </div>
                    <div className="alumni-grid">
                        {leaderAlumni.map((alum, i) => (
                            <motion.div
                                className="alumni-card"
                                key={`leader-${i}`}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: i * 0.04 }}
                            >
                                <div className="alumni-avatar-circle" style={{ background: `linear-gradient(135deg, hsl(${(i * 45) % 360}, 70%, 88%) 0%, hsl(${(i * 45 + 60) % 360}, 60%, 82%) 100%)` }}>
                                    <span>{AVATARS[i % AVATARS.length]}</span>
                                </div>
                                <h4>{alum.name}</h4>
                                <p className="alumni-role">{alum.role}</p>
                                <p className="alumni-org">{alum.organization}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Corporate Professionals */}
                    <div className="alumni-category-header" style={{ marginTop: '50px' }}>
                        <FaUserTie style={{ color: '#2563eb' }} />
                        <h3>Corporate Professionals</h3>
                    </div>
                    <div className="alumni-grid">
                        {corporateAlumni.map((alum, i) => (
                            <motion.div
                                className="alumni-card"
                                key={`corp-${i}`}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: i * 0.04 }}
                            >
                                <div className="alumni-avatar-circle" style={{ background: `linear-gradient(135deg, hsl(${200 + i * 20}, 60%, 88%) 0%, hsl(${220 + i * 20}, 50%, 82%) 100%)` }}>
                                    <span>{AVATARS[(i + 3) % AVATARS.length]}</span>
                                </div>
                                <h4>{alum.name}</h4>
                                <p className="alumni-role">{alum.role}</p>
                                <p className="alumni-org">{alum.organization}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Government & Public Sector */}
                    <div className="alumni-category-header" style={{ marginTop: '50px' }}>
                        <FaLandmark style={{ color: '#16a34a' }} />
                        <h3>Government & Public Sector</h3>
                    </div>
                    <div className="alumni-grid">
                        {displayedGovt.map((alum, i) => (
                            <motion.div
                                className="alumni-card"
                                key={`govt-${i}`}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: i * 0.04 }}
                            >
                                <div className="alumni-avatar-circle" style={{ background: `linear-gradient(135deg, hsl(${130 + i * 15}, 55%, 88%) 0%, hsl(${150 + i * 15}, 45%, 82%) 100%)` }}>
                                    <span>{AVATARS[(i + 5) % AVATARS.length]}</span>
                                </div>
                                <h4>{alum.name}</h4>
                                <p className="alumni-role">{alum.role}</p>
                                <p className="alumni-org">{alum.organization}</p>
                            </motion.div>
                        ))}
                    </div>
                    {govtAlumni.length > 8 && (
                        <div style={{ textAlign: 'center', marginTop: '30px' }}>
                            <button className="show-more-btn" onClick={() => setShowAllAlumni(!showAllAlumni)}>
                                {showAllAlumni ? <><FaChevronUp /> Show Less</> : <><FaChevronDown /> Show All {govtAlumni.length} Alumni</>}
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* ── 6. RECRUITING PARTNERS MARQUEE ── */}
            <section className="section" style={{ background: 'var(--off-white)', overflow: 'hidden' }}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Our Partners</span>
                        <h2>Where Our Alumni Work</h2>
                        <p>Leading companies and organizations that trust MEC graduates</p>
                    </div>
                </div>
                <div className="marquee-container">
                    <div className="marquee-track">
                        {[...recruiters, ...recruiters].map((name, i) => (
                            <div className="recruiter-marquee-badge" key={i}>
                                <FaBuilding style={{ opacity: 0.4, flexShrink: 0 }} />
                                <span>{name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="marquee-container" style={{ marginTop: '16px' }}>
                    <div className="marquee-track marquee-reverse">
                        {[...recruiters, ...recruiters].map((name, i) => (
                            <div className="recruiter-marquee-badge" key={`r-${i}`}>
                                <FaBuilding style={{ opacity: 0.4, flexShrink: 0 }} />
                                <span>{name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 7. INDUSTRY COLLABORATIONS ── */}
            <section className="section" style={{ background: '#fff' }}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Partnerships</span>
                        <h2>Collaboration with Industry</h2>
                        <p>Strategic partnerships that enhance practical learning and career readiness</p>
                    </div>
                    <div className="collab-grid">
                        {industryCollaborations.map((collab, i) => (
                            <motion.div
                                className={`collab-card ${expandedCollab === i ? 'expanded' : ''}`}
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.06 }}
                                onClick={() => setExpandedCollab(expandedCollab === i ? null : i)}
                            >
                                <div className="collab-card-header">
                                    <span className="collab-icon">{collab.icon}</span>
                                    <h4>{collab.name}</h4>
                                    <span className="collab-toggle">
                                        {expandedCollab === i ? <FaChevronUp /> : <FaChevronDown />}
                                    </span>
                                </div>
                                <AnimatePresence>
                                    {expandedCollab === i && (
                                        <motion.div
                                            className="collab-card-body"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <p>{collab.description}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
