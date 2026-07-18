
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
import { getAssetPath } from '../utils/assets'
import { FiBriefcase, FiAward, FiUsers, FiBookOpen, FiMap, FiCheckCircle, FiPercent, FiTrendingUp, FiHome, FiUser, FiBell, FiArrowRight, FiStar } from 'react-icons/fi'
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa'
import AboutPreview from '../components/AboutPreview'
import DirectorMessage from '../components/DirectorMessage'
import SEO from '../components/SEO'
import JackPortfolio from '../components/JackPortfolio'



const campusImages = [
    {
        src: getAssetPath('/images/college-bg.png'),
        title: 'Grand Entrance',
        description: 'The iconic main gateway welcoming future engineers into a world of possibilities',
        category: 'architecture'
    },
    {
        src: getAssetPath('/images/college-bg-1.jpg'),
        title: 'Aerial Campus View',
        description: 'A breathtaking panoramic perspective of our sprawling 28-acre green campus',
        category: 'architecture'
    },
    {
        src: getAssetPath('/images/college-bg-2.png'),
        title: 'Engineering Block',
        description: 'State-of-the-art engineering labs and smart classrooms powering innovation',
        category: 'academics'
    },
    {
        src: getAssetPath('/images/college-bg-3.png'),
        title: 'Academic Plaza',
        description: 'Where ideas converge — the central hub of collaboration and campus culture',
        category: 'life'
    },
    {
        src: getAssetPath('/images/college-bg.png'),
        title: 'Library Wing',
        description: 'A modern knowledge center with digital resources and quiet study zones',
        category: 'academics'
    },
    {
        src: getAssetPath('/images/college-bg-1.jpg'),
        title: 'Sports Complex',
        description: 'World-class sports facilities nurturing athletic talent alongside academics',
        category: 'life'
    },
    {
        src: getAssetPath('/images/college-bg-2.png'),
        title: 'Research Center',
        description: 'Cutting-edge laboratories equipped for advanced research and development',
        category: 'academics'
    },
    {
        src: getAssetPath('/images/college-bg-3.png'),
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

function NotificationCard() {
    const [isPaused, setIsPaused] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)

    const notices = [
        { text: 'All students must fill SCF form before 30-06-2026. Late fee penalty of ₹500 will be charged.', type: 'urgent', label: 'URGENT', date: 'Jun 30' },
        { text: 'End semester examinations start from 15th July 2026. Download your hall tickets from the portal.', type: 'exam', label: 'EXAM', date: 'Jul 15' },
        { text: 'Tomorrow (3rd May) is declared holiday on account of Eid-ul-Fitr. College will remain closed.', type: 'holiday', label: 'HOLIDAY', date: 'May 3' },
        { text: 'Post-matric scholarship portal is now open. Eligible students must apply before 20th June 2026.', type: 'scholarship', label: 'SCHOLARSHIP', date: 'Jun 20' },
        { text: 'TCS & Infosys campus placement drive scheduled for 10th June. Register on placement portal now.', type: 'placement', label: 'PLACEMENT', date: 'Jun 10' },
        { text: 'Library books must be returned before 25th May. Overdue fine: ₹10/day per book.', type: 'notice', label: 'NOTICE', date: 'May 25' },
        { text: 'Annual sports meet "Khel Mahakumbh 2026" registrations are open. Last date: 8th June.', type: 'event', label: 'EVENT', date: 'Jun 8' },
    ]

    useEffect(() => {
        if (isPaused) return
        const timer = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % notices.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [isPaused, notices.length])

    const typeConfig = {
        urgent:     { color: '#FF4757', bg: 'rgba(255,71,87,0.1)' },
        exam:       { color: '#FF8C00', bg: 'rgba(255,140,0,0.1)' },
        holiday:    { color: '#2ED573', bg: 'rgba(46,213,115,0.1)' },
        scholarship:{ color: '#A855F7', bg: 'rgba(168,85,247,0.1)' },
        placement:  { color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
        notice:     { color: '#C8A951', bg: 'rgba(200,169,81,0.1)' },
        event:      { color: '#F97316', bg: 'rgba(249,115,22,0.1)' },
    }

    const currentNotice = notices[activeIndex]
    const cfg = typeConfig[currentNotice.type] || typeConfig.notice

    return (
        <div 
            className="notification-card"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Premium Header */}
            <div className="notification-header">
                <div className="noti-header-title">
                    <FiBell className="notification-icon-bell" />
                    <span>Notice Board</span>
                </div>
            </div>

            {/* Decorative divider */}
            <div className="noti-divider">
                <div className="noti-divider-line" />
                <div className="noti-divider-diamond" />
                <div className="noti-divider-line" />
            </div>

            {/* Futuristic Single Notice View */}
            <div className="notification-display">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="notification-active-item"
                        style={{ '--noti-color': cfg.color, '--noti-bg': cfg.bg }}
                    >
                        <div className="noti-accent-bar" />
                        <div className="noti-content">
                            <div className="noti-meta">
                                <span className="noti-label" style={{ color: cfg.color, background: cfg.bg }}>
                                    {currentNotice.label}
                                </span>
                                <span className="noti-date">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                    {currentNotice.date}
                                </span>
                            </div>
                            <p className="noti-text">{currentNotice.text}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Progress Indicators */}
                <div className="noti-progress-container">
                    {notices.map((_, i) => (
                        <div 
                            key={i} 
                            className={`noti-dot ${i === activeIndex ? 'active' : ''}`}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="noti-footer">
                <Link to="/notices" className="noti-view-all">
                    View All Notices
                    <FiArrowRight size={13} />
                </Link>
            </div>
        </div>
    )
}

const GravityParticles = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let particles = [];
        const particleCount = 120;

        const resize = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };

        class Particle {
            constructor() {
                this.init();
            }

            init() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.4 + 0.1;
                this.angle = Math.random() * Math.PI * 2;
                this.velocity = Math.random() * 0.2 + 0.1;
            }

            update() {
                // Anti-gravity float
                this.angle += 0.01;
                this.x += Math.cos(this.angle) * this.velocity + this.speedX;
                this.y += Math.sin(this.angle) * this.velocity + this.speedY;

                if (this.x < -10) this.x = canvas.width + 10;
                if (this.x > canvas.width + 10) this.x = -10;
                if (this.y < -10) this.y = canvas.height + 10;
                if (this.y > canvas.height + 10) this.y = -10;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`;
                ctx.fill();
            }
        }

        const createParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        createParticles();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} />;
};

export default function Home() {
    // Always use static data first for verified accuracy
    const departments  = staticDepartments
    const stats        = staticStats
    const events       = staticEvents
    const testimonials = staticTestimonials

    const heroTexts = [
        {
            title: 'A MODERN <span>CAMPUS</span> BUILT FOR EXCELLENCE',
            desc: 'Nestled in a serene, distraction-free environment, our infrastructure provides the perfect blend of cutting-edge technology and natural tranquility.'
        },
        {
            title: 'EMPOWERING MINDS THROUGH <span>KNOWLEDGE</span>',
            desc: 'Step into our world-class library, a beacon of research and learning equipped with extensive resources to fuel your engineering journey.'
        },
        {
            title: 'ADVANCED <span>LABORATORIES</span> FOR RESEARCH',
            desc: 'Our state-of-the-art labs are the breeding ground for the next generation of innovators and researchers.'
        }
    ]
    const [currentText, setCurrentText] = useState(0)
    
    // Video Rotation State
    const videoRef = useRef(null)
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
    const heroVideos = ['/library.mp4', '/mec college1.mp4', '/mec college2.mp4', '/mec college3.mp4', '/mec college4.mp4']
    const heroVideoContent = [
        {
            title: 'WORLD CLASS LIBRARY',
            desc: 'Our central library is a beacon of research and learning, equipped with over 40,000 volumes and digital resources.'
        },
        {
            title: 'BEST INFRASTRUCTURE',
            desc: 'A modern 28-acre green campus designed to provide a world-class engineering education environment.'
        },
        {
            title: 'MODERN LABORATORIES',
            desc: 'Advanced research facilities equipped with state-of-the-art technology for hands-on technical learning.'
        },
        {
            title: 'ACADEMIC EXCELLENCE',
            desc: 'Nurturing future innovators through rigorous academic curricula and guidance from expert faculty.'
        },
        {
            title: 'VIBRANT CAMPUS LIFE',
            desc: 'A diverse and inclusive environment where students learn, collaborate, and create lasting memories.'
        }
    ]

    const handleVideoEnd = () => {
        setCurrentVideoIndex((prev) => (prev + 1) % heroVideos.length)
    }

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => {})
        }
    }, [currentVideoIndex])

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentText((prev) => (prev + 1) % heroTexts.length)
        }, 8000)
        return () => clearTimeout(timer)
    }, [currentText])

    const DEPT_CURSOR_ICONS = {
        cse: ['icon_21.webp', 'icon_22.webp', 'icon_23.webp', 'icon_20.webp'].map(i => getAssetPath(`/images/cursor/${i}`)),
        civil: ['icon_15.webp', 'icon_14.webp', 'icon_13.webp', 'icon_11.webp'].map(i => getAssetPath(`/images/cursor/${i}`)),
        mechanical: ['icon_16.webp', 'icon_17.webp', 'icon_19.webp', 'icon_1.webp'].map(i => getAssetPath(`/images/cursor/${i}`)),
        eee: ['icon_18.webp', 'icon_5.webp', 'icon_20.webp', 'icon_11.webp'].map(i => getAssetPath(`/images/cursor/${i}`)),
        ece: ['icon_12.webp', 'icon_11.webp', 'icon_21.webp', 'icon_6.webp'].map(i => getAssetPath(`/images/cursor/${i}`)),
        ash: ['icon_10.webp', 'icon_9.webp', 'icon_8.webp', 'icon_7.webp'].map(i => getAssetPath(`/images/cursor/${i}`))
    }

    const handleDeptMouseEnter = (deptId) => {
        const icons = DEPT_CURSOR_ICONS[deptId] || []
        window.dispatchEvent(new CustomEvent('cursor-change', { detail: { icons } }))
    }

    const handleDeptMouseLeave = () => {
        window.dispatchEvent(new CustomEvent('cursor-change', { detail: { icons: null } }))
    }

    const StatIcon = ({ id }) => {
        const icons = {
            placed: <FiBriefcase />,
            gate: <FiAward />,
            air: <FiAward />,
            recruiters: <FiUsers />,
            books: <FiBookOpen />,
            acres: <FiMap />
        }
        return icons[id] || <FiAward />
    }

    const HighlightIcon = ({ index }) => {
        const icons = [
            <FiCheckCircle />,
            <FiAward />,
            <FiBriefcase />,
            <FiPercent />,
            <FiTrendingUp />,
            <FiHome />
        ]
        return icons[index] || <FiCheckCircle />
    }

    return (
        <>
            <SEO 
                title="Home" 
                description="Mewat Engineering College (WAQF) - A premier engineering institution providing quality technical education and innovation." 
            />
            {/* ===== FULLSCREEN HERO ===== */}
            <section className="home-layout">
                <div className="home-layout-grid">
                    <div className="home-hero-fullscreen">
                        {/* Full-screen background video */}
                        <video
                            ref={videoRef}
                            src={getAssetPath(heroVideos[currentVideoIndex])}
                            autoPlay
                            muted
                            playsInline
                            onEnded={handleVideoEnd}
                            className="hero-video-fullscreen"
                        />

                        {/* Cinematic gradient overlay */}
                        <div className="hero-video-overlay"></div>

                        {/* Desktop AICTE Badge - Bottom Right */}
                        <motion.div
                            className="hero-vex-pill-badge badge-desktop"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                        >
                            <span className="pill-chip">AICTE Approved</span>
                            <span className="pill-divider" />
                            <span className="pill-chip">Est. 2014</span>
                            <span className="pill-divider" />
                            <span className="pill-chip">Nuh, Haryana</span>
                        </motion.div>

                        {/* Bottom-left hero content */}
                        <div className="hero-vex-content">
                            {/* Mobile AICTE Badge - Top Left */}
                            <motion.div
                                className="hero-vex-pill-badge badge-mobile"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                            >
                                <span className="pill-chip">AICTE Approved</span>
                                <span className="pill-divider" />
                                <span className="pill-chip">Est. 2014</span>
                                <span className="pill-divider" />
                                <span className="pill-chip">Nuh, Haryana</span>
                            </motion.div>


                            <motion.h1
                                className="vex-hero-title"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            >
                                Shaping tomorrow's<br />engineers with vision and<br />purpose.
                            </motion.h1>
                            <motion.p
                                className="vex-hero-desc"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.45 }}
                            >
                                We nurture innovators and build careers that define what comes next.
                            </motion.p>
                            <motion.div
                                className="vex-hero-buttons"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.65 }}
                            >
                                <Link to="/student-portal" className="vex-btn-primary">Student Portal</Link>
                                <Link to="/departments" className="vex-btn-secondary">Explore Departments</Link>
                            </motion.div>
                        </div>
                        {/* Badge was moved to top of title */}

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
                                className={`highlight-card ${i === highlights.length - 1 ? 'highlight-card--full' : ''}`}
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="highlight-content">
                                    <div className="highlight-icon">
                                        <HighlightIcon index={i} />
                                    </div>
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
                                {item.image && (
                                    <div className="highlight-image-wrapper">
                                        <img src={getAssetPath(item.image)} alt={item.title} className="highlight-image" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <AboutPreview />
            <DirectorMessage />

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
                                onMouseEnter={() => handleDeptMouseEnter(dept.id)}
                                onMouseLeave={handleDeptMouseLeave}
                            >
                                <div className="dept-card__header">
                                    <img 
                                        className="dept-card__icon" 
                                        src={getAssetPath(dept.iconImg)} 
                                        alt={dept.shortName} 
                                    />
                                    <div className="dept-card__shortname">{dept.shortName}</div>
                                </div>
                                <div className="dept-card__body">
                                    <h3 className="dept-card__title">{dept.name}</h3>
                                    {dept.seats ? (
                                        <span className="dept-card__seats" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>{dept.seats} Seats</span>
                                    ) : (
                                        <span className="dept-card__seats dept-card__seats--foundation" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>Foundation Department</span>
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

            {/* ===== RECRUITER LOGO TICKER ===== */}
            <section className="logo-ticker-section">
                <h2 className="logo-ticker-heading">WE PLACED OUR STUDENTS</h2>
                <div className="logo-ticker-marquee">
                    <div className="logo-ticker-track">
                        {[
                            { name: 'BAJAJ', sub: 'ELECTRICALS', style: 'ticker-bold' },
                            { name: 'Godrej', sub: '', style: 'ticker-italic' },
                            { name: 'JINDAL', sub: 'STAINLESS', style: 'ticker-spaced' },
                            { name: 'amazon', sub: '', style: 'ticker-amazon' },
                            { name: 'Flipkart', sub: 'EXPLORE PLUS', style: 'ticker-medium' },
                            { name: 'blinkit', sub: '', style: 'ticker-lower' },
                            { name: 'HERO', sub: 'MOTORS', style: 'ticker-hero' },
                            { name: 'SIEMENS', sub: '', style: 'ticker-light' },
                            { name: 'DECATHLON', sub: '', style: 'ticker-spaced' },
                            { name: 'L&T', sub: '', style: 'ticker-bold' },
                            { name: 'TCS', sub: '', style: 'ticker-bold' },
                            { name: 'INFOSYS', sub: '', style: 'ticker-light' },
                            { name: 'WIPRO', sub: '', style: 'ticker-spaced' },
                            { name: 'NHPC', sub: '', style: 'ticker-bold' },
                            { name: 'ONGC', sub: '', style: 'ticker-bold' },
                            { name: 'BAJAJ', sub: 'ELECTRICALS', style: 'ticker-bold' },
                            { name: 'Godrej', sub: '', style: 'ticker-italic' },
                            { name: 'JINDAL', sub: 'STAINLESS', style: 'ticker-spaced' },
                            { name: 'amazon', sub: '', style: 'ticker-amazon' },
                            { name: 'Flipkart', sub: 'EXPLORE PLUS', style: 'ticker-medium' },
                            { name: 'blinkit', sub: '', style: 'ticker-lower' },
                            { name: 'HERO', sub: 'MOTORS', style: 'ticker-hero' },
                            { name: 'SIEMENS', sub: '', style: 'ticker-light' },
                            { name: 'DECATHLON', sub: '', style: 'ticker-spaced' },
                            { name: 'L&T', sub: '', style: 'ticker-bold' },
                            { name: 'TCS', sub: '', style: 'ticker-bold' },
                            { name: 'INFOSYS', sub: '', style: 'ticker-light' },
                            { name: 'WIPRO', sub: '', style: 'ticker-spaced' },
                            { name: 'NHPC', sub: '', style: 'ticker-bold' },
                            { name: 'ONGC', sub: '', style: 'ticker-bold' },
                        ].map((brand, i) => (
                            <span className={`logo-ticker-item ${brand.style}`} key={i}>
                                <span className="ticker-name">{brand.name}</span>
                                {brand.sub && <span className="ticker-sub">{brand.sub}</span>}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== JACK 3D CREATOR PORTFOLIO ===== */}
            <JackPortfolio />

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
