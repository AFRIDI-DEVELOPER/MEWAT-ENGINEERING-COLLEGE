import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { facilities } from '../data/content'

/* ─────────────────────────────────────────
   Campus Gallery Data & Component
   (same premium carousel as Home page)
───────────────────────────────────────── */
const campusImages = [
    {
        src: '/images/college-bg.png',
        title: 'Grand Entrance',
        description: 'The iconic main gateway welcoming future engineers into a world of possibilities',
        category: 'architecture'
    },
    {
        src: '/images/college-bg-1.jpg',
        title: 'Aerial Campus View',
        description: 'A breathtaking panoramic perspective of our sprawling 15-acre green campus',
        category: 'architecture'
    },
    {
        src: '/images/college-bg-2.png',
        title: 'Engineering Block',
        description: 'State-of-the-art engineering labs and smart classrooms powering innovation',
        category: 'academics'
    },
    {
        src: '/images/college-bg-3.png',
        title: 'Academic Plaza',
        description: 'Where ideas converge — the central hub of collaboration and campus culture',
        category: 'life'
    },
    {
        src: '/images/college-bg.png',
        title: 'Library Wing',
        description: 'A modern knowledge center with digital resources and quiet study zones',
        category: 'academics'
    },
    {
        src: '/images/college-bg-1.jpg',
        title: 'Sports Complex',
        description: 'World-class sports facilities nurturing athletic talent alongside academics',
        category: 'life'
    },
    {
        src: '/images/college-bg-2.png',
        title: 'Research Center',
        description: 'Cutting-edge laboratories equipped for advanced research and development',
        category: 'academics'
    },
    {
        src: '/images/college-bg-3.png',
        title: 'Student Hub',
        description: 'A vibrant social space where campus life and creativity come alive',
        category: 'life'
    }
]

const categories = [
    { id: 'all', label: 'All Spaces' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'academics', label: 'Academics' },
    { id: 'life', label: 'Campus Life' }
]

