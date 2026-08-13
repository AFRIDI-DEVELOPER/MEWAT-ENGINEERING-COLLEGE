import { motion } from 'framer-motion'
import { FiBriefcase } from 'react-icons/fi'

// Actual Alumni Data from the presentation
const placeholderAlumni = [
    {
        name: 'Dipanshu Garg',
        job: 'M.Tech. IIT BOMBAY',
        company: 'GATE-2024, AIR-48, CSE',
        photo: '/alumni/dipanshu.png'
    },
    {
        name: 'Aslam',
        job: 'GATE-2025, CSE',
        company: 'AIR-410',
        photo: '/alumni/aslam.png'
    },
    {
        name: 'Sammi',
        job: 'GATE-2025, CSE',
        company: 'AIR-8129',
        photo: '/alumni/sammi.png'
    },
    {
        name: 'Mohsin Anwar',
        job: 'M.Tech. JNU',
        company: 'CUET-PG-2025 DS/AI',
        photo: '/alumni/mohsin.png'
    },
    {
        name: 'Prashant Kumar Singh',
        job: 'M.Tech. AI/ML',
        company: 'Delhi Technical University',
        photo: '/alumni/prashant.png'
    },
    {
        name: 'Mohd Faisal',
        job: 'M.Tech. Data Science',
        company: 'Jamia Millia Islamia',
        photo: '/alumni/faisal.png'
    },
    {
        name: 'Samina Parween',
        job: 'M.Tech. Power System',
        company: 'Aligarh Muslim University',
        photo: '/alumni/samina.png'
    },
    {
        name: 'Mohammad Shaban',
        job: 'JRF',
        company: 'BITS PILANI Hyderabad',
        photo: '/alumni/shaban.png'
    },
    {
        name: 'Mohammad Uzair',
        job: 'M.Tech. Green Energy',
        company: 'Aligarh Muslim University',
        photo: '/alumni/uzair.png'
    },
    {
        name: 'Juned Akram',
        job: 'M.Tech. Data Science',
        company: 'Jamia Millia Islamia',
        photo: '/alumni/juned.png'
    },
    {
        name: 'Haris Shoaib',
        job: 'M.Tech. AI',
        company: 'Aligarh Muslim University',
        photo: '/alumni/harish.png'
    },
    {
        name: 'Madiha Viqar',
        job: 'MBA, IT',
        company: 'Jamia Millia Islamia',
        photo: '/alumni/madiha.png'
    },
    {
        name: 'Majid Khan',
        job: 'Ph.D.',
        company: 'IIT, Mandi',
        photo: '/alumni/majid.png'
    },
    {
        name: 'Imtiyaz Najar',
        job: 'Ph.D. & Postdoctoral Fellow',
        company: 'University of Malaysia Sarawak',
        photo: '/alumni/imtiyaz.png'
    },
    {
        name: 'Mohd Raheel Shams',
        job: 'M.Tech. Green Energy and Sustainable Development',
        company: 'Aligarh Muslim University',
        photo: '/alumni/raheel.png'
    },
    {
        name: 'Ruksina Khan',
        job: 'M.Tech. AI',
        company: 'Jamia Millia Islamia',
        photo: '/alumni/ruksina.png'
    }
]

export default function AlumniShowcase() {
    return (
        <section style={{ padding: '100px 20px', background: '#ffffff' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <span style={{ 
                        fontFamily: "'Kanit', sans-serif", 
                        color: '#666', 
                        textTransform: 'uppercase', 
                        letterSpacing: '2px', 
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        display: 'inline-block',
                        marginBottom: '10px'
                    }}>
                        Our Legacy
                    </span>
                    <h2 style={{ 
                        fontFamily: "'Poppins', sans-serif", 
                        fontSize: 'clamp(2rem, 4vw, 3rem)', 
                        fontWeight: 800, 
                        color: '#1A1A1A',
                        margin: 0
                    }}>
                        Our Proud Alumni
                    </h2>
                    <p style={{ 
                        fontFamily: "'Inter', sans-serif",
                        color: '#666', 
                        fontSize: '1.1rem',
                        maxWidth: '600px',
                        margin: '15px auto 0'
                    }}>
                        Meet the brilliant minds who started their journey with us and are now making an impact across top organizations globally.
                    </p>
                </div>

                {/* Alumni Grid */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
                    gap: '30px' 
                }}>
                    {placeholderAlumni.map((alumnus, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            style={{
                                background: '#f8f9fa',
                                borderRadius: '24px',
                                padding: '24px',
                                border: '1px solid rgba(0,0,0,0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)'
                                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.08)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = 'none'
                            }}
                        >
                            {/* Photo */}
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                marginBottom: '20px',
                                border: '4px solid #ffffff',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                            }}>
                                <img 
                                    src={alumnus.photo} 
                                    alt={alumnus.name} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>

                            {/* Name */}
                            <h3 style={{ 
                                fontFamily: "'Kanit', sans-serif", 
                                fontSize: '1.3rem', 
                                fontWeight: 700, 
                                color: '#1A1A1A',
                                margin: '0 0 10px 0'
                            }}>
                                {alumnus.name}
                            </h3>

                            {/* Job / Company */}
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: '#ffffff',
                                padding: '8px 16px',
                                borderRadius: '50px',
                                border: '1px solid rgba(0,0,0,0.06)',
                                color: '#444',
                                fontSize: '0.85rem',
                                fontWeight: 500,
                                fontFamily: "'Inter', sans-serif",
                            }}>
                                <FiBriefcase style={{ color: '#007BFF' }} />
                                <span>{alumnus.job} at <strong>{alumnus.company}</strong></span>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}
