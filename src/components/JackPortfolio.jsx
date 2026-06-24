import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

// ─── GLOBAL STYLES ───────────────────────────────────────────────────────────
const injectStyles = () => {
    const id = 'jack-portfolio-styles'
    if (document.getElementById(id)) return
    const style = document.createElement('style')
    style.id = id
    style.textContent = `
        .jack-portfolio-root {
            background: #0C0C0C;
            font-family: 'Kanit', sans-serif;
            overflow-x: clip;
            color: #D7E2EA;
        }
        .hero-heading {
            background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        /* Marquee rows */
        .jack-marquee-section { background: #0C0C0C; }
        .jack-marquee-row { display: flex; gap: 12px; will-change: transform; }
        .jack-marquee-img {
            width: 420px; height: 270px; border-radius: 16px;
            object-fit: cover; flex-shrink: 0;
        }

        /* About section */
        .jack-about-section {
            min-height: 100vh; display: flex; align-items: center;
            justify-content: center; flex-direction: column;
            position: relative; background: #0C0C0C;
            padding: 80px 20px;
        }
        .jack-about-deco { position: absolute; pointer-events: none; }

        /* Services */
        .jack-services-section {
            background: #ffffff;
            border-radius: 60px 60px 0 0;
            padding: 80px 20px 100px;
            position: relative;
        }
        .jack-service-item {
            display: flex; align-items: flex-start; gap: 24px;
            border-bottom: 1px solid rgba(12,12,12,0.15);
            padding: 48px 0;
        }
        .jack-service-item:first-child { border-top: 1px solid rgba(12,12,12,0.15); }
        .jack-service-num {
            font-family: 'Kanit', sans-serif;
            font-weight: 900; color: #0C0C0C; line-height: 1;
            font-size: clamp(3rem, 10vw, 140px);
            flex-shrink: 0; min-width: clamp(80px, 14vw, 180px);
        }
        .jack-service-name {
            font-family: 'Kanit', sans-serif;
            font-weight: 500; text-transform: uppercase; color: #0C0C0C;
            font-size: clamp(1rem, 2.2vw, 2.1rem); margin-bottom: 8px;
        }
        .jack-service-desc {
            font-family: 'Kanit', sans-serif;
            font-weight: 300; color: rgba(12,12,12,0.6); line-height: 1.7;
            font-size: clamp(0.85rem, 1.6vw, 1.25rem); max-width: 560px;
        }

        /* Projects */
        .jack-projects-section {
            background: #0C0C0C;
            border-radius: 60px 60px 0 0;
            margin-top: -40px;
            position: relative; z-index: 10;
            padding: 80px 20px 100px;
        }
        .jack-project-card {
            position: sticky;
            background: #0C0C0C;
            border: 2px solid #D7E2EA;
            border-radius: 50px;
            padding: 28px;
        }

        /* Contact button */
        .jack-contact-btn {
            font-family: 'Kanit', sans-serif;
            background: linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%);
            color: #fff; font-weight: 500; text-transform: uppercase;
            letter-spacing: 0.15em; border: none; cursor: pointer;
            border-radius: 9999px; font-size: 1rem;
            padding: 14px 48px;
            box-shadow: 0px 4px 4px rgba(181,1,167,0.25), inset 4px 4px 12px #7721B1;
            outline: 2px solid white; outline-offset: -3px;
            transition: transform 0.2s;
        }
        .jack-contact-btn:hover { transform: scale(1.04); }

        /* Live button */
        .jack-live-btn {
            font-family: 'Kanit', sans-serif;
            background: transparent; border: 2px solid #D7E2EA;
            color: #D7E2EA; font-weight: 500; text-transform: uppercase;
            letter-spacing: 0.15em; cursor: pointer; border-radius: 9999px;
            padding: 12px 40px; font-size: 0.9rem;
            transition: background 0.2s;
        }
        .jack-live-btn:hover { background: rgba(215,226,234,0.1); }

        /* Magnet wrapper */
        .jack-magnet { display: inline-block; will-change: transform; }

        /* Animated text chars */
        .jack-char-wrap { position: relative; display: inline-block; }
        .jack-char-placeholder { opacity: 0; user-select: none; }
        .jack-char-anim { position: absolute; top: 0; left: 0; }

        @media (max-width: 640px) {
            .jack-services-section { border-radius: 40px 40px 0 0; }
            .jack-projects-section { border-radius: 40px 40px 0 0; }
            .jack-project-card { border-radius: 36px; padding: 18px; }
        }
        @media (min-width: 641px) and (max-width: 768px) {
            .jack-services-section { border-radius: 50px 50px 0 0; }
            .jack-projects-section { border-radius: 50px 50px 0 0; }
        }
    `
    document.head.appendChild(style)
}

