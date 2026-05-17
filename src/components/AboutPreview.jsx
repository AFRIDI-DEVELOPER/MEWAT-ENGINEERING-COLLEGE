import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getAssetPath } from '../utils/assets'
import { aboutData } from '../data/content'

export default function AboutPreview({ showLink = true }) {
    const { preview } = aboutData
    return (
        <section className="section about-preview">
            <div className="container">
                <div className="about-preview-grid">
                    <motion.div
                        className="about-preview-img"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="about-img-container">
                            <img src={getAssetPath('/images/college-bg-2.png')} alt="MEC Campus" className="about-img-main" />
                        </div>
                        <div className="experience-badge">
                            <div className="big-number">15+</div>
                            <div className="small-text">Years of Excellence</div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="about-preview-content"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="about-label">About Us</span>
                        <h2>{preview.title}</h2>
                        <p>{preview.description}</p>
                        <div className="about-features">
                            {preview.features.map((feature, i) => (
                                <div className="about-feature" key={i}>
                                    {feature}
                                </div>
                            ))}
                        </div>
                        {showLink && <Link to="/about" className="btn btn-primary">Learn More →</Link>}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
