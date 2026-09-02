import { useState } from 'react'
import { motion } from 'framer-motion'
import { getAssetPath } from '../utils/assets'

const paragraphs = [
    "It is a matter of immense pleasure for me to be a part of the Mewat Engineering College Nuh family as an Administrator of its parent Organisation Haryana Waqf Board. I take this opportunity to welcome students coming from different parts of the country and joining the MEC college in B.Tech/ B.Voc/ D.Voc programmes. In any educational institute their teachers, staff, seniors and junior students, all form a family from whom they can look up for any guidance and support so that they can move ahead in their life as professionals. Students are our nation-builders & teachers are key to it. They are the movers of technology and agents of change. I request and expect from the students of Mewat Engineering College Nuh, the knowledge that they will gain here shall be utilised to uplift the society and the nation. Being the Administrator of Haryana Waqf Board, my priority is to provide every possible support to Mewat Engineering College so that this institute and its students can be one of the very best in the field of Engineering and Technology.",
    "With all my best wishes to engineering and other graduate students I want them to taste the fruit of success once and for the rest of their life, they will never rest. I assure you, on behalf of the MEC family, that we will help you pursue your objectives of life and make the MEC family proud of your attainments.",
    "With Best Wishes!"
]

export default function AdministratorMessage() {
    const [imgError, setImgError] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <section id="administrator-message" className="section admin-section">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Haryana Waqf Board</span>
                    <h2>Administrator's Message</h2>
                    <p>Guiding excellence through service and vision</p>
                </div>
                <div className="admin-grid">
                    <motion.div
                        className="admin-message-content"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <span className="admin-quote-icon">"</span>
                        {paragraphs.slice(0, isExpanded ? paragraphs.length : 1).map((para, i) => (
                            <p key={i} className={!isExpanded && i === 0 ? 'mobile-truncate' : ''}>{para}</p>
                        ))}
                        {paragraphs.length > 1 && (
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

                    </motion.div>
                    <motion.div
                        className="admin-image-wrapper"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="admin-image-frame">
                            {imgError ? (
                                <div className="admin-image-placeholder">
                                    <span>ZH</span>
                                </div>
                            ) : (
                                <img
                                    src={getAssetPath('/images/administrator.png')}
                                    alt="Administrator Ch. Zakir Hussain, Ex. MLA"
                                    onError={() => setImgError(true)}
                                />
                            )}
                        </div>
                        <div className="admin-name-card">
                            <h3>Ch. Zakir Hussain, Ex. MLA</h3>
                            <div className="admin-title-badge">The Administrator</div>
                            <div className="admin-org">Haryana Waqf Board</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
