import { Link } from 'react-router-dom'
import { navLinks, contactInfo } from '../data/content'
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { getAssetPath } from '../utils/assets'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1rem' }}>
                            <div className="footer-logo" style={{ marginBottom: 0 }}>
                                <img src={getAssetPath('/images/mewatengineering logo.png')} alt="MEC Logo" />
                            </div>
                            <h3 style={{
                                fontFamily: "var(--font-heading)",
                                fontWeight: 900,
                                color: "white",
                                fontSize: '7rem',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                margin: 0
                            }}>MEC</h3>
                        </div>
                        <p className="footer-tagline">WAQF — Empowering Through Education</p>
                        <p>
                            A premier engineering institution committed to providing quality technical education
                            and producing competent engineers for the nation.
                        </p>
                        <div className="footer-socials">
                            <a href="#" aria-label="Facebook"><FaFacebook /></a>
                            <a href="#" aria-label="Twitter"><FaTwitter /></a>
                            <a href="#" aria-label="Instagram"><FaInstagram /></a>
                            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
                            <a href="#" aria-label="YouTube"><FaYoutube /></a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul>
                            {navLinks.map(link => (
                                <li key={link.path}>
                                    <Link to={link.path}>{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Quick links</h4>
                        <ul>
                            <li><Link to="#">AICTE Approval Letters</Link></li>
                            <li><Link to="#">Mandatory Disclosure</Link></li>
                            <li><Link to="#">Right to information</Link></li>
                            <li><Link to="#">Alumni Form</Link></li>
                            <li><Link to="#">Conference</Link></li>
                            <li><Link to="#">Feedback Form</Link></li>
                            <li><Link to="#">Career</Link></li>
                            <li><Link to="#">NBA</Link></li>
                            <li><Link to="#">Margadarshak</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Contact Us</h4>
                        <div className="footer-contact-item">
                            <FiMapPin className="contact-icon" />
                            <span>{contactInfo.address}</span>
                        </div>
                        <div className="footer-contact-item">
                            <FiPhone className="contact-icon" />
                            <span>{contactInfo.phone.join(' / ')}</span>
                        </div>
                        <div className="footer-contact-item">
                            <FiMail className="contact-icon" />
                            <span>{contactInfo.email[0]}</span>
                        </div>
                        <div className="footer-contact-item" style={{ marginTop: '1.5rem', alignItems: 'flex-start' }}>
                            <div style={{
                                fontFamily: "'Kanit', sans-serif",
                                fontWeight: 900,
                                fontSize: '1.5rem',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                lineHeight: '1.2'
                            }}>
                                HEYY,THIS WEBSITE<br />
                                IS DEVELOPED BY<br />
                                <a href="https://afrididvlpr.pro/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'none' }}>AFRIDI_DEVELOPER</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>© {new Date().getFullYear()} Mewat Engineering College (WAQF). All rights reserved.</span>
                    <div className="footer-affiliations">
                        <span>AICTE Approved</span>
                        <span>GUG Affiliated</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
