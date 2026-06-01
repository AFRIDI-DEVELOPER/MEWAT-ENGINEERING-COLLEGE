import { useState } from 'react'
import { motion } from 'framer-motion'
import { getAssetPath } from '../utils/assets'

const paragraphs = [
    "I am extremely delighted to welcome you to Mewat Engineering College. We all know that India is a country of villages. 75% of our populations live in rural areas. We believe that for an educational institution, the main objective lives with grooming of our children for future not merely in certain skills but also as a good human being.",
    "The primary objective of the Haryana Waqf Board is the management of Waqf properties as per the provision of the Waqf act, 1995 for the income generation, to be used for the development and welfare of Muslim minority in the state. The board has a main focus on the education of Muslim community. It is open to all communities like other minority institutions in the country.",
    "We aim to empower poor, underprivileged students by giving them admission with the help of different type of scholarships. 75% of the students in my college belong to low economic strata of the society. This would certainly reveal the Haryana Waqf Board efforts rendered towards imparting quality education to the rural students through our well qualified experienced and dedicated faculty.",
    "We started with only 225 students and today we have more than 600 students on roll which signifies the fulfillment of people's expectations to some extent. The college has 21 acres of land and we have plans for further development & expansion in near future.",
    "If you have any queries or concerns regarding your child's progress or welfare, please remember that we are here to help. Our staffs are all friendly, welcoming, and approachable. If you are the parents of prospective entrant then you may find a visit to the college useful — an opportunity for you to see the college at work, and find out how we provide a high-quality education for all our students.",
    "Still, we have to do more but it will only be possible with the benevolent cooperation and recognition of our stakeholders.",
]

export default function AdministratorMessage() {
    const [imgError, setImgError] = useState(false)

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
                        {paragraphs.map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
                        <div className="admin-signature">
                            <div className="admin-signature-line" />
                            <div>
                                <div className="admin-sig-name">Ch. Zakir Hussain</div>
                                <div className="admin-sig-title">Administrator · Haryana Waqf Board</div>
                            </div>
                        </div>
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
                                    alt="Administrator Ch. Zakir Hussain"
                                    onError={() => setImgError(true)}
                                />
                            )}
                        </div>
                        <div className="admin-name-card">
                            <h3>Ch. Zakir Hussain</h3>
                            <div className="admin-title-badge">Administrator</div>
                            <div className="admin-org">Haryana Waqf Board</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
