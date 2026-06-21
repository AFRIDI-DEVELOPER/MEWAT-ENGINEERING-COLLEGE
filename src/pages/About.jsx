import { aboutData } from '../data/content'
import { getAssetPath } from '../utils/assets'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import CEOMessage from '../components/CEOMessage'
import DirectorMessage from '../components/DirectorMessage'
import AdministratorMessage from '../components/AdministratorMessage'
import AboutPreview from '../components/AboutPreview'
import SEO from '../components/SEO'

const TABS = [
    { id: 'overview',         label: 'Overview' },
    { id: 'about-mec',        label: 'About MEC' },
    { id: 'why-choose-mec',   label: 'Why Choose MEC' },
    { id: 'ceo-message',      label: "CEO's Message" },
    { id: 'director-message', label: "Director's Message" },
    { id: 'admin-message',    label: "Administrator's Message" },
    { id: 'vision-mission',   label: 'Vision & Mission' },
    { id: 'core-values',      label: 'Core Values' },
    { id: 'our-history',      label: 'Our History' },
]

const fadeVariant = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
    exit:    { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

export default function About() {
    const [activeTab, setActiveTab] = useState('about-mec')

    return (
        <>
            <SEO title="About Us" description="Learn about the history, vision, and mission of Mewat Engineering College (WAQF)." />

            {/* ── Tab Navigation Bar ── */}
            <nav style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                background: 'rgba(13,17,23,0.97)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                borderBottom: '1px solid rgba(201,168,76,0.2)',
                boxShadow: '0 4px 30px rgba(0,0,0,0.35)',
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0',
                }}>
                    {TABS.map((tab) => {
                        const isActive = activeTab === tab.id
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    flexShrink: 0,
                                    padding: '0.8rem 0.9rem',
                                    background: isActive ? 'rgba(201,168,76,0.1)' : 'none',
                                    border: 'none',
                                    borderBottom: isActive ? '3px solid #c9a84c' : '3px solid transparent',
                                    color: isActive ? '#c9a84c' : 'rgba(255,255,255,0.55)',
                                    fontWeight: isActive ? 600 : 400,
                                    fontSize: '0.78rem',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.2s ease',
                                    letterSpacing: '0.01em',
                                    fontFamily: 'inherit',
                                }}
                                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' } }}
                                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.background = 'none' } }}
                            >
                                {tab.label}
                            </button>
                        )
                    })}
                </div>
            </nav>

            {/* ── Tab Content Area ── */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    variants={fadeVariant}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >

                    {/* ABOUT MEC */}
                    {activeTab === 'about-mec' && (
                        <section className="section" style={{ background: 'var(--bg-primary, #0d1117)', padding: '80px 0' }}>
                            <div className="container">
                                <div className="section-header">
                                    <span className="section-label" style={{ color: '#c9a84c' }}>Who We Are</span>
                                    <h2 style={{ color: '#fff' }}>About MEC</h2>
                                </div>
                                <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <div style={{ flex: '1 1 420px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                                        <img
                                            src={getAssetPath('/images/college-bg.png')}
                                            alt="Mewat Engineering College Campus"
                                            style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
                                        />
                                    </div>
                                    <div style={{ flex: '1 1 400px' }}>
                                        <div style={{
                                            background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.04))',
                                            border: '1px solid rgba(201,168,76,0.25)',
                                            borderRadius: '14px',
                                            padding: '2rem 2.2rem'
                                        }}>
                                            <h3 style={{ color: '#c9a84c', fontSize: '1.4rem', marginBottom: '1.2rem', fontWeight: 700 }}>Welcome to MEC</h3>
                                            <p style={{ color: 'rgba(255,255,255,0.82)', lineHeight: '1.85', fontSize: '1rem', marginBottom: '1rem' }}>
                                                Knowledge is the only biggest treasure which increases when shared. Keeping a profound faith in this thought and developing a dimension towards learning and education, Mewat Engineering College — one of the top engineering colleges in Haryana — is here to guide the students and help them grow.
                                            </p>
                                            <p style={{ color: 'rgba(255,255,255,0.82)', lineHeight: '1.85', fontSize: '1rem', marginBottom: '1rem' }}>
                                                It will take as one of the biggest steps towards contributing for the Indian society. The college building is situated in a sprawling campus of about 28 acres in the scenic backdrop of the Aravalli Ranges and is in Nuh on the Nuh-Pataudi Road about 48 km from Gurgaon and 80 km from New Delhi.
                                            </p>
                                            <p style={{ color: 'rgba(255,255,255,0.82)', lineHeight: '1.85', fontSize: '1rem', marginBottom: '1rem' }}>
                                                A panoramic view of Aravalli's welcomes the visitor with its majestic presence along with the ruins of an old fort on top and a historical 600 years old Dargah and a Mosque at the foothill. The environment is pollution-free, fresh and healthy and is ideal for learning and intellectual activities.
                                            </p>
                                            <p style={{ color: 'rgba(255,255,255,0.82)', lineHeight: '1.85', fontSize: '1rem' }}>
                                                The campus is Wi-Fi enabled and the facility is also available in the hostel. Power backup has been provided in the College as well as in the hostel. Students staying in the neighboring areas and those living in the cities like Gurgaon, Delhi etc utilize transport facilities provided by the College.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* CEO MESSAGE */}
                    {activeTab === 'ceo-message' && <CEOMessage />}

                    {/* OVERVIEW */}
                    {activeTab === 'overview' && <AboutPreview showLink={false} />}

                    {/* DIRECTOR MESSAGE */}
                    {activeTab === 'director-message' && <DirectorMessage />}

                    {/* ADMINISTRATOR MESSAGE */}
                    {activeTab === 'admin-message' && <AdministratorMessage />}

                    {/* WHY CHOOSE MEC */}
                    {activeTab === 'why-choose-mec' && (
                        <section className="section" style={{ background: 'var(--off-white)', padding: '80px 0' }}>
                            <div className="container">
                                <div className="section-header">
                                    <span className="section-label">Our Advantages</span>
                                    <h2>Why Choose MEC?</h2>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '1rem' }}>
                                    {[
                                        { icon: '🏠', title: 'Affordable Hostel Facility', desc: 'Hostel facility at the most affordable cost of Rs. 40,000 per annum which includes food and lodging both.' },
                                        { icon: '🎓', title: 'Excellent GATE Results', desc: 'Students secured good ranks in GATE with the highest being 51 All India Rank.' },
                                        { icon: '💼', title: '100% Placement', desc: '100% placement of the qualifying candidates with tie-ups with leading industries and companies.' },
                                        { icon: '📍', title: 'Unique Location', desc: 'Only Engineering College in Mewat Region and existing in Delhi NCR Region (based at Nuh).' },
                                        { icon: '🏔️', title: 'Beautiful Campus', desc: 'Beautiful Campus and Modern Infrastructure at the foothills of Aravali Range with a pollution-free environment.' },
                                    ].map((item, i) => (
                                        <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }}
                                            style={{ background: '#fff', borderRadius: '14px', padding: '2rem 1.8rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', borderTop: '4px solid var(--primary, #3a5a40)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                                            whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(0,0,0,0.14)' }}
                                        >
                                            <div style={{ fontSize: '2.4rem', lineHeight: 1 }}>{item.icon}</div>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary, #3a5a40)', margin: 0 }}>{item.title}</h3>
                                            <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#555', margin: 0 }}>{item.desc}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* OUR HISTORY */}
                    {activeTab === 'our-history' && (
                        <section className="section" style={{ background: 'var(--off-white)' }}>
                            <div className="container">
                                <div className="section-header">
                                    <span className="section-label">Our Journey</span>
                                    <h2>Building a Legacy of Learning</h2>
                                </div>
                                <div className="about-history-content">
                                    <p style={{ marginBottom: 20, fontSize: '1.1rem', lineHeight: '1.8' }}>{aboutData.history}</p>
                                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                                        Approved by AICTE, New Delhi, and affiliated to Deenbandhu Chhotu Ram University of Science &amp; Technology (DCRUST), Murthal, MEC offers B.Tech programs in five engineering disciplines with a total intake of 210 students per year. The college is known for its inclusive approach, offering 50% fee concession for girl students to promote women in engineering.
                                    </p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* VISION & MISSION */}
                    {activeTab === 'vision-mission' && (
                        <section className="section">
                            <div className="container">
                                <div className="section-header">
                                    <span className="section-label">Our Purpose</span>
                                    <h2>Vision &amp; Mission</h2>
                                </div>
                                <div className="about-vision-mission">
                                    <motion.div className="vm-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                        <div className="vm-icon">🔭</div>
                                        <h3>Our Vision</h3>
                                        <p>{aboutData.vision}</p>
                                    </motion.div>
                                    <motion.div className="vm-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                                        <div className="vm-icon">🎯</div>
                                        <h3>Our Mission</h3>
                                        <ul>{aboutData.mission.map((item, i) => <li key={i}>{item}</li>)}</ul>
                                    </motion.div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* CORE VALUES */}
                    {activeTab === 'core-values' && (
                        <section className="section" style={{ background: 'var(--off-white)' }}>
                            <div className="container">
                                <div className="section-header">
                                    <span className="section-label">What Drives Us</span>
                                    <h2>Core Values</h2>
                                </div>
                                <div className="core-values-grid">
                                    {aboutData.coreValues.map((value, i) => (
                                        <motion.div className="value-card" key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                                            <div className="value-icon">{value.icon}</div>
                                            <h4>{value.title}</h4>
                                            <p>{value.description}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                </motion.div>
            </AnimatePresence>
        </>
    )
}