// ─── FADE IN ─────────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, style = {}, className = '' }) {
    return (
        <motion.div
            className={className}
            style={style}
            initial={{ opacity: 0, x, y }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '50px', amount: 0 }}
            transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
        >
            {children}
        </motion.div>
    )
}

// ─── MAGNET ───────────────────────────────────────────────────────────────────
function Magnet({ children, padding = 150, strength = 3 }) {
    const ref = useRef(null)
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const [active, setActive] = useState(false)

    const onMouseMove = useCallback((e) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        const threshold = Math.max(rect.width, rect.height) / 2 + padding
        if (dist < threshold) {
            setActive(true)
            setPos({ x: dx / strength, y: dy / strength })
        } else {
            setActive(false)
            setPos({ x: 0, y: 0 })
        }
    }, [padding, strength])

    const onMouseLeave = useCallback(() => {
        setActive(false)
        setPos({ x: 0, y: 0 })
    }, [])

    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove)
        return () => window.removeEventListener('mousemove', onMouseMove)
    }, [onMouseMove])

    return (
        <div
            ref={ref}
            className="jack-magnet"
            onMouseLeave={onMouseLeave}
            style={{
                transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
                transition: active ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
                willChange: 'transform',
            }}
        >
            {children}
        </div>
    )
}

// ─── ANIMATED TEXT (char-by-char scroll reveal) ───────────────────────────────
function AnimatedText({ text, style = {}, className = '' }) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 0.8', 'end 0.2'],
    })

    const chars = text.split('')

    return (
        <p ref={ref} className={className} style={{ ...style, position: 'relative' }}>
            {chars.map((char, i) => {
                const start = i / chars.length
                const end = (i + 1) / chars.length
                return (
                    <CharSpan
                        key={i}
                        char={char}
                        scrollYProgress={scrollYProgress}
                        start={start}
                        end={end}
                    />
                )
            })}
        </p>
    )
}

function CharSpan({ char, scrollYProgress, start, end }) {
    const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1])
    return (
        <span className="jack-char-wrap">
            <span className="jack-char-placeholder">{char === ' ' ? '\u00a0' : char}</span>
            <motion.span className="jack-char-anim" style={{ opacity }}>
                {char === ' ' ? '\u00a0' : char}
            </motion.span>
        </span>
    )
}

// ─── CONTACT BUTTON ───────────────────────────────────────────────────────────
function ContactButton() {
    return <button className="jack-contact-btn">Contact Me</button>
}

// ─── REVIEWS DATA ─────────────────────────────────────────────────────────────
const studentReviews = [
    {
        name: 'Mohd Arif', initials: 'MA', color: '#1B4332',
        role: 'Student — CSE, Batch 2020', rating: 5,
        quote: 'MEC provided me with excellent education and practical skills. The faculty\'s dedication and modern labs helped me secure a great position at an MNC.',
        position: 'Software Engineer at Microsoft',
    },
    {
        name: 'Saba Parveen', initials: 'SP', color: '#7D3C98',
        role: 'Student — Civil Engineering, Batch 2021', rating: 5,
        quote: 'Being a girl from a rural area, the 50% fee concession was a blessing. The supportive environment at MEC helped me grow both personally and professionally.',
        position: 'SDO, Haryana Government',
    },
    {
        name: 'Rahul Sharma', initials: 'RS', color: '#1A5276',
        role: 'Student — Mechanical Engineering, Batch 2019', rating: 4,
        quote: 'MEC\'s emphasis on practical learning through workshops and industrial visits gave me hands-on experience that made me job-ready from day one.',
        position: 'Production Manager at Maruti Suzuki',
    },
    {
        name: 'Nazia Khan', initials: 'NK', color: '#17202A',
        role: 'Student — ECE, Batch 2022', rating: 5,
        quote: 'The placement cell at MEC is very active and supportive. I got placed in my dream company through campus recruitment. The training programs were incredibly helpful.',
        position: 'System Analyst at TCS',
    },
    {
        name: 'Dipanshu Garg', initials: 'DG', color: '#7B4F2E',
        role: 'Student — CSE, Batch 2024', rating: 5,
        quote: 'Achieved GATE AIR 48 — a milestone I could not have reached without the rigorous coaching and mentoring by MEC faculty. The competitive preparation here is truly world-class.',
        position: 'GATE AIR 48 — IIT Aspirant',
    },
    {
        name: 'Ayesha Siddiqui', initials: 'AS', color: '#4A235A',
        role: 'Student — EEE, Batch 2023', rating: 4,
        quote: 'The state-of-the-art power systems lab and expert faculty guidance prepared me for real-world challenges in the electrical industry. A truly transformative experience.',
        position: 'Junior Engineer at NHPC',
    },
    {
        name: 'Waseem Akhtar', initials: 'WA', color: '#1B4332',
        role: 'Student — Civil, Batch 2022', rating: 5,
        quote: 'The infrastructure, faculty, and placement support at MEC is outstanding. I am proud to be an alumnus of this institution.',
        position: 'Site Engineer at L&T',
    },
]

