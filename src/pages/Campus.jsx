import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import { facilities } from '../data/content'

export default function Campus() {
    return (
        <>
            <PageHeader
                title="Campus Life"
                subtitle="Experience a vibrant campus with modern facilities, sports, hostels, and a thriving student community"
            />

            <section className="section" style={{ background: 'var(--off-white)' }}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Infrastructure</span>
                        <h2>Our Facilities</h2>
                        <p>State-of-the-art infrastructure designed for holistic development</p>
                    </div>
                    <div className="facilities-grid">
                        {facilities.map((facility, i) => (
                            <motion.div
                                className="facility-card"
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="facility-icon">{facility.icon}</div>
                                <h3>{facility.name}</h3>
                                <p>{facility.description}</p>
                                <div className="facility-features">
                                    {facility.features.map((f, j) => <span key={j}>{f}</span>)}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Campus Highlights Banner */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                        <div className="stat-item">
                            <div className="stat-value">15</div>
                            <div className="stat-label">Acre Campus</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">18K+</div>
                            <div className="stat-label">Library Books</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">10+</div>
                            <div className="stat-label">Modern Labs</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">24/7</div>
                            <div className="stat-label">Campus Security</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Campus Life Description */}
            <section className="section">
                <div className="container">
                    <div className="about-preview-grid">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="about-label">Student Life</span>
                            <h2>Beyond the Classroom</h2>
                            <p style={{ marginBottom: 20 }}>
                                At MEC, we believe in the holistic development of our students. Beyond academics,
                                our campus offers a vibrant environment for extracurricular activities, sports,
                                cultural events, and technical clubs.
                            </p>
                            <p style={{ marginBottom: 20 }}>
                                The annual technical fest <strong>TechMEC</strong> brings together students from
                                across the region for hackathons, coding competitions, and robotics challenges.
                                Our sports teams regularly participate in inter-college tournaments.
                            </p>
                            <div className="about-features">
                                <div className="about-feature"><span className="check">✓</span> Annual Tech Fest</div>
                                <div className="about-feature"><span className="check">✓</span> Cultural Programs</div>
                                <div className="about-feature"><span className="check">✓</span> Technical Clubs</div>
                                <div className="about-feature"><span className="check">✓</span> Sports Tournaments</div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="about-preview-img"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="img-placeholder" style={{ background: 'var(--grad-accent)', color: 'rgba(0,0,0,0.1)' }}>🎓</div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    )
}
