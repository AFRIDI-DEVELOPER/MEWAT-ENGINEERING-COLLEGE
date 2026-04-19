import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import { useDepartments } from '../hooks/useSupabase'
import { departments as staticDepartments } from '../data/content'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Departments() {
    const { data: supabaseDepts, loading } = useDepartments()
    const departments = supabaseDepts?.length > 0 ? supabaseDepts : staticDepartments

    return (
        <>
            <section className="section departments-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Academics</span>
                        <h2>All Departments</h2>
                        <p>Explore our comprehensive range of engineering and foundational departments</p>
                    </div>
                    {loading && <LoadingSpinner message="Loading departments..." />}
                    <div className="departments-grid">
                        {departments.map((dept, i) => (
                            <motion.div
                                className={`dept-card dept-card--${dept.id}`}
                                key={dept.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                            >
                                <div className="dept-card__header">
                                    <img className="dept-card__icon" src={dept.iconImg} alt={dept.shortName} />
                                    <div className="dept-card__shortname">{dept.shortName}</div>
                                </div>
                                <div className="dept-card__body">
                                    <h3 className="dept-card__title">{dept.name}</h3>
                                    {dept.seats ? (
                                        <span className="dept-card__seats">🎓 {dept.seats} Seats</span>
                                    ) : (
                                        <span className="dept-card__seats dept-card__seats--foundation">📌 Foundation Department</span>
                                    )}
                                    <p className="dept-card__desc">{dept.description}</p>
                                    <div className="dept-card__tags">
                                        {dept.highlights.slice(0, 3).map((h, j) => (
                                            <span key={j} className="dept-card__tag">{h}</span>
                                        ))}
                                    </div>
                                    <Link to={`/departments/${dept.id}`} className="dept-card__btn">
                                        Explore Department
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