const parentReviews = [
    {
        name: 'Mohammad Yusuf', initials: 'MY', color: '#2E4057',
        role: 'Parent — Father of CSE Student', rating: 5,
        quote: 'My son joined MEC and I am extremely proud of his growth. The college provides a safe, disciplined environment with excellent faculty. Very satisfied with the 50% fee concession for girl students.',
    },
    {
        name: 'Nasreen Begum', initials: 'NB', color: '#5C4033',
        role: 'Parent — Mother of ECE Student', rating: 5,
        quote: 'As a parent, security was my top priority. MEC\'s hostel facilities and 24/7 security gave me complete peace of mind. My daughter has flourished here beyond all expectations.',
    },
    {
        name: 'Ramesh Kumar', initials: 'RK', color: '#1A4A5A',
        role: 'Parent — Father of Mechanical Student', rating: 4,
        quote: 'The campus placement drives at MEC are impressive. My son received two offers before graduating. The faculty mentorship and industry exposure are exceptional.',
    },
    {
        name: 'Shahida Bano', initials: 'SB', color: '#4A0E4E',
        role: 'Parent — Mother of Civil Student', rating: 5,
        quote: 'MEC transformed my daughter\'s life. Coming from a modest background, the WAQF establishment and scholarships made quality engineering education accessible. Forever grateful.',
    },
    {
        name: 'Suresh Sharma', initials: 'SS', color: '#1B4332',
        role: 'Parent — Father of CSE Student', rating: 5,
        quote: 'The modern laboratories, experienced professors, and strong industry connections at MEC ensured my son got the best possible start to his engineering career.',
    },
]

// ─── STAR RATING ──────────────────────────────────────────────────────────────
function Stars({ count, size = 14 }) {
    return (
        <span style={{ display: 'inline-flex', gap: 2 }}>
            {[1,2,3,4,5].map(i => (
                <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= count ? '#C8A951' : 'none'} stroke="#C8A951" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
            ))}
        </span>
    )
}

// ─── REVIEW CARD ──────────────────────────────────────────────────────────────
function ReviewCard({ review, isParent = false }) {
    return (
        <div style={{
            background: '#ffffff',
            borderRadius: 20,
            padding: '24px 28px',
            width: 340,
            flexShrink: 0,
            boxShadow: '0 2px 20px rgba(0,0,0,0.07)',
            border: '1px solid rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            margin: '0 8px',
        }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: review.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 700, fontSize: '0.9rem',
                    flexShrink: 0, fontFamily: "'Kanit', sans-serif",
                }}>
                    {review.initials}
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontFamily: "'Kanit', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: '#1A1A1A' }}>
                            {review.name}
                        </span>
                        {/* Verified badge */}
                        <span style={{
                            background: 'rgba(27,67,50,0.1)', color: '#1B4332',
                            fontSize: '0.65rem', fontWeight: 700, padding: '2px 7px',
                            borderRadius: 20, fontFamily: "'Kanit', sans-serif",
                            letterSpacing: '0.04em',
                        }}>✓ Verified</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#888', fontFamily: "'Kanit', sans-serif", marginTop: 1 }}>
                        {review.role}
                    </div>
                </div>
            </div>

            {/* Stars */}
            <Stars count={review.rating} />

            {/* Quote */}
            <p style={{
                fontFamily: "'Kanit', sans-serif", fontWeight: 300,
                fontSize: '0.88rem', color: '#444', lineHeight: 1.65,
                flex: 1,
            }}>
                &ldquo;{review.quote}&rdquo;
            </p>

            {/* Position badge (students only) */}
            {review.position && (
                <div style={{
                    background: 'rgba(27,67,50,0.06)',
                    borderRadius: 8, padding: '7px 12px',
                    display: 'flex', alignItems: 'center', gap: 6,
                }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1B4332" strokeWidth="2">
                        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
                    </svg>
                    <span style={{ fontFamily: "'Kanit', sans-serif", fontSize: '0.75rem', color: '#1B4332', fontWeight: 600 }}>
                        {review.position}
                    </span>
                </div>
            )}
        </div>
    )
}

