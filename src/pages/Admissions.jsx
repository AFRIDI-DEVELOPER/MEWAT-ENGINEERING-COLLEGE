import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { getAssetPath } from '../utils/assets'
import { admissionInfo, departments as staticDepartments } from '../data/content'
import { useDepartments } from '../hooks/useSupabase'

export default function Admissions() {
    const { data: sbDepts } = useDepartments()
    const departments = staticDepartments // Use local data for real info
    const programs = departments
        .filter(d => d.seats)
        .map(d => ({ name: `B.Tech in ${d.name}`, seats: d.seats, duration: '4 Years' }))
    return (
        <>
            <SEO title="Admissions" description="Explore our B.Tech programs and find out how to apply to Mewat Engineering College." />


            {/* Eligibility + Fee Structure */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Get Started</span>
                        <h2>Admission Process</h2>
                        <p>Follow these simple steps to secure your seat at MEC</p>
                    </div>
                    <div className="admission-content">
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                            <h3 style={{ marginBottom: 12, fontFamily: "'Kanit', sans-serif", fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary-dark)', letterSpacing: '-0.01em', lineHeight: 1.1 }}>Eligibility</h3>
                            <p style={{ marginBottom: 28 }}>{admissionInfo.eligibility}</p>
                            
                            <motion.img 
                                src={getAssetPath('/images/admission-illustration-parents.png')} 
                                alt="Admission Illustration"
                                style={{ width: '100%', maxWidth: '450px', marginTop: '30px', alignSelf: 'center' }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            />
                        </div>

                        <motion.div
                            className="fee-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3>Fee Structure</h3>
                            <div className="fee-item">
                                <span className="fee-label">Tuition Fee (Boys)</span>
                                <span className="fee-value">{admissionInfo.feeStructure.tuitionFeeBoys}</span>
                            </div>
                            <div className="fee-item">
                                <span className="fee-label">Tuition Fee (Girls)</span>
                                <span className="fee-value">{admissionInfo.feeStructure.tuitionFeeGirls}</span>
                            </div>
                            <div className="fee-item">
                                <span className="fee-label">Hostel Fee</span>
                                <span className="fee-value">{admissionInfo.feeStructure.hostelFee}</span>
                            </div>
                            <div className="fee-item">
                                <span className="fee-label">Scholarships</span>
                                <span className="fee-value">Available</span>
                            </div>
                            <div className="fee-highlight">
                                <p>{'\uD83D\uDC69\u200D\uD83C\uDF93'} {admissionInfo.feeStructure.girlsDiscount}</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Root Tree Diagram */}
            <section className="section admission-diagram-section">
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
                    >
                        <p>🎓 Ready to begin your journey?</p>
                        <Link to="/contact" className="btn btn-primary">Contact Admissions Office →</Link>
                    </motion.div>
                </div>
            </section>

            {/* Programs Table */}
            <section className="section" style={{ background: 'var(--off-white)' }}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Programs</span>
                        <h2>Programs Offered</h2>
                        <p>Choose from our range of AICTE-approved B.Tech programs</p>
                    </div>
                    <motion.table
                        className="programs-table"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <thead>
                            <tr>
                                <th>Program</th>
                                <th>Duration</th>
                                <th>Seats</th>
                            </tr>
                        </thead>
                        <tbody>
                            {programs.map((prog, i) => (
                                <tr key={i}>
                                    <td><strong>{prog.name}</strong></td>
                                    <td>{prog.duration}</td>
                                    <td>{prog.seats}</td>
                                </tr>
                            ))}
                        </tbody>
                    </motion.table>

                    <div style={{ textAlign: 'center', marginTop: 40 }}>
                        <Link to="/contact" className="btn btn-primary">Contact Admissions Office →</Link>
                    </div>
                </div>
            </section>
        </>
    )
}
