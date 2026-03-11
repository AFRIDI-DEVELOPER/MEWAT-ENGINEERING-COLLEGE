import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import { departments } from '../data/content'

export default function Departments() {
    return (
        <>
            <PageHeader
                title="Our Departments"
                subtitle="Explore our six academic departments offering world-class engineering education"
            />

            <section className="section" style={{ background: 'var(--off-white)' }}>
                <div className="container">
                    <div className="departments-grid">
                        {departments.map((dept, i) => (
                            <motion.div
                                className="dept-card"
                                key={dept.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                style={{ cursor: 'default' }}
                            >
                                <div className="dept-card-icon">{dept.icon}</div>
                                <h3>{dept.name}</h3>
                                {dept.seats && <div className="dept-seats">{dept.seats} Seats</div>}
                                {!dept.seats && <div className="dept-seats" style={{ color: 'var(--secondary)' }}>Foundation Department</div>}
                                <p>{dept.description}</p>
                                <div className="dept-highlights">
                                    {dept.highlights.map((h, j) => <span key={j}>{h}</span>)}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Department Info Banner */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                        <div className="stat-item">
                            <div className="stat-value">5</div>
                            <div className="stat-label">B.Tech Programs</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">210</div>
                            <div className="stat-label">Total Seats</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">50+</div>
                            <div className="stat-label">Faculty Members</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">4 Yrs</div>
                            <div className="stat-label">Program Duration</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