// ─── AUTO-SCROLLING MARQUEE ROW ───────────────────────────────────────────────
function ReviewMarqueeRow({ reviews, direction = 'left', speed = 40 }) {
    const trackRef = useRef(null)
    const [paused, setPaused] = useState(false)
    const animRef = useRef(null)
    const posRef = useRef(0)
    const doubled = [...reviews, ...reviews, ...reviews]

    useEffect(() => {
        const track = trackRef.current
        if (!track) return
        const cardW = 356 // 340 + 16 margins
        const halfW = reviews.length * cardW

        const step = () => {
            if (!paused) {
                posRef.current += direction === 'left' ? speed / 60 : -(speed / 60)
                if (posRef.current >= halfW) posRef.current -= halfW
                if (posRef.current < 0) posRef.current += halfW
                track.style.transform = `translateX(${-posRef.current}px)`
            }
            animRef.current = requestAnimationFrame(step)
        }
        animRef.current = requestAnimationFrame(step)
        return () => cancelAnimationFrame(animRef.current)
    }, [paused, direction, speed, reviews.length])

    return (
        <div
            style={{ overflow: 'hidden', width: '100%' }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div ref={trackRef} style={{ display: 'flex', willChange: 'transform', paddingBottom: 4 }}>
                {doubled.map((review, i) => (
                    <ReviewCard key={i} review={review} />
                ))}
            </div>
        </div>
    )
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ emoji, value, label }) {
    return (
        <div style={{
            background: '#ffffff',
            borderRadius: 16,
            padding: '24px 32px',
            textAlign: 'center',
            flex: 1,
            minWidth: 140,
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.06)',
        }}>
            <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>{emoji}</div>
            <div style={{
                fontFamily: "'Kanit', sans-serif",
                fontWeight: 800, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                color: '#C8A951', lineHeight: 1,
            }}>{value}</div>
            <div style={{
                fontFamily: "'Kanit', sans-serif",
                fontSize: '0.8rem', color: '#777', marginTop: 4, fontWeight: 400,
            }}>{label}</div>
        </div>
    )
}

