import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import { aboutData } from '../data/content'

export default function About() {
    return (
        <>
            <PageHeader
                title="About MEC"
                subtitle="Discover our history, vision, mission, and the values that drive us forward"
                breadcrumb="About Us"
            />

            {/* History */}
            <section className="section" style={{ background: 'var(--off-white)' }}>
                <div className="container">
                    <div className="about-preview-grid">
                        <motion.div
                            className="about-preview-img"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="img-placeholder">🏛️</div>
                            <div className="experience-badge">
                                <div className="big-number">15+</div>
                                <div className="small-text">Years of Excellence</div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="about-label">Our Story</span>
                            <h2>Building a Legacy of Learning</h2>
                            <p style={{ marginBottom: 20 }}>{aboutData.history}</p>
                            <p>
                                Approved by AICTE, New Delhi, and affiliated to Deenbandhu Chhotu Ram University of
                                Science & Technology (DCRUST), Murthal, MEC offers B.Tech programs in five engineering
                                disciplines with a total intake of 210 students per year. The college is known for its
                                inclusive approach, offering 50% fee concession for girl students to promote women in engineering.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Director's Message */}
            <section className="section director-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Leadership</span>
                        <h2>Director's Message</h2>
                        <p>A vision for excellence in engineering education</p>
                    </div>
                    <div className="director-grid">
                        <motion.div
                            className="director-image-wrapper"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="director-image-frame">
                                <img src="/images/director.png" alt="Director of Mewat Engineering College" />
                            </div>
                            <div className="director-name-card">
                                <h3>Director</h3>
                                <div className="director-title">Mewat Engineering College</div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="director-message-content"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <span className="director-quote-icon">"</span>
                            <p>
                                Welcome to Mewat Engineering College (WAQF). Our institution is dedicated to providing
                                quality technical education that empowers students from all backgrounds, especially the
                                underserved communities of the Mewat region.
                            </p>
                            <p>
                                We believe in nurturing not just engineers, but responsible citizens who can contribute
                                to the nation's progress. With our experienced faculty, modern infrastructure, and
                                industry-aligned curriculum, we are committed to shaping the future leaders of technology.
                            </p>
                            <p>
                                I invite all aspiring engineers to join our family and embark on a transformative journey
                                of learning and growth.
                            </p>
                            <div className="director-signature">
                                <div className="director-signature-line" />
                                <span>Director, MEC (WAQF)</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Our Purpose</span>
                        <h2>Vision & Mission</h2>
                    </div>
                    <div className="about-vision-mission">
                        <motion.div
                            className="vm-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="vm-icon">🔭</div>
                            <h3>Our Vision</h3>
                            <p>{aboutData.vision}</p>
                        </motion.div>
                        <motion.div
                            className="vm-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <div className="vm-icon">🎯</div>
                            <h3>Our Mission</h3>
                            <ul>
                                {aboutData.mission.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="section" style={{ background: 'var(--off-white)' }}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">What Drives Us</span>
                        <h2>Core Values</h2>
                    </div>
                    <div className="core-values-grid">
                        {aboutData.coreValues.map((value, i) => (
                            <motion.div
                                className="value-card"
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="value-icon">{value.icon}</div>
                                <h4>{value.title}</h4>
                                <p>{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
