import { useState } from 'react'
import { motion } from 'framer-motion'
import { getAssetPath } from '../utils/assets'
import { directorData } from '../data/content'

export default function DirectorMessage() {
    const [isExpanded, setIsExpanded] = useState(false)
    return (
        <section id="director-message" className="section director-section" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="director-color-bends" />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="section-header">
                    <span className="section-label">Leadership</span>
                    <h2>Director's Message</h2>
                    <p>A vision for excellence in engineering education</p>
                </div>
                <div className="director-grid">
                    <motion.div
                        className="director-image-wrapper"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="director-image-frame">
                            <img src={getAssetPath(directorData.image)} alt={`Director of ${directorData.institution}`} />
                        </div>
                        <div className="director-name-card">
                            <h3>{directorData.name}</h3>
                            <div className="director-title">{directorData.title}</div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="director-message-content"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className="director-quote-icon">"</span>
                        {directorData.message.slice(0, isExpanded ? directorData.message.length : 1).map((para, i) => (
                            <p key={i} className={!isExpanded && i === 0 ? 'mobile-truncate' : ''}>{para}</p>
                        ))}
                        {directorData.message.length > 1 && (
                            <button 
                                onClick={() => setIsExpanded(!isExpanded)}
                                style={{
                                    background: 'none', border: 'none',
                                    color: 'var(--gold, #d4af37)', fontWeight: 'bold',
                                    cursor: 'pointer', padding: '0 0 15px 0',
                                    fontSize: '0.95rem', textDecoration: 'underline',
                                    textUnderlineOffset: '4px', textAlign: 'left',
                                    display: 'inline-block'
                                }}
                            >
                                {isExpanded ? 'Read Less' : 'Read More'}
                            </button>
                        )}
                        <div className="director-signature">
                            <div className="director-signature-line" />
                            <span>{directorData.name}, {directorData.institution}</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

