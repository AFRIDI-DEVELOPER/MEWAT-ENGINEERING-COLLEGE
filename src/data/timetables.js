// Time Table Data for all branches and semesters
// Mewat Engineering College (Waqf) - Odd Semester 2025-26

export const periods = [
  { id: 'I', time: '9:00 am - 9:50 am' },
  { id: 'II', time: '9:50 am - 10:40 am' },
  { id: 'III', time: '10:40 am - 11:30 am' },
  { id: 'IV', time: '11:20 am - 12:30 pm' }, // timing from official schedule
  { id: 'V', time: '12:20 pm - 1:10 pm' },
  { id: 'Lunch', time: '1:10 pm - 2:00 pm', isBreak: true, label: 'Lunch Break' },
  { id: 'VI', time: '2:00 pm - 2:45 pm' },
  { id: 'VII', time: '2:45 pm - 3:30 pm' },
  { id: 'VIII', time: '3:30 pm - 4:15 pm' },
  { id: 'IX', time: '4:15 pm - 5:00 pm' }
];

export const timetablesData = {
  cse: {
    programs: {
      btech: {
        name: 'B.Tech (Computer Science & Engineering)',
        semesters: {
          3: {
            room: '223',
            schedule: {
              Monday: [
                { subject: 'Advanced Data Structure', teacher: 'Dr. Sherjung', room: '223' },
                { subject: 'Calculus & ODE', teacher: 'Dr. Kaleem', room: '223' },
                { subject: 'Programming with C++', teacher: 'Mr. Naseem', type: 'Online' },
                { subject: 'Digital Electronics', teacher: 'Dr. Javed', room: '223' },
                { subject: 'Digital Electronics', teacher: 'Dr. Javed', room: '223' },
                { isBreak: true },
                { subject: 'Advance Data Structure Lab', teacher: 'Dr. Sherjung', room: 'Lab' },
                { subject: 'Advance Data Structure Lab', teacher: 'Dr. Sherjung', room: 'Lab' },
                { subject: 'Sports', room: 'Ground' },
                { subject: 'Sports', room: 'Ground' }
              ],
              Tuesday: [
                { subject: 'Programming with C++', teacher: 'Mr. Naseem', room: '223' },
                { subject: 'Introduction to AI & ML', teacher: 'Ms. Shariqua', type: 'Online' },
                { subject: 'Digital Electronics', teacher: 'Dr. Javed', type: 'Online' },
                { subject: 'Calculus & ODE', teacher: 'Dr. Kaleem', room: '223' },
                { subject: 'Programming with C++', teacher: 'Mr. Naseem', room: '223' },
                { isBreak: true },
                { subject: 'Digital Electronics Lab', teacher: 'Dr. Javed Ashraf', room: 'Lab' },
                { subject: 'Digital Electronics Lab', teacher: 'Dr. Javed Ashraf', room: 'Lab' },
                { subject: 'Library', room: 'Library' },
                { subject: 'Self Study' }
              ],
              Wednesday: [
                { subject: 'Introduction to AI & ML', teacher: 'Ms. Shariqua', room: '223' },
                { subject: 'Calculus & ODE', teacher: 'Dr. Kaleem', room: '223' },
                { subject: 'Database Mgmnt SQL', teacher: 'Mr. Azaz', room: '223' },
                { subject: 'Database Mgmnt SQL', teacher: 'Mr. Azaz', room: '223' },
                { subject: 'Advanced Data Structure', teacher: 'Dr. Sherjung', type: 'Online' },
                { isBreak: true },
                { subject: 'Database Management Systems Lab', teacher: 'Mr. Azaz Khan', room: 'Lab' },
                { subject: 'Database Management Systems Lab', teacher: 'Mr. Azaz Khan', room: 'Lab' },
                { subject: 'Sports', room: 'Ground' },
                { subject: 'Sports', room: 'Ground' }
              ],
              Thursday: [
                { subject: 'Database Mgmnt SQL', teacher: 'Mr. Azaz', type: 'Online' },
                { subject: 'Advanced Data Structure', teacher: 'Dr. Sherjung', room: '223' },
                { subject: 'Calculus & ODE', teacher: 'Dr. Kaleem', type: 'Online' },
                { subject: 'Constitution of India', teacher: 'Dr. Khwaja M. Rafi', room: 'Seminar Hall' },
                { subject: 'Constitution of India', teacher: 'Dr. Khwaja M. Rafi', room: 'Seminar Hall' },
                { isBreak: true },
                { subject: 'Introduction to AI & ML', teacher: 'Ms. Shariqua', room: '223' },
                { subject: 'Programming with C++ Lab', teacher: 'Mr. Naseem Ahmed', room: 'Lab' },
                { subject: 'Programming with C++ Lab', teacher: 'Mr. Naseem Ahmed', room: 'Lab' },
                { subject: 'Self Study' }
              ],
              Friday: [
                { subject: 'Self Study' },
                { subject: 'Self Study' },
                { subject: 'Self Study' },
                { subject: 'Self Study' },
                { subject: 'Self Study' },
                { isBreak: true },
                { subject: 'Self Study' },
                { subject: 'Self Study' },
                { subject: 'Self Study' },
                { subject: 'Self Study' }
              ]
            }
          },
          5: {
            room: '224',
            schedule: {
              Monday: [
                { subject: 'Web Technology', teacher: 'Mr. Azaz', room: '224' },
                { subject: 'Design & Anal of Algo', teacher: 'Dr. Shahid', type: 'Online' },
                { subject: 'Formal Lang & Automata', teacher: 'Ms. Shariqua', room: '224' },
                { subject: 'Computer Networks', teacher: 'Dr. Aakib', type: 'Online' },
                { subject: 'Economics for Engineers', teacher: 'Mr. Asruddin', room: '107' },
                { isBreak: true },
                { subject: 'Web Technology Lab', teacher: 'Mr. Azaz Khan', room: 'Lab' },
                { subject: 'Web Technology Lab', teacher: 'Mr. Azaz Khan', room: 'Lab' },
                { subject: 'Computer Networks Lab', teacher: 'Dr. Aakib', room: 'Lab' },
                { subject: 'Computer Networks Lab', teacher: 'Dr. Aakib', room: 'Lab' }
              ],
              Tuesday: [
                { subject: 'Design & Anal of Algo', teacher: 'Dr. Shahid', room: '224' },
                { subject: 'Economics for Engineers', teacher: 'Mr. Asruddin', type: 'Online' },
                { subject: 'Software Engineering', teacher: 'Dr. Shahid', type: 'Online' },
                { subject: 'HRM', teacher: 'Mr. Iqbal', room: '022' },
                { subject: 'Computer Networks', teacher: 'Dr. Aakib', room: '224' },
                { isBreak: true },
                { subject: 'Web Technology', teacher: 'Mr. Azaz', type: 'Online' },
                { subject: 'Library', room: 'Library' },
                { subject: 'Practical Training-I', teacher: 'Dr. Aakib/Dr. Shahid/Mr. Naseem', room: 'Lab' },
                { subject: 'Practical Training-I', teacher: 'Dr. Aakib/Dr. Shahid/Mr. Naseem', room: 'Lab' }
              ],
              Wednesday: [
                { subject: 'Economics for Engineers', teacher: 'Mr. Asruddin', room: '107' },
                { subject: 'Formal Lang & Automata', teacher: 'Ms. Shariqua', room: '224' },
                { subject: 'HRM', teacher: 'Mr. Iqbal', type: 'Online' },
                { subject: 'Software Engineering', teacher: 'Dr. Shahid', room: '224' },
                { subject: 'Computer Networks', teacher: 'Dr. Aakib', room: '224' },
                { isBreak: true },
                { subject: 'Self Study' },
                { subject: 'Self Study' },
                { subject: 'Sports', room: 'Ground' },
                { subject: 'Sports', room: 'Ground' }
              ],
              Thursday: [
                { subject: 'HRM', teacher: 'Mr. Iqbal', room: '022' },
                { subject: 'Web Technology', teacher: 'Mr. Azaz', room: '224' },
                { subject: 'Software Engineering', teacher: 'Dr. Shahid', room: '224' },
                { subject: 'Design & Anal of Algo', teacher: 'Dr. Shahid', room: '224' },
                { subject: 'Formal Lang & Automata', teacher: 'Ms. Shariqua', type: 'Online' },
                { isBreak: true },
                { subject: 'Design and Analysis of Algorithms Lab', teacher: 'Dr. Shahid', room: 'Lab' },
                { subject: 'Design and Analysis of Algorithms Lab', teacher: 'Dr. Shahid', room: 'Lab' },
                { subject: 'Sports', room: 'Ground' },
                { subject: 'Sports', room: 'Ground' }
              ],
              Friday: [
                { subject: 'Self Study' },
                { subject: 'Self Study' },
                { subject: 'Self Study' },
                { subject: 'Self Study' },
                { subject: 'Self Study' },
                { isBreak: true },
                { subject: 'Self Study' },
                { subject: 'Self Study' },
                { subject: 'Self Study' },
                { subject: 'Self Study' }
              ]
            }
          },
          7: {
            room: 'Project Lab',
            schedule: {
              Monday: [
                { subject: 'Intellectual Property Rights', teacher: 'Dr. Javed Ashraf', room: '208' },
                { subject: 'Intellectual Property Rights', teacher: 'Dr. Javed Ashraf', room: '208' },
                { subject: 'Conventional & Renewable Energy', teacher: 'Dr. Junaid', room: '208' },
                { subject: 'Neural Networks', teacher: 'Dr. Sherjung', room: '224' },
                { subject: 'Data Science', teacher: 'Dr. Aakib', room: '102' },
                { isBreak: true },
                { subject: 'Project-II', teacher: 'Dr. Shahid/Dr. Aakib/Dr. Sherjung/Dr. Javed', room: 'Lab' },
                { subject: 'Project-II', teacher: 'Dr. Shahid/Dr. Aakib/Dr. Sherjung/Dr. Javed', room: 'Lab' },
                { subject: 'Project-II', teacher: 'Dr. Shahid/Dr. Aakib/Dr. Sherjung/Dr. Javed', room: 'Lab' },
                { subject: 'Project-II', teacher: 'Dr. Shahid/Dr. Aakib/Dr. Sherjung/Dr. Javed', room: 'Lab' }
              ],
              Tuesday: [
                { subject: 'Organizational Behaviour', teacher: 'Dr. Afzal', room: '208' },
                { subject: 'Intellectual Property Rights', teacher: 'Dr. Javed', type: 'Online' },
                { subject: 'Conventional & Renewable Energy', teacher: 'Dr. Junaid', room: '208' },
                { subject: 'Self Study' },
                { subject: 'Neural Networks', teacher: 'Dr. Sherjung', type: 'Online' },
                { isBreak: true },
                { subject: 'Sports', room: 'Ground' },
                { subject: 'Sports', room: 'Ground' },
                { subject: 'Practical Training-II', teacher: 'Dr. Javed Ashraf/Ms. Shariqua Razi', room: 'Lab' },
                { subject: 'Practical Training-II', teacher: 'Dr. Javed Ashraf/Ms. Shariqua Razi', room: 'Lab' }
              ],
              Wednesday: [
                { subject: 'Self Study' },
                { subject: 'Organizational Behaviour', teacher: 'Dr. Afzal', room: '208' },
                { subject: 'Neural Networks', teacher: 'Dr. Sherjung', room: '224' },
                { subject: 'Data Science', teacher: 'Dr. Aakib', type: 'Online' },
                { subject: 'Conventional & Renewable Energy', teacher: 'Dr. Junaid', type: 'Online' },
                { isBreak: true },
                { subject: 'Project-II', teacher: 'Dr. Shahid/Dr. Aakib/Dr. Sherjung/Dr. Javed', room: 'Lab' },
                { subject: 'Project-II', teacher: 'Dr. Shahid/Dr. Aakib/Dr. Sherjung/Dr. Javed', room: 'Lab' },
                { subject: 'Project-II', teacher: 'Dr. Shahid/Dr. Aakib/Dr. Sherjung/Dr. Javed', room: 'Lab' },
                { subject: 'Project-II', teacher: 'Dr. Shahid/Dr. Aakib/Dr. Sherjung/Dr. Javed', room: 'Lab' }
              ],
              Thursday: [
                { subject: 'Data Science', teacher: 'Dr. Aakib', room: '102' },
                { subject: 'Organizational Behaviour', teacher: 'Dr. Afzal', type: 'Online' },
                { subject: 'Library', room: 'Library' },
                { subject: 'Neural Networks Lab', teacher: 'Dr. Sherjung', room: 'Lab' },
                { subject: 'Neural Networks Lab', teacher: 'Dr. Sherjung', room: 'Lab' },
                { isBreak: true },
                { subject: 'Project-II', teacher: 'Dr. Shahid/Dr. Aakib/Dr. Sherjung/Dr. Javed', room: 'Lab' },
                { subject: 'Project-II', teacher: 'Dr. Shahid/Dr. Aakib/Dr. Sherjung/Dr. Javed', room: 'Lab' },
                { subject: 'Project-II', teacher: 'Dr. Shahid/Dr. Aakib/Dr. Sherjung/Dr. Javed', room: 'Lab' },
                { subject: 'Project-II', teacher: 'Dr. Shahid/Dr. Aakib/Dr. Sherjung/Dr. Javed', room: 'Lab' }
              ],
              Friday: [
                { subject: 'Project-II', teacher: 'All Faculties', room: 'Lab' },
                { subject: 'Project-II', teacher: 'All Faculties', room: 'Lab' },
                { subject: 'Project-II', teacher: 'All Faculties', room: 'Lab' },
                { subject: 'Project-II', teacher: 'All Faculties', room: 'Lab' },
                { subject: 'Project-II', teacher: 'All Faculties', room: 'Lab' },
                { isBreak: true },
                { subject: 'Project-II', teacher: 'All Faculties', room: 'Lab' },
                { subject: 'Project-II', teacher: 'All Faculties', room: 'Lab' },
                { subject: 'Project-II', teacher: 'All Faculties', room: 'Lab' },
                { subject: 'Project-II', teacher: 'All Faculties', room: 'Lab' }
              ]
            }
          }
        }
      },
      dvoc: {
        name: 'D.Voc (Software Development)',
        semesters: {
          3: {
            room: 'D.Voc Room',
            schedule: {
              Monday: [
                { subject: 'Language-II', teacher: 'Dr. Afzal', room: '020' },
                { subject: 'Library', room: 'Library' },
                { subject: 'General Found. Course', teacher: 'Mr. Adil', room: '123' },
                { subject: 'Web Applications', teacher: 'Mr. Azaz', room: '107' },
                { subject: 'Web Applications', teacher: 'Mr. Azaz', type: 'Online' },
                { isBreak: true },
                { subject: 'Sports', room: 'Ground' },
                { subject: 'Sports', room: 'Ground' },
                { subject: 'Sports', room: 'Ground' },
                { subject: 'Sports', room: 'Ground' }
              ],
              Tuesday: [
                { subject: 'Web Applications Lab', teacher: 'Mr. Azaz', room: 'Lab' },
                { subject: 'Web Applications Lab', teacher: 'Mr. Azaz', room: 'Lab' },
                { subject: 'IT Tools', teacher: 'Dr. Sherjung', type: 'Online' },
                { subject: 'Web Applications', teacher: 'Mr. Azaz', room: '107' },
                { subject: 'General Found. Course', teacher: 'Mr. Adil', type: 'Online' },
                { isBreak: true },
                { subject: 'Self Study' },
                { subject: 'Self Study' },
                { subject: 'Self Study' },
                { subject: 'Self Study' }
              ],
              Wednesday: [
                { subject: 'IT Tools', teacher: 'Dr. Sherjung', room: '118' },
                { subject: 'IT Tools Lab (Advanced)', teacher: 'Dr. Shahid', room: 'Lab' },
                { subject: 'IT Tools Lab (Advanced)', teacher: 'Dr. Shahid', room: 'Lab' },
                { subject: 'General Found. Course', teacher: 'Mr. Adil', room: '123' },
                { subject: 'Language-II', teacher: 'Dr. Afzal', type: 'Online' },
                { isBreak: true },
                { subject: 'IT Tools', teacher: 'Dr. Sherjung', room: '118' },
                { subject: 'Language-II', teacher: 'Dr. Afzal', room: '020' },
                { subject: 'Self Study' },
                { subject: 'Self Study' }
              ],
              Thursday: [
                { subject: 'On Job Training' }, { subject: 'On Job Training' }, { subject: 'On Job Training' }, { subject: 'On Job Training' }, { subject: 'On Job Training' },
                { isBreak: true },
                { subject: 'On Job Training' }, { subject: 'On Job Training' }, { subject: 'On Job Training' }, { subject: 'On Job Training' }
              ],
              Friday: [
                { subject: 'On Job Training' }, { subject: 'On Job Training' }, { subject: 'On Job Training' }, { subject: 'On Job Training' }, { subject: 'On Job Training' },
                { isBreak: true },
                { subject: 'On Job Training' }, { subject: 'On Job Training' }, { subject: 'On Job Training' }, { subject: 'On Job Training' }
              ]
            }
          },
          5: {
            room: 'D.Voc Lab',
            schedule: {
              Monday: [
                { subject: 'Operating System', teacher: 'Ms. Shariqua', room: '118' },
                { subject: 'Web Designing', teacher: 'Dr. Aakib', type: 'Online' },
                { subject: 'Library', room: 'Library' },
                { subject: 'IT Foundation Prog.', teacher: 'Dr. Shahid', room: '118' },
                { subject: 'Programming in C', teacher: 'Mr. Naseem', type: 'Online' },
                { isBreak: true },
                { subject: 'Sports', room: 'Ground' }, { subject: 'Sports', room: 'Ground' }, { subject: 'Sports', room: 'Ground' }, { subject: 'Sports', room: 'Ground' }
              ],
              Tuesday: [
                { subject: 'Web Designing Lab', teacher: 'Mr. Azaz', room: 'Lab' },
                { subject: 'Web Designing Lab', teacher: 'Mr. Azaz', room: 'Lab' },
                { subject: 'Web Designing', teacher: 'Dr. Aakib', room: '022' },
                { subject: 'Operating System', teacher: 'Ms. Shariqua', type: 'Online' },
                { subject: 'IT Foundation Prog.', teacher: 'Dr. Shahid', type: 'Online' },
                { isBreak: true },
                { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }
              ],
              Wednesday: [
                { subject: 'Web Designing', teacher: 'Dr. Aakib', room: '022' },
                { subject: 'Programming in C', teacher: 'Mr. Naseem', room: '021' },
                { subject: 'Programming in C', teacher: 'Mr. Naseem', room: '118' },
                { subject: 'Operating System', teacher: 'Ms. Shariqua', room: '118' },
                { subject: 'IT Foundation Prog.', teacher: 'Dr. Shahid', room: '118' },
                { isBreak: true },
                { subject: 'Self Study' },
                { subject: 'C Programming Lab', teacher: 'Ms. Shariqua Razi', room: 'Lab' },
                { subject: 'C Programming Lab', teacher: 'Ms. Shariqua Razi', room: 'Lab' },
                { subject: 'Self Study' }
              ],
              Thursday: [
                { subject: 'On Job Training' }, { subject: 'On Job Training' }, { subject: 'On Job Training' }, { subject: 'On Job Training' }, { subject: 'On Job Training' },
                { isBreak: true },
                { subject: 'On Job Training' }, { subject: 'On Job Training' }, { subject: 'On Job Training' }, { subject: 'On Job Training' }
              ],
              Friday: [
                { subject: 'On Job Training' }, { subject: 'On Job Training' }, { subject: 'On Job Training' }, { subject: 'On Job Training' }, { subject: 'On Job Training' },
                { isBreak: true },
                { subject: 'On Job Training' }, { subject: 'On Job Training' }, { subject: 'On Job Training' }, { subject: 'On Job Training' }
              ]
            }
          }
        }
      }
    }
  },
  civil: {
    programs: {
      btech: {
        name: 'B.Tech (Civil Engineering)',
        semesters: {
          3: {
            room: '107',
            schedule: {
              Monday: [
                { subject: 'Surveying-I', teacher: 'Dr. Tofeeq', room: '107' },
                { subject: 'Mathematics-III', teacher: 'Dr. Dilshad', room: '107' },
                { subject: 'Building Cons Material', teacher: 'Mr. Irshad', type: 'Online' },
                { subject: 'Fluid Mech-I', teacher: 'Dr. Haroon', type: 'Online' },
                { subject: 'Economics for Engineers', teacher: 'Mr. Asruddin', room: '107' },
                { isBreak: true },
                { subject: 'Engineering Mechanics Lab', teacher: 'Mr. Emaduddin', room: 'Lab' },
                { subject: 'Engineering Mechanics Lab', teacher: 'Mr. Emaduddin', room: 'Lab' },
                { subject: 'Sports', room: 'Ground' },
                { subject: 'Sports', room: 'Ground' }
              ],
              Tuesday: [
                { subject: 'Building Cons Material', teacher: 'Mr. Irshad', room: '107' },
                { subject: 'Economics for Engineers', teacher: 'Mr. Asruddin', type: 'Online' },
                { subject: 'Surveying-I', teacher: 'Dr. Tofeeq', room: '107' },
                { subject: 'Mathematics-III', teacher: 'Dr. Dilshad', type: 'Online' },
                { subject: 'Engg Mech.', teacher: 'Mr. Emad', room: '107' },
                { isBreak: true },
                { subject: 'Surveying Lab', teacher: 'Dr. Tofeeq Alam', room: 'Lab' },
                { subject: 'Surveying Lab', teacher: 'Dr. Tofeeq Alam', room: 'Lab' },
                { subject: 'Sports', room: 'Ground' },
                { subject: 'Sports', room: 'Ground' }
              ],
              Wednesday: [
                { subject: 'Economics for Engineers', teacher: 'Mr. Asruddin', room: '107' },
                { subject: 'Fluid Mech-I', teacher: 'Dr. Haroon', room: '107' },
                { subject: 'Engg Mech.', teacher: 'Mr. Emad', type: 'Online' },
                { subject: 'Mathematics-III', teacher: 'Dr. Dilshad', room: '107' },
                { subject: 'Mathematics-III', teacher: 'Dr. Dilshad', room: '107' },
                { isBreak: true },
                { subject: 'Building Drawing Lab', teacher: 'Mr. Irshad', room: 'Lab' },
                { subject: 'Building Drawing Lab', teacher: 'Mr. Irshad', room: 'Lab' },
                { subject: 'Self Study' },
                { subject: 'Self Study' }
              ],
              Thursday: [
                { subject: 'Fluid Mech-I', teacher: 'Dr. Haroon', room: '107' },
                { subject: 'Engg Mech.', teacher: 'Mr. Emad', room: '107' },
                { subject: 'Building Cons Material', teacher: 'Mr. Irshad', room: '107' },
                { subject: 'Surveying-I', teacher: 'Dr. Tofeeq', type: 'Online' },
                { subject: 'Library', room: 'Library' },
                { isBreak: true },
                { subject: 'Fluid Mechanics Lab', teacher: 'Dr. Haroon Rasheed', room: 'Lab' },
                { subject: 'Fluid Mechanics Lab', teacher: 'Dr. Haroon Rasheed', room: 'Lab' },
                { subject: 'Self Study' },
                { subject: 'Self Study' }
              ],
              Friday: [
                { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' },
                { isBreak: true },
                { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }
              ]
            }
          },
          5: {
            room: '108',
            schedule: {
              Monday: [
                { subject: 'Engg. Geology', teacher: 'Mr. Irshad', room: '108' },
                { subject: 'Soil Mechanics', teacher: 'Mr. Emad', room: '108' },
                { subject: 'Water Supply Treatment', teacher: 'Mr. Zahid', type: 'Online' },
                { subject: 'Hydrology & Water Res.', teacher: 'Mr. Kaushar', type: 'Online' },
                { subject: 'Design of Steel Structure', teacher: 'Mr. Zahid', room: '108' },
                { isBreak: true },
                { subject: 'Transportation Engg Lab', teacher: 'Dr. Haroon Rasheed', room: 'Lab' },
                { subject: 'Transportation Engg Lab', teacher: 'Dr. Haroon Rasheed', room: 'Lab' },
                { subject: 'Library', room: 'Library' },
                { subject: 'Self Study' }
              ],
              Tuesday: [
                { subject: 'Transport Engg', teacher: 'Dr. Haroon', room: '108' },
                { subject: 'Soil Mechanics', teacher: 'Mr. Emad', type: 'Online' },
                { subject: 'Engg. Geology', teacher: 'Mr. Irshad', room: '108' },
                { subject: 'Water Supply Treatment', teacher: 'Mr. Zahid', room: '108' },
                { subject: 'Design of Steel Structure', teacher: 'Mr. Zahid', room: '108' },
                { isBreak: true },
                { subject: 'Soil Mechanics Lab', teacher: 'Mr. Syed Emaduddin Ahmed', room: 'Lab' },
                { subject: 'Soil Mechanics Lab', teacher: 'Mr. Syed Emaduddin Ahmed', room: 'Lab' },
                { subject: 'Practical Training-I', teacher: 'Mr. Asruddin', room: 'Lab' },
                { subject: 'Practical Training-I', teacher: 'Mr. Asruddin', room: 'Lab' }
              ],
              Wednesday: [
                { subject: 'Engg. Geology', teacher: 'Mr. Irshad', type: 'Online' },
                { subject: 'Hydrology & Water Res.', teacher: 'Mr. Kaushar', room: '108' },
                { subject: 'Transport Engg', teacher: 'Dr. Haroon', type: 'Online' },
                { subject: 'Design of Steel Structure', teacher: 'Mr. Zahid', type: 'Online' },
                { subject: 'Soil Mechanics', teacher: 'Mr. Emad', room: '108' },
                { isBreak: true },
                { subject: 'DSS Drawing Lab', teacher: 'Mr. Zahid', room: 'Lab' },
                { subject: 'DSS Drawing Lab', teacher: 'Mr. Zahid', room: 'Lab' },
                { subject: 'Survey Camp', room: 'Field' },
                { subject: 'Survey Camp', room: 'Field' }
              ],
              Thursday: [
                { subject: 'Hydrology & Water Res.', teacher: 'Mr. Kaushar', room: '108' },
                { subject: 'Design of Steel Structure', teacher: 'Mr. Zahid', room: '108' },
                { subject: 'Soil Mechanics', teacher: 'Mr. Emad', room: '108' },
                { subject: 'Water Supply Treatment', teacher: 'Mr. Zahid', room: '108' },
                { subject: 'Transport Engg', teacher: 'Dr. Haroon', room: '108' },
                { isBreak: true },
                { subject: 'Engg. Geology Lab', teacher: 'Mr. Irshad', room: 'Lab' },
                { subject: 'Engg. Geology Lab', teacher: 'Mr. Irshad', room: 'Lab' },
                { subject: 'Survey Camp', room: 'Field' },
                { subject: 'Survey Camp', room: 'Field' }
              ],
              Friday: [
                { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' },
                { isBreak: true },
                { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }
              ]
            }
          },
          7: {
            room: 'Seminar Hall',
            schedule: {
              Monday: [
                { subject: 'Disaster Miti & Mgmnt', teacher: 'Mr. Asruddin', room: '203' },
                { subject: 'Construction Plann & Mgm', teacher: 'Dr. Haroon', type: 'Online' },
                { subject: 'Railway & Airport Engg', teacher: 'Mr. Asruddin', room: '203' },
                { subject: 'Solid & Haz Waste Mgmnt', teacher: 'Mr. Irshad', type: 'Online' },
                { subject: 'Design of Hydraulic Struct', teacher: 'Mr. Kaushar', room: '203' },
                { isBreak: true },
                { subject: 'Advanced Steel Structure', teacher: 'Mr. Zahid', type: 'Online' },
                { subject: 'Ground Water Engg', teacher: 'Dr. Tofeeq', type: 'Online' },
                { subject: 'Design of Hydraulic Struct', teacher: 'Mr. Kaushar', type: 'Online' },
                { subject: 'Project', room: 'Lab' }
              ],
              Tuesday: [
                { subject: 'Railway & Airport Engg', teacher: 'Mr. Asruddin', type: 'Online' },
                { subject: 'Advanced Steel Structure', teacher: 'Mr. Zahid', room: '203' },
                { subject: 'Construction Plann & Mgm', teacher: 'Dr. Haroon', room: '203' },
                { subject: 'Disaster Miti & Mgmnt', teacher: 'Mr. Asruddin', room: '203' },
                { subject: 'Ground Water Engg', teacher: 'Dr. Tofeeq', room: '203' },
                { isBreak: true },
                { subject: 'Practical Training-II', teacher: 'Mr. Kaushar Hussain', room: 'Lab' },
                { subject: 'Practical Training-II', teacher: 'Mr. Kaushar Hussain', room: 'Lab' },
                { subject: 'Project', room: 'Lab' },
                { subject: 'Project', room: 'Lab' }
              ],
              Wednesday: [
                { subject: 'Ground Water Engg', teacher: 'Dr. Tofeeq', room: '203' },
                { subject: 'Solid & Haz Waste Mgmnt', teacher: 'Mr. Irshad', room: '203' },
                { subject: 'Advanced Steel Structure', teacher: 'Mr. Zahid', room: '203' },
                { subject: 'Railway & Airport Engg', teacher: 'Mr. Asruddin', room: '203' },
                { subject: 'Disaster Miti & Mgmnt', teacher: 'Mr. Asruddin', type: 'Online' },
                { isBreak: true },
                { subject: 'Project', room: 'Lab' }, { subject: 'Project', room: 'Lab' }, { subject: 'Project', room: 'Lab' }, { subject: 'Project', room: 'Lab' }
              ],
              Thursday: [
                { subject: 'Solid & Haz Waste Mgmnt', teacher: 'Mr. Irshad', room: '203' },
                { subject: 'Design of Hydraulic Struct', teacher: 'Mr. Kaushar', room: '203' },
                { subject: 'Construction Plann & Mgm', teacher: 'Dr. Haroon', room: '203' },
                { subject: 'Constitution of India', teacher: 'Dr. Khwaja M. Rafi', room: 'Seminar Hall' },
                { subject: 'Constitution of India', teacher: 'Dr. Khwaja M. Rafi', room: 'Seminar Hall' },
                { isBreak: true },
                { subject: 'Irrigation Drawing Lab', teacher: 'Mr. Kaushar Hussain', room: 'Lab' },
                { subject: 'Irrigation Drawing Lab', teacher: 'Mr. Kaushar Hussain', room: 'Lab' },
                { subject: 'Library', room: 'Library' },
                { subject: 'Self Study' }
              ],
              Friday: [
                { subject: 'Project', room: 'Lab' }, { subject: 'Project', room: 'Lab' }, { subject: 'Project', room: 'Lab' }, { subject: 'Project', room: 'Lab' }, { subject: 'Project', room: 'Lab' },
                { isBreak: true },
                { subject: 'Project', room: 'Lab' }, { subject: 'Project', room: 'Lab' }, { subject: 'Project', room: 'Lab' }, { subject: 'Project', room: 'Lab' }
              ]
            }
          }
        }
      }
    }
  },
  eee: {
    programs: {
      btech: {
        name: 'B.Tech (Electrical & Electronics Engineering)',
        semesters: {
          3: {
            room: '214',
            schedule: {
              Monday: [
                { subject: 'Electric Machine-I', teacher: 'Mr. Umar', room: '214' },
                { subject: 'Digital Electronics', teacher: 'Dr. Shaheen', type: 'Online' },
                { subject: 'Network Ana & Synthesis', teacher: 'Ms. Shahina', room: '214' },
                { subject: 'Signal & Systems', teacher: 'Dr. Naseem', type: 'Online' },
                { subject: 'Math & CT', teacher: 'Dr. Kaleem', room: '214' },
                { isBreak: true },
                { subject: 'Electrical Machine-I Lab', teacher: 'Mr. Umar', room: 'Lab' },
                { subject: 'Electrical Machine-I Lab', teacher: 'Mr. Umar', room: 'Lab' },
                { subject: 'Mathematical & Comp. Lab', teacher: 'Dr. Kaleem', room: 'Lab' },
                { subject: 'Mathematical & Comp. Lab', teacher: 'Dr. Kaleem', room: 'Lab' }
              ],
              Tuesday: [
                { subject: 'Digital Electronics', teacher: 'Dr. Shaheen', room: '214' },
                { subject: 'Electric Machine-I', teacher: 'Mr. Umar', type: 'Online' },
                { subject: 'Signal & Systems', teacher: 'Dr. Naseem', room: '214' },
                { subject: 'Network Ana & Synthesis', teacher: 'Ms. Shahina', type: 'Online' },
                { subject: 'Math & CT', teacher: 'Dr. Kaleem', room: '214' },
                { isBreak: true },
                { subject: 'Digital Electronics', teacher: 'Dr. Shaheen', room: '214' },
                { subject: 'Electromagnetic Field Theory', teacher: 'Dr. Faraz', room: '214' },
                { subject: 'Digital Electronics Lab', teacher: 'Dr. Shaheen', room: 'Lab' },
                { subject: 'Digital Electronics Lab', teacher: 'Dr. Shaheen', room: 'Lab' }
              ],
              Wednesday: [
                { subject: 'Signal & Systems', teacher: 'Dr. Naseem', room: '214' },
                { subject: 'Electromagnetic Field Theory', teacher: 'Dr. Faraz', room: '214' },
                { subject: 'Electric Machine-I', teacher: 'Mr. Umar', room: '214' },
                { subject: 'Digital Electronics', teacher: 'Dr. Shaheen', room: '214' },
                { subject: 'Math & CT', teacher: 'Dr. Kaleem', room: 'Online' },
                { isBreak: true },
                { subject: 'Network Ana & Synthesis', teacher: 'Ms. Shahina', room: '214' },
                { subject: 'Library', room: 'Library' },
                { subject: 'Network Analysis & Synth Lab', teacher: 'Ms. Shahina', room: 'Lab' },
                { subject: 'Network Analysis & Synth Lab', teacher: 'Ms. Shahina', room: 'Lab' }
              ],
              Thursday: [
                { subject: 'Network Ana & Synthesis', teacher: 'Ms. Shahina', room: '214' },
                { subject: 'Math & CT', teacher: 'Dr. Kaleem', room: '214' },
                { subject: 'Electromagnetic Field Theory', teacher: 'Dr. Faraz', type: 'Online' },
                { subject: 'Constitution of India', teacher: 'Dr. Khwaja M. Rafi', room: 'Seminar Hall' },
                { subject: 'Constitution of India', teacher: 'Dr. Khwaja M. Rafi', room: 'Seminar Hall' },
                { isBreak: true },
                { subject: 'Math & CT', teacher: 'Dr. Kaleem', room: '214' },
                { subject: 'Electric Machine-I', teacher: 'Mr. Umar', room: '214' },
                { subject: 'Sports', room: 'Ground' },
                { subject: 'Sports', room: 'Ground' }
              ],
              Friday: [
                { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' },
                { isBreak: true },
                { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }
              ]
            }
          },
          5: {
            room: '207',
            schedule: {
              Monday: [
                { subject: 'Digital System Design', teacher: 'Dr. Shaheen', room: '207' },
                { subject: 'Power Quality', teacher: 'Dr. Shamshad', room: '207' },
                { subject: 'Digital Signal Processing', teacher: 'Dr. Shaheen', type: 'Online' },
                { subject: 'Communication Systems', teacher: 'Dr. Tazeem', room: '207' },
                { subject: 'Communication Systems', teacher: 'Dr. Tazeem', room: '207' },
                { isBreak: true },
                { subject: 'Digital Signal Processing', teacher: 'Dr. Shaheen', room: '207' },
                { subject: 'Power System-I', teacher: 'Ms. Shahina', room: '207' },
                { subject: 'Practical Training-I', teacher: 'Mr. Umar', room: 'Lab' },
                { subject: 'Practical Training-I', teacher: 'Mr. Umar', room: 'Lab' }
              ],
              Tuesday: [
                { subject: 'Self Study' },
                { subject: 'Power System-I', teacher: 'Ms. Shahina', room: '207' },
                { subject: 'Digital System Design', teacher: 'Dr. Shaheen', type: 'Online' },
                { subject: 'HRM', teacher: 'Mr. Iqbal', room: '022' },
                { subject: 'Communication Systems', teacher: 'Dr. Tazeem', type: 'Online' },
                { isBreak: true },
                { subject: 'Library', room: 'Library' },
                { subject: 'Power Quality', teacher: 'Dr. Shamshad', room: '207' },
                { subject: 'Communication Systems Lab', teacher: 'Dr. Tazeem', room: 'Lab' },
                { subject: 'Communication Systems Lab', teacher: 'Dr. Tazeem', room: 'Lab' }
              ],
              Wednesday: [
                { subject: 'Digital Signal Processing', teacher: 'Dr. Shaheen', room: '207' },
                { subject: 'Digital System Design', teacher: 'Dr. Shaheen', room: '207' },
                { subject: 'HRM', teacher: 'Mr. Iqbal', type: 'Online' },
                { subject: 'Communication Systems', teacher: 'Dr. Tazeem', room: '207' },
                { subject: 'Power System-I', teacher: 'Ms. Shahina', type: 'Online' },
                { isBreak: true },
                { subject: 'Digital System Design Lab', teacher: 'Dr. Shaheen', room: 'Lab' },
                { subject: 'Digital System Design Lab', teacher: 'Dr. Shaheen', room: 'Lab' },
                { subject: 'Digital Signal Processing Lab', teacher: 'Dr. Shaheen', room: 'Lab' },
                { subject: 'Digital Signal Processing Lab', teacher: 'Dr. Shaheen', room: 'Lab' }
              ],
              Thursday: [
                { subject: 'HRM', teacher: 'Mr. Iqbal', room: '022' },
                { subject: 'Digital Signal Processing', teacher: 'Dr. Shaheen', room: '207' },
                { subject: 'Power Quality', teacher: 'Dr. Shamshad', type: 'Online' },
                { subject: 'Power System-I', teacher: 'Ms. Shahina', room: '207' },
                { subject: 'Digital System Design', teacher: 'Dr. Shaheen', room: '207' },
                { isBreak: true },
                { subject: 'Power System Lab', teacher: 'Ms. Shahina', room: 'Lab' },
                { subject: 'Power System Lab', teacher: 'Ms. Shahina', room: 'Lab' },
                { subject: 'Sports', room: 'Ground' },
                { subject: 'Sports', room: 'Ground' }
              ],
              Friday: [
                { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' },
                { isBreak: true },
                { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }
              ]
            }
          },
          7: {
            room: '208',
            schedule: {
              Monday: [
                { subject: 'Intellectual Property Rights', teacher: 'Dr. Javed Ashraf', room: '208' },
                { subject: 'Intellectual Property Rights', teacher: 'Dr. Javed Ashraf', room: '208' },
                { subject: 'Conventional & Renewable Energy', teacher: 'Dr. Junaid', room: '208' },
                { subject: 'STAA', teacher: 'Dr. Shamshad', type: 'Online' },
                { subject: 'Renewable Energy & D.G.', teacher: 'Dr. Junaid', room: '208' },
                { isBreak: true },
                { subject: 'Practical Training-II', teacher: 'Mr. Sajid Hussain', room: 'Lab' },
                { subject: 'Practical Training-II', teacher: 'Mr. Sajid Hussain', room: 'Lab' },
                { subject: 'Sports', room: 'Ground' },
                { subject: 'Sports', room: 'Ground' }
              ],
              Tuesday: [
                { subject: 'Organizational Behaviour', teacher: 'Dr. Afzal', room: '208' },
                { subject: 'Intellectual Property Rights', teacher: 'Dr. Javed Ashraf', type: 'Online' },
                { subject: 'Conventional & Renewable Energy', teacher: 'Dr. Junaid', room: '208' },
                { subject: 'STAA', teacher: 'Dr. Shamshad', room: '208' },
                { subject: 'Library', room: 'Library' },
                { isBreak: true },
                { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }
              ],
              Wednesday: [
                { subject: 'Self Study' },
                { subject: 'Organizational Behaviour', teacher: 'Dr. Afzal', room: '208' },
                { subject: 'Renewable Energy & D.G.', teacher: 'Dr. Junaid', room: '208' },
                { subject: 'STAA', teacher: 'Dr. Shamshad', room: '208' },
                { subject: 'Conventional & Renewable Energy', teacher: 'Dr. Junaid', type: 'Online' },
                { isBreak: true },
                { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }
              ],
              Thursday: [
                { subject: 'Self Study' },
                { subject: 'Organizational Behaviour', teacher: 'Dr. Afzal', type: 'Online' },
                { subject: 'Renewable Energy & D.G.', teacher: 'Dr. Junaid', type: 'Online' },
                { subject: 'Renewable Energy & Dist. Lab', teacher: 'Dr. Junaid', room: 'Lab' },
                { subject: 'Renewable Energy & Dist. Lab', teacher: 'Dr. Junaid', room: 'Lab' },
                { isBreak: true },
                { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }
              ],
              Friday: [
                { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' },
                { isBreak: true },
                { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }
              ]
            }
          }
        }
      },
      bvoc: {
        name: 'B.Voc (Renewable Energy)',
        semesters: {
          3: {
            room: 'B.Voc Room',
            schedule: {
              Monday: [
                { subject: 'Power Electronics', teacher: 'Mr. Kamil', room: '122' },
                { subject: 'Solar Photovol Tech', teacher: 'Dr. Tazeem', room: '118' },
                { subject: 'Thermo & FM', teacher: 'Dr. Faris', room: '218' },
                { subject: 'Energy Conver. Tech', teacher: 'Mr. Umar', room: '123' },
                { subject: 'Novel Energy Resources', teacher: 'Dr. Faraz', type: 'Online' },
                { isBreak: true },
                { subject: 'Power Electronics Lab', teacher: 'Mr. Kamil Hasan', room: 'Lab' },
                { subject: 'Power Electronics Lab', teacher: 'Mr. Kamil Hasan', room: 'Lab' },
                { subject: 'Self Study' },
                { subject: 'Self Study' }
              ],
              Tuesday: [
                { subject: 'Energy Conver. Tech', teacher: 'Mr. Umar', type: 'Online' },
                { subject: 'Thermo & FM', teacher: 'Dr. Faris', type: 'Online' },
                { subject: 'Solar Photovol Tech', teacher: 'Dr. Tazeem', room: '118' },
                { subject: 'Solar Photovol Tech', teacher: 'Dr. Tazeem', room: '118' },
                { subject: 'Power Electronics', teacher: 'Mr. Kamil', type: 'Online' },
                { isBreak: true },
                { subject: 'Sports', room: 'Ground' }, { subject: 'Sports', room: 'Ground' }, { subject: 'Sports', room: 'Ground' }, { subject: 'Sports', room: 'Ground' }
              ],
              Wednesday: [
                { subject: 'Novel Energy Resources', teacher: 'Dr. Faraz', room: '123' },
                { subject: 'Energy Conver. Tech', teacher: 'Mr. Umar', room: '123' },
                { subject: 'Novel Energy Resources', teacher: 'Dr. Faraz', room: '123' },
                { subject: 'Thermo & FM', teacher: 'Dr. Faris', room: '218' },
                { subject: 'Solar Photovol Tech', teacher: 'Dr. Tazeem', type: 'Online' },
                { isBreak: true },
                { subject: 'Seminar', teacher: 'Mr. Kamil Hasan', room: 'Seminar Hall' },
                { subject: 'Seminar', teacher: 'Mr. Kamil Hasan', room: 'Seminar Hall' },
                { subject: 'Library', room: 'Library' },
                { subject: 'Self Study' }
              ],
              Thursday: [
                { subject: 'Power Electronics', teacher: 'Mr. Kamil', room: '122' },
                { subject: 'Power Electronics', teacher: 'Mr. Kamil', room: '122' },
                { subject: 'Energy Conver. Tech', teacher: 'Mr. Umar', room: '123' },
                { subject: 'Novel Energy Resources', teacher: 'Dr. Faraz', room: '123' },
                { subject: 'Thermo & FM', teacher: 'Dr. Faris', room: '218' },
                { isBreak: true },
                { subject: 'Industrial Visit', room: 'Field' }, { subject: 'Industrial Visit', room: 'Field' }, { subject: 'Industrial Visit', room: 'Field' }, { subject: 'Industrial Visit', room: 'Field' }
              ],
              Friday: [
                { subject: 'Industrial Visit' }, { subject: 'Industrial Visit' }, { subject: 'Industrial Visit' }, { subject: 'Industrial Visit' }, { subject: 'Industrial Visit' },
                { isBreak: true },
                { subject: 'Industrial Visit' }, { subject: 'Industrial Visit' }, { subject: 'Industrial Visit' }, { subject: 'Industrial Visit' }
              ]
            }
          },
          5: {
            room: 'B.Voc Lab',
            schedule: {
              Monday: [
                { subject: 'Self Study' },
                { subject: 'Solar Thermal Tech', teacher: 'Ms. Shahina', room: '021' },
                { subject: 'Energy Mgmnt Auditing', teacher: 'Dr. Shamshad', room: '122' },
                { subject: 'Energy Storage Systems', teacher: 'Mr. Kamil', room: '122' },
                { subject: 'Energy Storage Systems', teacher: 'Mr. Kamil', type: 'Online' },
                { isBreak: true },
                { subject: 'Seminar', teacher: 'Dr. Faraz', room: 'Seminar' },
                { subject: 'Seminar', teacher: 'Dr. Faraz', room: 'Seminar' },
                { subject: 'Self Study' }, { subject: 'Self Study' }
              ],
              Tuesday: [
                { subject: 'Solar Thermal Tech', teacher: 'Ms. Shahina', type: 'Online' },
                { subject: 'Energy Mgmnt Auditing', teacher: 'Dr. Shamshad', type: 'Online' },
                { subject: 'Entrepreneurship', teacher: 'Dr. Khwaja Rafi', type: 'Online' },
                { subject: 'Energy Storage Systems', teacher: 'Mr. Kamil', room: '122' },
                { subject: 'Smart & Microgrid', teacher: 'Mr. Umar', type: 'Online' },
                { isBreak: true },
                { subject: 'Sports', room: 'Ground' }, { subject: 'Sports', room: 'Ground' }, { subject: 'Sports', room: 'Ground' }, { subject: 'Sports', room: 'Ground' }
              ],
              Wednesday: [
                { subject: 'Energy Mgmnt Auditing', teacher: 'Dr. Shamshad', room: '122' },
                { subject: 'Entrepreneurship', teacher: 'Dr. Khwaja Rafi', room: '022' },
                { subject: 'Entrepreneurship', teacher: 'Dr. Khwaja Rafi', room: '022' },
                { subject: 'Solar Thermal Tech', teacher: 'Ms. Shahina', room: '021' },
                { subject: 'Smart & Microgrid', teacher: 'Mr. Umar', room: '208' },
                { isBreak: true },
                { subject: 'Library', room: 'Library' },
                { subject: 'Self Study' },
                { subject: 'Self Study' },
                { subject: 'Self Study' }
              ],
              Thursday: [
                { subject: 'Smart & Microgrid', teacher: 'Mr. Umar', room: '208' },
                { subject: 'Smart & Microgrid', teacher: 'Mr. Umar', room: '208' },
                { subject: 'Energy Storage Systems', teacher: 'Mr. Kamil', room: '122' },
                { subject: 'Energy Mgmnt Auditing', teacher: 'Dr. Shamshad', room: '122' },
                { subject: 'Solar Thermal Tech', teacher: 'Ms. Shahina', room: '021' },
                { isBreak: true },
                { subject: 'Project', room: 'Lab' }, { subject: 'Project', room: 'Lab' }, { subject: 'Project', room: 'Lab' }, { subject: 'Project', room: 'Lab' }
              ],
              Friday: [
                { subject: 'Project', room: 'Lab' }, { subject: 'Project', room: 'Lab' }, { subject: 'Project', room: 'Lab' }, { subject: 'Project', room: 'Lab' }, { subject: 'Project', room: 'Lab' },
                { isBreak: true },
                { subject: 'Project', room: 'Lab' }, { subject: 'Project', room: 'Lab' }, { subject: 'Project', room: 'Lab' }, { subject: 'Project', room: 'Lab' }
              ]
            }
          }
        }
      }
    }
  },
  ece: {
    programs: {
      btech: {
        name: 'B.Tech (Electronics & Communication Engineering)',
        semesters: {
          3: {
            room: '122',
            schedule: {
              Monday: [
                { subject: 'Self Study' },
                { subject: 'Digital Electronics', teacher: 'Dr. Shaheen', type: 'Online' },
                { subject: 'Network Ana & Synthesis', teacher: 'Ms. Shahina', room: '214' },
                { subject: 'Signal & Systems', teacher: 'Dr. Naseem', type: 'Online' },
                { subject: 'Math & CT', teacher: 'Dr. Kaleem', room: '214' },
                { isBreak: true },
                { subject: 'Analog & Digital Comm Lab', teacher: 'Mr. Azeem Zaidi', room: 'Lab' },
                { subject: 'Analog & Digital Comm Lab', teacher: 'Mr. Azeem Zaidi', room: 'Lab' },
                { subject: 'Self Study' },
                { subject: 'Self Study' }
              ],
              Tuesday: [
                { subject: 'Digital Electronics', teacher: 'Dr. Shaheen', room: '214' },
                { subject: 'Analog & Digital Comm.', teacher: 'Mr. Adil', room: '122' },
                { subject: 'Signal & Systems', teacher: 'Dr. Naseem', room: '214' },
                { subject: 'Network Ana & Synthesis', teacher: 'Ms. Shahina', type: 'Online' },
                { subject: 'Math & CT', teacher: 'Dr. Kaleem', room: '214' },
                { isBreak: true },
                { subject: 'Digital Electronics', teacher: 'Dr. Shaheen', room: '214' },
                { subject: 'Electromagnetic Field Theory', teacher: 'Dr. Faraz', room: '214' },
                { subject: 'Digital Electronics Lab', teacher: 'Dr. Shaheen', room: 'Lab' },
                { subject: 'Digital Electronics Lab', teacher: 'Dr. Shaheen', room: 'Lab' }
              ],
              Wednesday: [
                { subject: 'Signal & Systems', teacher: 'Dr. Naseem', room: '214' },
                { subject: 'Electromagnetic Field Theory', teacher: 'Dr. Faraz', room: '214' },
                { subject: 'Analog & Digital Comm.', teacher: 'Mr. Adil', type: 'Online' },
                { subject: 'Digital Electronics', teacher: 'Dr. Shaheen', room: '214' },
                { subject: 'Math & CT', teacher: 'Dr. Kaleem', room: 'Online' },
                { isBreak: true },
                { subject: 'Network Ana & Synthesis', teacher: 'Ms. Shahina', room: '214' },
                { subject: 'Library', room: 'Library' },
                { subject: 'Network Analysis & Synth Lab', teacher: 'Ms. Shahina', room: 'Lab' },
                { subject: 'Network Analysis & Synth Lab', teacher: 'Ms. Shahina', room: 'Lab' }
              ],
              Thursday: [
                { subject: 'Network Ana & Synthesis', teacher: 'Ms. Shahina', room: '214' },
                { subject: 'Math & CT', teacher: 'Dr. Kaleem', room: '214' },
                { subject: 'Electromagnetic Field Theory', teacher: 'Dr. Faraz', type: 'Online' },
                { subject: 'Constitution of India', teacher: 'Dr. Khwaja M. Rafi', room: 'Seminar Hall' },
                { subject: 'Constitution of India', teacher: 'Dr. Khwaja M. Rafi', room: 'Seminar Hall' },
                { isBreak: true },
                { subject: 'Math & CT', teacher: 'Dr. Kaleem', room: '214' },
                { subject: 'Analog & Digital Comm.', teacher: 'Mr. Adil', room: '122' },
                { subject: 'Sports', room: 'Ground' },
                { subject: 'Sports', room: 'Ground' }
              ],
              Friday: [
                { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' },
                { isBreak: true },
                { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }
              ]
            }
          },
          5: {
            room: '123',
            schedule: {
              Monday: [
                { subject: 'Digital System Design', teacher: 'Dr. Shaheen', room: '207' },
                { subject: 'Analog Integ Circuit', teacher: 'Mr. Adil', room: '123' },
                { subject: 'Digital Signal Processing', teacher: 'Dr. Shaheen', type: 'Online' },
                { subject: 'Computer Networks', teacher: 'Dr. Aakib', type: 'Online' },
                { subject: 'Wireless & Satellite Comm', teacher: 'Dr. Naseem', room: '123' },
                { isBreak: true },
                { subject: 'Digital System Design', teacher: 'Dr. Shaheen', room: '207' },
                { subject: 'Self Study' },
                { subject: 'Computer Networks Lab', teacher: 'Dr. Aakib', room: 'Lab' },
                { subject: 'Computer Networks Lab', teacher: 'Dr. Aakib', room: 'Lab' }
              ],
              Tuesday: [
                { subject: 'Analog Integ Circuit', teacher: 'Mr. Adil', room: '123' },
                { subject: 'Wireless & Satellite Comm', teacher: 'Dr. Naseem', room: '123' },
                { subject: 'Digital System Design', teacher: 'Dr. Shaheen', type: 'Online' },
                { subject: 'HRM', teacher: 'Mr. Iqbal', room: '022' },
                { subject: 'Computer Networks', teacher: 'Dr. Aakib', room: '224' },
                { isBreak: true },
                { subject: 'Wireless & Satellite Comm Lab', teacher: 'Dr. Naseem', room: 'Lab' },
                { subject: 'Wireless & Satellite Comm Lab', teacher: 'Dr. Naseem', room: 'Lab' },
                { subject: 'Practical Training-I', teacher: 'Mr. Azeem Zaidi', room: 'Lab' },
                { subject: 'Practical Training-I', teacher: 'Mr. Azeem Zaidi', room: 'Lab' }
              ],
              Wednesday: [
                { subject: 'Digital Signal Processing', teacher: 'Dr. Shaheen', room: '207' },
                { subject: 'Digital System Design', teacher: 'Dr. Shaheen', room: '207' },
                { subject: 'HRM', teacher: 'Mr. Iqbal', type: 'Online' },
                { subject: 'Wireless & Satellite Comm', teacher: 'Dr. Naseem', type: 'Online' },
                { subject: 'Computer Networks', teacher: 'Dr. Aakib', room: '224' },
                { isBreak: true },
                { subject: 'Digital System Design Lab', teacher: 'Dr. Shaheen', room: 'Lab' },
                { subject: 'Digital System Design Lab', teacher: 'Dr. Shaheen', room: 'Lab' },
                { subject: 'Digital Signal Processing Lab', teacher: 'Dr. Shaheen', room: 'Lab' },
                { subject: 'Digital Signal Processing Lab', teacher: 'Dr. Shaheen', room: 'Lab' }
              ],
              Thursday: [
                { subject: 'HRM', teacher: 'Mr. Iqbal', room: '022' },
                { subject: 'Digital Signal Processing', teacher: 'Dr. Shaheen', room: '207' },
                { subject: 'Analog Integ Circuit', teacher: 'Mr. Adil', type: 'Online' },
                { subject: 'Library', room: 'Library' },
                { subject: 'Digital System Design', teacher: 'Dr. Shaheen', room: '207' },
                { isBreak: true },
                { subject: 'Sports', room: 'Ground' }, { subject: 'Sports', room: 'Ground' }, { subject: 'Sports', room: 'Ground' }, { subject: 'Sports', room: 'Ground' }
              ],
              Friday: [
                { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' },
                { isBreak: true },
                { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }
              ]
            }
          },
          7: {
            room: 'EC Lab',
            schedule: {
              Monday: [
                { subject: 'Intellectual Property Rights', teacher: 'Dr. Javed Ashraf', room: '208' },
                { subject: 'Intellectual Property Rights', teacher: 'Dr. Javed Ashraf', room: '208' },
                { subject: 'Conventional & Renewable Energy', teacher: 'Dr. Junaid', room: '208' },
                { subject: 'Micro. Emb. System', teacher: 'Mr. Azeem', type: 'Online' },
                { subject: 'Radar & Sonar', teacher: 'Mr. Azeem', room: '122' },
                { isBreak: true },
                { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }
              ],
              Tuesday: [
                { subject: 'Organizational Behaviour', teacher: 'Dr. Afzal', room: '208' },
                { subject: 'Intellectual Property Rights', teacher: 'Dr. Javed', type: 'Online' },
                { subject: 'Conventional & Renewable Energy', teacher: 'Dr. Junaid', room: '208' },
                { subject: 'Radar & Sonar', teacher: 'Mr. Azeem', type: 'Online' },
                { subject: 'Micro. Emb. System', teacher: 'Mr. Azeem', room: '122' },
                { isBreak: true },
                { subject: 'Microcontroller & Embedded Lab', teacher: 'Mr. Azeem Zaidi', room: 'Lab' },
                { subject: 'Microcontroller & Embedded Lab', teacher: 'Mr. Azeem Zaidi', room: 'Lab' },
                { subject: 'Sports', room: 'Ground' },
                { subject: 'Sports', room: 'Ground' }
              ],
              Wednesday: [
                { subject: 'Self Study' },
                { subject: 'Organizational Behaviour', teacher: 'Dr. Afzal', room: '208' },
                { subject: 'Micro. Emb. System', teacher: 'Mr. Azeem', room: '122' },
                { subject: 'Radar & Sonar', teacher: 'Mr. Azeem', room: '122' },
                { subject: 'Conventional & Renewable Energy', teacher: 'Dr. Junaid', type: 'Online' },
                { isBreak: true },
                { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }
              ],
              Thursday: [
                { subject: 'Self Study' },
                { subject: 'Organizational Behaviour', teacher: 'Dr. Afzal', type: 'Online' },
                { subject: 'Library', room: 'Library' },
                { subject: 'Practical Training-II', teacher: 'Mr. Adil Zaidi', room: 'Lab' },
                { subject: 'Practical Training-II', teacher: 'Mr. Adil Zaidi', room: 'Lab' },
                { isBreak: true },
                { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }
              ],
              Friday: [
                { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' },
                { isBreak: true },
                { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }
              ]
            }
          }
        }
      }
    }
  },
  mechanical: {
    programs: {
      btech: {
        name: 'B.Tech (Mechanical Engineering)',
        semesters: {
          3: {
            room: '021',
            schedule: {
              Monday: [
                { subject: 'Fluid Mechanics', teacher: 'Dr. Faris', room: '021' },
                { subject: 'Thermodynamics', teacher: 'Mr. Ayaz', type: 'Online' },
                { subject: 'Production Process', teacher: 'Mr. Iqbal', room: '021' },
                { subject: 'Mathematics-III', teacher: 'Dr. Dilshad', room: '021' },
                { subject: 'Strength of Material', teacher: 'Mr. Ayaz', room: '021' },
                { isBreak: true },
                { subject: 'Mathematics-III', teacher: 'Dr. Dilshad', room: '021' },
                { subject: 'Library', room: 'Library' },
                { subject: 'Honda Lab', room: 'Lab' },
                { subject: 'Honda Lab', room: 'Lab' }
              ],
              Tuesday: [
                { subject: 'Fluid Mechanics', teacher: 'Dr. Faris', type: 'Online' },
                { subject: 'Production Process', teacher: 'Mr. Iqbal', type: 'Online' },
                { subject: 'Mathematics-III', teacher: 'Dr. Dilshad', type: 'Online' },
                { subject: 'Fluid Mechanics Lab', teacher: 'Dr. Mohd. Faris', room: 'Lab' },
                { subject: 'Fluid Mechanics Lab', teacher: 'Dr. Mohd. Faris', room: 'Lab' },
                { isBreak: true },
                { subject: 'Industrial Automation', teacher: 'Mr. Nazim', room: '021' },
                { subject: 'Fluid Mechanics', teacher: 'Dr. Faris', room: '021' },
                { subject: 'Sports', room: 'Ground' },
                { subject: 'Sports', room: 'Ground' }
              ],
              Wednesday: [
                { subject: 'Industrial Automation', teacher: 'Mr. Nazim', room: '021' },
                { subject: 'Strength of Material', teacher: 'Mr. Ayaz', type: 'Online' },
                { subject: 'Thermodynamics', teacher: 'Mr. Ayaz', room: '021' },
                { subject: 'Strength of Materials Lab', teacher: 'Mr. Ayaz Mehmood', room: 'Lab' },
                { subject: 'Strength of Materials Lab', teacher: 'Mr. Ayaz Mehmood', room: 'Lab' },
                { isBreak: true },
                { subject: 'Mathematics-III', teacher: 'Dr. Dilshad', room: '021' },
                { subject: 'Production Process', teacher: 'Mr. Iqbal', room: '021' },
                { subject: 'Self Study' },
                { subject: 'Self Study' }
              ],
              Thursday: [
                { subject: 'Thermodynamics Lab', teacher: 'Mr. Ayaz Mehmood', room: 'Lab' },
                { subject: 'Thermodynamics Lab', teacher: 'Mr. Ayaz Mehmood', room: 'Lab' },
                { subject: 'Industrial Automation', teacher: 'Mr. Nazim', type: 'Online' },
                { subject: 'Constitution of India', teacher: 'Dr. Khwaja M. Rafi', room: 'Seminar Hall' },
                { subject: 'Constitution of India', teacher: 'Dr. Khwaja M. Rafi', room: 'Seminar Hall' },
                { isBreak: true },
                { subject: 'Thermodynamics', teacher: 'Mr. Ayaz', room: '021' },
                { subject: 'Strength of Material', teacher: 'Mr. Ayaz', room: '021' },
                { subject: 'Self Study' },
                { subject: 'Self Study' }
              ],
              Friday: [
                { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' },
                { isBreak: true },
                { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }
              ]
            }
          },
          5: {
            room: '022',
            schedule: {
              Monday: [
                { subject: 'ICEGT Lab', teacher: 'Dr. Wasim Akram', room: 'Lab' },
                { subject: 'ICEGT Lab', teacher: 'Dr. Wasim Akram', room: 'Lab' },
                { subject: 'ICEGT', teacher: 'Dr. Wasim', room: '022' },
                { subject: 'Design of Machine Ele-I', teacher: 'Dr. Adnan', type: 'Online' },
                { subject: 'Robotics Engg', teacher: 'Dr. Adnan', type: 'Online' },
                { isBreak: true },
                { subject: 'Library', room: 'Library' },
                { subject: 'Sports', room: 'Ground' },
                { subject: 'Sports', room: 'Ground' },
                { subject: 'Sports', room: 'Ground' }
              ],
              Tuesday: [
                { subject: 'Dynamics of Machine Lab', teacher: 'Mr. Nazim Ali Khan', room: 'Lab' },
                { subject: 'Dynamics of Machine Lab', teacher: 'Mr. Nazim Ali Khan', room: 'Lab' },
                { subject: 'Dynamics of Machine', teacher: 'Mr. Nazim', type: 'Online' },
                { subject: 'HRM', teacher: 'Mr. Iqbal', room: '022' },
                { subject: 'Robotics Engg', teacher: 'Dr. Adnan', room: '022' },
                { isBreak: true },
                { subject: 'Heat Transfer', teacher: 'Dr. Gaurav', room: '022' },
                { subject: 'Design of Machine Ele-I', teacher: 'Dr. Adnan', room: '022' },
                { subject: 'Sports', room: 'Ground' },
                { subject: 'Sports', room: 'Ground' }
              ],
              Wednesday: [
                { subject: 'Heat Transfer Lab', teacher: 'Dr. Gaurav', room: 'Lab' },
                { subject: 'Heat Transfer Lab', teacher: 'Dr. Gaurav', room: 'Lab' },
                { subject: 'HRM', teacher: 'Mr. Iqbal', type: 'Online' },
                { subject: 'Dynamics of Machine', teacher: 'Mr. Nazim', room: '022' },
                { subject: 'Heat Transfer', teacher: 'Dr. Gaurav', type: 'Online' },
                { isBreak: true },
                { subject: 'ICEGT', teacher: 'Dr. Wasim', room: '022' },
                { subject: 'Robotics Engg', teacher: 'Dr. Adnan', room: '022' },
                { subject: 'Practical Training-I', teacher: 'Mr. Nazim Ali Khan', room: 'Lab' },
                { subject: 'Practical Training-I', teacher: 'Mr. Nazim Ali Khan', room: 'Lab' }
              ],
              Thursday: [
                { subject: 'HRM', teacher: 'Mr. Iqbal', room: '022' },
                { subject: 'Dynamics of Machine', teacher: 'Mr. Nazim', room: '022' },
                { subject: 'Heat Transfer', teacher: 'Dr. Gaurav', room: '022' },
                { subject: 'Design of Machine Ele-I', teacher: 'Dr. Adnan', room: '022' },
                { subject: 'ICEGT', teacher: 'Dr. Wasim', type: 'Online' },
                { isBreak: true },
                { subject: 'Honda Lab', room: 'Lab' }, { subject: 'Honda Lab', room: 'Lab' },
                { subject: 'Self Study' },
                { subject: 'Self Study' }
              ],
              Friday: [
                { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' },
                { isBreak: true },
                { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }
              ]
            }
          },
          7: {
            room: '020',
            schedule: {
              Monday: [
                { subject: 'Self Study' },
                { subject: 'Self Study' },
                { subject: 'Conventional & Renewable Energy', teacher: 'Dr. Junaid', room: '208' },
                { subject: 'Library', room: 'Library' },
                { subject: 'Gas Dynamics & Turbo', teacher: 'Mr. Mohsin', type: 'Online' },
                { isBreak: true },
                { subject: 'Practical Training-II', teacher: 'Dr. Adnan', room: 'Lab' },
                { subject: 'Practical Training-II', teacher: 'Dr. Adnan', room: 'Lab' },
                { subject: 'Sports', room: 'Ground' },
                { subject: 'Sports', room: 'Ground' }
              ],
              Tuesday: [
                { subject: 'Organizational Behaviour', teacher: 'Dr. Afzal', room: '208' },
                { subject: 'Non-Conventional Energy', teacher: 'Dr. Wasim', room: '020' },
                { subject: 'Conventional & Renewable Energy', teacher: 'Dr. Junaid', room: '208' },
                { subject: 'Refrigration & Air Cond', teacher: 'Dr. Gaurav', room: '020' },
                { subject: 'Gas Dyna Turbo', teacher: 'Mr. Mohsin', room: '020' },
                { isBreak: true },
                { subject: 'Honda Lab', room: 'Lab' }, { subject: 'Honda Lab', room: 'Lab' },
                { subject: 'Project-II', room: 'Lab' },
                { subject: 'Project-II', room: 'Lab' }
              ],
              Wednesday: [
                { subject: 'Gas Dyna Turbo', teacher: 'Mr. Mohsin', room: '020' },
                { subject: 'Organizational Behaviour', teacher: 'Dr. Afzal', room: '208' },
                { subject: 'Refrigration & Air Cond', teacher: 'Dr. Gaurav', room: '020' },
                { subject: 'Non-Conventional Energy', teacher: 'Dr. Wasim', type: 'Online' },
                { subject: 'Conventional & Renewable Energy', teacher: 'Dr. Junaid', type: 'Online' },
                { isBreak: true },
                { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }
              ],
              Thursday: [
                { subject: 'Refrigration & Air Cond', teacher: 'Dr. Gaurav', type: 'Online' },
                { subject: 'Organizational Behaviour', teacher: 'Dr. Afzal', type: 'Online' },
                { subject: 'Non-Conventional Energy', teacher: 'Dr. Wasim', room: '020' },
                { subject: 'RAC Lab', teacher: 'Dr. Gaurav', room: 'Lab' },
                { subject: 'RAC Lab', teacher: 'Dr. Gaurav', room: 'Lab' },
                { isBreak: true },
                { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }
              ],
              Friday: [
                { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' },
                { isBreak: true },
                { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }, { subject: 'Project-II', room: 'Lab' }
              ]
            }
          }
        }
      }
    }
  },
  ash: {
    programs: {
      btech: {
        name: 'B.Tech (First Year)',
        semesters: {
          1: {
            room: '101',
            schedule: {
              Monday: [
                { subject: 'Communication Skills', teacher: 'Ms. Shariqua Razi', room: '101' },
                { subject: 'Mathematics-I', teacher: 'Dr. Kaleem', room: '101' },
                { subject: 'Physics', teacher: 'Dr. Shaheen', room: '101' },
                { subject: 'Programming in C', teacher: 'Mr. Naseem', room: '101' },
                { subject: 'Environmental Science', teacher: 'Dr. Junaid', type: 'Online' },
                { isBreak: true },
                { subject: 'Physics Lab', teacher: 'Dr. Shaheen', room: 'Lab' },
                { subject: 'Physics Lab', teacher: 'Dr. Shaheen', room: 'Lab' },
                { subject: 'Sports', room: 'Ground' },
                { subject: 'Sports', room: 'Ground' }
              ],
              Tuesday: [
                { subject: 'Programming in C', teacher: 'Mr. Naseem', room: '101' },
                { subject: 'Mathematics-I', teacher: 'Dr. Kaleem', room: '101' },
                { subject: 'Physics', teacher: 'Dr. Shaheen', room: '101' },
                { subject: 'Communication Skills', teacher: 'Ms. Shariqua Razi', room: '101' },
                { subject: 'Programming in C', teacher: 'Mr. Naseem', type: 'Online' },
                { isBreak: true },
                { subject: 'C Programming Lab', teacher: 'Mr. Naseem', room: 'Lab' },
                { subject: 'C Programming Lab', teacher: 'Mr. Naseem', room: 'Lab' },
                { subject: 'Library', room: 'Library' },
                { subject: 'Self Study' }
              ],
              Wednesday: [
                { subject: 'Mathematics-I', teacher: 'Dr. Kaleem', room: '101' },
                { subject: 'Physics', teacher: 'Dr. Shaheen', room: '101' },
                { subject: 'Communication Skills', teacher: 'Ms. Shariqua Razi', type: 'Online' },
                { subject: 'Programming in C', teacher: 'Mr. Naseem', room: '101' },
                { subject: 'Environmental Science', teacher: 'Dr. Junaid', room: '101' },
                { isBreak: true },
                { subject: 'Engineering Graphics Lab', teacher: 'Mr. Irshad', room: 'Lab' },
                { subject: 'Engineering Graphics Lab', teacher: 'Mr. Irshad', room: 'Lab' },
                { subject: 'Sports', room: 'Ground' },
                { subject: 'Sports', room: 'Ground' }
              ],
              Thursday: [
                { subject: 'Physics', teacher: 'Dr. Shaheen', room: '101' },
                { subject: 'Mathematics-I', teacher: 'Dr. Kaleem', room: '101' },
                { subject: 'Programming in C', teacher: 'Mr. Naseem', room: '101' },
                { subject: 'Communication Skills Lab', teacher: 'Ms. Shariqua Razi', room: 'Lab' },
                { subject: 'Communication Skills Lab', teacher: 'Ms. Shariqua Razi', room: 'Lab' },
                { isBreak: true },
                { subject: 'Environmental Science', teacher: 'Dr. Junaid', room: '101' },
                { subject: 'Self Study' },
                { subject: 'Library', room: 'Library' },
                { subject: 'Self Study' }
              ],
              Friday: [
                { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' },
                { isBreak: true },
                { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }, { subject: 'Self Study' }
              ]
            }
          }
        }
      }
    }
  }
};

