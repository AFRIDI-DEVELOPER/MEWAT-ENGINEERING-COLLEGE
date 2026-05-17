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
                        <div className="footer-logo">
                            <img src={getAssetPath('/images/mewatengineering logo.png')} alt="MEC Logo" />
                        </div>
                        <h3>Mewat Engineering College</h3>
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
                        <h4>Academics</h4>
                        <ul>
                            <li><Link to="/departments">Computer Science</Link></li>
                            <li><Link to="/departments">Civil Engineering</Link></li>
                            <li><Link to="/departments">Mechanical Engineering</Link></li>
                            <li><Link to="/departments">Electrical & Electronics</Link></li>
                            <li><Link to="/departments">Electronics & Communication</Link></li>
                            <li><Link to="/admissions">Admissions</Link></li>
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
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>© {new Date().getFullYear()} Mewat Engineering College (WAQF). All rights reserved.</span>
                    <div className="footer-affiliations">
                        <span>AICTE Approved</span>
                        <span>DCRUST Affiliated</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
