import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
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
import StudentPortal from './pages/StudentPortal'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import Notices from './pages/Notices'

function ScrollToTop() {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    return null
}

export default function App() {
    const location = useLocation()
    const isPortal = isPortalPage(location.pathname)

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
                    <Route path="/student-portal" element={<StudentPortal />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/notices" element={<Notices />} />
                </Routes>
            </main>
            {!isPortal && <Footer />}
        </>
    )
}
