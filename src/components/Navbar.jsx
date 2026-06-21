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
    const [mobileOpen, setMobileOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [campusDropdownOpen, setCampusDropdownOpen] = useState(false)
    const [contactDropdownOpen, setContactDropdownOpen] = useState(false)
    const [placementDropdownOpen, setPlacementDropdownOpen] = useState(false)
    const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)
    const location = useLocation()
    const isPortal = isPortalPage(location.pathname)

    useEffect(() => {
        const onScroll = () => {
            if (isPortal) return
            setScrolled(true)
            setIsFloating(true)
        }
        // Set initial state immediately
        setScrolled(true)
        setIsFloating(true)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [isPortal])

    // Specific effect to handle portal state immediately
    useEffect(() => {
        setIsFloating(true)
        setScrolled(true)
    }, [isPortal])

    useEffect(() => {
        setMobileOpen(false)
    }, [location])

    return (
        <>
            <div className={`nav-overlay ${(dropdownOpen || campusDropdownOpen || contactDropdownOpen || placementDropdownOpen || aboutDropdownOpen) ? 'show' : ''}`} />
            <nav className={`navbar-wrapper ${scrolled ? 'scrolled' : ''} ${isFloating ? 'floating' : ''}`}>
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
                                {navLinks.map(link => {
                                    if (link.name === 'About') {
                                        return (
                                            <Link
                                                key={link.path}
                                                to={link.path}
                                                className={location.pathname === '/about' ? 'active' : ''}
                                            >
                                                {link.name}
                                            </Link>
                                        )
                                    }
                                    if (link.name === 'Departments') {
                                        return (
                                            <div 
                                                key={link.path}
                                                className="nav-dropdown-wrapper"
                                                onMouseEnter={() => setDropdownOpen(true)}
                                                onMouseLeave={() => setDropdownOpen(false)}
                                            >
                                                <Link
                                                    to={link.path}
                                                    className={`${location.pathname.startsWith('/departments') ? 'active' : ''} nav-link-with-dropdown`}
                                                >
                                                    {link.name}
                                                    <svg className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                                </Link>
                                                
                                                <div className={`nav-dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                                                    <Link to="/departments/cse" className="dropdown-item">
                                                        <span className="dept-full">Computer Science</span>
                                                    </Link>
                                                    <Link to="/departments/civil" className="dropdown-item">
                                                        <span className="dept-full">Civil Engineering</span>
                                                    </Link>
                                                    <Link to="/departments/ash" className="dropdown-item">
                                                        <span className="dept-full">Applied Sciences</span>
                                                    </Link>
                                                    <Link to="/departments/mechanical" className="dropdown-item">
                                                        <span className="dept-full">Mechanical Engg.</span>
                                                    </Link>
                                                    <Link to="/departments/eee" className="dropdown-item">
                                                        <span className="dept-full">Electrical & Electronics</span>
                                                    </Link>
                                                    <Link to="/departments/ece" className="dropdown-item">
                                                        <span className="dept-full">Electronics & Comm.</span>
                                                    </Link>
                                                    <div className="dropdown-footer">
                                                        <Link to="/departments">View All Departments →</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    if (link.name === 'Campus') {
                                        return (
                                            <div 
                                                key={link.path}
                                                className="nav-dropdown-wrapper"
                                                onMouseEnter={() => setCampusDropdownOpen(true)}
                                                onMouseLeave={() => setCampusDropdownOpen(false)}
                                            >
                                                <Link
                                                    to={link.path}
                                                    className={`${location.pathname.startsWith('/campus') ? 'active' : ''} nav-link-with-dropdown`}
                                                >
                                                    {link.name}
                                                    <svg className={`dropdown-arrow ${campusDropdownOpen ? 'open' : ''}`} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                                </Link>
                                                
                                                <div className={`nav-dropdown-menu ${campusDropdownOpen ? 'show' : ''}`}>
                                                    <Link to="/campus#facilities" className="dropdown-item">
                                                        <span className="dept-full">Hostel Facility</span>
                                                    </Link>
                                                    <Link to="/campus#facilities" className="dropdown-item">
                                                        <span className="dept-full">Central Library</span>
                                                    </Link>
                                                    <Link to="/campus#facilities" className="dropdown-item">
                                                        <span className="dept-full">Modern Labs</span>
                                                    </Link>
                                                    <Link to="/campus#facilities" className="dropdown-item">
                                                        <span className="dept-full">Transport Service</span>
                                                    </Link>
                                                    <Link to="/campus#facilities" className="dropdown-item">
                                                        <span className="dept-full">Sports & Gym</span>
                                                    </Link>
                                                    <Link to="/campus#facilities" className="dropdown-item">
                                                        <span className="dept-full">Language Lab</span>
                                                    </Link>
                                                    <div className="dropdown-footer">
                                                        <Link to="/campus">Explore Campus Life →</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    if (link.name === 'Contact') {
                                        return (
                                            <div 
                                                key={link.path}
                                                className="nav-dropdown-wrapper"
                                                onMouseEnter={() => setContactDropdownOpen(true)}
                                                onMouseLeave={() => setContactDropdownOpen(false)}
                                            >
                                                <Link
                                                    to={link.path}
                                                    className={`${location.pathname === '/contact' ? 'active' : ''} nav-link-with-dropdown`}
                                                >
                                                    {link.name}
                                                    <svg className={`dropdown-arrow ${contactDropdownOpen ? 'open' : ''}`} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                                </Link>
                                                
                                                <div className={`nav-dropdown-menu nav-dropdown-menu--contact ${contactDropdownOpen ? 'show' : ''}`}>
                                                    <a href="https://maps.google.com/?q=Mewat+Engineering+College" target="_blank" rel="noopener noreferrer" className="dropdown-item">
                                                        <span className="dept-full">Village Palla, Nuh, Haryana</span>
                                                    </a>
                                                    <a href="tel:+911267272045" className="dropdown-item">
                                                        <span className="dept-full">+91-1267-272045</span>
                                                    </a>
                                                    <a href="mailto:info@mecw.ac.in" className="dropdown-item">
                                                        <span className="dept-full">info@mecw.ac.in</span>
                                                    </a>
                                                    <div className="dropdown-footer">
                                                        <Link to="/contact">Get Full Directions →</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    if (link.name === 'Placements') {
                                        return (
                                            <div 
                                                key={link.path}
                                                className="nav-dropdown-wrapper"
                                                onMouseEnter={() => setPlacementDropdownOpen(true)}
                                                onMouseLeave={() => setPlacementDropdownOpen(false)}
                                            >
                                                <Link
                                                    to={link.path}
                                                    className={`${location.pathname === '/placements' ? 'active' : ''} nav-link-with-dropdown`}
                                                >
                                                    {link.name}
                                                    <svg className={`dropdown-arrow ${placementDropdownOpen ? 'open' : ''}`} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                                </Link>
                                                
                                                <div className={`nav-dropdown-menu nav-dropdown-menu--placements ${placementDropdownOpen ? 'show' : ''}`}>
                                                    <div className="dropdown-header-placements">
                                                        <span className="dropdown-tagline-placements">Leading companies that trust MEC graduates</span>
                                                    </div>
                                                    <div className="recruiters-mini-grid">
                                                        {recruiters.slice(0, 12).map((company, idx) => (
                                                            <div key={idx} className="recruiter-chip-mini">{company}</div>
                                                        ))}
                                                    </div>
                                                    <div className="dropdown-footer">
                                                        <Link to="/placements">View Placement Success Stories →</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    return (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            className={location.pathname === link.path ? 'active' : ''}
                                        >
                                            {link.name}
                                        </Link>
                                    )
                                })}
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
