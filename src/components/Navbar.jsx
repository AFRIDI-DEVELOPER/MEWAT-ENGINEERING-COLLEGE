import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks, recruiters } from '../data/content'
import { FiPhone, FiMail, FiMapPin, FiShield } from 'react-icons/fi'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { getAssetPath } from '../utils/assets'
import { isPortalPage } from '../utils/navigation'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [isFloating, setIsFloating] = useState(false)
    const [atTop, setAtTop] = useState(true)   // true = page is at the very top
    const [mobileOpen, setMobileOpen] = useState(false)
    const location = useLocation()
    const isPortal = isPortalPage(location.pathname)

    useEffect(() => {
        const onScroll = () => {
            if (isPortal) return
            const y = window.scrollY
            setScrolled(true)
            setIsFloating(true)
            setAtTop(y < 80)
        }
        // On mount: only float on portal pages or if already scrolled
        setIsFloating(true)
        setScrolled(true)
        setAtTop(window.scrollY < 80)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [isPortal])

    // Specific effect to handle portal state immediately
    useEffect(() => {
        setIsFloating(true)
        setScrolled(true)
        setAtTop(window.scrollY < 80)
    }, [isPortal])

    useEffect(() => {
        setMobileOpen(false)
    }, [location])

    return (
        <>
            <nav className={`navbar-wrapper ${scrolled ? 'scrolled' : ''} ${isFloating ? 'floating' : ''} ${atTop && !isPortal ? 'at-top' : ''}`}>
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
                                <img src={getAssetPath('/images/mewatengineering logo.png')} alt="MEC Logo" className="logo-image" />
                            </div>
                            <div className="logo-text">
                                <div className="logo-title-row">
                                    <h3>MEC</h3>
                                    <span className="logo-waqf">WAQF</span>
                                </div>
                                <span className="logo-subtitle">MEWAT ENGINEERING COLLEGE</span>
                            </div>
                        </Link>
                        {isPortal && (
                            <div className="nav-links" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                {location.pathname === '/student-portal' && (
                                    <Link to="/admin" className="portal-nav-btn admin-btn">
                                        <FiShield size={14} />
                                        <span>Admin</span>
                                    </Link>
                                )}
                                <Link to="/" className="portal-nav-btn home-btn">
                                    BACK TO HOME
                                </Link>
                            </div>
                        )}
                        {!isPortal && (
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
                        )}
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
                {!isPortal ? (
                    <>
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
                    </>
                ) : (
                    <Link to="/" className="back-home-button" onClick={() => setMobileOpen(false)}>
                        <span className="back-home-base-text">BACK TO HOME</span>
                        <span className="back-home-front-text">BACK TO HOME</span>
                    </Link>
                )}
            </div>
        </>
    )
}
