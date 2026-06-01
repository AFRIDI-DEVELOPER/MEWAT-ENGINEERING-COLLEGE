import { aboutData } from '../data/content'
import { getAssetPath } from '../utils/assets'
import { motion } from 'framer-motion'
import CEOMessage from '../components/CEOMessage'
import DirectorMessage from '../components/DirectorMessage'
import AdministratorMessage from '../components/AdministratorMessage'
import AboutPreview from '../components/AboutPreview'
import SEO from '../components/SEO'

export default function About() {
    return (
        <>
            <SEO title="About Us" description="Learn about the history, vision, and mission of Mewat Engineering College (WAQF)." />

            <CEOMessage />
            <AboutPreview showLink={false} />
            <DirectorMessage />
            <AdministratorMessage />

            {/* History Detail */}
            <section id="our-history" className="section" style={{ background: 'var(--off-white)' }}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Our Journey</span>
                        <h2>Building a Legacy of Learning</h2>
                    </div>
                    <div className="about-history-content">
                        <p style={{ marginBottom: 20, fontSize: '1.1rem', lineHeight: '1.8' }}>{aboutData.history}</p>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                            Approved by AICTE, New Delhi, and affiliated to Deenbandhu Chhotu Ram University of
                            Science & Technology (DCRUST), Murthal, MEC offers B.Tech programs in five engineering
                            disciplines with a total intake of 210 students per year. The college is known for its
                            inclusive approach, offering 50% fee concession for girl students to promote women in engineering.
                        </p>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section id="vision-mission" className="section">
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
                            <div className="vm-icon">{'\uD83D\uDD2D'}</div>
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
                            <div className="vm-icon">{'\uD83C\uDFAF'}</div>
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
            <section id="core-values" className="section" style={{ background: 'var(--off-white)' }}>
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