// ─── REVIEWS SECTION (replaces HeroSection) ───────────────────────────────────
function HeroSection() {
    return (
        <section style={{
            background: 'linear-gradient(180deg, #F9F7F2 0%, #EDE8DD 100%)',
            padding: 'clamp(60px, 8vw, 120px) clamp(16px, 4vw, 40px) clamp(60px, 6vw, 80px)',
            overflow: 'hidden',
        }}>
            {/* Heading */}
            <FadeIn delay={0} y={30}>
                <div style={{ textAlign: 'center', marginBottom: 'clamp(12px, 2vw, 20px)' }}>
                    <span style={{
                        fontFamily: "'Kanit', sans-serif",
                        display: 'inline-block',
                        background: 'rgba(200,169,81,0.12)',
                        color: '#A68B3E',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        padding: '7px 20px',
                        borderRadius: 20,
                        border: '1px solid rgba(200,169,81,0.25)',
                        marginBottom: 18,
                    }}>
                        🎓 Student Reviews
                    </span>
                    <h2 style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 800,
                        fontSize: 'clamp(2rem, 5vw, 3.8rem)',
                        color: '#1A1A1A',
                        lineHeight: 1.15,
                        margin: '0 auto',
                        maxWidth: 700,
                    }}>
                        What Students &amp; Parents Say
                    </h2>
                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                        color: '#666',
                        marginTop: 14,
                        maxWidth: 520,
                        margin: '14px auto 0',
                        lineHeight: 1.7,
                    }}>
                        Real stories from students who&apos;ve walked these halls and parents who entrusted us with their children&apos;s futures.
                    </p>
                </div>
            </FadeIn>

            {/* Stat Cards */}
            <FadeIn delay={0.15} y={20}>
                <div style={{
                    display: 'flex',
                    gap: 16,
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    maxWidth: 900,
                    margin: '0 auto clamp(48px, 6vw, 80px)',
                }}>
                    <StatCard emoji="⭐" value="4.9" label="Average Rating" />
                    <StatCard emoji="🎓" value="500+" label="Happy Students" />
                    <StatCard emoji="❤️" value="95%" label="Parent Satisfaction" />
                    <StatCard emoji="✍️" value="100+" label="Reviews Written" />
                </div>
            </FadeIn>

            {/* Student Reviews label */}
            <FadeIn delay={0.2} y={15}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    maxWidth: 1200,
                    margin: '0 auto 18px',
                    padding: '0 4px',
                }}>
                    <span style={{
                        fontFamily: "'Kanit', sans-serif",
                        fontWeight: 700, fontSize: '1rem', color: '#1A1A1A',
                        display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                        🎓 Student Reviews
                    </span>
                    <span style={{
                        fontFamily: "'Kanit', sans-serif",
                        fontSize: '0.78rem', color: '#aaa', fontStyle: 'italic',
                    }}>Hover to pause</span>
                </div>
            </FadeIn>

            {/* Row 1 — students scroll left */}
            <div style={{ marginBottom: 16 }}>
                <ReviewMarqueeRow reviews={studentReviews} direction="left" speed={35} />
            </div>

            {/* Row 2 — students scroll right */}
            <div style={{ marginBottom: 40 }}>
                <ReviewMarqueeRow reviews={[...studentReviews].reverse()} direction="right" speed={28} />
            </div>

            {/* Parent Reviews label */}
            <FadeIn delay={0.25} y={15}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    maxWidth: 1200,
                    margin: '0 auto 18px',
                    padding: '0 4px',
                }}>
                    <span style={{
                        fontFamily: "'Kanit', sans-serif",
                        fontWeight: 700, fontSize: '1rem', color: '#1A1A1A',
                        display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                        👨‍👩‍👧 Parent Reviews
                    </span>
                </div>
            </FadeIn>

            {/* Row 3 — parents scroll left */}
            <ReviewMarqueeRow reviews={parentReviews} direction="left" speed={30} />
        </section>
    )
}

// ─── MARQUEE SECTION ──────────────────────────────────────────────────────────
const allGifs = [
    'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
    'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
    'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
    'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
    'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
    'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
    'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
    'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
    'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
    'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
    'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
    'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
    'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
    'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
    'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
    'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
    'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
    'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
    'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
    'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
    'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
]

const row1Gifs = allGifs.slice(0, 11)
const row2Gifs = allGifs.slice(11)

