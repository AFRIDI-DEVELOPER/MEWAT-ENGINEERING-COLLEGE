import { motion } from 'framer-motion'
import { FiBriefcase } from 'react-icons/fi'
import { Link } from 'react-router-dom'

// Actual Alumni Data from the presentation
const placeholderAlumni = [
    { name: 'Dipanshu Garg', job: 'M.Tech. IIT BOMBAY', company: 'GATE-2024, AIR-48, CSE', photo: '/alumni/dipanshu.png' },
    { name: 'Aslam', job: 'GATE-2025, CSE', company: 'AIR-410', photo: '/alumni/aslam.png' },
    { name: 'Sammi', job: 'GATE-2025, CSE', company: 'AIR-8129', photo: '/alumni/sammi.png' },
    { name: 'Mohsin Anwar', job: 'M.Tech. JNU', company: 'CUET-PG-2025 DS/AI', photo: '/alumni/mohsin.png' },
    { name: 'Prashant Kumar Singh', job: 'M.Tech. AI/ML', company: 'Delhi Technical University', photo: '/alumni/prashant.png' },
    { name: 'Mohd Faisal', job: 'M.Tech. Data Science', company: 'Jamia Millia Islamia', photo: '/alumni/faisal.png' },
    { name: 'Samina Parween', job: 'M.Tech. Power System', company: 'Aligarh Muslim University', photo: '/alumni/samina.png' },
    { name: 'Mohammad Shaban', job: 'JRF', company: 'BITS PILANI Hyderabad', photo: '/alumni/shaban.png' },
    { name: 'Mohammad Uzair', job: 'M.Tech. Green Energy', company: 'Aligarh Muslim University', photo: '/alumni/uzair.png' },
    { name: 'Juned Akram', job: 'M.Tech. Data Science', company: 'Jamia Millia Islamia', photo: '/alumni/juned.png' },
    { name: 'Haris Shoaib', job: 'M.Tech. AI', company: 'Aligarh Muslim University', photo: '/alumni/harish.png' },
    { name: 'Madiha Viqar', job: 'MBA, IT', company: 'Jamia Millia Islamia', photo: '/alumni/madiha.png' },
    { name: 'Majid Khan', job: 'Ph.D.', company: 'IIT, Mandi', photo: '/alumni/majid.png' },
    { name: 'Imtiyaz Najar', job: 'Ph.D. & Postdoctoral Fellow', company: 'University of Malaysia Sarawak', photo: '/alumni/imtiyaz.png' },
    { name: 'Mohd Raheel Shams', job: 'M.Tech. Green Energy and Sustainable Development', company: 'Aligarh Muslim University', photo: '/alumni/raheel.png' },
    { name: 'Ruksina Khan', job: 'M.Tech. AI', company: 'Jamia Millia Islamia', photo: '/alumni/ruksina.png' }
]

export default function AlumniShowcase() {
    const row1 = placeholderAlumni.slice(0, 8);
    const row2 = placeholderAlumni.slice(8, 16);

    const renderCard = (alumnus, idx, rowIndex) => (
        <div 
            key={`${rowIndex}-${idx}`}
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
                cursor: 'pointer',
                width: '300px',
                flexShrink: 0
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
            <h3 style={{ 
                fontFamily: "'Kanit', sans-serif", 
                fontSize: '1.3rem', 
                fontWeight: 700, 
                color: '#1A1A1A',
                margin: '0 0 10px 0'
            }}>
                {alumnus.name}
            </h3>
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
                <FiBriefcase style={{ color: '#007BFF', flexShrink: 0 }} />
                <span>{alumnus.job} at <strong>{alumnus.company}</strong></span>
            </div>
        </div>
    );

    return (
        <section style={{ padding: '100px 20px', background: '#ffffff', overflow: 'hidden' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto' }}>
                
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

                {/* Marquee Row 1 (Right to Left) */}
                <div className="alumni-marquee-container alumni-marquee-left">
                    <div className="alumni-marquee-track">
                        {row1.map((alumnus, idx) => renderCard(alumnus, idx, 1))}
                        {row1.map((alumnus, idx) => renderCard(alumnus, idx + row1.length, 1))}
                    </div>
                </div>

                {/* Marquee Row 2 (Left to Right) */}
                <div className="alumni-marquee-container alumni-marquee-right">
                    <div className="alumni-marquee-track">
                        {row2.map((alumnus, idx) => renderCard(alumnus, idx, 2))}
                        {row2.map((alumnus, idx) => renderCard(alumnus, idx + row2.length, 2))}
                    </div>
                </div>

                {/* View All Alumni Button */}
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <Link to="/alumni" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        View All Alumni
                    </Link>
                </div>

            </div>
        </section>
    )
}
