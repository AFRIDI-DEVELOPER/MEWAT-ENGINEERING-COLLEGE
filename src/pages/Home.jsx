
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
import { FiBriefcase, FiAward, FiUsers, FiBookOpen, FiMap, FiCheckCircle, FiPercent, FiTrendingUp, FiHome, FiUser, FiBell, FiArrowRight, FiStar, FiCalendar, FiClock, FiInfo, FiCheck } from 'react-icons/fi'

import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa'
import AboutPreview from '../components/AboutPreview'
import AdministratorMessage from '../components/AdministratorMessage'
import CEOMessage from '../components/CEOMessage'
import DirectorMessage from '../components/DirectorMessage'

import SEO from '../components/SEO'
import JackPortfolio from '../components/JackPortfolio'
import QuickLinks from '../components/QuickLinks'



const galleryCards = [
    {
        title: 'Freshers Welcome 2025',
        description: 'Jashn-e-Aaghaz — A vibrant celebration welcoming new students with awards, performances, and unforgettable memories',
        images: [
            getAssetPath('/gallery/gallery1.jpg'),
            getAssetPath('/gallery/gallery.1.jpg'),
            getAssetPath('/gallery/gallery..1.jpg'),
        ]
    },
    {
        title: 'Campus Life & Community',
        description: 'From the canteen to classrooms and open roads — everyday moments that define the MEC experience',
        images: [
            getAssetPath('/gallery/gallery2.jpg'),
            getAssetPath('/gallery/gallery.2.jpg'),
            getAssetPath('/gallery/gallery..2.jpg'),
        ]
    },
    {
        title: 'National Day Celebrations',
        description: 'Flag hoisting ceremonies and patriotic gatherings — honoring the spirit of the nation at MEC campus',
        images: [
            getAssetPath('/gallery/gallery3.jpg'),
            getAssetPath('/gallery/gallery.3.jpg'),
            getAssetPath('/gallery/gallery..3.jpg'),
        ]
    },
    {
        title: 'Seminars & Guest Lectures',
        description: 'Interactive sessions with industry experts and inspiring speakers shaping the minds of future engineers',
        images: [
            getAssetPath('/gallery/gallery4.jpg'),
            getAssetPath('/gallery/gallery.4.jpg'),
            getAssetPath('/gallery/gallery..4.jpg'),
        ]
    },
    {
        title: 'Labs & Infrastructure',
        description: 'State-of-the-art laboratories and research facilities — where innovation meets hands-on learning',
        images: [
            getAssetPath('/gallery/gallery5.jpg'),
            getAssetPath('/gallery/gallery.5.jpg'),
            getAssetPath('/gallery/gallery..5.jpg'),
        ]
    },
]

