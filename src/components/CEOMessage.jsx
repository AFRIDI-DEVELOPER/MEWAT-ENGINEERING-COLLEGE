import { useState } from 'react'
import { motion } from 'framer-motion'
import { getAssetPath } from '../utils/assets'

const ceoData = {
    name: 'Sh. Mohammed Shayin,IAS',
    title: 'The Chief Executive Officer',
    organization: 'Haryana Waqf Board',
    image: '/images/ceo.png',
    message: [
        "I am extremely delighted to know that Mewat Engineering College has successfully completed a decade of its existence. This college is a unique initiative of Haryana Waqf Board and only one of its kinds in the country, where the Waqf Board of a state has come forward to set up an institution for providing professionals education with the latest specialized knowledge and skills in the field of engineering and technology. Our institution is committed to impart quality education with good human values, so that the prospective engineers can contribute in diversified fields of science and technology and come forward to serve the nation with technical knowledge, professional skills, practical experience and human values.",
        "The college is progressing steadily, and in the last few years, we have constantly been working towards taking this institution even to greater heights. We would like you to consider joining us as the institution of your choice to further your goal of getting a higher professional degree.",
        "I am confident that Mewat Engineering College will go a long way in achieving Board's mission of providing quality higher education to the students belonging to the most deprived sections of the society. I want to realize its dream of emerging as a center of excellence in various fields both in academia and non-academia. For which, I solicit the participation from one and all."
    ],
    blessings: "My blessings and best wishes are with the students of this college!"
}

export default function CEOMessage() {
    const [imgError, setImgError] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <section id="ceo-message" className="section ceo-section">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Haryana Waqf Board</span>
                    <h2>CEO's Message</h2>
                    <p>A decade of excellence in engineering education</p>
                </div>
                <div className="ceo-grid">
                    {/* Image Side */}
                    <motion.div
                        className="ceo-image-wrapper"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="ceo-image-frame">
                            {imgError ? (
                                <div className="ceo-image-placeholder">
                                    <span>CEO</span>
                                </div>
                            ) : (
                                <img
                                    src={getAssetPath(ceoData.image)}
                                    alt="CEO Sh. Mohammed Shayin, IAS"
                                    onError={() => setImgError(true)}
                                />
                            )}
                            <div className="ceo-badge">
                                <span className="ceo-badge-icon">🏛️</span>
                                <span className="ceo-badge-text">Waqf Board</span>
                            </div>
                        </div>
                        <div className="ceo-name-card">
                            <h3>{ceoData.name}</h3>
                            <div className="ceo-title-badge">{ceoData.title}</div>
                            
                            <div className="ceo-org">{ceoData.organization}</div>
                        </div>
                    </motion.div>

                    {/* Message Side */}
                    <motion.div
                        className="ceo-message-content"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <span className="ceo-quote-icon">"</span>
                        {ceoData.message.slice(0, isExpanded ? ceoData.message.length : 1).map((para, i) => (
                            <p key={i} className={!isExpanded && i === 0 ? 'mobile-truncate' : ''}>{para}</p>
                        ))}
                        {ceoData.message.length > 1 && (
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
                        <div className="ceo-blessings">
                            <span className="ceo-blessings-icon">✨</span>
                            <p>{ceoData.blessings}</p>
                        </div>
                        <div className="ceo-signature">
                            <div className="ceo-signature-line" />
                            <div>
                                <div className="ceo-sig-name">{ceoData.name}</div>
                                <div className="ceo-sig-title">{ceoData.title} · {ceoData.organization}</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
