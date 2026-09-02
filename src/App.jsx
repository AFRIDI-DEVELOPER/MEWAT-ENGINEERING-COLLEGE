import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect, useLayoutEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AntiGravityBackground from './components/AntiGravityBackground'
import { getAssetPath } from './utils/assets'
import { isPortalPage } from './utils/navigation'
import Home from './pages/Home'
import About from './pages/About'
import Departments from './pages/Departments'
import Admissions from './pages/Admissions'
import Placements from './pages/Placements'
import Campus from './pages/Campus'
import Contact from './pages/Contact'
import DepartmentDetail from './pages/DepartmentDetail'
import ExaminationCell from './pages/ExaminationCell'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import Notices from './pages/Notices'
import AcademicCalendar from './pages/AcademicCalendar'
import Alumni from './pages/Alumni'
import NotFound from './pages/NotFound'

function ScrollToTop() {
    const { pathname, hash } = useLocation()
    useLayoutEffect(() => {
        console.log("Navigation triggered, safe scroll running");
        if (!hash) {
            try {
                if (window.lenis && typeof window.lenis.scrollTo === 'function') {
                    window.lenis.scrollTo(0, { immediate: true })
                } else {
                    window.scrollTo(0, 0)
                }
            } catch (e) {
                window.scrollTo(0, 0)
            }
        } else {
            setTimeout(() => {
                const el = document.getElementById(hash.slice(1))
                if (el) {
                    try {
                        if (window.lenis && typeof window.lenis.scrollTo === 'function') {
                            window.lenis.scrollTo(el, { behavior: 'smooth' })
                        } else {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }
                    } catch (e) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                }
            }, 100)
        }
    }, [pathname, hash])
    return null
}

export default function App() {
    const location = useLocation()
    const isPortal = isPortalPage(location.pathname)

    useEffect(() => {
        // Disable Lenis entirely on mobile/touch devices for native scroll performance
        if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
            return;
        }

        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false,
            wheelMultiplier: 0.85,
            lerp: 0.05,
            infinite: false,
        })

        window.lenis = lenis

        let rafId
        function raf(time) {
            lenis.raf(time)
            rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)

        return () => {
            cancelAnimationFrame(rafId)
            lenis.destroy()
            window.lenis = null
        }
    }, [])

    return (
        <>
            <AntiGravityBackground />
            <ScrollToTop />
            <Navbar />
            <main className={isPortal ? 'portal-active' : ''}>
                {/* Background Video Removed */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/departments" element={<Departments />} />
                    <Route path="/admissions" element={<Admissions />} />
                    <Route path="/placements" element={<Placements />} />
                    <Route path="/campus" element={<Campus />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/departments/:id" element={<DepartmentDetail />} />
                    <Route path="/examination-cell" element={<ExaminationCell />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/notices" element={<Notices />} />
                    <Route path="/academic-calendar" element={<AcademicCalendar />} />
                    <Route path="/alumni" element={<Alumni />} />
                    
                    {/* Specific routes for legacy SEO indexed pages */}
                    <Route path="/chairman-message" element={<About defaultTab="admin-message" />} />
                    <Route path="/our-mission" element={<About defaultTab="vision-mission" />} />
                    
                    {/* Catch-all route for 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            {!isPortal && <Footer />}
        </>
    )
}
