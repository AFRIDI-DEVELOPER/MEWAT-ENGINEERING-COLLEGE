import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function StudentPortal() {
    const [rollNo, setRollNo] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        if (rollNo === '25CSB045' && password === 'afridi.dvlpr') {
            localStorage.setItem('student_auth', JSON.stringify({ name: 'Sahid Afridi', rollNo: '25CSB045', dept: 'Computer Science' }))
            navigate('/dashboard')
        } else {
            setError('Invalid Roll No or Password')
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
                    <button type="submit" className="login-btn">
                        Access Portal
                    </button>
                </form>
                <div className="login-footer">
                    <p>Forgot password? Contact Administrator</p>
                </div>
            </div>
        </div>
    )
}
