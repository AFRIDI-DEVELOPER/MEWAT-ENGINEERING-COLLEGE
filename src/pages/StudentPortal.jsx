import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { studentLogin } from '../lib/supabase'
import SEO from '../components/SEO'
import { getAssetPath } from '../utils/assets'
import '../styles/dashboard-starfield.css'

export default function StudentPortal() {
    const [rollNo, setRollNo] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        try {
            const data = await studentLogin(rollNo, password)
            localStorage.setItem('student_auth', JSON.stringify({ 
                name: data.name, 
                rollNo: data.roll_no, 
                dept: data.departments?.name,
                department_id: data.department_id,
                id: data.id,
                year: data.year,
                semester: data.semester,
                photo_url: data.photo_url || ''
            }))
            navigate('/dashboard')
        } catch (err) {
            setError(err.message || 'Invalid Roll No or Password')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="login-page">
            <SEO title="Student Portal" description="Access your student account and campus resources." />
            {/* CSS Starfield Background */}
            <div className="dashboard-starfield">
                <div id="dashboard-stars"></div>
                <div id="dashboard-stars2"></div>
                <div id="dashboard-stars3"></div>
            </div>
            <div className="login-container glass-card">
                <div className="login-header">
                    <div className="portal-icon">
                        <img src={getAssetPath('/images/mewatengineering logo.png')} alt="MEC Logo" className="portal-logo-img" />
                    </div>
                    <h2>Student Portal</h2>
                    <p>Enter your credentials to access the dashboard</p>
                </div>
                <div className="login-form-side">
                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label htmlFor="rollNo">Roll Number</label>
                            <input 
                                type="text" 
                                id="rollNo" 
                                value={rollNo} 
                                onChange={(e) => setRollNo(e.target.value)} 
                                placeholder="e.g. 25CSB045"
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="••••••••"
                                required 
                            />
                        </div>
                        {error && <p className="error-msg">{error}</p>}
                        <button type="submit" className="login-btn" disabled={isLoading}>
                            {isLoading ? 'Authenticating...' : 'Access Portal'}
                        </button>
                    </form>
                    <div className="login-footer">
                        <p>Forgot password? Contact Administrator</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
