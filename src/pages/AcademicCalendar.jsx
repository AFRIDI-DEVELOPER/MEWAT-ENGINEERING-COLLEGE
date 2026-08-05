import { useState } from 'react'
import { monthlyCalendarData, calendarLegend } from '../data/calendar'
import { FiInfo, FiCheck, FiUsers, FiStar, FiBriefcase } from 'react-icons/fi'
import SEO from '../components/SEO'

export default function AcademicCalendar() {
    // Academic Calendar States
    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = String(today.getMonth() + 1).padStart(2, '0')
    const initialCalendarKey = monthlyCalendarData[`${currentYear}-${currentMonth}`] ? `${currentYear}-${currentMonth}` : '2025-07'
    const [selectedMonthKey, setSelectedMonthKey] = useState(initialCalendarKey)
    const [calendarView, setCalendarView] = useState('monthly') // 'monthly' | 'highlights'

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
                title="Academic Calendar" 
                description="Plan your semester with key dates, sessional exams, GUG holidays, and campus activities at MEC." 
            />
            
            <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
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
            </div>
        </>
    )
}
