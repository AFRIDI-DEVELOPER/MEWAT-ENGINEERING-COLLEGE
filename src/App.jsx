import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Departments from './pages/Departments'
import Admissions from './pages/Admissions'
import Placements from './pages/Placements'
import Campus from './pages/Campus'
import Contact from './pages/Contact'

function ScrollToTop() {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    return null
}

export default function App() {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/departments" element={<Departments />} />
                    <Route path="/admissions" element={<Admissions />} />
                    <Route path="/placements" element={<Placements />} />
                    <Route path="/campus" element={<Campus />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}
