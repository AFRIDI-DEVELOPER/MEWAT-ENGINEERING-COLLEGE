import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { departments, highlights, testimonials, events, stats } from '../data/content'
import AnimatedCounter from '../components/AnimatedCounter'

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
    })
}

export default function Home() {
    return (
        <>
            {/* ===== HERO ===== */}
            <section className="hero">
                <div className="hero-bg-pattern" />
                <div className="hero-grid" />
                <div className="hero-orb orb-1" />
                <div className="hero-orb orb-2" />
                <div className="container">
                    <motion.div className="hero-content" initial="hidden" animate="visible">
                        <motion.div className="hero-badge" variants={fadeUp}>
                            🎓 AICTE Approved · DCRUST Affiliated
                        </motion.div>
                        <motion.h1 variants={fadeUp} custom={1}>
                            Shaping the <span>Future</span> of Engineering Education
                        </motion.h1>
                        <motion.p variants={fadeUp} custom={2}>
                            Mewat Engineering College (WAQF) — A premier institution in Nuh, Haryana, committed to
                            producing world-class engineers with strong values and practical skills.
                        </motion.p>
                        <motion.div className="hero-buttons" variants={fadeUp} custom={3}>
                            <Link to="/admissions" className="btn btn-accent">Apply Now →</Link>
                            <Link to="/about" className="btn btn-outline">Explore College</Link>
                        </motion.div>
                        <motion.div className="hero-stats-row" variants={fadeUp} custom={4}>
                            <div className="hero-stat">
                                <div className="number">500+</div>
                                <div className="label">Placed</div>
                            </div>
                            <div className="hero-stat">
                                <div className="number">AIR 48</div>
                                <div className="label">Best GATE</div>
                            </div>
                            <div className="hero-stat">
                                <div className="number">210</div>
                                <div className="label">Seats</div>
                            </div>
                            <div className="hero-stat">
                                <div className="number">6</div>
                                <div className="label">Departments</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="hero-visual"
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="hero-card-stack">
                            <div className="hero-main-card">
                                <div className="card-header">
                                    <div className="card-icon">🏛️</div>
                                    <div>
                                        <h3>MEC at a Glance</h3>
                                        <span>Accreditations & Approvals</span>
                                    </div>
                                </div>
                                <div className="accreditation-badges">
                                    <div className="accreditation-badge">
                                        <div className="badge-icon">✅</div>
                                        <div className="badge-name">AICTE</div>
                                        <div className="badge-desc">Approved</div>
                                    </div>
                                    <div className="accreditation-badge">
                                        <div className="badge-icon">🎓</div>
                                        <div className="badge-name">DCRUST</div>
                                        <div className="badge-desc">Affiliated</div>
                                    </div>
                                    <div className="accreditation-badge">
                                        <div className="badge-icon">📊</div>
                                        <div className="badge-name">5 B.Tech</div>
                                        <div className="badge-desc">Programs</div>
                                    </div>
                                    <div className="accreditation-badge">
                                        <div className="badge-icon">👩‍🎓</div>
                                        <div className="badge-name">50% Off</div>
                                        <div className="badge-desc">For Girls</div>
                                    </div>
                                </div>
                            </div>
                            <motion.div
                                className="hero-float-card card-1"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <div className="float-icon">🏆</div>
                                <div>
                                    <div className="float-text">GATE AIR 48</div>
                                    <div className="float-sub">Top Performer</div>
                                </div>
                            </motion.div>
                            <motion.div
                                className="hero-float-card card-2"
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <div className="float-icon">💼</div>
                                <div>
                                    <div className="float-text">100% Placement</div>
                                    <div className="float-sub">Assistance</div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===== HIGHLIGHTS ===== */}
            <section className="section highlights">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Why MEC</span>
                        <h2>What Makes Us Stand Out</h2>
                        <p>Our commitment to excellence sets us apart as one of the leading engineering institutions in the region</p>
                    </div>
                    <div className="highlights-grid">
                        {highlights.map((item, i) => (
                            <motion.div
                                className="highlight-card"
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="highlight-icon">{item.icon}</div>
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== ABOUT PREVIEW ===== */}
            <section className="section about-preview">
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
                            className="about-preview-content"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="about-label">About Us</span>
                            <h2>Empowering Engineers, Transforming Lives</h2>
                            <p>
                                Mewat Engineering College (WAQF) is a premier engineering institution situated in the serene
                                surroundings of Village Palla, District Nuh. Committed to transforming lives through quality
                                technical education, we offer programs in 5 engineering disciplines.
                            </p>
                            <div className="about-features">
                                <div className="about-feature">
                                    <span className="check">✓</span> AICTE Approved Programs
                                </div>
                                <div className="about-feature">
                                    <span className="check">✓</span> Experienced Faculty
                                </div>
                                <div className="about-feature">
                                    <span className="check">✓</span> Modern Laboratories
                                </div>
                                <div className="about-feature">
                                    <span className="check">✓</span> 100% Placement Support
                                </div>
                            </div>
                            <Link to="/about" className="btn btn-primary">Learn More →</Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== DIRECTOR'S MESSAGE ===== */}
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

            {/* ===== DEPARTMENTS ===== */}
            <section className="section departments-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Academics</span>
                        <h2>Our Departments</h2>
                        <p>Six departments offering cutting-edge curricula across various engineering disciplines</p>
                    </div>
                    <div className="departments-grid">
                        {departments.map((dept, i) => (
                            <motion.div
                                className="dept-card"
                                key={dept.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                            >
                                <div className="dept-card-icon">{dept.icon}</div>
                                <h3>{dept.shortName}</h3>
                                {dept.seats && <div className="dept-seats">{dept.seats} Seats</div>}
                                <p>{dept.description}</p>
                                <div className="dept-highlights">
                                    {dept.highlights.map((h, j) => <span key={j}>{h}</span>)}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== STATS ===== */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((s, i) => (
                            <div className="stat-item" key={i}>
                                <div className="stat-value">
                                    <AnimatedCounter end={s.value} suffix={s.suffix} />
                                </div>
                                <div className="stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== EVENTS ===== */}
            <section className="section events-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Happenings</span>
                        <h2>News & Events</h2>
                        <p>Stay updated with the latest events, workshops, and activities at MEC</p>
                    </div>
                    <div className="events-grid">
                        {events.map((event, i) => (
                            <motion.div
                                className="event-card"
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                            >
                                <div className="event-date">
                                    <div className="month">{event.date.split(' ')[0]}</div>
                                    <div className="year">{event.date.split(' ')[1]}</div>
                                </div>
                                <div className="event-info">
                                    <span className={`event-type ${event.type}`}>{event.type}</span>
                                    <h4>{event.title}</h4>
                                    <p>{event.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIALS ===== */}
            <section className="section testimonials-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Testimonials</span>
                        <h2>What Our Students Say</h2>
                        <p>Hear from our alumni about their transformative experience at MEC</p>
                    </div>
                    <div className="testimonials-grid">
                        {testimonials.map((t, i) => (
                            <motion.div
                                className="testimonial-card"
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="testimonial-quote">{t.quote}</div>
                                <div className="testimonial-author">
                                    <div className="testimonial-avatar">{t.avatar}</div>
                                    <div>
                                        <div className="testimonial-name">{t.name}</div>
                                        <div className="testimonial-branch">{t.branch}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="cta-section">
                <div className="container">
                    <motion.div
                        className="cta-card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>Begin Your Engineering Journey</h2>
                        <p>
                            Join Mewat Engineering College and be part of a legacy of excellence.
                            Applications are open for the upcoming academic session.
                        </p>
                        <div className="cta-buttons">
                            <Link to="/admissions" className="btn btn-accent">Apply Now →</Link>
                            <Link to="/contact" className="btn btn-outline">Contact Us</Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}
