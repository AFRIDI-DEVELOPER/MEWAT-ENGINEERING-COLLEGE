import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks } from '../data/content'
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [isHiding, setIsHiding] = useState(false)
    const [isFloating, setIsFloating] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const onScroll = () => {
            const scrollY = window.scrollY
            const heroHeight = window.innerHeight
            
            // Keeps top-bar visible until hero section is 100% scrolled
            setScrolled(scrollY > heroHeight)
            
            // Show floating navbar when the green container (director-section) touches the top
            const directorSection = document.querySelector('.director-section')
            if (directorSection) {
                const rect = directorSection.getBoundingClientRect()
                setIsFloating(rect.top <= 7) // 7px gap allowance
            } else {
                // Fallback for subpages or missing section
                setIsFloating(scrollY > heroHeight + 100)
            }
        }
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        setMobileOpen(false)
    }, [location])

    return (
        <>
            <nav className={`navbar-wrapper ${scrolled ? 'scrolled' : ''} ${isHiding ? 'hiding' : ''} ${isFloating ? 'floating' : ''}`}>
                <div className="top-bar">
                    <div className="container">
                        <div className="top-bar-left">
                            <a href="tel:+911267272045"><FiPhone size={13} /> +91-1267-272045</a>
                            <a href="mailto:info@mecw.ac.in"><FiMail size={13} /> info@mecw.ac.in</a>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FiMapPin size={13} /> Village Palla, Nuh, Haryana</span>
                        </div>
                        <div className="top-bar-right">
                            <a href="#" aria-label="Facebook"><FaFacebook /></a>
                            <a href="#" aria-label="Twitter"><FaTwitter /></a>
                            <a href="#" aria-label="Instagram"><FaInstagram /></a>
                            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
                        </div>
                    </div>
                </div>
                <div className="main-nav">
                    <div className="container">
                        <Link to="/" className="nav-logo">
                            <div className="logo-emblem">
                                <img src="/images/college-logo.png" alt="MEC Logo" className="logo-image" />
                            </div>
                            <div className="logo-text">
                                <div className="logo-title-row">
                                    <h3>MEC</h3>
                                    <span className="logo-waqf">WAQF</span>
                                </div>
                                <span className="logo-subtitle">MEWAT ENGINEERING COLLEGE</span>
                            </div>
                        </Link>
                        <div className="nav-links">
                            {navLinks.map(link => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={location.pathname === link.path ? 'active' : ''}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link to="/student-portal" className="nav-apply-btn">
                                <span className="btn-text">STUDENT PORTAL</span>
                            </Link>
                        </div>
                        <button
                            className={`hamburger ${mobileOpen ? 'open' : ''}`}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle navigation"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </nav>
            <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
                {navLinks.map(link => (
                    <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setMobileOpen(false)}
                    >
                        {link.name}
                    </Link>
                ))}
                <Link to="/student-portal" className="btn btn-primary" onClick={() => setMobileOpen(false)}>
                    <span className="btn-text">STUDENT PORTAL</span>
                </Link>
            </div>
        </>
    )
}
