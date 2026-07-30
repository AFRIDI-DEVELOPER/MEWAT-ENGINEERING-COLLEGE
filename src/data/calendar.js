// Academic Calendar Data for Mewat Engineering College (Waqf)
// Academic Session 2025-26 (Odd/Even Semesters)

export const calendarLegend = [
  { id: 'class-start', label: 'Class Starts', color: '#7c3aed', bg: '#f5f3ff' },
  { id: 'sessional', label: 'Sessional Test', color: '#f97316', bg: '#fff7ed' },
  { id: 'tour', label: 'Tours & Visits', color: '#84cc16', bg: '#f7fee7' },
  { id: 'exam', label: 'University Exam (GUG)', color: '#16a34a', bg: '#f0fdf4' },
  { id: 'holiday', label: 'Gazetted Holiday', color: '#dc2626', bg: '#fef2f2' },
  { id: 'activity', label: 'Activities & Events', color: '#0ea5e9', bg: '#f0f9ff' }
];

export const monthlyCalendarData = {
  "2026-07": {
    year: 2026,
    month: 6, // 0-indexed (July)
    events: [
      { date: 28, title: "Odd Sem (3rd, 5th, 7th) Classes Commencement", type: "class-start" },
      { date: 29, title: "Remedial / Induction classes start", type: "activity" },
      { date: 30, title: "Registration Process", type: "activity" },
      { date: 31, title: "Gazetted Holiday", type: "holiday" }
    ]
  },
  "2026-08": {
    year: 2026,
    month: 7, // August
    events: [
      { date: 1, title: "Odd Sem classes registration continues", type: "class-start" },
      { date: 2, title: "Odd Sem classes registration continues", type: "class-start" },
      { date: 15, title: "Independence Day Celebration", type: "holiday" },
      { date: 18, dateEnd: 20, title: "Induction Program for First Year Students", type: "activity" },
      { date: 18, dateEnd: 31, title: "Remedial Classes and Induction Program", type: "activity" }
    ]
  },
  "2026-09": {
    year: 2026,
    month: 8, // September
    events: [
      { date: 1, title: "Odd Sem (1st Sem) Classes Commencement", type: "class-start" },
      { date: 6, title: "2nd Alumni Meet (Indian International Center Delhi)", type: "activity" },
      { date: 13, title: "1st year students visit to Indian Islamic Culture Centre", type: "tour" },
      { date: 22, title: "Fresher Party (Venue: Seminar Hall, 02:00-05:00 pm)", type: "activity" },
      { date: 25, dateEnd: 30, title: "Industrial Visit / College Tour 1 (CE, CSE, etc.)", type: "tour" }
    ]
  },
  "2026-10": {
    year: 2026,
    month: 9, // October
    events: [
      { date: 2, title: "Mahatma Gandhi Jayanti Holiday", type: "holiday" },
      { date: 8, dateEnd: 10, title: "First Sessional Examinations (Odd Sem)", type: "sessional" },
      { date: 10, dateEnd: 12, title: "Sports Week & Cultural Activities 1", type: "activity" }
    ]
  },
  "2026-11": {
    year: 2026,
    month: 10, // November
    events: [
      { date: 24, dateEnd: 26, title: "Second Sessional Examinations (Odd Sem)", type: "sessional" }
    ]
  },
  "2026-12": {
    year: 2026,
    month: 11, // December
    events: [
      { date: 5, title: "End of Odd Semester Classes", type: "class-start" },
      { date: 8, title: "End semester Examinations (Odd Semester) start", type: "exam" },
      { date: 22, dateEnd: 31, title: "Winter Break (B.Tech 3rd/5th/7th)", type: "holiday" },
      { date: 29, dateEnd: 31, title: "Winter Break (B.Tech 1st Sem)", type: "holiday" }
    ]
  },
  "2027-01": {
    year: 2027,
    month: 0, // January
    events: [
      { date: 1, dateEnd: 4, title: "Winter Break (B.Tech 3rd/5th/7th) continues", type: "holiday" },
      { date: 1, dateEnd: 11, title: "Winter Break (B.Tech 1st Sem) continues", type: "holiday" },
      { date: 12, title: "Even Semester Classes Commencement", type: "class-start" },
      { date: 26, title: "Republic Day Celebration", type: "holiday" }
    ]
  },
  "2027-02": {
    year: 2027,
    month: 1, // February
    events: [
      { date: 2, dateEnd: 8, title: "Sports Week and Cultural Activities 2", type: "activity" },
      { date: 23, dateEnd: 28, title: "Industrial Visit / College Tour 2", type: "tour" }
    ]
  },
  "2027-03": {
    year: 2027,
    month: 2, // March
    events: [
      { date: 9, dateEnd: 11, title: "First Sessional Examinations (Even Sem)", type: "sessional" }
    ]
  },
  "2027-04": {
    year: 2027,
    month: 3, // April
    events: [
      { date: 27, dateEnd: 29, title: "Second Sessional Examinations (Even Sem)", type: "sessional" }
    ]
  },
  "2027-05": {
    year: 2027,
    month: 4, // May
    events: [
      { date: 1, title: "Farewell Party (Final Year Students)", type: "activity" },
      { date: 8, title: "End of Even Semester Classes", type: "class-start" },
      { date: 9, title: "End semester Examinations start", type: "exam" },
      { date: 25, dateEnd: 31, title: "Summer Vacations Commencement", type: "holiday" }
    ]
  },
  "2027-06": {
    year: 2027,
    month: 5, // June
    events: [
      { date: 1, dateEnd: 30, title: "Summer Vacations continue", type: "holiday" }
    ]
  }
};
