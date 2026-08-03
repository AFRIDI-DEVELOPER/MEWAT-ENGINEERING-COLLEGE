
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
import { FiBriefcase, FiAward, FiUsers, FiBookOpen, FiMap, FiCheckCircle, FiPercent, FiTrendingUp, FiHome, FiUser, FiBell, FiArrowRight, FiStar, FiCalendar, FiClock, FiInfo } from 'react-icons/fi'
import { monthlyCalendarData, calendarLegend } from '../data/calendar'

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

    // Academic Calendar States
    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = String(today.getMonth() + 1).padStart(2, '0')
    const initialCalendarKey = monthlyCalendarData[`${currentYear}-${currentMonth}`] ? `${currentYear}-${currentMonth}` : '2025-07'
    const [selectedMonthKey, setSelectedMonthKey] = useState(initialCalendarKey)
    const [calendarView, setCalendarView] = useState('monthly') // 'monthly' | 'highlights'
    const [activeEventIndex, setActiveEventIndex] = useState(null)


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

    // Calculate calendar days
    const monthData = monthlyCalendarData[selectedMonthKey] || monthlyCalendarData['2025-07']
    const firstDayIndex = new Date(monthData.year, monthData.month, 1).getDay()
    const totalDays = new Date(monthData.year, monthData.month + 1, 0).getDate()
    
    const daysArray = []
    for (let i = 0; i < firstDayIndex; i++) {
        daysArray.push(null)
    }
    for (let d = 1; d <= totalDays; d++) {
        daysArray.push(d)
    }

    const getDayEvent = (dayNum) => {
        if (!dayNum) return null
        return monthData.events.find(ev => {
            if (ev.dateEnd) {
                return dayNum >= ev.date && dayNum <= ev.dateEnd
            }
            return ev.date === dayNum
        })
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

            {/* ===== ACADEMIC CALENDAR SECTION ===== */}
            <section className="section academic-calendar-section" id="academic-calendar">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Academic Schedule</span>
                        <h2>Academic Calendar 2025-26</h2>
                        <p>Plan your semester with key dates, sessional exams, GUG holidays, and campus activities.</p>
                        
                        {/* Selector between monthly calendar view and semesters highlights summary */}
                        <div className="calendar-view-selector" style={{ marginTop: '24px' }}>
                            <button 
                                className={`view-btn ${calendarView === 'monthly' ? 'active' : ''}`}
                                onClick={() => setCalendarView('monthly')}
                                style={calendarView === 'monthly' ? { background: '#2563eb', color: 'white', borderColor: '#2563eb' } : {}}
                            >
                                Monthly Calendar
                            </button>
                            <button 
                                className={`view-btn ${calendarView === 'highlights' ? 'active' : ''}`}
                                onClick={() => setCalendarView('highlights')}
                                style={calendarView === 'highlights' ? { background: '#2563eb', color: 'white', borderColor: '#2563eb' } : {}}
                            >
                                Semester Key Dates
                            </button>
                        </div>
                    </div>

                    {calendarView === 'monthly' ? (
                        <div className="calendar-interactive-wrapper">
                            {/* Scrollable Month Pills */}
                            <div className="month-pills-scroll">
                                {Object.keys(monthlyCalendarData).map(key => {
                                    const mData = monthlyCalendarData[key];
                                    const mNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                                    const label = `${mNames[mData.month]} ${mData.year}`;
                                    return (
                                        <button
                                            key={key}
                                            className={`month-pill ${selectedMonthKey === key ? 'active' : ''}`}
                                            onClick={() => setSelectedMonthKey(key)}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Main Grid Card layout */}
                            <div className="calendar-grid-card">
                                {/* Left Calendar Grid */}
                                <div className="calendar-grid-area">
                                    <div className="calendar-weekdays">
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                                            <div key={d} className="weekday-label">{d}</div>
                                        ))}
                                    </div>
                                    <div className="calendar-days-grid">
                                        {daysArray.map((dayNum, idx) => {
                                            if (!dayNum) {
                                                return <div key={`empty-${idx}`} className="calendar-day-cell empty" />;
                                            }

                                            const ev = getDayEvent(dayNum);
                                            const isWeekend = idx % 7 === 0 || idx % 7 === 6;
                                            
                                            // Find legend color config
                                            const legendCfg = ev ? calendarLegend.find(l => l.id === ev.type) : null;
                                            
                                            return (
                                                <div 
                                                    key={dayNum} 
                                                    className={`calendar-day-cell ${isWeekend ? 'weekend' : ''} ${ev ? 'has-event' : ''}`}
                                                    style={legendCfg ? { 
                                                        '--event-color': legendCfg.color, 
                                                        '--event-bg': legendCfg.bg,
                                                        borderColor: legendCfg.color
                                                    } : {}}
                                                    title={ev ? ev.title : ''}
                                                >
                                                    <span className="day-number">{dayNum}</span>
                                                    {ev && <span className="day-dot" style={{ background: legendCfg?.color }} />}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Right Side Info Area */}
                                <div className="calendar-info-area">
                                    <div className="calendar-info-header">
                                        <h4>Events in {monthData.year === 2025 ? 'July-Dec 2025' : 'Jan-Jun 2026'}</h4>
                                        <span className="current-month-badge">
                                            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][monthData.month]} {monthData.year}
                                        </span>
                                    </div>

                                    {/* Monthly Events List */}
                                    <div className="calendar-events-list">
                                        {monthData.events && monthData.events.length > 0 ? (
                                            monthData.events.map((ev, eIdx) => {
                                                const legendCfg = calendarLegend.find(l => l.id === ev.type);
                                                const dateLabel = ev.dateEnd ? `${ev.date}-${ev.dateEnd}` : `${ev.date}`;
                                                
                                                return (
                                                    <div 
                                                        key={eIdx} 
                                                        className="calendar-event-item"
                                                        style={{ borderLeft: `4px solid ${legendCfg?.color || '#cbd5e1'}` }}
                                                    >
                                                        <div className="event-item-date" style={{ color: legendCfg?.color }}>
                                                            {dateLabel} {["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"][monthData.month]}
                                                        </div>
                                                        <div className="event-item-title">{ev.title}</div>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className="no-events-notice">
                                                <FiInfo size={16} style={{ marginRight: 6 }} />
                                                No specific events scheduled.
                                            </div>
                                        )}
                                    </div>

                                    {/* Legend block at bottom */}
                                    <div className="calendar-legend-box">
                                        <h5>Legend</h5>
                                        <div className="legend-items">
                                            {calendarLegend.map(l => (
                                                <div key={l.id} className="legend-item-chip">
                                                    <span className="legend-dot" style={{ background: l.color }} />
                                                    <span>{l.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Highlights Table View */
                        <div className="calendar-table-card">
                            <div className="calendar-table-wrapper">
                                <table className="academic-table">
                                    <thead>
                                        <tr>
                                            <th>Academic Activity / Event</th>
                                            <th>Odd Semester (Odd Sem)</th>
                                            <th>Even Semester (Even Sem)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table-highlight">Classes Commencement</td>
                                            <td>
                                                <strong>28th July 2025</strong> (3rd, 5th, 7th Sem)<br />
                                                <strong>01st September 2025</strong> (1st Sem)
                                            </td>
                                            <td><strong>12th January 2026</strong></td>
                                        </tr>
                                        <tr>
                                            <td className="table-highlight">First Sessional Exam</td>
                                            <td>08th - 10th October 2025</td>
                                            <td>09th - 11th March 2026</td>
                                        </tr>
                                        <tr>
                                            <td className="table-highlight">Second Sessional Exam</td>
                                            <td>24th - 26th November 2025</td>
                                            <td>27th - 29th April 2026</td>
                                        </tr>
                                        <tr>
                                            <td className="table-highlight">End of Classes</td>
                                            <td>05th December 2025</td>
                                            <td>08th May 2026</td>
                                        </tr>
                                        <tr>
                                            <td className="table-highlight">End Semester Theory/Practical Exams</td>
                                            <td>08th December 2025 onwards</td>
                                            <td>09th May 2026 onwards</td>
                                        </tr>
                                        <tr>
                                            <td className="table-highlight">Vacations / Holidays Break</td>
                                            <td>
                                                <strong>Winter Break:</strong><br />
                                                22.12.2025 – 04.01.2026 (B.Tech 3rd/5th/7th)<br />
                                                29.12.2025 – 11.01.2026 (B.Tech 1st Sem)
                                            </td>
                                            <td>
                                                <strong>Summer Vacations:</strong><br />
                                                From 25th May 2026 onwards
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Additional Activities timeline block */}
                            <div className="table-activities-box">
                                <h4>Key Campus Activities & Events</h4>
                                <div className="activities-horizontal-grid">
                                    <div className="activity-mini-card">
                                        <div className="activity-icon-container" style={{ background: '#ecfdf5', color: '#10b981' }}>
                                            <FiCheck size={16} />
                                        </div>
                                        <div>
                                            <h5>Induction Program</h5>
                                            <p>18th - 20th August 2025</p>
                                        </div>
                                    </div>
                                    <div className="activity-mini-card">
                                        <div className="activity-icon-container" style={{ background: '#eff6ff', color: '#3b82f6' }}>
                                            <FiUsers size={16} />
                                        </div>
                                        <div>
                                            <h5>2nd Alumni Meet</h5>
                                            <p>06th September 2025 (Delhi)</p>
                                        </div>
                                    </div>
                                    <div className="activity-mini-card">
                                        <div className="activity-icon-container" style={{ background: '#f5f3ff', color: '#8b5cf6' }}>
                                            <FiStar size={16} />
                                        </div>
                                        <div>
                                            <h5>Fresher Party</h5>
                                            <p>22nd September 2025</p>
                                        </div>
                                    </div>
                                    <div className="activity-mini-card">
                                        <div className="activity-icon-container" style={{ background: '#fff7ed', color: '#f97316' }}>
                                            <FiBriefcase size={16} />
                                        </div>
                                        <div>
                                            <h5>Sports & Cultural Week</h5>
                                            <p>10-12 Oct 2025 & 2-8 Feb 2026</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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
