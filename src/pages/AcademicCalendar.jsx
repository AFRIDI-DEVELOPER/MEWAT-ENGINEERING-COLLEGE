import { useState } from 'react'
import { monthlyCalendarData, calendarLegend } from '../data/calendar'
import { FiInfo, FiCheck, FiUsers, FiStar, FiBriefcase } from 'react-icons/fi'
import SEO from '../components/SEO'

export default function AcademicCalendar({ embedded = false }) {
    // Academic Calendar States
    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = String(today.getMonth() + 1).padStart(2, '0')
    const initialCalendarKey = monthlyCalendarData[`${currentYear}-${currentMonth}`] ? `${currentYear}-${currentMonth}` : '2026-07'
    const [selectedMonthKey, setSelectedMonthKey] = useState(initialCalendarKey)
    const [calendarView, setCalendarView] = useState('monthly') // 'monthly' | 'highlights'

    // Calculate calendar days
    const monthData = monthlyCalendarData[selectedMonthKey] || monthlyCalendarData['2026-07']
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
            {!embedded && (
                <SEO 
                    title="Academic Calendar" 
                    description="Plan your semester with key dates, sessional exams, GUG holidays, and campus activities at MEC." 
                />
            )}
            
            <div style={embedded ? { background: 'var(--bg-primary)' } : { paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
                <section className="section academic-calendar-section" id="academic-calendar">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-label">Academic Schedule</span>
                            <h2>Academic Calendar 2026-27</h2>
                            <p>Plan your semester with key dates, sessional exams, GUG holidays, and campus activities.</p>
                            
                            <a href="/academic-calendar-2026-27.pdf" target="_blank" download className="btn btn-primary" style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                Download Academic Calendar
                            </a>
                            
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
                                            <h4>Events in {monthData.year === 2026 ? 'July-Dec 2026' : 'Jan-Jun 2027'}</h4>
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
                                    <table className="academic-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <tbody>
                                            {/* ODD SEMESTER */}
                                            <tr>
                                                <th colSpan="2" style={{ background: '#4d7c36', color: 'white', padding: '12px', textAlign: 'center', fontSize: '1.1rem' }}>
                                                    Odd Semester
                                                </th>
                                            </tr>
                                            <tr>
                                                <td className="table-highlight highlight-purple" style={{ width: '50%' }}>Odd Sem (3rd, 5th, 7th) Classes Commencement</td>
                                                <td style={{ width: '50%' }}>21st July 2026</td>
                                            </tr>
                                            <tr>
                                                <td className="table-highlight highlight-blue">Remedial Classes and Induction Program</td>
                                                <td>03rd August 2026 to 16th August 2026</td>
                                            </tr>
                                            <tr>
                                                <td className="table-highlight highlight-purple">Odd Sem (1st) Classes Commencement</td>
                                                <td>17th August 2026</td>
                                            </tr>
                                            <tr>
                                                <td className="table-highlight highlight-orange">First Sessional Exam</td>
                                                <td>28th - 30th September 2026</td>
                                            </tr>
                                            <tr>
                                                <td className="table-highlight highlight-orange">Second Sessional Exam</td>
                                                <td>02nd - 04th December 2026</td>
                                            </tr>
                                            <tr>
                                                <td className="table-highlight highlight-green">End of classes</td>
                                                <td>08th December 2026</td>
                                            </tr>
                                            <tr>
                                                <td className="table-highlight highlight-red">Practical Examinations</td>
                                                <td>As per University Notification</td>
                                            </tr>
                                            <tr>
                                                <td className="table-highlight highlight-red">End semester Examinations</td>
                                                <td>As per University Notification</td>
                                            </tr>
                                            <tr>
                                                <td className="table-highlight highlight-green">Winter Break</td>
                                                <td>15.12.2026 onwards</td>
                                            </tr>

                                            {/* EVEN SEMESTER */}
                                            <tr>
                                                <th colSpan="2" style={{ background: '#4d7c36', color: 'white', padding: '12px', textAlign: 'center', fontSize: '1.1rem' }}>
                                                    Even Semester
                                                </th>
                                            </tr>
                                            <tr>
                                                <td className="table-highlight highlight-purple">Even semester classes Commencement</td>
                                                <td>11th January 2027</td>
                                            </tr>
                                            <tr>
                                                <td className="table-highlight highlight-orange">First sessional Exams</td>
                                                <td>24th - 26th March, 2027</td>
                                            </tr>
                                            <tr>
                                                <td className="table-highlight highlight-orange">Second Sessional Exams</td>
                                                <td>03rd - 05th May 2027</td>
                                            </tr>
                                            <tr>
                                                <td className="table-highlight highlight-green">End of classes</td>
                                                <td>13th May 2027</td>
                                            </tr>
                                            <tr>
                                                <td className="table-highlight highlight-red">Practical Exam</td>
                                                <td>As per University Notification</td>
                                            </tr>
                                            <tr>
                                                <td className="table-highlight highlight-red">End semester Examinations</td>
                                                <td>As per University Notification</td>
                                            </tr>
                                            <tr>
                                                <td className="table-highlight highlight-green">Summer vacations</td>
                                                <td>31st May 2027 onwards</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* Additional Activities timeline block */}
                                <div className="table-activities-box">
                                    <h4>Key Campus Activities & Events</h4>
                                    <div className="activities-horizontal-grid">
                                        <div className="activity-mini-card">
                                            <div className="activity-icon-container" style={{ background: '#fefce8', color: '#eab308' }}>
                                                <FiBriefcase size={16} />
                                            </div>
                                            <div>
                                                <h5>College Tours</h5>
                                                <p>3rd - 5th December 2026</p>
                                            </div>
                                        </div>
                                        <div className="activity-mini-card">
                                            <div className="activity-icon-container" style={{ background: '#fef2f2', color: '#dc2626' }}>
                                                <FiStar size={16} />
                                            </div>
                                            <div>
                                                <h5>Gazetted Holidays</h5>
                                                <p>Refer to monthly grid for exact dates</p>
                                            </div>
                                        </div>
                                        <div className="activity-mini-card">
                                            <div className="activity-icon-container" style={{ background: '#f0f9ff', color: '#0ea5e9' }}>
                                                <FiCheck size={16} />
                                            </div>
                                            <div>
                                                <h5>Restricted Holidays (RH)</h5>
                                                <p>Multiple dates throughout the year</p>
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
