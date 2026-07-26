import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const TABS = [
    { id: 'eligibility', label: 'Eligibility Criteria' },
    { id: 'process',     label: 'Admission Process' },
    { id: 'fees',        label: 'Fee Structure' }
]

const fadeVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
}

export default function Admissions() {
    const [activeTab, setActiveTab] = useState('eligibility')

    return (
        <>
            <SEO title="Admissions" description="Explore our B.Tech programs, eligibility criteria, admission process, and fee structure at Mewat Engineering College." />

            {/* ── Page Header ── */}
            <section className="section" style={{ background: 'linear-gradient(180deg, var(--off-white, #f4f3ed) 0%, #e2e1d7 100%)', padding: '100px 0 50px' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <span className="section-label" style={{ color: '#b8933b' }}>Join MEC</span>
                    <h1 style={{ color: 'var(--primary-dark, #1b2a1e)', fontSize: '3rem', fontWeight: 900, marginBottom: '1.2rem', fontFamily: "'Kanit', sans-serif" }}>Admissions Open</h1>
                    <p style={{ color: 'rgba(0,0,0,0.7)', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto' }}>
                        Start your journey to becoming a professional engineer. Explore our academic pathways, check your eligibility, and apply today.
                    </p>
                </div>
            </section>

            {/* ── Sticky Tabs Navigation Wrapper ── */}
            <div className="sticky-tabs-wrapper">
                <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="admissions-tabs-container">
                        {TABS.map(tab => (
                            <button
                                key={tab.id}
                                className={`admissions-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTabPill"
                                        className="active-tab-pill"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <span style={{ position: 'relative', zIndex: 2 }}>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Active Tab Content Area ── */}
            <section className="section" style={{ background: 'var(--off-white, #f4f3ed)', padding: '60px 0' }}>
                <div className="container">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            variants={fadeVariant}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {/* ── T1: ELIGIBILITY CRITERIA ── */}
                            {activeTab === 'eligibility' && (
                                <div className="admissions-grid">
                                    {/* Left Column: B.Tech 10+2 & Vocations */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                        <div className="premium-card">
                                            <h3>B.Tech (10+2) Entry</h3>
                                            <p style={{ color: '#444', lineHeight: '1.8', fontSize: '1rem', margin: 0 }}>
                                                The aspiring candidate should have passed the senior secondary/ intermediate/ 10+2 examination from any recognized Board/University with <strong>Physics and Mathematics</strong> as compulsory subjects in addition to one of the following subjects:
                                            </p>
                                            <ul className="premium-list" style={{ marginTop: '20px', marginBottom: '20px' }}>
                                                <li>Chemistry</li>
                                                <li>Biotechnology</li>
                                                <li>Biology</li>
                                                <li>Technical Vocational</li>
                                            </ul>
                                            <p style={{ color: '#444', lineHeight: '1.8', fontSize: '1rem', margin: 0 }}>
                                                Must secure a minimum of <strong>45% marks</strong> (<strong>40% marks</strong> in case of candidates belonging to reserved category) in the qualifying examination as per AICTE regulations.
                                            </p>
                                            <div className="highlight-badge-box">
                                                <p>📅 Course Duration: 4 Years</p>
                                            </div>
                                        </div>

                                        <div className="premium-card">
                                            <h3>B.Voc &amp; D.Voc Entry</h3>
                                            <p style={{ color: '#555', fontSize: '0.98rem', marginBottom: '20px' }}>
                                                We offer vocational streams that lead to professional engineering lines with direct qualification rules:
                                            </p>
                                            <div className="qualification-badge-box">
                                                <h5>B.Voc Qualification</h5>
                                                <span>12th Pass (Any Stream)</span>
                                            </div>
                                            <div className="qualification-badge-box">
                                                <h5>D.Voc Qualification</h5>
                                                <span>10th Pass</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Lateral Entry B.Tech */}
                                    <div className="premium-card">
                                        <h3>B.Tech Lateral Entry (2nd Year)</h3>
                                        <p style={{ color: '#444', marginBottom: '20px', lineHeight: '1.7' }}>
                                            Admission through Lateral Entry Scheme into the 2nd year of the B.Tech Programme (3rd semester) is allowed for candidates meeting any of the following conditions:
                                        </p>
                                        <ul className="premium-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                            <li>
                                                <strong>A. Diploma in Engg/Tech:</strong> Passed Diploma examination from an AICTE approved Institution with at least <strong>45% marks</strong> (<strong>40%</strong> in case of candidates belonging to reserved category) in an appropriate branch.
                                            </li>
                                            <li>
                                                <strong>B. B.Sc. Degree:</strong> Passed B.Sc. Degree from a recognized University (UGC) with at least <strong>45% marks</strong> (<strong>40%</strong> in case of reserved category) and passed XII standard with Mathematics as a subject.
                                            </li>
                                            <li>
                                                <strong>C. B.Voc / D.Voc:</strong> Passed B.Voc / 3-year D.Voc. Stream in the same or allied sector.
                                            </li>
                                            <li>
                                                <strong>D. B.Sc. Bridge Subjects:</strong> Students belonging to B.Sc. stream must clear the first-year subjects of <em>Engineering Graphics/Drawing</em> and <em>Engineering Mechanics</em> along with second-year subjects.
                                            </li>
                                            <li>
                                                <strong>E. Supernumerary Seats:</strong> B.Sc. stream students shall be considered only after filling the supernumerary seats in this category with students belonging to the Diploma stream.
                                            </li>
                                            <li>
                                                <strong>F. First Year Vacancy fallback:</strong> If lateral entry vacancies are exhausted, Diploma or B.Sc. degree graduates are also eligible for admission to the first-year B.Tech class, subject to first-year vacancies.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* ── T2: ADMISSION PROCESS ── */}
                            {activeTab === 'process' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                                    <div className="admissions-grid">
                                        {/* B.Tech 1st Year process */}
                                        <div className="premium-card">
                                            <h3>Admission to 1st Year B.Tech</h3>
                                            <p style={{ color: '#444', lineHeight: '1.8', fontSize: '1.02rem', marginBottom: '1.5rem' }}>
                                                Admissions shall be offered based on the inter-se merit of <strong>JEE (Mains) 2025</strong>.
                                            </p>
                                            <p style={{ color: '#555', lineHeight: '1.8', fontSize: '0.98rem', margin: 0 }}>
                                                In case of any vacancies arising due to unforeseen reasons, eligible candidates who meet the minimum qualification criteria may also be considered for admission based on merit (10+2 marks).
                                            </p>
                                        </div>

                                        {/* B.Tech Lateral Entry process */}
                                        <div className="premium-card">
                                            <h3>Admission to 2nd Year B.Tech (Lateral)</h3>
                                            <p style={{ color: '#444', lineHeight: '1.8', fontSize: '1.02rem', marginBottom: '1.5rem' }}>
                                                Offered on inter-se merit of the <strong>Online Entrance Test (OLET)</strong> (up to 10% of the sanctioned intake of the previous year across branches, in addition to unfilled seats).
                                            </p>
                                            <p style={{ color: '#555', lineHeight: '1.8', fontSize: '0.98rem', margin: 0 }}>
                                                Under Muslim Minority &amp; Management Quota categories, in case of vacancies, admissions shall be granted based on merit determined from the percentage of marks obtained in the qualifying exam (Diploma, B.Sc., or B.Voc/3-year D.Voc.).
                                            </p>
                                        </div>
                                    </div>

                                    {/* Seat Distribution section */}
                                    <div className="premium-card">
                                        <h3>State Government Minority Guidelines</h3>
                                        <p style={{ color: '#444', fontSize: '1.02rem', marginBottom: '24px' }}>
                                            Mewat Engineering College strictly follows the guidelines prescribed by the State Government for unaided minority institutions:
                                        </p>
                                        <div className="seat-dist-container">
                                            <div className="seat-dist-item">
                                                <div className="seat-dist-label">
                                                    <span>Management &amp; NRI Quota</span>
                                                    <span>15%</span>
                                                </div>
                                                <div className="seat-dist-bar-bg">
                                                    <div className="seat-dist-bar-fill" style={{ width: '15%', background: '#ff9f43' }} />
                                                </div>
                                                <p style={{ color: '#666', fontSize: '0.85rem', margin: '8px 0 0' }}>
                                                    Filled at the discretion of the management from candidates across the country, including NRIs.
                                                </p>
                                            </div>

                                            <div className="seat-dist-item">
                                                <div className="seat-dist-label">
                                                    <span>Muslim Minority Quota (Merit)</span>
                                                    <span>42.5%</span>
                                                </div>
                                                <div className="seat-dist-bar-bg">
                                                    <div className="seat-dist-bar-fill" style={{ width: '42.5%', background: '#c9a84c' }} />
                                                </div>
                                                <p style={{ color: '#666', fontSize: '0.85rem', margin: '8px 0 0' }}>
                                                    Reserved for Muslim Minority candidates and filled on the basis of inter-se merit.
                                                </p>
                                            </div>

                                            <div className="seat-dist-item">
                                                <div className="seat-dist-label">
                                                    <span>JEE Counselling / General Quota</span>
                                                    <span>42.5%</span>
                                                </div>
                                                <div className="seat-dist-bar-bg">
                                                    <div className="seat-dist-bar-fill" style={{ width: '42.5%', background: '#2d6a4f' }} />
                                                </div>
                                                <p style={{ color: '#666', fontSize: '0.85rem', margin: '8px 0 0' }}>
                                                    Filled through state-level counselling based on JEE examination scores by candidates from Haryana (covers open general &amp; reserved categories in the specified ratio).
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ── T3: FEE STRUCTURE ── */}
                            {activeTab === 'fees' && (
                                <div className="admissions-grid">
                                    {/* Left Column: Boy's Fee table */}
                                    <div className="premium-card">
                                        <h3>B.Tech Annual Fee Structure</h3>
                                        <p style={{ color: '#555', fontSize: '0.92rem', marginBottom: '20px' }}>
                                            Below is the comprehensive breakdown of the yearly B.Tech academic fees:
                                        </p>
                                        <div className="premium-fee-table-container">
                                            <table className="premium-fee-table">
                                                <thead>
                                                    <tr>
                                                        <th>Fee Head</th>
                                                        <th>Amount (Rs.)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Tuition Fee</td>
                                                        <td>30,000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Development Fund</td>
                                                        <td>5,000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Registration Fee (Both Semesters)</td>
                                                        <td>3,000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Training &amp; Placement, Extension Lectures</td>
                                                        <td>3,000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Exam Fee (Summer Semester)</td>
                                                        <td>2,000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Exam Fee (Winter Semester)</td>
                                                        <td>2,000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Sports &amp; Cultural Activities, Medical First Aid</td>
                                                        <td>2,000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Magazines and Journals</td>
                                                        <td>1,000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Internet Charges</td>
                                                        <td>1,000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Subject Association</td>
                                                        <td>500</td>
                                                    </tr>
                                                    <tr className="total-row">
                                                        <td><strong>Total Boy's Fee</strong></td>
                                                        <td><strong>49,500 / year</strong></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Right Column: Girls concession, B.Voc/D.Voc fees & Caution money */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                        {/* Girls discount card */}
                                        <div className="premium-card" style={{ background: 'linear-gradient(135deg, rgba(201, 168, 76, 0.08) 0%, rgba(255, 255, 255, 0.95) 100%)', borderColor: 'rgba(201, 168, 76, 0.35)' }}>
                                            <h3 style={{ borderBottomColor: 'rgba(201, 168, 76, 0.2)' }}>Girls Concession Fee</h3>
                                            <div className="girls-concession-header">
                                                <span style={{ fontSize: '3rem' }}>👩‍🎓</span>
                                                <div>
                                                    <div style={{ color: 'var(--primary-dark, #1b2a1e)', fontSize: '1.6rem', fontWeight: 800 }}>Rs. 19,750 / year</div>
                                                    <div style={{ color: '#b8933b', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Waqf Board Incentive</div>
                                                </div>
                                            </div>
                                            <p style={{ color: '#444', fontSize: '0.98rem', lineHeight: '1.75', margin: 0 }}>
                                                To encourage higher technical education for female students, the Haryana Waqf Board provides an exceptional concession of over <strong>60% discount</strong> on fees for all girl students, bringing the total yearly academic fee down to <strong>Rs. 19,750/-</strong>.
                                            </p>
                                        </div>

                                        {/* B.Voc / D.Voc Fee card */}
                                        <div className="premium-card">
                                            <h3>B.Voc &amp; D.Voc Program Fees</h3>
                                            <p style={{ color: '#555', fontSize: '0.98rem', marginBottom: '20px' }}>
                                                Fees for our vocational degree and diploma streams are structured as follows:
                                            </p>
                                            <div className="qualification-badge-box" style={{ background: 'rgba(0,0,0,0.015)', borderColor: 'rgba(0,0,0,0.04)' }}>
                                                <h5 style={{ color: 'var(--primary-dark, #1b2a1e)' }}>B.Voc Course Fee</h5>
                                                <span style={{ background: '#c9a84c', color: '#0c140e' }}>Rs. 15,000 / year</span>
                                            </div>
                                            <div className="qualification-badge-box" style={{ background: 'rgba(0,0,0,0.015)', borderColor: 'rgba(0,0,0,0.04)' }}>
                                                <h5 style={{ color: 'var(--primary-dark, #1b2a1e)' }}>D.Voc Course Fee</h5>
                                                <span style={{ background: '#c9a84c', color: '#0c140e' }}>Rs. 12,000 / year</span>
                                            </div>
                                        </div>

                                        {/* Caution money card */}
                                        <div className="premium-card">
                                            <h3>Caution Money</h3>
                                            <p style={{ color: '#555', fontSize: '0.98rem', lineHeight: '1.7', margin: 0 }}>
                                                A one-time, refundable caution money of <strong>Rs. 2,000/-</strong> has to be deposited at the time of admission in the First Year only. This amount is fully refunded upon completion of the course.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* ── Step-by-Step Tree Guide (Visually appealing CTAs) ── */}
            <section className="section admission-diagram-section" style={{ background: 'var(--off-white)', padding: '80px 0' }}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">How to Apply</span>
                        <h2>Step-by-Step Guide</h2>
                        <p>Your journey to MEC in 5 simple steps</p>
                    </div>

                    <div className="root-tree">
                        {/* Root Node */}
                        <motion.div
                            className="tree-root-node"
                            initial={{ opacity: 0, scale: 0.7 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="tree-root-icon">🎓</span>
                            <div className="tree-root-label">Start Your Journey</div>
                        </motion.div>

                        {/* Trunk */}
                        <div className="tree-trunk" />

                        {/* Steps alternating left/right */}
                        {[
                            { step: 1, icon: '📋', title: 'Fill Application', desc: 'Complete the online application form on the official MEC website with your personal and academic details.', color: '#4f8ef7', bg: '#e8f0fe', side: 'left' },
                            { step: 2, icon: '📄', title: 'Upload Documents', desc: 'Upload scanned copies of your 10th & 12th marksheets, photograph, and identity proof.', color: '#34a853', bg: '#e6f4ea', side: 'right' },
                            { step: 3, icon: '🎯', title: 'HSTES Counselling', desc: 'Appear for HSTES counselling or qualify through JEE Main score to get your seat allotment.', color: '#f29900', bg: '#fef7e0', side: 'left' },
                            { step: 4, icon: '🏫', title: 'Report to College', desc: 'Visit the college campus with all original documents for physical verification.', color: '#9334e6', bg: '#f3e8fd', side: 'right' },
                            { step: 5, icon: '✅', title: 'Pay & Register', desc: 'Pay the admission fee and complete your registration to officially secure your seat at MEC!', color: '#16a34a', bg: '#dcfce7', side: 'left' },
                        ].map((item, i) => (
                            <div key={i} className={`tree-branch-row tree-branch-${item.side}`}>
                                {/* Trunk dot */}
                                <motion.div
                                    className="trunk-dot"
                                    style={{ background: item.color, boxShadow: `0 0 0 4px ${item.bg}` }}
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.15 }}
                                />

                                {/* Horizontal branch line */}
                                <motion.div
                                    className="branch-line"
                                    style={{ background: item.color }}
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.15 + 0.1 }}
                                />

                                {/* Step Card */}
                                <motion.div
                                    className="tree-step-card"
                                    initial={{ opacity: 0, x: item.side === 'left' ? -40 : 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.15 + 0.2 }}
                                    whileHover={{ scale: 1.03, boxShadow: `0 12px 36px ${item.color}25` }}
                                >
                                    <div className="tree-step-header" style={{ background: item.color }}>
                                        <span className="tree-step-num">Step {item.step}</span>
                                        <span className="tree-step-icon-sm">{item.icon}</span>
                                    </div>
                                    <div className="tree-step-body">
                                        <div className="tree-icon-circle" style={{ background: item.bg }}>
                                            <span>{item.icon}</span>
                                        </div>
                                        <h4 style={{ color: item.color }}>{item.title}</h4>
                                        <p>{item.desc}</p>
                                    </div>
                                </motion.div>
                            </div>
                        ))}

                        {/* End Node */}
                        <motion.div
                            className="tree-end-node"
                            initial={{ opacity: 0, scale: 0.7 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                        >
                            <span className="tree-root-icon">🏛️</span>
                            <div className="tree-root-label">Welcome to MEC!</div>
                        </motion.div>
                    </div>

                    <motion.div
                        className="diagram-cta"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1.0 }}
                        style={{ marginTop: '50px' }}
                    >
                        <p style={{ fontSize: '1.2rem', color: '#333', fontWeight: 600, marginBottom: '20px' }}>🎓 Ready to begin your journey?</p>
                        <Link to="/contact" className="btn btn-primary" style={{ padding: '14px 40px', fontSize: '1.05rem' }}>Contact Admissions Office →</Link>
                    </motion.div>
                </div>
            </section>
        </>
    )
}
