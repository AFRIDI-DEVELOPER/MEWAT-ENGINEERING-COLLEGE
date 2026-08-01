import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { navLinks, contactInfo } from '../data/content'
import { FiMapPin, FiPhone, FiMail, FiX, FiFileText, FiExternalLink } from 'react-icons/fi'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { getAssetPath } from '../utils/assets'

// ─── Document data for each modal ────────────────────────────────────────────

const MODALS = {
    aicte: {
        title: '📋 AICTE Approval Letters',
        subtitle: 'Click any document to open as PDF',
        docs: [
            { name: 'EOA Report 2024–2025',                          folder: 'aicte-approval-letters', file: 'EOA_REPORT_2024-2025.pdf' },
            { name: 'EOA Report 2023–2024',                          folder: 'aicte-approval-letters', file: 'EOA-Report-2023-2024.pdf' },
            { name: 'EOA Report 2022–2023',                          folder: 'aicte-approval-letters', file: 'EOA_Report_22-23.pdf' },
            { name: 'Corrigendum EOA Report 2021–2022',              folder: 'aicte-approval-letters', file: 'Corrigendum_EOA_Report_2021-22.pdf' },
            { name: 'EOA Report 2020–2021',                          folder: 'aicte-approval-letters', file: 'EOA_Report_2020-21.PDF' },
            { name: 'B.Tech & B.Voc Affiliation Letter 2020–21 (GUG)', folder: 'aicte-approval-letters', file: 'B.Tech&B.Voc.Affiliation_letter_2020-21 from GU Gurugram.pdf' },
            { name: 'GUG Affiliation 2022–23',                       folder: 'aicte-approval-letters', file: 'GUG_Affiliation_2022-23.pdf' },
            { name: 'D.Voc Affiliation Letter 2020–21 (HSBTE)',      folder: 'aicte-approval-letters', file: 'D.Voc Affiliation_letter_2020-21 from HSBTE.pdf' },
            { name: 'Letter of Approval for Vocational 2018–19',     folder: 'aicte-approval-letters', file: 'Letter of Approval for Vocational_2018-19.PDF' },
        ],
    },
    mandatory: {
        title: '📄 Mandatory Disclosure',
        subtitle: 'Click any document to open as PDF',
        docs: [
            { name: 'Mandatory Disclosure (May 2022)',  folder: 'mandatory-disclosure', file: 'Mandatory_Disclosure(12-05-2022).pdf' },
            { name: 'Mandatory Disclosure (Latest)',    folder: 'mandatory-disclosure', file: 'mandatory-disclosure.pdf' },
        ],
    },
    rti: {
        title: '📑 Right to Information',
        subtitle: 'RTI documents',
        docs: [],   // Only .docx available — no PDFs
        note: 'RTI documents are available on request. Please contact the college office.',
    },
    conference: {
        title: '🎓 Conference',
        subtitle: 'Click any document to open as PDF',
        docs: [
            { name: '3rd International Conference on RTREAET 2022',  folder: 'conference', file: '3rd_International_Conference_on_RTREAET-2022.pdf' },
            { name: 'International Conference 2023 – Brochure',      folder: 'conference', file: 'Internation_Conference-2023-Brochure.pdf' },
        ],
    },
    career: {
        title: '💼 Career',
        subtitle: 'Click any document to open as PDF',
        docs: [
            { name: 'Application Form for AP',                       folder: 'career', file: 'Appication_form_for_AP.pdf' },
            { name: 'PBAS Proforma – API Score (MEC)',               folder: 'career', file: 'PBAS_Proforma_for_calculating_API_SCORE_MEC.pdf' },
            { name: 'API Proforma – Promotion CAS',                  folder: 'career', file: 'api_proforma_promotion_cas.pdf' },
            { name: 'Promotion Rules',                               folder: 'career', file: 'promotion_rules.pdf' },
        ],
    },
    margadarshak: {
        title: '🧭 Margadarshak',
        subtitle: 'Mentoring & guidance documents',
        docs: [],
        note: 'Margadarshak documents will be uploaded soon. Please check back later.',
    },
}

// ─── Reusable Document Modal ──────────────────────────────────────────────────