function CampusGallery() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [activeCategory, setActiveCategory] = useState('all')
    const [isPaused, setIsPaused] = useState(false)
    const trackRef = useRef(null)
    const autoScrollRef = useRef(null)

    const filteredImages = activeCategory === 'all'
        ? campusImages
        : campusImages.filter(img => img.category === activeCategory)

    const totalSlides = filteredImages.length

    useEffect(() => {
        setActiveIndex(0)
        if (trackRef.current) {
            trackRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        }
    }, [activeCategory])

    useEffect(() => {
        if (isPaused || totalSlides <= 1) return
        autoScrollRef.current = setInterval(() => {
            setActiveIndex(prev => {
                const isLast = prev >= totalSlides - 1
                const next = isLast ? 0 : prev + 1
                if (trackRef.current) {
                    if (isLast) {
                        trackRef.current.scrollTo({ left: 0, behavior: 'smooth' })
                    } else {
                        const card = trackRef.current.children[next]
                        if (card) {
                            const scrollLeft = card.offsetLeft - trackRef.current.offsetWidth / 2 + card.offsetWidth / 2
                            trackRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' })
                        }
                    }
                }
                return next
            })
        }, 4000)
        return () => clearInterval(autoScrollRef.current)
    }, [isPaused, totalSlides, activeCategory])

    const goToSlide = useCallback((index) => {
        setActiveIndex(index)
        if (trackRef.current) {
            const card = trackRef.current.children[index]
            if (card) {
                const scrollLeft = card.offsetLeft - trackRef.current.offsetWidth / 2 + card.offsetWidth / 2
                trackRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' })
            }
        }
    }, [])

    const handleScroll = useCallback(() => {
        if (!trackRef.current) return
        const { scrollLeft, offsetWidth } = trackRef.current
        const cards = trackRef.current.children
        let closestIndex = 0
        let closestDistance = Infinity
        for (let i = 0; i < cards.length; i++) {
            const cardCenter = cards[i].offsetLeft + cards[i].offsetWidth / 2
            const viewCenter = scrollLeft + offsetWidth / 2
            const distance = Math.abs(cardCenter - viewCenter)
            if (distance < closestDistance) {
                closestDistance = distance
                closestIndex = i
            }
        }
        setActiveIndex(closestIndex)
    }, [])

    return (
        <section className="section campus-gallery" id="campus-gallery-section">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Gallery</span>
                    <h2>Campus Life in Pictures</h2>
                    <p>A cinematic glimpse into the state-of-the-art infrastructure and serene environment at MEC</p>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    className="gallery-filters"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`gallery-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            <span className="filter-dot" />
                            {cat.label}
                        </button>
                    ))}
                </motion.div>
            </div>

            {/* Horizontal Scroll Track */}
            <div
                className="gallery-carousel-wrapper"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div
                    className="gallery-carousel-track"
                    ref={trackRef}
                    onScroll={handleScroll}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredImages.map((img, i) => (
                            <motion.div
                                key={`${activeCategory}-${i}`}
                                className={`gallery-carousel-card ${activeIndex === i ? 'active' : ''}`}
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.85 }}
                                transition={{ duration: 0.5, delay: i * 0.06 }}
                                onClick={() => goToSlide(i)}
                            >
                                <div className="gallery-card-frame">
                                    <div className="gallery-card-inner">
                                        <img src={img.src} alt={img.title} draggable="false" />
                                        <div className="gallery-film-grain" />
                                        <div className="gallery-card-gradient" />
                                        <span className="frame-corner frame-tl" />
                                        <span className="frame-corner frame-tr" />
                                        <span className="frame-corner frame-bl" />
                                        <span className="frame-corner frame-br" />
                                    </div>
                                </div>
                                <div className="gallery-card-text">
                                    <span className="gallery-card-category">{img.category}</span>
                                    <h4 className="gallery-card-title">{img.title}</h4>
                                    <p className="gallery-card-desc">{img.description}</p>
                                    <div className="gallery-card-number">
                                        {String(i + 1).padStart(2, '0')}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Navigation Arrows */}
                <button
                    className="gallery-nav-btn gallery-nav-prev"
                    onClick={() => goToSlide((activeIndex - 1 + totalSlides) % totalSlides)}
                    aria-label="Previous slide"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button
                    className="gallery-nav-btn gallery-nav-next"
                    onClick={() => goToSlide((activeIndex + 1) % totalSlides)}
                    aria-label="Next slide"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
            </div>

            {/* Dotted Pagination */}
            <div className="container">
                <div className="gallery-pagination">
                    <div className="gallery-dots">
                        {filteredImages.map((_, i) => (
                            <button
                                key={i}
                                className={`gallery-dot ${activeIndex === i ? 'active' : ''}`}
                                onClick={() => goToSlide(i)}
                                aria-label={`Go to slide ${i + 1}`}
                            >
                                <span className="dot-inner" />
                                <svg className="dot-ring" viewBox="0 0 36 36">
                                    <circle
                                        cx="18" cy="18" r="16"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeDasharray="100.53"
                                        strokeDashoffset={activeIndex === i ? '0' : '100.53'}
                                    />
                                </svg>
                            </button>
                        ))}
                    </div>
                    <div className="gallery-counter">
                        <span className="counter-current">{String(activeIndex + 1).padStart(2, '0')}</span>
                        <span className="counter-separator">/</span>
                        <span className="counter-total">{String(totalSlides).padStart(2, '0')}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ── Helper: render detail modal body based on facility name ── */
function ModalContent({ facility }) {
    const d = facility.details
    if (!d) return null
    const accent = facility.accentColor

    const Section = ({ title, icon, children }) => (
        <div className="modal-section">
            <div className="modal-section-title" style={{ color: accent }}>
                <span className="modal-section-icon">{icon}</span>
                {title}
            </div>
            {children}
        </div>
    )

    const InfoBadge = ({ label, value }) => (
        <div className="modal-info-badge">
            <span className="mib-label">{label}</span>
            <span className="mib-value">{value}</span>
        </div>
    )

    const BulletList = ({ items }) => (
        <ul className="modal-bullet-list">
            {items.map((item, i) => (
                <li key={i}>
                    <span className="bullet-dot" style={{ background: accent }} />
                    {item}
                </li>
            ))}
        </ul>
    )

    return (
        <div className="modal-body-inner">

            {/* ── HOSTEL ── */}
            {facility.name === 'Hostel' && (
                <>
                    <Section title="Warden / Contact" icon="👤">
                        <div className="modal-warden-grid">
                            <div className="modal-warden-card">
                                <div className="warden-avatar" style={{ background: accent }}>♂</div>
                                <div>
                                    <div className="warden-name">{d.head.name}</div>
                                    <div className="warden-desig">{d.head.designation}</div>
                                    <div className="warden-contact">📞 {d.head.contact}</div>
                                    <div className="warden-contact">✉ {d.head.email}</div>
                                </div>
                            </div>
                            <div className="modal-warden-card">
                                <div className="warden-avatar" style={{ background: '#c0699a' }}>♀</div>
                                <div>
                                    <div className="warden-name">{d.headGirls.name}</div>
                                    <div className="warden-desig">{d.headGirls.designation}</div>
                                    <div className="warden-contact">📞 {d.headGirls.contact}</div>
                                    <div className="warden-contact">✉ {d.headGirls.email}</div>
                                </div>
                            </div>
                        </div>
                    </Section>

                    <Section title="Fee Structure" icon="💰">
                        <div className="modal-fee-banner">
                            <div className="fee-item"><span>Annual Fee</span><strong>{d.annualFee}</strong></div>
                            <div className="fee-item"><span>Mess Fee</span><strong>{d.messFee}</strong></div>
                            <div className="fee-item"><span>Security Deposit</span><strong>{d.securityDeposit}</strong></div>
                        </div>
                    </Section>

                    <Section title="Room Types & Rent" icon="🛏️">
                        <div className="modal-room-grid">
                            {d.roomTypes.map((r, i) => (
                                <div className="modal-room-card" key={i} style={{ borderTop: `3px solid ${accent}` }}>
                                    <div className="room-type">{r.type}</div>
                                    <div className="room-rent" style={{ color: accent }}>{r.rent}</div>
                                    <ul className="room-amenity-list">
                                        {r.amenities.map((a, j) => <li key={j}>✓ {a}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </Section>

                    <Section title="Security & Safety" icon="🛡️">
                        <BulletList items={d.security} />
                    </Section>

                    <Section title="Wi-Fi Details" icon="📶">
                        <div className="modal-wifi-grid">
                            <InfoBadge label="Provider" value={d.wifi.provider} />
                            <InfoBadge label="Speed" value={d.wifi.speed} />
                            <InfoBadge label="Coverage" value={d.wifi.coverage} />
                            <InfoBadge label="Timings" value={d.wifi.timings} />
                            <InfoBadge label="Charge" value={d.wifi.charge} />
                        </div>
                    </Section>

                    <Section title="Mess / Dining" icon="🍽️">
                        <div className="modal-mess-info">
                            <div className="mess-meta">
                                <span>🥗 {d.mess.type}</span>
                                <span>👨‍🍳 {d.mess.catering}</span>
                            </div>
                            <div className="mess-timings">
                                {d.mess.timings.map((m, i) => (
                                    <div className="mess-row" key={i}>
                                        <span className="mess-meal">{m.meal}</span>
                                        <span className="mess-time">{m.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Section>

                    <Section title="Amenities & Facilities" icon="🏠">
                        <BulletList items={d.amenities} />
                    </Section>

                    <Section title="Hostel Rules" icon="📋">
                        <BulletList items={d.rules} />
                    </Section>
                </>
            )}

            {/* ── LIBRARY ── */}
            {facility.name === 'Library' && (
                <>
                    <Section title="Librarian / Contact" icon="👤">
                        <div className="modal-warden-card">
                            <div className="warden-avatar" style={{ background: accent }}>📚</div>
                            <div>
                                <div className="warden-name">{d.head.name}</div>
                                <div className="warden-desig">{d.head.designation}</div>
                                <div className="warden-contact">📞 {d.head.contact}</div>
                                <div className="warden-contact">✉ {d.head.email}</div>
                            </div>
                        </div>
                        <div style={{ marginTop: 12 }}>
                            <InfoBadge label="Timings" value={d.timings} />
                            <InfoBadge label="Seating Capacity" value={`${d.seatingCapacity} seats`} />
                            <InfoBadge label="Annual Fee" value={d.annualFee} />
                        </div>
                    </Section>

                    <Section title="Collection & Resources" icon="📖">
                        <div className="modal-collection-grid">
                            {d.collection.map((c, i) => (
                                <div className="collection-item" key={i} style={{ borderLeft: `3px solid ${accent}` }}>
                                    <div className="ci-count" style={{ color: accent }}>{c.count}</div>
                                    <div className="ci-label">{c.category}</div>
                                </div>
                            ))}
                        </div>
                    </Section>

                    <Section title="Digital Resources" icon="💻">
                        <BulletList items={d.digital} />
                    </Section>

                    <Section title="Library Services" icon="🔧">
                        <BulletList items={d.services} />
                    </Section>
                </>
            )}

            {/* ── LABORATORIES ── */}
            {facility.name === 'Laboratories' && (
                <>
                    <Section title="Lab Coordinator / Contact" icon="👤">
                        <div className="modal-warden-card">
                            <div className="warden-avatar" style={{ background: accent }}>🔬</div>
                            <div>
                                <div className="warden-name">{d.head.name}</div>
                                <div className="warden-desig">{d.head.designation}</div>
                                <div className="warden-contact">📞 {d.head.contact}</div>
                                <div className="warden-contact">✉ {d.head.email}</div>
                            </div>
                        </div>
                        <div style={{ marginTop: 12 }}>
                            <InfoBadge label="Total Labs" value={`${d.totalLabs} laboratories`} />
                            <InfoBadge label="Timings" value={d.timings} />
                        </div>
                    </Section>

                    <Section title="Labs by Department" icon="🏛️">
                        {d.labs.map((lab, i) => (
                            <div className="lab-dept-block" key={i} style={{ borderLeft: `3px solid ${accent}` }}>
                                <div className="lab-dept-name" style={{ color: accent }}>{lab.dept}</div>
                                <div className="lab-names">
                                    {lab.labs.map((l, j) => <span key={j} className="lab-chip">{l}</span>)}
                                </div>
                                <div className="lab-software">💾 Software: {lab.software}</div>
                            </div>
                        ))}
                    </Section>

                    <Section title="Safety Measures" icon="🛡️">
                        <BulletList items={d.safety} />
                    </Section>
                </>
            )}

            {/* ── TRANSPORT ── */}
            {facility.name === 'Transport' && (
                <>
                    <Section title="Transport In-charge / Contact" icon="👤">
                        <div className="modal-warden-card">
                            <div className="warden-avatar" style={{ background: accent }}>🚌</div>
                            <div>
                                <div className="warden-name">{d.head.name}</div>
                                <div className="warden-desig">{d.head.designation}</div>
                                <div className="warden-contact">📞 {d.head.contact}</div>
                                <div className="warden-contact">✉ {d.head.email}</div>
                            </div>
                        </div>
                        <div style={{ marginTop: 12 }}>
                            <InfoBadge label="Fleet Size" value={`${d.fleetSize} buses`} />
                        </div>
                    </Section>

                    <Section title="Bus Routes & Timings" icon="🗺️">
                        <div className="modal-routes-table">
                            <div className="routes-header">
                                <span>Route</span><span>Stops</span><span>Departure / Return</span>
                            </div>
                            {d.routes.map((r, i) => (
                                <div className="routes-row" key={i}>
                                    <span className="route-name">{r.route}</span>
                                    <span className="route-stops">{r.stops}</span>
                                    <span className="route-timing">{r.timing}</span>
                                </div>
                            ))}
                        </div>
                    </Section>

                    <Section title="Transport Fee (Annual)" icon="💰">
                        <div className="modal-room-grid">
                            {d.fees.map((f, i) => (
                                <div className="modal-room-card" key={i} style={{ borderTop: `3px solid ${accent}` }}>
                                    <div className="room-type">{f.distance}</div>
                                    <div className="room-rent" style={{ color: accent }}>{f.annual}</div>
                                </div>
                            ))}
                        </div>
                    </Section>

                    <Section title="Safety & Standards" icon="🛡️">
                        <BulletList items={d.safety} />
                    </Section>
                </>
            )}

            {/* ── SPORTS ── */}
            {facility.name === 'Sports & Gymnasium' && (
                <>
                    <Section title="Sports Director / Contact" icon="👤">
                        <div className="modal-warden-card">
                            <div className="warden-avatar" style={{ background: accent }}>🏋️</div>
                            <div>
                                <div className="warden-name">{d.head.name}</div>
                                <div className="warden-desig">{d.head.designation}</div>
                                <div className="warden-contact">📞 {d.head.contact}</div>
                                <div className="warden-contact">✉ {d.head.email}</div>
                            </div>
                        </div>
                        <div style={{ marginTop: 12 }}>
                            <InfoBadge label="Timings" value={d.timings} />
                            <InfoBadge label="Gym Fee" value={d.gymFee} />
                        </div>
                    </Section>

                    <Section title="Outdoor Facilities" icon="🌿">
                        <BulletList items={d.outdoorFacilities} />
                    </Section>

                    <Section title="Indoor Facilities" icon="🏠">
                        <BulletList items={d.indoorFacilities} />
                    </Section>

                    <Section title="Gymnasium Equipment" icon="💪">
                        <div className="modal-wifi-grid">
                            {d.gymEquipment.map((e, i) => (
                                <InfoBadge key={i} label={`Equipment ${i + 1}`} value={e} />
                            ))}
                        </div>
                    </Section>

                    <Section title="Achievements" icon="🏆">
                        <BulletList items={d.achievements} />
                    </Section>
                </>
            )}

            {/* ── LANGUAGE LAB ── */}
            {facility.name === 'Language Lab' && (
                <>
                    <Section title="Lab In-charge / Contact" icon="👤">
                        <div className="modal-warden-card">
                            <div className="warden-avatar" style={{ background: accent }}>🗣️</div>
                            <div>
                                <div className="warden-name">{d.head.name}</div>
                                <div className="warden-desig">{d.head.designation}</div>
                                <div className="warden-contact">📞 {d.head.contact}</div>
                                <div className="warden-contact">✉ {d.head.email}</div>
                            </div>
                        </div>
                        <div style={{ marginTop: 12 }}>
                            <InfoBadge label="Seating Capacity" value={`${d.seatingCapacity} workstations`} />
                            <InfoBadge label="Timings" value={d.timings} />
                        </div>
                    </Section>

                    <Section title="Equipment" icon="🎧">
                        <BulletList items={d.equipment} />
                    </Section>

                    <Section title="Training Programs" icon="📋">
                        <div className="modal-routes-table">
                            <div className="routes-header">
                                <span>Program</span><span>Duration</span><span>Outcome</span>
                            </div>
                            {d.programs.map((p, i) => (
                                <div className="routes-row" key={i}>
                                    <span className="route-name">{p.name}</span>
                                    <span className="route-stops">{p.duration}</span>
                                    <span className="route-timing">{p.outcome}</span>
                                </div>
                            ))}
                        </div>
                    </Section>

                    <Section title="Software & Tools" icon="💾">
                        <BulletList items={d.software} />
                    </Section>
                </>
            )}
        </div>
    )
}

export default function Campus() {
    const [selected, setSelected] = useState(null)

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selected) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [selected])

    return (
        <>
            <section className="section fac-section" style={{ background: 'var(--off-white)' }}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Infrastructure</span>
                        <h2>Our Facilities</h2>
                        <p>State-of-the-art infrastructure designed for holistic development</p>
                    </div>

                    <div className="fac-grid">
                        {facilities.map((facility, i) => (
                            <motion.div
                                className="fac-card"
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {/* Gradient top bar */}
                                <div className="fac-card-bar" style={{ background: facility.gradient }} />

                                {/* Card image (blurred bg) */}
                                <div className="fac-card-img-bg" style={{ backgroundImage: `url(${facility.image})` }} />

                                {/* Glass body */}
                                <div className="fac-card-body">
                                    <div className="fac-icon-wrap" style={{ background: facility.gradient }}>
                                        <span className="fac-icon">{facility.icon}</span>
                                    </div>

                                    <div className="fac-tagline" style={{ color: facility.accentColor }}>{facility.tagline}</div>
                                    <h3 className="fac-name">{facility.name}</h3>
                                    <p className="fac-desc">{facility.description}</p>

                                    <div className="fac-features">
                                        {facility.features.map((f, j) => (
                                            <span key={j} className="fac-feature-chip" style={{ '--chip-color': facility.accentColor }}>
                                                {f}
                                            </span>
                                        ))}
                                    </div>

                                    <motion.button
                                        className="fac-explore-btn"
                                        style={{ background: facility.gradient }}
                                        onClick={() => setSelected(facility)}
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        <span>Explore Details</span>
                                        <span className="fac-btn-arrow">→</span>
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Campus Stats Banner ── */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                        <div className="stat-item"><div className="stat-value">15</div><div className="stat-label">Acre Campus</div></div>
                        <div className="stat-item"><div className="stat-value">18K+</div><div className="stat-label">Library Books</div></div>
                        <div className="stat-item"><div className="stat-value">10+</div><div className="stat-label">Modern Labs</div></div>
                        <div className="stat-item"><div className="stat-value">24/7</div><div className="stat-label">Campus Security</div></div>
                    </div>
                </div>
            </section>

            {/* ── Campus Life ── */}
            <section className="section">
                <div className="container">
                    <div className="about-preview-grid">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="about-label">Student Life</span>
                            <h2>Beyond the Classroom</h2>
                            <p style={{ marginBottom: 20 }}>
                                At MEC, we believe in the holistic development of our students. Beyond academics,
                                our campus offers a vibrant environment for extracurricular activities, sports,
                                cultural events, and technical clubs.
                            </p>
                            <p style={{ marginBottom: 20 }}>
                                The annual technical fest <strong>TechMEC</strong> brings together students from
                                across the region for hackathons, coding competitions, and robotics challenges.
                                Our sports teams regularly participate in inter-college tournaments.
                            </p>
                            <div className="about-features">
                                <div className="about-feature"><span className="check">✓</span> Annual Tech Fest</div>
                                <div className="about-feature"><span className="check">✓</span> Cultural Programs</div>
                                <div className="about-feature"><span className="check">✓</span> Technical Clubs</div>
                                <div className="about-feature"><span className="check">✓</span> Sports Tournaments</div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="about-preview-img"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="img-placeholder" style={{ background: 'var(--grad-accent)', color: 'rgba(0,0,0,0.1)' }}>🎓</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Gallery Carousel (same as Home page) ── */}
            <CampusGallery />

            {/* ── Detail Modal ── */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        className="fac-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => { if (e.target === e.currentTarget) setSelected(null) }}
                    >
                        <motion.div
                            className="fac-modal"
                            initial={{ opacity: 0, y: 60, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 60, scale: 0.95 }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Modal Header */}
                            <div className="fac-modal-header" style={{ background: selected.gradient }}>
                                <div className="fac-modal-header-img" style={{ backgroundImage: `url(${selected.image})` }} />
                                <div className="fac-modal-header-overlay" />
                                <div className="fac-modal-header-content">
                                    <div className="fac-modal-icon">{selected.icon}</div>
                                    <div>
                                        <div className="fac-modal-tagline">{selected.tagline}</div>
                                        <h2 className="fac-modal-title">{selected.name}</h2>
                                        <p className="fac-modal-desc">{selected.description}</p>
                                    </div>
                                </div>
                                <button className="fac-modal-close" onClick={() => setSelected(null)} aria-label="Close">✕</button>
                            </div>

                            {/* Feature chips */}
                            <div className="fac-modal-chips">
                                {selected.features.map((f, i) => (
                                    <span key={i} className="fac-modal-chip" style={{ background: selected.accentColor + '18', color: selected.accentColor, border: `1px solid ${selected.accentColor}40` }}>
                                        ✓ {f}
                                    </span>
                                ))}
                            </div>

                            {/* Scrollable detail content */}
                            <div className="fac-modal-scroll">
                                <ModalContent facility={selected} />
                            </div>

                            {/* Footer */}
                            <div className="fac-modal-footer">
                                <button className="fac-modal-close-btn" onClick={() => setSelected(null)}>
                                    Close
                                </button>
                                <a href="/contact" className="fac-modal-contact-btn" style={{ background: selected.gradient }}>
                                    Contact Admission Office →
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
