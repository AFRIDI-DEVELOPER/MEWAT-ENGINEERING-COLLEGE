import { useState } from 'react'
import { motion } from 'framer-motion'
import { getAssetPath } from '../utils/assets'

const ceoData = {
    name: 'CEO, Haryana Waqf Board',
    title: 'Chief Executive Officer',
    organization: 'Haryana Waqf Board',
    image: '/images/ceo.png',
    message: [
        "I am extremely delighted to know that Mewat Engineering college has successfully completed a decade of its existence. This college laid its humble foundation in the year 2010. It has been established and run by Haryana Waqf board. This college is a unique initiative of Haryana Waqf Board and only one of its kind in the country, where the Waqf Board of a state has come forward to set up an institution for providing professionals education with the latest specialized knowledge and skills in the field of engineering and technology.",
        "Our institution is committed to impart quality education with good human values, so that the prospective engineers can contribute in diversified fields of science and technology and come forward to serve the nation with technical knowledge, professional skills, practical experience and human values. Besides, our aim is to prepare them future ready to encounter with the challenges of global competitive arena.",
        "Mewat Engineering College (Waqf) has the status of minority institution but it is open to all sections of the society. It aims to impart quality higher technical education primarily to the deprived students belonging to Muslim minority community concentrated in backward area of Mewat region. The College is located 85 km from Delhi and 50 km south of millennium city of Gurgaon.",
        "The College has a majestic building having three-lac sq ft super area in the foothills of Aravallis with affordable fee structure. The state of the art infrastructure, well equipped laboratories, world class faculty and best hostel facilities for both boys and girls are at par with any reputed engineering college of the country.",
        "The College is progressing steadily, and in the last few years we have constantly been working towards taking this institution even to greater heights. We would like you to consider joining us as the institution of your choice to further your goal of getting a higher professional degree.",
        "I am confident that Mewat Engineering College will go a long way in achieving Board's mission of providing quality higher education to the students belonging to the most deprived sections of the society. I want to realize its dream of emerging as a center of excellence in various fields both in academia and non academia. For which, I solicit the participation from one and all.",
    ],
    blessings: "My blessings and best wishes are with the students of this college!"
}

export default function CEOMessage() {
    const [imgError, setImgError] = useState(false)

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
                                    alt="CEO, Haryana Waqf Board"
                                    onError={() => setImgError(true)}
                                />
                            )}
                            <div className="ceo-badge">
                                <span className="ceo-badge-icon">🏛️</span>
                                <span className="ceo-badge-text">Waqf Board</span>
                            </div>
                        </div>
                        <div className="ceo-name-card">
                            <div className="ceo-title-badge">{ceoData.title}</div>
                            <h3>{ceoData.name}</h3>
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
                        {ceoData.message.map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
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
