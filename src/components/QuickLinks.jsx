import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    FiBarChart2, FiBookmark, FiStar, FiFileText, FiBook, 
    FiBriefcase, FiInfo, FiMessageSquare, FiMessageCircle,
    FiLogIn, FiEdit3, FiMap
} from 'react-icons/fi';
import { FaUserGraduate, FaLightbulb, FaHandshake } from 'react-icons/fa';
import './QuickLinks.css';

const quickLinksData = [
    { title: 'Sessional Result', icon: <FiBarChart2 size={22} />, link: '#' },
    { title: 'IQAC', icon: <FiBookmark size={22} />, link: '#' },
    { title: 'NIRF 2026', icon: <FiStar size={22} />, link: '#' },
    { title: 'Mandatory Disclosure', icon: <FiFileText size={22} />, link: '#' },
    { title: 'Handbook', icon: <FiBook size={22} />, link: '#' },
    { title: 'Career With Us', icon: <FiBriefcase size={22} />, link: '#' },
    { title: 'Alumni', icon: <FaUserGraduate size={22} />, link: '#' },
    { title: 'Incubation Centre', icon: <FaLightbulb size={22} />, link: '#' },
    { title: 'Grievance', icon: <FiInfo size={22} />, link: '#' },
    { title: 'AICTE 360 Degree Feedback', icon: <FiMessageCircle size={22} />, link: '#' },
    { title: 'Feedback', icon: <FiMessageSquare size={22} />, link: '#' },
    { title: 'Learning Partners', icon: <FaHandshake size={22} />, link: '#' },
    { title: 'Student Login', icon: <FiLogIn size={22} />, link: '#' },
    { title: 'Write a Review', icon: <FiEdit3 size={22} />, link: '#' },
    { title: 'Site Map', icon: <FiMap size={22} />, link: '#' },
    { title: 'NISP', icon: <FiBookmark size={22} />, link: '#' },
    { title: 'JEE Mains', icon: <FiInfo size={22} />, link: '#' },
    { title: 'CUET 2026', icon: <FiInfo size={22} />, link: '#' },
];

export default function QuickLinks() {
    return (
        <section className="quick-links-section">
            <div className="container">
                <div className="section-header" style={{ marginBottom: '2.5rem' }}>
                    <span className="section-label">Quick Access</span>
                    <h2>Quick Links</h2>
                    <p>Find all necessary resources, portals, and disclosures in one place.</p>
                </div>
                <div className="quick-links-grid">
                    {quickLinksData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9, y: 15 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: '-20px' }}
                            transition={{ duration: 0.4, delay: index * 0.03, ease: 'easeOut' }}
                        >
                            <Link to={item.link} className="quick-link-card">
                                <div className="quick-link-icon-wrapper">
                                    {item.icon}
                                </div>
                                <span className="quick-link-title">{item.title}</span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
