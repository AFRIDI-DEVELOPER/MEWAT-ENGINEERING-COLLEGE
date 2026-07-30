import { Routes, Route, useLocation } from 'react-router-dom'
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

function ScrollToTop() {
    const { pathname, hash } = useLocation()
    useLayoutEffect(() => {
        if (!hash) {
            if (window.lenis) {
                window.lenis.scrollTo(0, { immediate: true })
            } else {
                window.scrollTo(0, 0)
            }
        } else {
            setTimeout(() => {
                const el = document.getElementById(hash.slice(1))
                if (el) {
                    if (window.lenis) {
                        window.lenis.scrollTo(el, { behavior: 'smooth' })
                    } else {
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
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: true,
            syncTouch: true,
            syncTouchLerp: 0.05,
            touchMultiplier: 0.75,
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
                </Routes>
            </main>
            {!isPortal && <Footer />}
        </>
    )
}
