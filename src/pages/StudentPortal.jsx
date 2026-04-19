import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchStudentByRollNo } from '../lib/supabase'

export default function StudentPortal() {
    const [rollNo, setRollNo] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const student = await fetchStudentByRollNo(rollNo)
            
            if (student && student.password === password) {
                localStorage.setItem('student_auth', JSON.stringify({ 
                    name: student.name, 
                    rollNo: student.roll_no, 
                    dept: student.department 
                }))
                navigate('/dashboard')
            } else {
                setError('Invalid Roll No or Password')
            }
        } catch (err) {
            console.error('Login error:', err)
            setError(err.message === 'JSON object requested, multiple (or no) rows returned' 
                ? 'Invalid Roll No or Password' 
                : 'Authentication failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="login-page">
            <div className="login-container glass-card">
                <div className="login-header">
                    <div className="portal-icon">M</div>
                    <h2>Student Portal</h2>
                    <p>Enter your credentials to access the dashboard</p>
                </div>
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
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Authenticating...' : 'Access Portal'}
                    </button>
                </form>
                <div className="login-footer">
                    <p>Forgot password? Contact Administrator</p>
                </div>
            </div>
        </div>
    )
}
