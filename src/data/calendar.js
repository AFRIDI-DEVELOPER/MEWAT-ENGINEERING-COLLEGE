// Academic Calendar Data for Mewat Engineering College (Waqf)
// Academic Session 2026-27 (Odd/Even Semesters)

export const calendarLegend = [
  { id: 'class-start', label: 'Class Starts/End', color: '#7c3aed', bg: '#f5f3ff' },
  { id: 'sessional', label: 'Sessional Test', color: '#b45309', bg: '#fffbeb' },
  { id: 'tour', label: 'Tours', color: '#eab308', bg: '#fefce8' },
  { id: 'exam', label: 'GUG Exam', color: '#047857', bg: '#ecfdf5' },
  { id: 'rh', label: 'RH', color: '#0ea5e9', bg: '#f0f9ff' },
  { id: 'holiday', label: 'Gazetted Holiday', color: '#dc2626', bg: '#fef2f2' }
];

export const monthlyCalendarData = {
  "2026-07": {
    year: 2026,
    month: 6, // July (0-indexed)
    events: [
      { date: 18, title: "RH", type: "rh" },
      { date: 21, title: "Class Starts/End", type: "class-start" },
      { date: 31, title: "Gazetted Holiday", type: "holiday" }
    ]
  },
  "2026-08": {
    year: 2026,
    month: 7,
    events: [
      { date: 4, title: "Gazetted Holiday", type: "holiday" },
      { date: 12, title: "RH", type: "rh" },
      { date: 15, title: "RH", type: "rh" },
      { date: 26, title: "Gazetted Holiday", type: "holiday" },
      { date: 28, title: "Gazetted Holiday", type: "holiday" }
    ]
  },
  "2026-09": {
    year: 2026,
    month: 8,
    events: [
      { date: 4, title: "Gazetted Holiday", type: "holiday" },
      { date: 23, title: "Gazetted Holiday", type: "holiday" },
      { date: 24, title: "RH", type: "rh" },
      { date: 28, dateEnd: 30, title: "Sessional Test", type: "sessional" }
    ]
  },
  "2026-10": {
    year: 2026,
    month: 9,
    events: [
      { date: 2, title: "Gazetted Holiday", type: "holiday" },
      { date: 20, title: "Gazetted Holiday", type: "holiday" },
      { date: 26, title: "Gazetted Holiday", type: "holiday" },
      { date: 29, title: "RH", type: "rh" }
    ]
  },
  "2026-11": {
    year: 2026,
    month: 10,
    events: [
      { date: 11, title: "RH", type: "rh" },
      { date: 24, title: "Gazetted Holiday", type: "holiday" }
    ]
  },
  "2026-12": {
    year: 2026,
    month: 11,
    events: [
      { date: 2, dateEnd: 4, title: "Sessional Test", type: "sessional" },
      { date: 8, title: "Class Starts/End", type: "class-start" },
      { date: 14, title: "RH", type: "rh" },
      { date: 25, title: "Gazetted Holiday", type: "holiday" },
      { date: 26, title: "RH", type: "rh" }
    ]
  },
  "2027-01": {
    year: 2027,
    month: 0,
    events: [
      { date: 1, title: "Class Starts/End", type: "class-start" },
      { date: 12, title: "RH", type: "rh" },
      { date: 26, title: "Gazetted Holiday", type: "holiday" }
    ]
  },
  "2027-02": {
    year: 2027,
    month: 1,
    events: [
      { date: 11, title: "Gazetted Holiday", type: "holiday" }
    ]
  },
  "2027-03": {
    year: 2027,
    month: 2,
    events: [
      { date: 5, title: "Gazetted Holiday", type: "holiday" },
      { date: 9, dateEnd: 10, title: "Gazetted Holiday", type: "holiday" },
      { date: 26, title: "RH", type: "rh" }
    ]
  },
  "2027-04": {
    year: 2027,
    month: 3,
    events: [
      { date: 14, title: "Gazetted Holiday", type: "holiday" }
    ]
  },
  "2027-05": {
    year: 2027,
    month: 4,
    events: [
      { date: 3, dateEnd: 5, title: "Sessional Test", type: "sessional" },
      { date: 13, title: "Class Starts/End", type: "class-start" },
      { date: 17, dateEnd: 19, title: "Gazetted Holiday", type: "holiday" },
      { date: 20, title: "RH", type: "rh" }
    ]
  },
  "2027-06": {
    year: 2027,
    month: 5,
    events: [
      { date: 9, title: "RH", type: "rh" },
      { date: 15, dateEnd: 16, title: "Gazetted Holiday", type: "holiday" }
    ]
  }
};
