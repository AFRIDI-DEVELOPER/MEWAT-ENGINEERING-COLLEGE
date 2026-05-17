import { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

import { contactInfo } from '../data/content'
import { FiMapPin, FiPhone, FiMail, FiGlobe } from 'react-icons/fi'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', subject: '', message: ''
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }

    const contactCards = [
        { icon: <FiMapPin size={22} />, title: 'Address', value: contactInfo.address },
        { icon: <FiPhone size={22} />, title: 'Phone', value: contactInfo.phone.join('\n') },
        { icon: <FiMail size={22} />, title: 'Email', value: contactInfo.email.join('\n') },
        { icon: <FiGlobe size={22} />, title: 'Website', value: contactInfo.website }
    ]

    return (
        <>
            <SEO title="Contact Us" description="Get in touch with Mewat Engineering College for any inquiries or support." />


            <section className="section" style={{ background: 'var(--off-white)' }}>
                <div className="container">
                    <div className="contact-grid">
                        <motion.div
                            className="contact-form"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3>Send a Message</h3>
                            {submitted && (
                                <div style={{
                                    background: 'rgba(0, 132, 61, 0.1)',
                                    border: '1px solid rgba(0, 132, 61, 0.3)',
                                    borderRadius: 'var(--radius-sm)',
                                    padding: '12px 16px',
                                    marginBottom: 20,
                                    color: 'var(--secondary)',
                                    fontWeight: 600,
                                    fontSize: '0.9rem'
                                }}>
                                    {'\u2705'} Thank you! Your message has been sent successfully.
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
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                    Send Message →
                                </button>
                            </form>
                        </motion.div>

                        <motion.div
                            className="contact-info-cards"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            {contactCards.map((card, i) => (
                                <div className="contact-info-card" key={i}>
                                    <div className="contact-info-icon">{card.icon}</div>
                                    <div>
                                        <h4>{card.title}</h4>
                                        <p style={{ whiteSpace: 'pre-line' }}>{card.value}</p>
                                    </div>
                                </div>
                            ))}

                            <div className="map-container">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3524.3!2d76.99!3d28.12!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMewat+Engineering+College!5e0!3m2!1sen!2sin!4v1234567890"
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="MEC Location"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    )
}
