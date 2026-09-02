import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

export default function NotFound() {
    return (
        <>
            <SEO title="Page Not Found" description="The page you are looking for does not exist." />
            <section style={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-primary, #0d1117)',
                padding: '40px 20px',
                textAlign: 'center'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px',
                        padding: '4rem 2rem',
                        maxWidth: '600px',
                        width: '100%',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
                    }}
                >
                    <h1 style={{
                        fontSize: '6rem',
                        fontWeight: '800',
                        color: '#c9a84c',
                        margin: '0 0 1rem 0',
                        lineHeight: '1'
                    }}>404</h1>
                    <h2 style={{
                        fontSize: '2rem',
                        color: '#fff',
                        marginBottom: '1rem'
                    }}>Page Not Found</h2>
                    <p style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '1.1rem',
                        marginBottom: '2.5rem',
                        lineHeight: '1.6'
                    }}>
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                    <Link to="/" style={{
                        display: 'inline-block',
                        background: '#c9a84c',
                        color: '#111',
                        padding: '0.8rem 2rem',
                        borderRadius: '8px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 4px 15px rgba(201,168,76,0.3)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(201,168,76,0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(201,168,76,0.3)';
                    }}
                    >
                        Return to Home
                    </Link>
                </motion.div>
            </section>
        </>
    )
}
