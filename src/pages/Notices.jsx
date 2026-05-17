import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiBell, FiArrowLeft, FiCalendar, FiClock, FiSearch, FiFilter } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

const notices = [
    { text: 'All students must fill SCF form before 30-06-2026. Late fee penalty of ₹500 will be charged.', type: 'urgent', label: 'URGENT', date: '30 Jun 2026', time: '10:00 AM' },
    { text: 'End semester examinations start from 15th July 2026. Download your hall tickets from the portal.', type: 'exam', label: 'EXAM', date: '15 Jul 2026', time: '02:30 PM' },
    { text: 'Tomorrow (3rd May) is declared holiday on account of Eid-ul-Fitr. College will remain closed.', type: 'holiday', label: 'HOLIDAY', date: '03 May 2026', time: '09:00 AM' },
    { text: 'Post-matric scholarship portal is now open. Eligible students must apply before 20th June 2026.', type: 'scholarship', label: 'SCHOLARSHIP', date: '20 Jun 2026', time: '11:30 AM' },
    { text: 'TCS & Infosys campus placement drive scheduled for 10th June. Register on placement portal now.', type: 'placement', label: 'PLACEMENT', date: '10 Jun 2026', time: '10:00 AM' },
    { text: 'Library books must be returned before 25th May. Overdue fine: ₹10/day per book.', type: 'notice', label: 'NOTICE', date: '25 May 2026', time: '04:00 PM' },
    { text: 'Annual sports meet "Khel Mahakumbh 2026" registrations are open. Last date: 8th June.', type: 'event', label: 'EVENT', date: '08 Jun 2026', time: '09:30 AM' },
]

const typeConfig = {
    urgent:     { color: '#FF4757', bg: 'rgba(255,71,87,0.1)' },
    exam:       { color: '#FF8C00', bg: 'rgba(255,140,0,0.1)' },
    holiday:    { color: '#2ED573', bg: 'rgba(46,213,115,0.1)' },
    scholarship:{ color: '#A855F7', bg: 'rgba(168,85,247,0.1)' },
    placement:  { color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
    notice:     { color: '#C8A951', bg: 'rgba(200,169,81,0.1)' },
    event:      { color: '#F97316', bg: 'rgba(249,115,22,0.1)' },
}

export default function Notices() {
    const [searchTerm, setSearchTerm] = useState('')
    const [filter, setFilter] = useState('all')

    const filteredNotices = notices.filter(n => {
        const matchesSearch = n.text.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesFilter = filter === 'all' || n.type === filter
        return matchesSearch && matchesFilter
    })

    return (
        <div className="notices-page">
            <div className="container">
                <header className="notices-header">
                    <Link to="/" className="back-link">
                        <FiArrowLeft /> Back to Home
                    </Link>
                    <div className="title-row">
                        <div className="title-with-icon">
                            <FiBell className="title-icon" />
                            <h1>Official Notice Board</h1>
                        </div>
                        <p className="subtitle">Stay updated with the latest announcements, events, and academic schedules.</p>
                    </div>

                    <div className="controls-row">
                        <div className="search-box">
                            <FiSearch className="search-icon" />
                            <input 
                                type="text" 
                                placeholder="Search notices..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="filter-tabs">
                            {['all', 'urgent', 'exam', 'holiday', 'scholarship', 'placement', 'event'].map(t => (
                                <button 
                                    key={t}
                                    className={`filter-btn ${filter === t ? 'active' : ''}`}
                                    onClick={() => setFilter(t)}
                                >
                                    {t.charAt(0).toUpperCase() + t.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </header>

                <div className="notices-grid">
                    <AnimatePresence mode="popLayout">
                        {filteredNotices.length > 0 ? (
                            filteredNotices.map((notice, i) => {
                                const cfg = typeConfig[notice.type] || typeConfig.notice
                                return (
                                    <motion.div 
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, delay: i * 0.05 }}
                                        key={notice.text}
                                        className="notice-page-card"
                                        style={{ '--accent-color': cfg.color }}
                                    >
                                        <div className="notice-card-accent" />
                                        <div className="notice-card-header">
                                            <span 
                                                className="notice-page-label" 
                                                style={{ backgroundColor: cfg.bg, color: cfg.color }}
                                            >
                                                {notice.label}
                                            </span>
                                            <div className="notice-meta">
                                                <div className="meta-item">
                                                    <FiCalendar /> {notice.date}
                                                </div>
                                                <div className="meta-item">
                                                    <FiClock /> {notice.time}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="notice-text">{notice.text}</p>
                                    </motion.div>
                                )
                            })
                        ) : (
                            <div className="no-results">
                                <p>No notices found matching your search.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