function DocModal({ modalKey, onClose }) {
    const modal = MODALS[modalKey]
    if (!modal) return null

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                background: 'rgba(0,0,0,0.75)',
                backdropFilter: 'blur(6px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '1rem',
                animation: 'fadeIn 0.2s ease',
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '20px',
                    width: '100%',
                    maxWidth: '620px',
                    maxHeight: 'min(600px, 80vh)',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
                    animation: 'slideUp 0.25s ease',
                }}
            >
                {/* Header */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '1.5rem 1.75rem',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '20px 20px 0 0',
                    flexShrink: 0,
                }}>
                    <div>
                        <h3 style={{
                            margin: 0, color: '#fff',
                            fontFamily: 'var(--font-heading, sans-serif)',
                            fontSize: '1.3rem', fontWeight: 800, letterSpacing: '0.5px',
                        }}>
                            {modal.title}
                        </h3>
                        <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>
                            {modal.subtitle}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close modal"
                        style={{
                            background: 'rgba(255,255,255,0.08)',
                            border: 'none', borderRadius: '50%',
                            width: '36px', height: '36px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: '#fff', fontSize: '1.1rem',
                            transition: 'background 0.2s', flexShrink: 0,
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                    >
                        <FiX />
                    </button>
                </div>

                {/* Scrollable Document List */}
                <div
                    data-lenis-prevent="true"
                    onWheel={e => e.stopPropagation()}
                    onTouchMove={e => e.stopPropagation()}
                    style={{
                        padding: '1.25rem 1.75rem 1.75rem',
                        overflowY: 'auto',
                        flex: 1,
                        minHeight: 0,
                        WebkitOverflowScrolling: 'touch',
                        overscrollBehavior: 'contain',
                    }}
                >
                    {/* Note for empty folders */}
                    {modal.note && modal.docs.length === 0 && (
                        <div style={{
                            padding: '2rem 1rem',
                            textAlign: 'center',
                            color: 'rgba(255,255,255,0.45)',
                            fontSize: '0.9rem',
                            lineHeight: '1.6',
                        }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📭</div>
                            {modal.note}
                        </div>
                    )}

                    {/* PDF links */}
                    {modal.docs.map((doc, idx) => (
                        <a
                            key={idx}
                            href={getAssetPath(`/${doc.folder}/${encodeURIComponent(doc.file)}`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'flex', alignItems: 'center', gap: '14px',
                                padding: '14px 16px', marginBottom: '10px',
                                borderRadius: '12px',
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                textDecoration: 'none', color: '#e2e8f0',
                                transition: 'all 0.2s ease', cursor: 'pointer',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(220,160,0,0.12)'
                                e.currentTarget.style.borderColor = 'rgba(220,160,0,0.4)'
                                e.currentTarget.style.transform = 'translateX(4px)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                                e.currentTarget.style.transform = 'translateX(0)'
                            }}
                        >
                            <div style={{
                                width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
                                background: 'rgba(220,38,38,0.15)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#f87171', fontSize: '1.1rem',
                            }}>
                                <FiFileText />
                            </div>
                            <span style={{ flex: 1, fontSize: '0.9rem', fontWeight: 500, lineHeight: '1.4' }}>
                                {doc.name}
                            </span>
                            <FiExternalLink style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.95rem', flexShrink: 0 }} />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

// ─── Footer Link Button ───────────────────────────────────────────────────────

function FooterBtn({ label, onClick }) {
    return (
        <button className="footer-btn" onClick={onClick}>
            {label}
        </button>
    )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
    const [activeModal, setActiveModal] = useState(null)  // key from MODALS or null

    const openModal = (key) => setActiveModal(key)
    const closeModal = () => setActiveModal(null)

    // Lock body scroll + pause Lenis when any modal is open
    useEffect(() => {
        if (activeModal) {
            document.body.style.overflow = 'hidden'
            if (window.lenis && typeof window.lenis.stop === 'function') window.lenis.stop()
        } else {
            document.body.style.overflow = ''
            if (window.lenis && typeof window.lenis.start === 'function') window.lenis.start()
        }
        return () => {
            document.body.style.overflow = ''
            if (window.lenis && typeof window.lenis.start === 'function') window.lenis.start()
        }
    }, [activeModal])

    return (
        <>
            {/* Animations */}
            <style>{`
                @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
            `}</style>

            {/* Active modal */}
            {activeModal && <DocModal modalKey={activeModal} onClose={closeModal} />}

            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">

                        {/* Brand */}
                        <div className="footer-brand">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1rem' }}>
                                <div className="footer-logo" style={{ marginBottom: 0 }}>
                                    <img src={getAssetPath('/images/mewatengineering logo.png')} alt="MEC Logo" />
                                </div>
                                <h3 style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 900, color: 'white',
                                    fontSize: '7rem', letterSpacing: '1px',
                                    textTransform: 'uppercase', margin: 0,
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

                        {/* Quick Links – nav pages */}
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

                        {/* Quick Links – documents */}
                        <div className="footer-col">
                            <h4>Quick links</h4>
                            <ul>
                                <li><FooterBtn label="AICTE Approval Letters"  onClick={() => openModal('aicte')} /></li>
                                <li><FooterBtn label="Mandatory Disclosure"    onClick={() => openModal('mandatory')} /></li>
                                <li><Link to="#">Right to Information</Link></li>
                                <li><Link to="#">Alumni Form</Link></li>
                                <li><FooterBtn label="Conference"              onClick={() => openModal('conference')} /></li>
                                <li><Link to="#">Feedback Form</Link></li>
                                <li><FooterBtn label="Career"                  onClick={() => openModal('career')} /></li>
                                <li><Link to="#">NBA</Link></li>
                                <li><Link to="#">Margadarshak</Link></li>
                            </ul>
                        </div>

                        {/* Contact */}
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
                                    fontWeight: 900, fontSize: '1.5rem',
                                    letterSpacing: '1px', textTransform: 'uppercase', lineHeight: '1.2',
                                }}>
                                    HEYY,THIS WEBSITE<br />
                                    IS DEVELOPED BY<br />
                                    <a href="https://afrididvlpr.pro/" target="_blank" rel="noopener noreferrer"
                                        style={{ color: 'var(--gold)', textDecoration: 'none' }}>
                                        AFRIDI_DEVELOPER
                                    </a>
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
        </>
    )
}
