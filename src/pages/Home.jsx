import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    departments as staticDepartments,
    highlights,
    testimonials as staticTestimonials,
    events as staticEvents,
    stats as staticStats
} from '../data/content'
import AnimatedCounter from '../components/AnimatedCounter'
import { useDepartments, useStats, useEvents, useTestimonials } from '../hooks/useSupabase'


const fadeUp = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: (i = 0) => ({
        opacity: 1, y: 0, filter: 'blur(0px)',
        transition: { 
            duration: 0.8, 
            delay: 0.1 + i * 0.15, 
            ease: [0.22, 1, 0.36, 1] 
        }
    })
}

const TypewriterText = ({ text }) => {
    // Split text by <span> tags to preserve them
    const parts = text.split(/(<span.*?>.*?<\/span>)/g);
    
    return (
        <motion.span
            initial="hidden"
            animate="visible"
            className="typewriter-container"
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.05 // Slightly slower for readability
                    }
                }
            }}
            style={{ whiteSpace: 'pre-wrap' }}
        >
            {parts.map((part, i) => {
                if (part.startsWith('<span')) {
                    const content = part.replace(/<span.*?>|<\/span>/g, '');
                    return (
                        <span key={i} className="typewriter-span" style={{ whiteSpace: 'pre-wrap' }}>
                            {content.split('').map((char, j) => (
                                <motion.span
                                    key={j}
                                    variants={{
                                        hidden: { opacity: 0 },
                                        visible: { opacity: 1 }
                                    }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </span>
                    );
                }
                return part.split('').map((char, j) => (
                    <motion.span
                        key={`${i}-${j}`}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 }
                        }}
                    >
                        {char}
                    </motion.span>
                ));
            })}
        </motion.span>
    );
}

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

    // Reset active index when category changes
    useEffect(() => {
        setActiveIndex(0)
        if (trackRef.current) {
            trackRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        }
    }, [activeCategory])

    // Auto-scroll — scrolls forward, then smoothly back to first when reaching the end
    useEffect(() => {
        if (isPaused || totalSlides <= 1) return
        autoScrollRef.current = setInterval(() => {
            setActiveIndex(prev => {
                const isLast = prev >= totalSlides - 1
                const next = isLast ? 0 : prev + 1
                if (trackRef.current) {
                    if (isLast) {
                        // Scroll straight back to the first card
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
        <section className="section campus-gallery" id="campus-gallery">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Campus Life</span>
                    <h2>Explore Our Campus</h2>
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
                                {/* Frame */}
                                <div className="gallery-card-frame">
                                    <div className="gallery-card-inner">
                                        <img src={img.src} alt={img.title} draggable="false" />
                                        {/* Film grain overlay */}
                                        <div className="gallery-film-grain" />
                                        {/* Gradient overlay */}
                                        <div className="gallery-card-gradient" />
                                        {/* Corner accents */}
                                        <span className="frame-corner frame-tl" />
                                        <span className="frame-corner frame-tr" />
                                        <span className="frame-corner frame-bl" />
                                        <span className="frame-corner frame-br" />
                                    </div>
                                </div>
                                {/* Text overlay */}
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

            {/* Dotted Pagination Controller */}
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

export default function Home() {
    // ── Supabase data (falls back to static if Supabase unavailable) ──
    const { data: sbDepts }         = useDepartments()
    const { data: sbStats }         = useStats()
    const { data: sbEvents }        = useEvents()
    const { data: sbTestimonials }  = useTestimonials()

    const departments  = sbDepts?.length        > 0 ? sbDepts        : staticDepartments
    const stats        = sbStats?.length        > 0 ? sbStats        : staticStats
    const events       = sbEvents?.length       > 0 ? sbEvents       : staticEvents
    const testimonials = sbTestimonials?.length > 0 ? sbTestimonials : staticTestimonials

    const videos = [
        {
            src: '/Drone_Video_Generation.mp4',
            title: 'A MODERN <span>CAMPUS</span> BUILT FOR EXCELLENCE',
            desc: 'Nestled in a serene, distraction-free environment, our infrastructure provides the perfect blend of cutting-edge technology and natural tranquility.'
        },
        {
            src: '/Students_Learning_BTech_North_India.mp4',
            title: 'EMPOWERING MINDS THROUGH <span>KNOWLEDGE</span>',
            desc: 'Step into our world-class library, a beacon of research and learning equipped with extensive resources to fuel your engineering journey.'
        },
        {
            src: 'https://assets.mixkit.co/videos/preview/mixkit-science-student-in-a-laboratory-looking-at-samples-41130-large.mp4',
            title: 'ADVANCED <span>LABORATORIES</span> FOR RESEARCH',
            desc: 'Our state-of-the-art labs are the breeding ground for the next generation of innovators and researchers.'
        },
        {
            src: 'https://assets.mixkit.co/videos/preview/mixkit-group-of-friends-playing-basketball-in-a-gym-41005-large.mp4',
            title: 'HOLISTIC <span>DEVELOPMENT</span> & SPORTS',
            desc: 'Beyond academics, we nurture physical excellence through world-class sports facilities and a vibrant campus life.'
        },
        {
            src: 'https://assets.mixkit.co/videos/preview/mixkit-mechanical-engineer-working-on-a-machine-41125-large.mp4',
            title: 'HANDS-ON <span>TECHNICAL</span> TRAINING',
            desc: 'Bridging the gap between theory and practice with sophisticated workshops and industrial-grade machinery.'
        }
    ]
    const [currentVideo, setCurrentVideo] = useState(0)

    const handleVideoEnd = () => {
        setCurrentVideo((prev) => (prev + 1) % videos.length)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            handleVideoEnd()
        }, 10000) // Fallback timer to ensure text always rotates
        return () => clearTimeout(timer)
    }, [currentVideo])

    return (
        <>
            {/* ===== HERO ===== */}
            <section className="hero">
                <video
                    key={videos[currentVideo].src}
                    className="hero-bg-video"
                    autoPlay
                    muted
                    playsInline
                    onEnded={handleVideoEnd}
                    onError={handleVideoEnd}
                >
                    <source src={videos[currentVideo].src} type="video/mp4" />
                </video>
                <div className="hero-video-overlay" />
                <div className="hero-bg-pattern" />
                <div className="hero-grid" />

                <div className="container">
                    <div className="hero-content">
                        <motion.div 
                            className="hero-badge" 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            🎓 AICTE Approved · DCRUST Affiliated
                        </motion.div>
                        
                        <motion.div 
                            key={currentVideo}
                            initial="hidden" 
                            animate="visible"
                        >
                            <motion.h1 
                                initial={{ opacity: 1 }}
                                className="glassy-text"
                            >
                                <TypewriterText text={videos[currentVideo].title} />
                            </motion.h1>
                            <motion.p variants={fadeUp} custom={1}>
                                {videos[currentVideo].desc}
                            </motion.p>
                            <motion.div className="hero-buttons" variants={fadeUp} custom={2}>
                                <Link to="/admissions" className="btn btn-accent">Apply Now →</Link>
                                <Link to="/about" className="btn btn-outline">Explore College</Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== HIGHLIGHTS ===== */}
            <section className="section highlights">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Why MEC</span>
                        <h2>What Makes Us Stand Out</h2>
                        <p>Our commitment to excellence sets us apart as one of the leading engineering institutions in the region</p>
                    </div>
                    <div className="highlights-grid">
                        {highlights.map((item, i) => (
                            <motion.div
                                className="highlight-card"
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="highlight-icon">{item.icon}</div>
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== ABOUT PREVIEW ===== */}
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
                                <img src="/images/college-bg-2.png" alt="MEC Campus" className="about-img-main" />
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
                            <h2>Empowering Engineers, Transforming Lives</h2>
                            <p>
                                Mewat Engineering College (WAQF) is a premier engineering institution situated in the serene
                                surroundings of Village Palla, District Nuh. Committed to transforming lives through quality
                                technical education, we offer programs in 5 engineering disciplines.
                            </p>
                            <div className="about-features">
                                <div className="about-feature">
                                    <span className="check">✓</span> AICTE Approved Programs
                                </div>
                                <div className="about-feature">
                                    <span className="check">✓</span> Experienced Faculty
                                </div>
                                <div className="about-feature">
                                    <span className="check">✓</span> Modern Laboratories
                                </div>
                                <div className="about-feature">
                                    <span className="check">✓</span> 100% Placement Support
                                </div>
                            </div>
                            <Link to="/about" className="btn btn-primary">Learn More →</Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== DIRECTOR'S MESSAGE ===== */}
            <section className="section director-section">
                <div className="container">
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
                                <img src="/images/director.png" alt="Director of Mewat Engineering College" />
                            </div>
                            <div className="director-name-card">
                                <h3>Director</h3>
                                <div className="director-title">Mewat Engineering College</div>
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
                            <p>
                                Welcome to Mewat Engineering College (WAQF). Our institution is dedicated to providing
                                quality technical education that empowers students from all backgrounds, especially the
                                underserved communities of the Mewat region.
                            </p>
                            <p>
                                We believe in nurturing not just engineers, but responsible citizens who can contribute
                                to the nation's progress. With our experienced faculty, modern infrastructure, and
                                industry-aligned curriculum, we are committed to shaping the future leaders of technology.
                            </p>
                            <p>
                                I invite all aspiring engineers to join our family and embark on a transformative journey
                                of learning and growth.
                            </p>
                            <div className="director-signature">
                                <div className="director-signature-line" />
                                <span>Director, MEC (WAQF)</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== DEPARTMENTS ===== */}
            <section className="section departments-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Academics</span>
                        <h2>Our Departments</h2>
                        <p>Six departments offering cutting-edge curricula across various engineering disciplines</p>
                    </div>
                    <div className="departments-grid">
                        {departments.map((dept, i) => (
                            <motion.div
                                className={`dept-card dept-card--${dept.id}`}
                                key={dept.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                            >
                                <div className="dept-card__header">
                                    <img className="dept-card__icon" src={dept.iconImg} alt={dept.shortName} />
                                    <div className="dept-card__shortname">{dept.shortName}</div>
                                </div>
                                <div className="dept-card__body">
                                    <h3 className="dept-card__title">{dept.name}</h3>
                                    {dept.seats ? (
                                        <span className="dept-card__seats">🎓 {dept.seats} Seats</span>
                                    ) : (
                                        <span className="dept-card__seats dept-card__seats--foundation">📌 Foundation Department</span>
                                    )}
                                    <p className="dept-card__desc">{dept.description}</p>
                                    <div className="dept-card__tags">
                                        {dept.highlights.slice(0, 3).map((h, j) => (
                                            <span key={j} className="dept-card__tag">{h}</span>
                                        ))}
                                    </div>
                                    <Link to={`/departments/${dept.id}`} className="dept-card__btn">
                                        Explore Department
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== STATS ===== */}
            <section className="stats-section">
                <div className="stats-marquee">
                    <div className="stats-track">
                        {[...stats, ...stats].map((s, i) => (
                            <div className={`stat-glass-card stat-${s.id}`} key={i}>
                                <div className="stat-icon">{s.icon}</div>
                                <div className="stat-value">
                                    <AnimatedCounter end={s.value} suffix={s.suffix} />
                                </div>
                                <div className="stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== EVENTS ===== */}
            <section className="section events-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Happenings</span>
                        <h2>News & Events</h2>
                        <p>Stay updated with the latest events, workshops, and activities at MEC</p>
                    </div>
                    <div className="events-grid">
                        {events.map((event, i) => (
                            <motion.div
                                className="event-card"
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                            >
                                <div className="event-image">
                                    <img src={event.image_url || event.image} alt={event.title} />
                                    <div className="event-date-badge">
                                        <div className="month">{event.date.split(' ')[0]}</div>
                                        <div className="year">{event.date.split(' ')[1]}</div>
                                    </div>
                                </div>
                                <div className="event-info">
                                    <span className={`event-type ${event.type}`}>{event.type}</span>
                                    <h4>{event.title}</h4>
                                    <p>{event.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIALS ===== */}
            <section className="section testimonials-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Testimonials</span>
                        <h2>What Our Students Say</h2>
                        <p>Hear from our alumni about their transformative experience at MEC</p>
                    </div>
                    <div className="testimonials-grid">
                        {testimonials.map((t, i) => (
                            <motion.div
                                className="testimonial-card"
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="testimonial-quote">{t.quote}</div>
                                <div className="testimonial-author">
                                    <div className="testimonial-avatar">{t.avatar}</div>
                                    <div>
                                        <div className="testimonial-name">{t.name}</div>
                                        <div className="testimonial-branch">{t.branch}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CAMPUS GALLERY ===== */}
            <CampusGallery />

            {/* ===== CTA ===== */}
            <section className="cta-section">
                <div className="container">
                    <motion.div
                        className="cta-card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>Begin Your Engineering Journey</h2>
                        <p>
                            Join Mewat Engineering College and be part of a legacy of excellence.
                            Applications are open for the upcoming academic session.
                        </p>
                        <div className="cta-buttons">
                            <Link to="/admissions" className="btn btn-accent">Apply Now →</Link>
                            <Link to="/contact" className="btn btn-outline">Contact Us</Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}
