import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

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


            {/* Eligibility */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Get Started</span>
                        <h2>Admission Process</h2>
                        <p>Follow these simple steps to secure your seat at MEC</p>
                    </div>
                    <div className="admission-content">
                        <div>
                            <h3 style={{ marginBottom: 8 }}>Eligibility</h3>
                            <p style={{ marginBottom: 28 }}>{admissionInfo.eligibility}</p>

                            <h3 style={{ marginBottom: 16 }}>Application Steps</h3>
                            <div className="admission-steps">
                                {admissionInfo.process.map((step, i) => (
                                    <motion.div
                                        className="admission-step"
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
                                    >
                                        <div className="step-number">{i + 1}</div>
                                        <p style={{ color: 'var(--charcoal)' }}>{step}</p>
                                    </motion.div>
                                ))}
                            </div>
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