function MarqueeSection() {
    const sectionRef = useRef(null)
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return
            const rect = sectionRef.current.getBoundingClientRect()
            const sectionTop = window.scrollY + rect.top
            const scrollOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3
            setOffset(scrollOffset)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const tripled1 = [...row1Gifs, ...row1Gifs, ...row1Gifs]
    const tripled2 = [...row2Gifs, ...row2Gifs, ...row2Gifs]

    return (
        <section
            ref={sectionRef}
            className="jack-marquee-section"
            style={{
                paddingTop: 'clamp(96px, 10vw, 160px)',
                paddingBottom: '40px',
                overflow: 'hidden',
            }}
        >
            {/* Row 1 — moves right */}
            <div style={{ marginBottom: 12, overflow: 'hidden' }}>
                <div
                    className="jack-marquee-row"
                    style={{ transform: `translateX(${offset - 200}px)`, willChange: 'transform' }}
                >
                    {tripled1.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt=""
                            loading="lazy"
                            className="jack-marquee-img"
                        />
                    ))}
                </div>
            </div>
            {/* Row 2 — moves left */}
            <div style={{ overflow: 'hidden' }}>
                <div
                    className="jack-marquee-row"
                    style={{ transform: `translateX(${-(offset - 200)}px)`, willChange: 'transform' }}
                >
                    {tripled2.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt=""
                            loading="lazy"
                            className="jack-marquee-img"
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

// ─── NO RAGGING SECTION ───────────────────────────────────────────────────────
function AboutSection() {
    return (
        <section id="jack-about" className="jack-about-section">
            {/* Decorative 3D images */}
            {/* Top-left moon */}
            <FadeIn delay={0.1} x={-80} y={0} duration={0.9}
                style={{ position: 'absolute', top: '4%', left: 'clamp(8px, 4%, 60px)', zIndex: 1 }}
            >
                <img
                    src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
                    alt=""
                    style={{ width: 'clamp(120px, 15vw, 210px)' }}
                />
            </FadeIn>

            {/* Bottom-left */}
            <FadeIn delay={0.25} x={-80} y={0} duration={0.9}
                style={{ position: 'absolute', bottom: '8%', left: 'clamp(24px, 10%, 120px)', zIndex: 1 }}
            >
                <img
                    src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
                    alt=""
                    style={{ width: 'clamp(100px, 13vw, 180px)' }}
                />
            </FadeIn>

            {/* Top-right lego */}
            <FadeIn delay={0.15} x={80} y={0} duration={0.9}
                style={{ position: 'absolute', top: '4%', right: 'clamp(8px, 4%, 60px)', zIndex: 1 }}
            >
                <img
                    src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
                    alt=""
                    style={{ width: 'clamp(120px, 15vw, 210px)' }}
                />
            </FadeIn>

            {/* Bottom-right */}
            <FadeIn delay={0.3} x={80} y={0} duration={0.9}
                style={{ position: 'absolute', bottom: '8%', right: 'clamp(24px, 10%, 120px)', zIndex: 1 }}
            >
                <img
                    src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
                    alt=""
                    style={{ width: 'clamp(130px, 16vw, 220px)' }}
                />
            </FadeIn>

            {/* Content */}
            <div style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 'clamp(32px, 4vw, 56px)',
                position: 'relative', zIndex: 2,
                maxWidth: 720, width: '100%',
            }}>
                {/* Anti-ragging badge */}
                <FadeIn delay={0} y={20}>
                    <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: 'rgba(220, 38, 38, 0.15)',
                        border: '1px solid rgba(220, 38, 38, 0.4)',
                        color: '#f87171',
                        fontFamily: "'Kanit', sans-serif",
                        fontWeight: 600, fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)',
                        letterSpacing: '0.15em', textTransform: 'uppercase',
                        padding: '8px 22px', borderRadius: 9999,
                    }}>
                        <span style={{ fontSize: '1.1em' }}>🚫</span>
                        Anti-Ragging Policy — MEC WAQF
                    </span>
                </FadeIn>

                {/* Big heading */}
                <FadeIn delay={0.1} y={40}>
                    <h2
                        className="hero-heading"
                        style={{
                            fontFamily: "'Kanit', sans-serif",
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.02em',
                            lineHeight: 1,
                            textAlign: 'center',
                            fontSize: 'clamp(3rem, 11vw, 140px)',
                        }}
                    >
                        No Ragging
                    </h2>
                </FadeIn>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(48px, 5vw, 80px)' }}>
                    {/* Animated scroll text */}
                    <AnimatedText
                        text="Ragging is strictly prohibited at Mewat Engineering College. We are committed to providing every fresher a safe, respectful, and welcoming environment from day one. Any act of ragging will be met with immediate and severe disciplinary action. Dear freshers — you are our family. Walk in with confidence, you belong here!"
                        style={{
                            color: '#D7E2EA',
                            fontFamily: "'Kanit', sans-serif",
                            fontWeight: 500,
                            textAlign: 'center',
                            lineHeight: 1.75,
                            fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
                        }}
                    />

                    {/* Three pledge chips */}
                    <FadeIn delay={0.4} y={15}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                            {[
                                { icon: '🛡️', text: 'Zero Tolerance' },
                                { icon: '📞', text: 'Helpline: 1800-180-5522' },
                                { icon: '🎉', text: 'Welcome Freshers 2026' },
                            ].map(chip => (
                                <span key={chip.text} style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 7,
                                    background: 'rgba(215, 226, 234, 0.08)',
                                    border: '1px solid rgba(215, 226, 234, 0.2)',
                                    color: '#D7E2EA',
                                    fontFamily: "'Kanit', sans-serif",
                                    fontWeight: 400, fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)',
                                    padding: '9px 20px', borderRadius: 9999,
                                    letterSpacing: '0.05em',
                                }}>
                                    {chip.icon} {chip.text}
                                </span>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Welcome freshers button */}
                    <FadeIn delay={0.55} y={20}>
                        <button style={{
                            fontFamily: "'Kanit', sans-serif",
                            background: 'linear-gradient(123deg, #0a4a2a 7%, #1B4332 40%, #2D6A4F 100%)',
                            color: '#fff', fontWeight: 600, textTransform: 'uppercase',
                            letterSpacing: '0.15em', border: 'none', cursor: 'pointer',
                            borderRadius: 9999, fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
                            padding: 'clamp(12px, 1.5vw, 16px) clamp(32px, 4vw, 52px)',
                            boxShadow: '0px 4px 24px rgba(27,67,50,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                            outline: '2px solid rgba(255,255,255,0.15)', outlineOffset: '-3px',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                        }}
                            onMouseEnter={e => { e.target.style.transform = 'scale(1.04)'; e.target.style.boxShadow = '0px 8px 32px rgba(27,67,50,0.7), inset 0 1px 0 rgba(255,255,255,0.15)' }}
                            onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0px 4px 24px rgba(27,67,50,0.5), inset 0 1px 0 rgba(255,255,255,0.1)' }}
                        >
                            🎉 Welcome, Freshers!
                        </button>
                    </FadeIn>
                </div>
            </div>
        </section>
    )
}

