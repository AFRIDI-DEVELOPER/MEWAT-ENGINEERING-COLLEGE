import { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

import { contactInfo } from '../data/content'
import { submitContactForm } from '../lib/supabase'
import { FiMapPin, FiPhone, FiMail, FiGlobe, FiClock, FiSend } from 'react-icons/fi'

const EMPTY_FORM = { name: '', email: '', phone: '', subject: '', message: '' }

export default function Contact() {
    const [formData, setFormData] = useState(EMPTY_FORM)
    const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('loading')
        try {
            await submitContactForm(formData)
            setStatus('success')
            setFormData(EMPTY_FORM)
            setTimeout(() => setStatus(null), 4000)
        } catch {
            setStatus('error')
            setTimeout(() => setStatus(null), 5000)
        }
    }

    const contactCards = [
        { icon: <FiMapPin size={22} />, title: 'Address', value: contactInfo.address, color: '#3a5a40' },
        { icon: <FiPhone size={22} />, title: 'Phone', value: contactInfo.phone.join('\n'), color: '#c9a84c' },
        { icon: <FiMail size={22} />, title: 'Email', value: contactInfo.email.join('\n'), color: '#2563eb' },
        { icon: <FiGlobe size={22} />, title: 'Website', value: contactInfo.website, color: '#16a34a' }
    ]

    return (
        <>
            <SEO title="Contact Us" description="Get in touch with Mewat Engineering College (WAQF), Village Palla, Nuh Mewat, Haryana. Call us or send a message." />

            {/* ── Hero ── */}
            <section className="contact-hero">
                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    <motion.span
                        className="section-label" style={{ color: '#c9a84c' }}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    >Get In Touch</motion.span>
                    <motion.h1
                        className="contact-hero-title"
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                    >Contact Us</motion.h1>
                    <motion.p
                        className="contact-hero-sub"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        We'd love to hear from you. Reach out for admissions, placements, or any general inquiries.
                    </motion.p>
                </div>
            </section>

            {/* ── Contact Info Cards Row ── */}
            <section style={{ background: 'var(--off-white, #f4f3ed)', paddingTop: '0', marginTop: '-40px', position: 'relative', zIndex: 3 }}>
                <div className="container">
                    <div className="contact-cards-row">
                        {contactCards.map((card, i) => (
                            <motion.div
                                className="contact-info-pill"
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                            >
                                <div className="contact-pill-icon" style={{ background: `${card.color}12`, color: card.color }}>
                                    {card.icon}
                                </div>
                                <div>
                                    <h4>{card.title}</h4>
                                    <p style={{ whiteSpace: 'pre-line' }}>{card.value}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Main Contact Grid: Form + Map ── */}
            <section className="section" style={{ background: 'var(--off-white, #f4f3ed)' }}>
                <div className="container">
                    <div className="contact-main-grid">
                        {/* Left: Form */}
                        <motion.div
                            className="contact-form-card"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="contact-form-header">
                                <FiSend size={20} style={{ color: '#c9a84c' }} />
                                <h3>Send a Message</h3>
                            </div>
                            <p className="contact-form-sub">Fill out the form below and we'll get back to you as soon as possible.</p>

                            {status === 'success' && (
                                <div className="contact-alert contact-alert-success">
                                    ✅ Thank you! Your message has been sent successfully.
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="contact-alert contact-alert-error">
                                    ❌ Failed to send. Please email us directly at <a href="mailto:info@mecw.ac.in" style={{ color: 'inherit', textDecoration: 'underline' }}>info@mecw.ac.in</a>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name *</label>
                                        <input
                                            id="name" name="name" type="text"
                                            placeholder="Your full name"
                                            value={formData.name} onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email *</label>
                                        <input
                                            id="email" name="email" type="email"
                                            placeholder="you@example.com"
                                            value={formData.email} onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            id="phone" name="phone" type="tel"
                                            placeholder="+91 XXXXX XXXXX"
                                            value={formData.phone} onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="subject">Subject *</label>
                                        <select
                                            id="subject" name="subject"
                                            value={formData.subject} onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select a topic</option>
                                            <option value="admissions">Admissions Inquiry</option>
                                            <option value="placements">Placement Information</option>
                                            <option value="academics">Academic Query</option>
                                            <option value="general">General Inquiry</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message *</label>
                                    <textarea
                                        id="message" name="message"
                                        placeholder="Write your message here..."
                                        value={formData.message} onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="contact-submit-btn" disabled={status === 'loading'}>
                                    {status === 'loading' ? 'Sending…' : <>Send Message <FiSend size={16} /></>}
                                </button>
                            </form>
                        </motion.div>

                        {/* Right: Map + Office Hours */}
                        <motion.div
                            className="contact-right-col"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="contact-map-card">
                                <iframe
                                    src="https://maps.google.com/maps?q=Mewat+Engineering+College+Palla+Nuh+Haryana&output=embed"
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="MEC Location"
                                />
                            </div>
                            <div className="contact-hours-card">
                                <div className="contact-hours-icon">
                                    <FiClock size={22} />
                                </div>
                                <div>
                                    <h4>Office Hours</h4>
                                    <p>Monday – Saturday: 9:00 AM – 5:00 PM</p>
                                    <p>Sunday: Closed</p>
                                </div>
                            </div>
                            <div className="contact-quick-card">
                                <h4>Quick Contact</h4>
                                <div className="contact-quick-links">
                                    {contactInfo.phone.map((ph, i) => (
                                        <a href={`tel:${ph.replace(/\s/g, '')}`} key={i} className="contact-quick-link">
                                            <FiPhone size={14} /> {ph}
                                        </a>
                                    ))}
                                    <a href="mailto:info@mecw.ac.in" className="contact-quick-link">
                                        <FiMail size={14} /> info@mecw.ac.in
                                    </a>
                                    <a href="https://www.mecw.ac.in" target="_blank" rel="noopener noreferrer" className="contact-quick-link">
                                        <FiGlobe size={14} /> www.mecw.ac.in
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    )
}
