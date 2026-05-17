import { motion } from 'framer-motion'

import AnimatedCounter from '../components/AnimatedCounter'
import { useRecruiters, useStats } from '../hooks/useSupabase'
import { recruiters as staticRecruiters } from '../data/content'
import SEO from '../components/SEO'
import LoadingSpinner from '../components/LoadingSpinner'
import { FaBriefcase, FaTrophy, FaBuilding, FaChartLine, FaCheck } from 'react-icons/fa6'

export default function Placements() {
    const { data: supabaseRecruiters, loading: recruitersLoading } = useRecruiters()
    const { data: supabaseStats } = useStats()

    const recruiters = staticRecruiters // Use local data for real info
    const placementStats = [
        { icon: <FaBriefcase />, number: 500, suffix: '+', text: 'Students Placed' },
        { icon: <FaTrophy />, number: 48,  suffix: '',  text: 'Best GATE AIR' },
        { icon: <FaBuilding />, number: 30,  suffix: '+', text: 'Recruiting Companies' },
        { icon: <FaChartLine />, number: 100, suffix: '%', text: 'Placement Assistance' }
    ]

    return (
        <>
            <SEO title="Placements" description="Discover our placement success stories and the leading companies that recruit from MEC." />


            {/* Stats */}
            <section className="section" style={{ background: 'var(--off-white)' }}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Track Record</span>
                        <h2>Placement Highlights</h2>
                        <p>Numbers that speak for themselves</p>
                    </div>
                    <div className="placements-stats-grid">
                        {placementStats.map((stat, i) => (
                            <motion.div
                                className="placement-stat-card"
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="stat-icon">{stat.icon}</div>
                                <div className="stat-number">
                                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                                </div>
                                <div className="stat-text">{stat.text}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Placement Cell */}
            <section className="section">
                <div className="container">
                    <div className="about-preview-grid">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="about-label">Placement Cell</span>
                            <h2>Your Career Partner</h2>
                            <p style={{ marginBottom: 20 }}>
                                The Training & Placement Cell at MEC is dedicated to bridging the gap between academics
                                and industry. We organize regular placement drives, industry interactions, mock interviews,
                                and skill development workshops to ensure our students are industry-ready.
                            </p>
                            <p style={{ marginBottom: 20 }}>
                                Our students have excelled in competitive exams like GATE, with the best rank being
                                <strong> AIR 48</strong>. Over 50 students have qualified GATE, showcasing the quality
                                of education at MEC.
                            </p>
                            <div className="about-features">
                                <div className="about-feature"><span className="check"><FaCheck /></span> Resume Building Workshops</div>
                                <div className="about-feature"><span className="check"><FaCheck /></span> Mock Interview Sessions</div>
                                <div className="about-feature"><span className="check"><FaCheck /></span> Industry Expert Talks</div>
                                <div className="about-feature"><span className="check"><FaCheck /></span> Soft Skills Training</div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="about-preview-img"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="img-placeholder" style={{ background: 'var(--grad-secondary)', fontSize: '4rem' }}><FaBriefcase /></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Recruiters */}
            <section className="section" style={{ background: 'var(--off-white)' }}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Our Partners</span>
                        <h2>Top Recruiters</h2>
                        <p>Leading companies that trust MEC graduates</p>
                    </div>
                    {recruitersLoading && <LoadingSpinner message="Loading recruiters..." />}
                    <div className="recruiters-grid">
                        {recruiters.map((name, i) => (
                            <motion.div
                                className="recruiter-badge"
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: i * 0.04 }}
                            >
                                {name}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