function GalleryMosaicCard({ card, index, isActive }) {
    const [heroIdx, setHeroIdx] = useState(0)

    // Auto-rotate hero image within each card
    useEffect(() => {
        if (!isActive) return
        const timer = setInterval(() => {
            setHeroIdx(prev => (prev + 1) % card.images.length)
        }, 3000)
        return () => clearInterval(timer)
    }, [isActive, card.images.length])

    return (
        <div className="gallery-mosaic-card">
            {/* Hero image — large */}
            <div className="mosaic-hero">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={heroIdx}
                        src={card.images[heroIdx]}
                        alt={card.title}
                        draggable="false"
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6 }}
                    />
                </AnimatePresence>
                <div className="mosaic-hero-gradient" />
                <span className="frame-corner frame-tl" />
                <span className="frame-corner frame-tr" />
                <span className="frame-corner frame-bl" />
                <span className="frame-corner frame-br" />
            </div>
            {/* Thumbnails strip */}
            <div className="mosaic-thumbs">
                {card.images.map((img, i) => (
                    <button
                        key={i}
                        className={`mosaic-thumb ${heroIdx === i ? 'active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setHeroIdx(i) }}
                    >
                        <img src={img} alt={`${card.title} - ${i + 1}`} draggable="false" />
                        <div className="thumb-active-ring" />
                    </button>
                ))}
            </div>
            {/* Text */}
            <div className="mosaic-card-text">
                <div className="mosaic-card-number">{String(index + 1).padStart(2, '0')}</div>
                <h4 className="mosaic-card-title">{card.title}</h4>
                <p className="mosaic-card-desc">{card.description}</p>
            </div>
        </div>
    )
}

function CampusGallery() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const trackRef = useRef(null)
    const autoScrollRef = useRef(null)

    const totalSlides = galleryCards.length

    // Auto-scroll
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
        }, 5000)
        return () => clearInterval(autoScrollRef.current)
    }, [isPaused, totalSlides])

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
                    <p>A cinematic glimpse into the vibrant life, events, and infrastructure at MEC</p>
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
                    {galleryCards.map((card, i) => (
                        <motion.div
                            key={i}
                            className={`gallery-carousel-card ${activeIndex === i ? 'active' : ''}`}
                            initial={{ opacity: 0, scale: 0.85 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            onClick={() => goToSlide(i)}
                        >
                            <GalleryMosaicCard card={card} index={i} isActive={activeIndex === i} />
                        </motion.div>
                    ))}
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
                        {galleryCards.map((_, i) => (
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
    const heroVideos = ['/media/library.mp4', '/media/mec_college1.mp4', '/media/mec_college2.mp4', '/media/mec_college3.mp4', '/media/mec_college4.mp4']
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

    // Safari autoplay workaround: force play on any user interaction
    useEffect(() => {
        const forcePlay = () => {
            if (videoRef.current && videoRef.current.paused) {
                videoRef.current.play().catch(() => {})
            }
        }
        window.addEventListener('click', forcePlay, { once: true })
        window.addEventListener('touchstart', forcePlay, { once: true })
        window.addEventListener('scroll', forcePlay, { once: true })
        return () => {
            window.removeEventListener('click', forcePlay)
            window.removeEventListener('touchstart', forcePlay)
            window.removeEventListener('scroll', forcePlay)
        }
    }, [])

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
    const [homeEvents, setHomeEvents] = useState([])
    const [homeNotifications, setHomeNotifications] = useState([])

    useEffect(() => {
        const localNotifs = localStorage.getItem('mec_notifications')
        if (localNotifs) {
            const parsed = JSON.parse(localNotifs)
            setHomeEvents(parsed.filter(n => n.type === 'event'))
            setHomeNotifications(parsed.filter(n => n.type === 'important' || n.urgent))
        }
    }, [])


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
                            key={currentVideoIndex}
                            ref={videoRef}
                            src={getAssetPath(heroVideos[currentVideoIndex])}
                            autoPlay
                            muted
                            defaultMuted
                            playsInline
                            controls={false}
                            disablePictureInPicture
                            disableRemotePlayback
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
                            <span className="pill-chip">Approved by AICTE</span>
                            <span className="pill-divider" />
                            <span className="pill-chip">AFFILIATED TO GUG</span>
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
                                <span className="pill-chip">Approved by AICTE</span>
                                <span className="pill-divider" />
                                <span className="pill-chip">AFFILIATED TO GUG</span>
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
                                <Link to="/examination-cell" className="vex-btn-primary">Examination Cell</Link>
                                <Link to="/departments" className="vex-btn-secondary">Explore Departments</Link>
                            </motion.div>
                        </div>
                        {/* Badge was moved to top of title */}

                    </div>
                </div>
            </section>


            {/* ===== NEWS & NOTIFICATIONS ===== */}
            <section className="section news-notifications-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Stay Updated</span>
                        <h2>News & Notifications</h2>
                        <p>Latest announcements, university news, and important notifications for students and faculty</p>
                    </div>

                    <div className="nn-grid">
                        {/* ── Events Column ── */}
                        <motion.div
                            className="nn-column"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="nn-column-header">
                                <div className="nn-column-accent" />
                                <div className="nn-column-title-wrap">
                                    <h3>Events</h3>
                                    <span className="nn-badge nn-badge-news">Latest</span>
                                </div>
                            </div>

                            <div 
                                className="nn-cards-scroll"
                                data-lenis-prevent="true"
                            >
                                {homeEvents.length === 0 ? (
                                    <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No events posted yet.</div>
                                ) : homeEvents.map((item, i) => (
                                    <div className="nn-card" key={i}>
                                        <div className="nn-card-number">{i + 1}</div>
                                        <div className="nn-card-body">
                                            <p className="nn-card-title">{item.title}</p>
                                            <div className="nn-card-meta">
                                                <span className="nn-card-date">
                                                    <FiCalendar size={11} />
                                                    Published on {item.date}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="nn-card-indicator" />
                                    </div>
                                ))}
                            </div>

                            <Link to="/notices" className="nn-view-all">
                                View All
                                <FiArrowRight size={14} />
                            </Link>
                        </motion.div>

                        {/* ── Important Notifications Column ── */}
                        <motion.div
                            className="nn-column"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                        >
                            <div className="nn-column-header">
                                <div className="nn-column-accent nn-column-accent--gold" />
                                <div className="nn-column-title-wrap">
                                    <h3>Important Notifications</h3>
                                    <span className="nn-badge nn-badge-notif">New</span>
                                </div>
                            </div>

                            <div 
                                className="nn-cards-scroll"
                                data-lenis-prevent="true"
                            >
                                {homeNotifications.length === 0 ? (
                                    <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No important notifications posted yet.</div>
                                ) : homeNotifications.map((item, i) => (
                                    <div className="nn-card" key={i}>
                                        <div className="nn-card-number nn-card-number--gold">{i + 1}</div>
                                        <div className="nn-card-body">
                                            <p className="nn-card-title">{item.title}</p>
                                            <div className="nn-card-meta">
                                                <span className="nn-card-date nn-card-date--gold">
                                                    <FiCalendar size={11} />
                                                    Published on {item.date}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="nn-card-indicator nn-card-indicator--gold" />
                                    </div>
                                ))}
                            </div>

                            <Link to="/notices" className="nn-view-all nn-view-all--gold">
                                View All
                                <FiArrowRight size={14} />
                            </Link>
                        </motion.div>
                    </div>

                    {/* View All Notices Footer */}
                    <motion.div
                        className="nn-footer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Link to="/notices" className="nn-footer-link">
                            View All Notices
                            <FiArrowRight size={16} />
                        </Link>
                    </motion.div>
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
            <AdministratorMessage />
            <CEOMessage />
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

            {/* ===== QUICK LINKS ===== */}
            <QuickLinks />

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
