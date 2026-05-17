
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
import { getAssetPath } from '../utils/assets'
import { FiBriefcase, FiAward, FiUsers, FiBookOpen, FiMap, FiCheckCircle, FiPercent, FiTrendingUp, FiHome, FiUser, FiBell, FiArrowRight, FiAlertCircle, FiFileText, FiCalendar, FiInfo, FiStar, FiMapPin } from 'react-icons/fi'
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa'
import AboutPreview from '../components/AboutPreview'
import DirectorMessage from '../components/DirectorMessage'
import SEO from '../components/SEO'


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
    // ── Supabase data (falls back to static if Supabase unavailable) ──
    const { data: sbDepts }         = useDepartments()
    const { data: sbStats }         = useStats()
    const { data: sbEvents }        = useEvents()
    const { data: sbTestimonials }  = useTestimonials()

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
            desc: 'A modern 15-acre green campus designed to provide a world-class engineering education environment.'
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
            videoRef.current.play().catch(err => console.log('Video play failed:', err))
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
            {/* ===== PLAIN WHITE HERO LAYOUT ===== */}
            <section className="home-layout">
                {/* Main Grid: Video (left) + Sidebar (right) */}
                <div className="home-layout-grid">
                    {/* === ANTI-GRAVITY HERO AREA === */}
                    <div className="home-hero-antigravity-area">
                        <div className="antigravity-stars" />
                        <div className="home-hero-content container">
                            {/* Main Column: Video + Social Links below */}
                            <div className="hero-main-column">
                                <motion.div 
                                    className="hero-glass-container"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <video 
                                        ref={videoRef}
                                        src={getAssetPath(heroVideos[currentVideoIndex])}
                                        autoPlay
                                        muted
                                        playsInline
                                        onEnded={handleVideoEnd}
                                        className="hero-video"
                                    />

                                    {/* Video Caption Overlay */}
                                    <AnimatePresence mode="wait">
                                        <motion.div 
                                            key={currentVideoIndex}
                                            className="hero-video-caption"
                                            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                        >
                                            <h2 className="caption-title">{heroVideoContent[currentVideoIndex].title}</h2>
                                        </motion.div>
                                    </AnimatePresence>
                                </motion.div>

                                {/* Social Links - Below the video box */}
                                <div className="hero-social-horizontal">
                                    <div className="social-label-horizontal">FOLLOW US</div>
                                    <div className="social-divider-v"></div>
                                    <div className="social-btns-row">
                                        <a href="#" className="hero-social-btn" aria-label="Facebook">
                                            <FaFacebook />
                                            <span className="social-tooltip">Facebook</span>
                                        </a>
                                        <a href="#" className="hero-social-btn" aria-label="Instagram">
                                            <FaInstagram />
                                            <span className="social-tooltip">Instagram</span>
                                        </a>
                                        <a href="#" className="hero-social-btn" aria-label="YouTube">
                                            <FaYoutube />
                                            <span className="social-tooltip">YouTube</span>
                                        </a>
                                        <a href="#" className="hero-social-btn" aria-label="LinkedIn">
                                            <FaLinkedin />
                                            <span className="social-tooltip">LinkedIn</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="hero-sidebar-column">
                                {/* Affiliation Badge - Now outside the box */}
                                <div className="hero-affiliation-badge">
                                    <span className="badge-dot"></span>
                                    AFFILIATED WITH AICTE
                                </div>
                                <motion.div 
                                    className="hero-glass-sidebar"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <NotificationCard />
                                </motion.div>
                            </div>
                        </div>

                        {/* Scroll Indicator */}
                        <div className="scroll-indicator">
                            <div className="scroll-mouse">
                                <div className="scroll-wheel"></div>
                            </div>
                            <div className="scroll-text-row">
                                <span className="scroll-text">Scroll Down</span>
                                <div className="scroll-arrows-stack">
                                    <span className="scroll-arrow"></span>
                                    <span className="scroll-arrow"></span>
                                </div>
                            </div>
                        </div>
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
                                <div className="highlight-icon">
                                    <HighlightIcon index={i} />
                                </div>
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
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
                                        src={getAssetPath(dept.iconImg || dept.icon_img)} 
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

            {/* ===== STATS ===== */}
            <section className="stats-section">
                <div className="stats-marquee">
                    <div className="stats-track">
                        {[...stats, ...stats].map((s, i) => (
                            <div className={`stat-glass-card stat-${s.id}`} key={i}>
                                <div className="stat-icon">
                                    <StatIcon id={s.id} />
                                </div>
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
                                    <img src={event.image_url || getAssetPath(event.image)} alt={event.title} />
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
                <GravityParticles />
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Testimonials</span>
                        <h2>What Our Students Say</h2>
                        <p>Hear from our alumni about their transformative experience at MEC</p>
                    </div>
                    <div className="testimonials-marquee">
                        <div className="testimonials-track track-right">
                            {[...testimonials, ...testimonials].map((t, i) => (
                                <motion.div
                                    className="testimonial-row-card"
                                    key={`row1-${i}`}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: (i % testimonials.length) * 0.1 }}
                                >
                                    <div className="testimonial-row-avatar">
                                        {t.avatar || <FiUser />}
                                    </div>
                                    <div className="testimonial-row-content">
                                        <div className="testimonial-row-top">
                                            <div className="testimonial-row-info">
                                                <h4 className="testimonial-row-name">{t.name}</h4>
                                                <span className="testimonial-row-branch">{t.branch}</span>
                                            </div>
                                            <div className="testimonial-row-rating">
                                                <FiStar className="star-filled" fill="currentColor" size={14} />
                                                <span>{t.rating}</span>
                                            </div>
                                        </div>
                                        <p className="testimonial-row-quote">"{t.quote}"</p>
                                        {t.currentPosition && (
                                            <div className="testimonial-row-position">
                                                <div className="pos-badge">
                                                    <FiBriefcase size={12} />
                                                    {t.currentPosition}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* NEW THIRD ROW */}
                        <div className="testimonials-track track-middle">
                            {[...testimonials, ...testimonials].map((t, i) => (
                                <motion.div
                                    className="testimonial-row-card"
                                    key={`row3-${i}`}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: (i % testimonials.length) * 0.1 }}
                                >
                                    <div className="testimonial-row-avatar">
                                        {t.avatar || <FiUser />}
                                    </div>
                                    <div className="testimonial-row-content">
                                        <div className="testimonial-row-top">
                                            <div className="testimonial-row-info">
                                                <h4 className="testimonial-row-name">{t.name}</h4>
                                                <span className="testimonial-row-branch">{t.branch}</span>
                                            </div>
                                            <div className="testimonial-row-rating">
                                                <FiStar className="star-filled" fill="currentColor" size={14} />
                                                <span>{t.rating}</span>
                                            </div>
                                        </div>
                                        <p className="testimonial-row-quote">"{t.quote}"</p>
                                        {t.currentPosition && (
                                            <div className="testimonial-row-position">
                                                <div className="pos-badge">
                                                    <FiBriefcase size={12} />
                                                    {t.currentPosition}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="testimonials-track track-left">
                            {[...testimonials, ...testimonials].reverse().map((t, i) => (
                                <motion.div
                                    className="testimonial-row-card"
                                    key={`row2-${i}`}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: (i % testimonials.length) * 0.1 }}
                                >
                                    <div className="testimonial-row-avatar">
                                        {t.avatar || <FiUser />}
                                    </div>
                                    <div className="testimonial-row-content">
                                        <div className="testimonial-row-top">
                                            <div className="testimonial-row-info">
                                                <h4 className="testimonial-row-name">{t.name}</h4>
                                                <span className="testimonial-row-branch">{t.branch}</span>
                                            </div>
                                            <div className="testimonial-row-rating">
                                                <FiStar className="star-filled" fill="currentColor" size={14} />
                                                <span>{t.rating}</span>
                                            </div>
                                        </div>
                                        <p className="testimonial-row-quote">"{t.quote}"</p>
                                        {t.currentPosition && (
                                            <div className="testimonial-row-position">
                                                <div className="pos-badge">
                                                    <FiBriefcase size={12} />
                                                    {t.currentPosition}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
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