// ─── SERVICES SECTION ─────────────────────────────────────────────────────────
const services = [
    {
        num: '01',
        name: 'Hostel',
        sub: 'Engineering College in Delhi, NCR',
        desc: 'Hostel facility at a most affordable cost of Rs. 44,000 per annum which includes food and lodging both.',
    },
    {
        num: '02',
        name: 'Placement',
        desc: '100% placement of the qualifying candidates.',
    },
    {
        num: '03',
        name: 'Promote Education',
        desc: 'Special 50% Discount in Fee for Girl Students to promote education among them.',
    },
    {
        num: '04',
        name: 'Latest Technique',
        desc: 'Adopting latest teaching techniques like Google Classroom.',
    },
    {
        num: '05',
        name: 'Campus',
        desc: 'Beautiful Campus and Modern Infrastructure at the foothills of Aravali Range.',
    },
]

function ServicesSection() {
    return (
        <section id="jack-price" className="jack-services-section">
            <FadeIn delay={0} y={30}>
                {/* HOW WE ARE eyebrow label */}
                <p style={{
                    fontFamily: "'Kanit', sans-serif",
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: 'rgba(12,12,12,0.55)',
                    textAlign: 'center',
                    fontSize: '2.2rem',
                    marginBottom: 'clamp(10px, 1.5vw, 18px)',
                }}>
                    — How We Are —
                </p>
            </FadeIn>

            <FadeIn delay={0.1} y={40}>
                <h2
                    style={{
                        fontFamily: "'Kanit', sans-serif",
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        letterSpacing: '-0.02em',
                        lineHeight: 1,
                        color: '#0C0C0C',
                        textAlign: 'center',
                        fontSize: 'clamp(3rem, 12vw, 160px)',
                        marginBottom: 'clamp(64px, 7vw, 112px)',
                    }}
                >
                    Different
                </h2>
            </FadeIn>

            <div style={{ maxWidth: 900, margin: '0 auto' }}>
                {services.map((svc, i) => (
                    <FadeIn key={svc.num} delay={i * 0.1} y={20}>
                        <div className="jack-service-item">
                            <span className="jack-service-num">{svc.num}</span>
                            <div>
                                <p className="jack-service-name">{svc.name}</p>
                                {svc.sub && (
                                    <p style={{
                                        fontFamily: "'Kanit', sans-serif",
                                        fontWeight: 400,
                                        fontSize: 'clamp(0.75rem, 1.1vw, 1rem)',
                                        color: 'rgba(12,12,12,0.45)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        marginBottom: 6,
                                    }}>{svc.sub}</p>
                                )}
                                <p className="jack-service-desc">{svc.desc}</p>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </section>
    )
}

// ─── PROJECTS SECTION ─────────────────────────────────────────────────────────
const projects = [
    {
        num: '01',
        category: 'Facilities',
        name: 'Library & Resources',
        col1img1: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&q=80',
        col1img2: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80',
        col2img: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80',
    },
    {
        num: '02',
        category: 'Facilities',
        name: 'Campus Life',
        col1img1: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
        col1img2: 'https://images.unsplash.com/photo-1525926477800-7a3afacbe188?w=800&q=80',
        col2img: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
    },
    {
        num: '03',
        category: 'Facilities',
        name: 'Transport Facility',
        col1img1: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
        col1img2: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80',
        col2img: 'https://images.unsplash.com/photo-1628165039572-c2e35fbb2c46?w=800&q=80',
    },
]

function ProjectCard({ project, index, totalCards, scrollRef }) {
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ['start start', 'end end'],
    })

    const targetScale = 1 - (totalCards - 1 - index) * 0.03
    const scaleRange = [index / totalCards, 1]
    const scale = useTransform(scrollYProgress, scaleRange, [targetScale, targetScale])

    const imgRadius = 'clamp(28px, 4vw, 50px)'

    return (
        <div style={{ height: '85vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
            <motion.div
                className="jack-project-card"
                style={{
                    scale,
                    position: 'sticky',
                    top: `calc(96px + ${index * 28}px)`,
                    width: '100%',
                    maxWidth: 1100,
                }}
            >
                {/* Top row */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                    flexWrap: 'wrap',
                    gap: 12,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <span style={{
                            fontFamily: "'Kanit', sans-serif",
                            fontWeight: 900,
                            color: '#D7E2EA',
                            fontSize: 'clamp(2.5rem, 7vw, 100px)',
                            lineHeight: 1,
                            opacity: 0.4,
                        }}>
                            {project.num}
                        </span>
                        <div>
                            <span style={{
                                fontFamily: "'Kanit', sans-serif",
                                fontSize: '0.75rem',
                                color: 'rgba(215,226,234,0.5)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.12em',
                                display: 'block',
                                marginBottom: 4,
                            }}>
                                {project.category}
                            </span>
                            <span style={{
                                fontFamily: "'Kanit', sans-serif",
                                fontWeight: 600,
                                color: '#D7E2EA',
                                fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
                            }}>
                                {project.name}
                            </span>
                        </div>
                    </div>
                    <button className="jack-live-btn">View</button>
                </div>

                {/* Images grid */}
                <div style={{ display: 'flex', gap: 12, height: 'clamp(320px, 40vw, 580px)' }}>
                    {/* Col 1 — 40% width, 2 stacked */}
                    <div style={{ width: '40%', display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <img
                            src={project.col1img1}
                            alt={project.name}
                            style={{
                                width: '100%',
                                height: 'clamp(130px, 16vw, 230px)',
                                objectFit: 'cover',
                                borderRadius: imgRadius,
                                flexShrink: 0,
                            }}
                        />
                        <img
                            src={project.col1img2}
                            alt={project.name}
                            style={{
                                width: '100%',
                                flex: 1,
                                objectFit: 'cover',
                                borderRadius: imgRadius,
                                minHeight: 0,
                            }}
                        />
                    </div>
                    {/* Col 2 — 60% width, tall */}
                    <img
                        src={project.col2img}
                        alt={project.name}
                        style={{
                            width: '60%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: imgRadius,
                        }}
                    />
                </div>
            </motion.div>
        </div>
    )
}

function ProjectsSection() {
    const sectionRef = useRef(null)

    return (
        <section id="jack-projects" className="jack-projects-section" ref={sectionRef}>
            <FadeIn delay={0} y={40}>
                <h2
                    className="hero-heading"
                    style={{
                        fontFamily: "'Kanit', sans-serif",
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        letterSpacing: '-0.02em',
                        lineHeight: 1,
                        textAlign: 'center',
                        fontSize: 'clamp(3rem, 12vw, 160px)',
                        marginBottom: 'clamp(48px, 5vw, 80px)',
                    }}
                >
                    Gallery
                </h2>
            </FadeIn>

            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                {projects.map((project, i) => (
                    <ProjectCard
                        key={project.num}
                        project={project}
                        index={i}
                        totalCards={projects.length}
                        scrollRef={sectionRef}
                    />
                ))}
            </div>
        </section>
    )
}

// ─── ROOT EXPORT ──────────────────────────────────────────────────────────────
export default function JackPortfolio() {
    useEffect(() => {
        injectStyles()
    }, [])

    return (
        <div className="jack-portfolio-root">
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <ProjectsSection />
        </div>
    )
}
