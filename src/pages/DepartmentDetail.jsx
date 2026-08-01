import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { departments as staticDepartments } from '../data/content'
import { useDepartment } from '../hooks/useSupabase'
import LoadingSpinner from '../components/LoadingSpinner'
import { FiArrowLeft, FiUser, FiBookOpen, FiCpu, FiLayers, FiAward, FiUsers, FiGrid, FiChevronRight, FiHelpCircle, FiChevronDown, FiDownload, FiEye, FiX, FiFileText, FiClock, FiMapPin } from 'react-icons/fi'
import { getAssetPath } from '../utils/assets'
import { timetablesData, periods } from '../data/timetables'


const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
    })
}

const deptThemes = {
    cse: {
        primary: '#0ea5e9',
        primaryLight: 'rgba(14, 165, 233, 0.18)',
        gradient: 'linear-gradient(135deg, #0c1929 0%, #0d2847 40%, #0f3460 100%)',
        accent: '#38bdf8',
        accentGlow: 'rgba(14, 165, 233, 0.3)',
        tagBg: 'rgba(14, 165, 233, 0.08)',
        tagBorder: 'rgba(14, 165, 233, 0.15)',
        label: 'Computer Science & Engineering'
    },
    civil: {
        primary: '#d97706',
        primaryLight: 'rgba(217, 119, 6, 0.18)',
        gradient: 'linear-gradient(135deg, #1a1207 0%, #2d1f0a 40%, #3d2a10 100%)',
        accent: '#fbbf24',
        accentGlow: 'rgba(217, 119, 6, 0.3)',
        tagBg: 'rgba(217, 119, 6, 0.08)',
        tagBorder: 'rgba(217, 119, 6, 0.15)',
        label: 'Civil Engineering'
    },
    mechanical: {
        primary: '#dc2626',
        primaryLight: 'rgba(220, 38, 38, 0.18)',
        gradient: 'linear-gradient(135deg, #1a0a0a 0%, #2d1010 40%, #3d1515 100%)',
        accent: '#f87171',
        accentGlow: 'rgba(220, 38, 38, 0.3)',
        tagBg: 'rgba(220, 38, 38, 0.08)',
        tagBorder: 'rgba(220, 38, 38, 0.15)',
        label: 'Mechanical Engineering'
    },
    eee: {
        primary: '#0891b2',
        primaryLight: 'rgba(8, 145, 178, 0.18)',
        gradient: 'linear-gradient(135deg, #0a1a1f 0%, #0d2630 40%, #103040 100%)',
        accent: '#22d3ee',
        accentGlow: 'rgba(8, 145, 178, 0.3)',
        tagBg: 'rgba(8, 145, 178, 0.08)',
        tagBorder: 'rgba(8, 145, 178, 0.15)',
        label: 'Electrical & Electronics Engineering'
    },
    ece: {
        primary: '#7c3aed',
        primaryLight: 'rgba(124, 58, 237, 0.18)',
        gradient: 'linear-gradient(135deg, #120a29 0%, #1a1040 40%, #251555 100%)',
        accent: '#a78bfa',
        accentGlow: 'rgba(124, 58, 237, 0.3)',
        tagBg: 'rgba(124, 58, 237, 0.08)',
        tagBorder: 'rgba(124, 58, 237, 0.15)',
        label: 'Electronics & Communication Engineering'
    },
    ash: {
        primary: '#059669',
        primaryLight: 'rgba(5, 150, 105, 0.18)',
        gradient: 'linear-gradient(135deg, #071a14 0%, #0d2a1f 40%, #103828 100%)',
        accent: '#34d399',
        accentGlow: 'rgba(5, 150, 105, 0.3)',
        tagBg: 'rgba(5, 150, 105, 0.08)',
        tagBorder: 'rgba(5, 150, 105, 0.15)',
        label: 'Applied Sciences & Humanities'
    }
}

// --- SYLLABUS DATA ---

const physicsGroupSem1 = [
    { name: "Communication Skills in English", code: "HSE-101", type: "Theory", credits: 2 },
    { name: "Mathematics-I", code: "BSM-101", type: "Theory", credits: 4 },
    { name: "Physics", code: "BSP-101", type: "Theory", credits: 4 },
    { name: "Programming for Problem Solving using C", code: "CSE-101", type: "Theory", credits: 3 },
    { name: "Basics of Environmental Science", code: "ENV-101", type: "Theory", credits: 2 },
    { name: "Communication Skills in English (P)", code: "HSE-101P", type: "Practical", credits: 1 },
    { name: "Physics (P)", code: "BSP-101P", type: "Practical", credits: 1 },
    { name: "Programming for Problem Solving using C (P)", code: "CSE-101P", type: "Practical", credits: 1 },
    { name: "Engineering Graphics (Web Design)", code: "CSE-103P", type: "Practical", credits: 2 },
    { name: "Sports (Audit Course) Compulsory", code: "AUS-101", type: "Audit", credits: 0 }
];

const eeeGroupSem1 = [
    { name: "Communication Skills in English", code: "HSE-101", type: "Theory", credits: 2 },
    { name: "Mathematics-I", code: "BSM-101", type: "Theory", credits: 4 },
    { name: "Basics of Electrical & Electronics Eng", code: "EEE-101", type: "Theory", credits: 3 },
    { name: "Programming for Problem Solving using C", code: "CSE-101", type: "Theory", credits: 3 },
    { name: "Basics of Environmental Science", code: "ENV-101", type: "Theory", credits: 2 },
    { name: "Communication Skills in English (P)", code: "HSE-101P", type: "Practical", credits: 1 },
    { name: "Basics of Electrical & Electronics Eng (P)", code: "EEE-101P", type: "Practical", credits: 1 },
    { name: "Programming for Problem Solving using C (P)", code: "CSE-101P", type: "Practical", credits: 1 },
    { name: "Workshop Practices (P)", code: "MEE-102P", type: "Practical", credits: 2.5 },
    { name: "Sports (Audit Course) Compulsory", code: "AUS-101", type: "Audit", credits: 0 }
];

const eeeGroupSem2 = [
    { name: "Mathematics-II", code: "BSM-102", type: "Theory", credits: 4 },
    { name: "Human Value & Soft Skills", code: "HSV-102", type: "Theory", credits: 3 },
    { name: "Basics of Electrical & Electronics Eng", code: "EEE-101", type: "Theory", credits: 3 },
    { name: "Data Structure Using C", code: "CSE-102", type: "Theory", credits: 3 },
    { name: "Object Oriented Concepts & Python Prog", code: "CSE-104", type: "Theory", credits: 3 },
    { name: "Basics of Electrical & Electronics Eng (P)", code: "EEE-101P", type: "Practical", credits: 1 },
    { name: "Data Structure Using C (P)", code: "CSE-102P", type: "Practical", credits: 1 },
    { name: "Object Oriented Concepts & Python Prog (P)", code: "CSE-104P", type: "Practical", credits: 1 },
    { name: "Workshop Practices (P)", code: "MEE-102P", type: "Practical", credits: 2.5 }
];

const physicsGroupSem2 = [
    { name: "Mathematics-II", code: "BSM-102", type: "Theory", credits: 4 },
    { name: "Human Value & Soft Skills", code: "HSV-102", type: "Theory", credits: 3 },
    { name: "Physics", code: "BSP-101", type: "Theory", credits: 4 },
    { name: "Data Structure Using C", code: "CSE-102", type: "Theory", credits: 3 },
    { name: "Object Oriented Concepts & Python Prog", code: "CSE-104", type: "Theory", credits: 3 },
    { name: "Physics (P)", code: "BSP-101P", type: "Practical", credits: 1 },
    { name: "Data Structure Using C (P)", code: "CSE-102P", type: "Practical", credits: 1 },
    { name: "Object Oriented Concepts & Python Prog (P)", code: "CSE-104P", type: "Practical", credits: 1 },
    { name: "Engineering Graphics (Web Designing)", code: "CSE-103P", type: "Practical", credits: 2 }
];

const semesterSyllabusData = {
    ash: {
        1: {
            title: "1st Semester Syllabus",
            term: "B.Tech First Year - Autumn Term",
            subjects: physicsGroupSem1
        },
        2: {
            title: "2nd Semester Syllabus",
            term: "B.Tech First Year - Spring Term",
            subjects: eeeGroupSem2
        }
    },
    cse: {
        1: {
            title: "1st Semester Syllabus",
            term: "B.Tech CSE - 1st Semester",
            subjects: physicsGroupSem1
        },
        2: {
            title: "2nd Semester Syllabus",
            term: "B.Tech CSE - 2nd Semester",
            subjects: eeeGroupSem2
        },
        3: {
            title: "3rd Semester Syllabus",
            term: "B.Tech CSE - 3rd Semester",
            subjects: [
                { name: "Data Structures & Algorithms", code: "CSE-201T", type: "Theory", credits: 4 },
                { name: "Discrete Mathematics", code: "MTH-201T", type: "Theory", credits: 4 },
                { name: "Object Oriented Programming", code: "CSE-203T", type: "Theory", credits: 3 },
                { name: "Digital Electronics", code: "ECE-205T", type: "Theory", credits: 3 },
                { name: "Data Structures Lab", code: "CSE-201P", type: "Practical", credits: 1.5 },
                { name: "C++ Programming Lab", code: "CSE-203P", type: "Practical", credits: 1.5 }
            ]
        },
        4: {
            title: "4th Semester Syllabus",
            term: "B.Tech CSE - 4th Semester",
            subjects: [
                { name: "Operating Systems", code: "CSE-202T", type: "Theory", credits: 4 },
                { name: "Computer Organization & Architecture", code: "CSE-204T", type: "Theory", credits: 3 },
                { name: "Database Management Systems", code: "CSE-206T", type: "Theory", credits: 4 },
                { name: "Software Engineering", code: "CSE-208T", type: "Theory", credits: 3 },
                { name: "Operating Systems Lab", code: "CSE-202P", type: "Practical", credits: 1.5 },
                { name: "DBMS Laboratory", code: "CSE-206P", type: "Practical", credits: 1.5 }
            ]
        },
        5: {
            title: "5th Semester Syllabus",
            term: "B.Tech CSE - 5th Semester",
            subjects: [
                { name: "Computer Networks", code: "CSE-301T", type: "Theory", credits: 4 },
                { name: "Design and Analysis of Algorithms", code: "CSE-303T", type: "Theory", credits: 4 },
                { name: "Java Programming", code: "CSE-305T", type: "Theory", credits: 3 },
                { name: "Formal Languages & Automata Theory", code: "CSE-307T", type: "Theory", credits: 3 },
                { name: "Computer Networks Lab", code: "CSE-301P", type: "Practical", credits: 1.5 },
                { name: "Java Laboratory", code: "CSE-305P", type: "Practical", credits: 1.5 }
            ]
        },
        6: {
            title: "6th Semester Syllabus",
            term: "B.Tech CSE - 6th Semester",
            subjects: [
                { name: "Python Programming", code: "CSE-302T", type: "Theory", credits: 3 },
                { name: "Web Technologies", code: "CSE-304T", type: "Theory", credits: 3 },
                { name: "Microprocessors & Microcontrollers", code: "ECE-306T", type: "Theory", credits: 3 },
                { name: "Compiler Design", code: "CSE-308T", type: "Theory", credits: 4 },
                { name: "Python Programming Lab", code: "CSE-302P", type: "Practical", credits: 1.5 },
                { name: "Web Technologies Lab", code: "CSE-304P", type: "Practical", credits: 1.5 }
            ]
        },
        7: {
            title: "7th Semester Syllabus",
            term: "B.Tech CSE - 7th Semester",
            subjects: [
                { name: "Machine Learning", code: "CSE-401T", type: "Theory", credits: 4 },
                { name: "Internet of Things", code: "CSE-403T", type: "Theory", credits: 3 },
                { name: "Neural Networks", code: "CSE-405T", type: "Theory", credits: 3 },
                { name: "Cloud Computing", code: "CSE-407T", type: "Theory", credits: 3 },
                { name: "Machine Learning Lab", code: "CSE-401P", type: "Practical", credits: 1.5 },
                { name: "IoT & Embedded Lab", code: "CSE-403P", type: "Practical", credits: 1.5 }
            ]
        },
        8: {
            title: "8th Semester Syllabus",
            term: "B.Tech CSE - 8th Semester",
            subjects: [
                { name: "Big Data Analytics", code: "CSE-402T", type: "Theory", credits: 4 },
                { name: "R-Programming", code: "CSE-404T", type: "Theory", credits: 3 },
                { name: "Distributed Systems", code: "CSE-406T", type: "Theory", credits: 3 },
                { name: "Major Project & Seminar", code: "CSE-408P", type: "Practical", credits: 8 }
            ]
        }
    },
    civil: {
        1: {
            title: "1st Semester Syllabus",
            term: "B.Tech CE - 1st Semester",
            subjects: eeeGroupSem1
        },
        2: {
            title: "2nd Semester Syllabus",
            term: "B.Tech CE - 2nd Semester",
            subjects: physicsGroupSem2
        },
        3: {
            title: "3rd Semester Syllabus",
            term: "B.Tech CE - 3rd Semester",
            subjects: [
                { name: "Fluid Mechanics", code: "CE-201T", type: "Theory", credits: 4 },
                { name: "Surveying", code: "CE-203T", type: "Theory", credits: 3 },
                { name: "Building Materials & Construction", code: "CE-205T", type: "Theory", credits: 3 },
                { name: "Engineering Geology", code: "CE-207T", type: "Theory", credits: 3 }
            ]
        },
        4: {
            title: "4th Semester Syllabus",
            term: "B.Tech CE - 4th Semester",
            subjects: [
                { name: "Structural Analysis-I", code: "CE-202T", type: "Theory", credits: 4 },
                { name: "Soil Mechanics", code: "CE-204T", type: "Theory", credits: 4 },
                { name: "Concrete Technology", code: "CE-206T", type: "Theory", credits: 3 },
                { name: "Fluid Mechanics-II", code: "CE-208T", type: "Theory", credits: 3 }
            ]
        },
        5: {
            title: "5th Semester Syllabus",
            term: "B.Tech CE - 5th Semester",
            subjects: [
                { name: "RCC Design-I", code: "CE-301T", type: "Theory", credits: 4 },
                { name: "Transportation Engineering-I", code: "CE-303T", type: "Theory", credits: 3 },
                { name: "Structural Analysis-II", code: "CE-305T", type: "Theory", credits: 3 },
                { name: "Hydrology & Water Resources", code: "CE-307T", type: "Theory", credits: 3 }
            ]
        },
        6: {
            title: "6th Semester Syllabus",
            term: "B.Tech CE - 6th Semester",
            subjects: [
                { name: "Design of Steel Structures-I", code: "CE-302T", type: "Theory", credits: 4 },
                { name: "Environmental Engineering-I", code: "CE-304T", type: "Theory", credits: 3 },
                { name: "Foundation Engineering", code: "CE-306T", type: "Theory", credits: 3 },
                { name: "Irrigation Engineering", code: "CE-308T", type: "Theory", credits: 3 }
            ]
        },
        7: {
            title: "7th Semester Syllabus",
            term: "B.Tech CE - 7th Semester",
            subjects: [
                { name: "RCC Design-II", code: "CE-401T", type: "Theory", credits: 4 },
                { name: "Transportation Engineering-II", code: "CE-403T", type: "Theory", credits: 3 },
                { name: "Construction Management", code: "CE-405T", type: "Theory", credits: 3 },
                { name: "Environmental Engineering-II", code: "CE-407T", type: "Theory", credits: 3 }
            ]
        },
        8: {
            title: "8th Semester Syllabus",
            term: "B.Tech CE - 8th Semester",
            subjects: [
                { name: "Design of Steel Structures-II", code: "CE-402T", type: "Theory", credits: 4 },
                { name: "Estimation and Costing", code: "CE-404T", type: "Theory", credits: 3 },
                { name: "Earthquake Resistant Design", code: "CE-406T", type: "Theory", credits: 3 },
                { name: "Major Project & Seminar", code: "CE-408P", type: "Practical", credits: 8 }
            ]
        }
    },
    mechanical: {
        1: {
            title: "1st Semester Syllabus",
            term: "B.Tech ME - 1st Semester",
            subjects: eeeGroupSem1
        },
        2: {
            title: "2nd Semester Syllabus",
            term: "B.Tech ME - 2nd Semester",
            subjects: physicsGroupSem2
        },
        3: {
            title: "3rd Semester Syllabus",
            term: "B.Tech ME - 3rd Semester",
            subjects: [
                { name: "Thermodynamics", code: "ME-201T", type: "Theory", credits: 4 },
                { name: "Material Science", code: "ME-203T", type: "Theory", credits: 3 },
                { name: "Strength of Materials", code: "ME-205T", type: "Theory", credits: 3 },
                { name: "Machine Drawing", code: "ME-207P", type: "Practical", credits: 3 }
            ]
        },
        4: {
            title: "4th Semester Syllabus",
            term: "B.Tech ME - 4th Semester",
            subjects: [
                { name: "Fluid Mechanics", code: "ME-202T", type: "Theory", credits: 4 },
                { name: "Kinematics of Machines", code: "ME-204T", type: "Theory", credits: 3 },
                { name: "Manufacturing Processes-I", code: "ME-206T", type: "Theory", credits: 3 },
                { name: "Applied Thermodynamics", code: "ME-208T", type: "Theory", credits: 3 }
            ]
        },
        5: {
            title: "5th Semester Syllabus",
            term: "B.Tech ME - 5th Semester",
            subjects: [
                { name: "Heat Transfer", code: "ME-301T", type: "Theory", credits: 4 },
                { name: "Dynamics of Machines", code: "ME-303T", type: "Theory", credits: 3 },
                { name: "Machine Design-I", code: "ME-305T", type: "Theory", credits: 3 },
                { name: "Manufacturing Processes-II", code: "ME-307T", type: "Theory", credits: 3 }
            ]
        },
        6: {
            title: "6th Semester Syllabus",
            term: "B.Tech ME - 6th Semester",
            subjects: [
                { name: "Fluid Machinery", code: "ME-302T", type: "Theory", credits: 4 },
                { name: "Refrigeration & Air Conditioning", code: "ME-304T", type: "Theory", credits: 3 },
                { name: "Machine Design-II", code: "ME-306T", type: "Theory", credits: 3 },
                { name: "Industrial Engineering", code: "ME-308T", type: "Theory", credits: 3 }
            ]
        },
        7: {
            title: "7th Semester Syllabus",
            term: "B.Tech ME - 7th Semester",
            subjects: [
                { name: "CAD/CAM", code: "ME-401T", type: "Theory", credits: 4 },
                { name: "Automobile Engineering", code: "ME-403T", type: "Theory", credits: 3 },
                { name: "Power Plant Engineering", code: "ME-405T", type: "Theory", credits: 3 },
                { name: "Mechanical Vibrations", code: "ME-407T", type: "Theory", credits: 3 }
            ]
        },
        8: {
            title: "8th Semester Syllabus",
            term: "B.Tech ME - 8th Semester",
            subjects: [
                { name: "Operations Research", code: "ME-402T", type: "Theory", credits: 4 },
                { name: "Mechatronics & Robotics", code: "ME-404T", type: "Theory", credits: 3 },
                { name: "Non-Conventional Energy Sources", code: "ME-406T", type: "Theory", credits: 3 },
                { name: "Major Project & Seminar", code: "ME-408P", type: "Practical", credits: 8 }
            ]
        }
    },
    eee: {
        1: {
            title: "1st Semester Syllabus",
            term: "B.Tech EEE - 1st Semester",
            subjects: eeeGroupSem1
        },
        2: {
            title: "2nd Semester Syllabus",
            term: "B.Tech EEE - 2nd Semester",
            subjects: physicsGroupSem2
        },
        3: {
            title: "3rd Semester Syllabus",
            term: "B.Tech EEE - 3rd Semester",
            subjects: [
                { name: "Network Theory", code: "EE-201T", type: "Theory", credits: 4 },
                { name: "Electrical Machines-I", code: "EE-203T", type: "Theory", credits: 3 },
                { name: "Analog Electronics", code: "ECE-205T", type: "Theory", credits: 3 },
                { name: "Electrical Measurements", code: "EE-207T", type: "Theory", credits: 3 }
            ]
        },
        4: {
            title: "4th Semester Syllabus",
            term: "B.Tech EEE - 4th Semester",
            subjects: [
                { name: "Control Theory", code: "EE-202T", type: "Theory", credits: 4 },
                { name: "Electrical Machines-II", code: "EE-204T", type: "Theory", credits: 4 },
                { name: "Digital Electronics", code: "ECE-206T", type: "Theory", credits: 3 },
                { name: "Signals & Systems", code: "EE-208T", type: "Theory", credits: 3 }
            ]
        },
        5: {
            title: "5th Semester Syllabus",
            term: "B.Tech EEE - 5th Semester",
            subjects: [
                { name: "Power Systems-I", code: "EE-301T", type: "Theory", credits: 4 },
                { name: "Power Electronics", code: "EE-303T", type: "Theory", credits: 4 },
                { name: "Microprocessors", code: "ECE-305T", type: "Theory", credits: 3 },
                { name: "Electrical Machine Design", code: "EE-307T", type: "Theory", credits: 3 }
            ]
        },
        6: {
            title: "6th Semester Syllabus",
            term: "B.Tech EEE - 6th Semester",
            subjects: [
                { name: "Power Systems-II", code: "EE-302T", type: "Theory", credits: 4 },
                { name: "Control Systems-II", code: "EE-304T", type: "Theory", credits: 3 },
                { name: "SCADA & PLCs", code: "EE-306T", type: "Theory", credits: 3 },
                { name: "Instrumentation", code: "EE-308T", type: "Theory", credits: 3 }
            ]
        },
        7: {
            title: "7th Semester Syllabus",
            term: "B.Tech EEE - 7th Semester",
            subjects: [
                { name: "Switchgear & Protection", code: "EE-401T", type: "Theory", credits: 4 },
                { name: "Electric Drives", code: "EE-403T", type: "Theory", credits: 3 },
                { name: "High Voltage Engineering", code: "EE-405T", type: "Theory", credits: 3 },
                { name: "Power System Operation", code: "EE-407T", type: "Theory", credits: 3 }
            ]
        },
        8: {
            title: "8th Semester Syllabus",
            term: "B.Tech EEE - 8th Semester",
            subjects: [
                { name: "Utilization of Electrical Energy", code: "EE-402T", type: "Theory", credits: 4 },
                { name: "Smart Grid Technologies", code: "EE-404T", type: "Theory", credits: 3 },
                { name: "Advanced Control Systems", code: "EE-406T", type: "Theory", credits: 3 },
                { name: "Major Project & Seminar", code: "EE-408P", type: "Practical", credits: 8 }
            ]
        }
    },
    ece: {
        1: {
            title: "1st Semester Syllabus",
            term: "B.Tech ECE - 1st Semester",
            subjects: physicsGroupSem1
        },
        2: {
            title: "2nd Semester Syllabus",
            term: "B.Tech ECE - 2nd Semester",
            subjects: eeeGroupSem2
        },
        3: {
            title: "3rd Semester Syllabus",
            term: "B.Tech ECE - 3rd Semester",
            subjects: [
                { name: "Network Analysis & Synthesis", code: "ECE-201T", type: "Theory", credits: 4 },
                { name: "Electronic Devices & Circuits", code: "ECE-203T", type: "Theory", credits: 3 },
                { name: "Digital Electronics", code: "ECE-205T", type: "Theory", credits: 3 },
                { name: "Signals & Systems", code: "ECE-207T", type: "Theory", credits: 3 }
            ]
        },
        4: {
            title: "4th Semester Syllabus",
            term: "B.Tech ECE - 4th Semester",
            subjects: [
                { name: "Analog Electronics", code: "ECE-202T", type: "Theory", credits: 4 },
                { name: "Analog & Digital Communication", code: "ECE-204T", type: "Theory", credits: 4 },
                { name: "Microprocessors & Microcontrollers", code: "ECE-206T", type: "Theory", credits: 3 },
                { name: "Electromagnetic Field Theory", code: "ECE-208T", type: "Theory", credits: 3 }
            ]
        },
        5: {
            title: "5th Semester Syllabus",
            term: "B.Tech ECE - 5th Semester",
            subjects: [
                { name: "Digital Signal Processing", code: "ECE-301T", type: "Theory", credits: 4 },
                { name: "Antennas & Wave Propagation", code: "ECE-303T", type: "Theory", credits: 3 },
                { name: "Control Systems", code: "EE-305T", type: "Theory", credits: 3 },
                { name: "Linear Integrated Circuits", code: "ECE-307T", type: "Theory", credits: 3 }
            ]
        },
        6: {
            title: "6th Semester Syllabus",
            term: "B.Tech ECE - 6th Semester",
            subjects: [
                { name: "VLSI Design", code: "ECE-302T", type: "Theory", credits: 4 },
                { name: "Microwave & Radar Engineering", code: "ECE-304T", type: "Theory", credits: 3 },
                { name: "Embedded Systems", code: "ECE-306T", type: "Theory", credits: 3 },
                { name: "Information Theory & Coding", code: "ECE-308T", type: "Theory", credits: 3 }
            ]
        },
        7: {
            title: "7th Semester Syllabus",
            term: "B.Tech ECE - 7th Semester",
            subjects: [
                { name: "Wireless & Mobile Communication", code: "ECE-401T", type: "Theory", credits: 4 },
                { name: "Optical Communication", code: "ECE-403T", type: "Theory", credits: 3 },
                { name: "Satellite Communication", code: "ECE-405T", type: "Theory", credits: 3 },
                { name: "Computer Networks", code: "CSE-407T", type: "Theory", credits: 3 }
            ]
        },
        8: {
            title: "8th Semester Syllabus",
            term: "B.Tech ECE - 8th Semester",
            subjects: [
                { name: "IoT & Embedded Systems", code: "ECE-402T", type: "Theory", credits: 4 },
                { name: "Ad-hoc Wireless Networks", code: "ECE-404T", type: "Theory", credits: 3 },
                { name: "Neural Networks & Fuzzy Logic", code: "ECE-406T", type: "Theory", credits: 3 },
                { name: "Major Project & Seminar", code: "ECE-408P", type: "Practical", credits: 8 }
            ]
        }
    }
}

// ─── Faculty Card with expandable details ─────────────────────────────────────
function FacultyCard({ faculty: f, index, theme, getAssetPath }) {
    const [expanded, setExpanded] = useState(false)
    const hasDetails = f.bio || (f.education && f.education.length > 0) || (f.interests && f.interests.length > 0)

    return (
        <motion.div
            className="dept-hod-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            style={{ marginBottom: '20px', padding: '25px', display: 'flex', flexDirection: 'column' }}
        >
            <div className="dept-hod-card-glow" style={{ background: `radial-gradient(circle at 0% 0%, ${theme.primaryLight}, transparent 60%)` }} />
            
            <div className="dept-hod-content" style={{ alignItems: 'flex-start' }}>
                {/* Avatar */}
                <div className="dept-hod-avatar" style={{ background: theme.gradient, width: '90px', height: '90px', borderRadius: '16px' }}>
                    {f.image ? (
                        <img 
                            src={getAssetPath(f.image)} 
                            alt={f.name} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} 
                            onError={e => { e.target.style.display = 'none' }}
                        />
                    ) : (
                        <span style={{ fontSize: '2.5rem', color: 'rgba(255,255,255,0.8)' }}>👤</span>
                    )}
                </div>

                {/* Info */}
                <div className="dept-hod-info" style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '2px' }}>{f.name}</h3>
                    <p className="dept-hod-designation" style={{ marginBottom: '12px' }}>{f.designation}</p>

                    <div className="dept-hod-meta" style={{ flexWrap: 'wrap', gap: '12px 20px' }}>
                        {[
                            f.experience && { label: 'Experience', value: f.experience },
                            f.phone && { label: 'Phone', value: <a href={`tel:${f.phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>{f.phone}</a> },
                            f.email && { label: 'Email', value: <a href={`mailto:${f.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{f.email}</a> },
                            f.papers != null && { label: 'Papers', value: f.papers }
                        ].filter(Boolean).map((item, i, arr) => (
                            <div key={item.label} style={{ display: 'contents' }}>
                                <div className="dept-hod-meta-item">
                                    <span className="dept-hod-meta-label">{item.label}</span>
                                    <span className="dept-hod-meta-value">{item.value}</span>
                                </div>
                                {i < arr.length - 1 && <div className="dept-hod-meta-divider" />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Expandable Details */}
            {hasDetails && (
                <div style={{ marginTop: '20px', position: 'relative', zIndex: 2 }}>
                    <button
                        onClick={() => setExpanded(p => !p)}
                        style={{
                            width: '100%',
                            background: expanded ? theme.primaryLight : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${expanded ? theme.tagBorder : 'rgba(0,0,0,0.05)'}`,
                            borderRadius: '10px',
                            color: expanded ? theme.primary : 'var(--medium-gray)',
                            padding: '10px 16px',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
                            transition: 'all 0.2s',
                        }}
                    >
                        <span>{expanded ? 'Hide Details' : 'View Details'}</span>
                        <span style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s' }}>▼</span>
                    </button>

                    <div style={{
                        maxHeight: expanded ? '800px' : '0px',
                        overflow: 'hidden',
                        transition: 'max-height 0.35s ease',
                        opacity: expanded ? 1 : 0,
                    }}>
                        <div style={{ padding: '16px 4px 4px', color: 'var(--near-black)' }}>
                            {f.bio && (
                                <p style={{ margin: '0 0 16px', fontSize: '0.9rem', color: 'var(--medium-gray)', lineHeight: 1.6 }}>
                                    {f.bio}
                                </p>
                            )}
                            
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                                {f.education && f.education.length > 0 && (
                                    <div style={{ flex: '1 1 300px' }}>
                                        <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 700, color: theme.primary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Education</p>
                                        <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.85rem', color: 'var(--near-black)', lineHeight: 1.5 }}>
                                            {Array.isArray(f.education) ? f.education.map((e, i) => <li key={i} style={{ marginBottom: '4px' }}>{e}</li>) : <li style={{ marginBottom: '4px' }}>{f.education}</li>}
                                        </ul>
                                    </div>
                                )}
                                
                                {f.interests && f.interests.length > 0 && (
                                    <div style={{ flex: '1 1 300px' }}>
                                        <p style={{ margin: '0 0 8px', fontSize: '0.75rem', fontWeight: 700, color: theme.primary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Areas of Interest</p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                            {(Array.isArray(f.interests) ? f.interests : [f.interests]).map((interest, i) => (
                                                <span key={i} style={{
                                                    background: theme.primaryLight,
                                                    border: `1px solid ${theme.tagBorder}`,
                                                    borderRadius: '20px',
                                                    padding: '4px 12px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 600,
                                                    color: theme.primary,
                                                }}>{interest}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    )
}

export default function DepartmentDetail() {
    const { id } = useParams()
    const { data: sbDept, loading } = useDepartment(id)
    const staticDept = staticDepartments.find(d => d.id === id)
    const [openFaq, setOpenFaq] = useState(null)
    const [syllabusGridOpen, setSyllabusGridOpen] = useState(false)
    const [timetableOpen, setTimetableOpen] = useState(false)
    const [selectedProgram, setSelectedProgram] = useState('')
    const [selectedSem, setSelectedSem] = useState('')
    const [timetableTab, setTimetableTab] = useState('grid')
    const [activeDay, setActiveDay] = useState('Monday')

    useEffect(() => {
        const deptTimetable = timetablesData[id]
        if (deptTimetable) {
            const programs = Object.keys(deptTimetable.programs)
            if (programs.length > 0) {
                setSelectedProgram(programs[0])
                const semesters = Object.keys(deptTimetable.programs[programs[0]].semesters)
                if (semesters.length > 0) {
                    setSelectedSem(semesters[0])
                }
            }
        }
    }, [id])


    const getSyllabusPdfPath = (deptId, semNum) => {
        if (semNum === 1) {
            if (deptId === 'civil') return getAssetPath('/civil_sem1.pdf')
            if (deptId === 'eee') return getAssetPath('/eee_sem1.pdf')
            if (deptId === 'ece') return getAssetPath('/ece_sem1.pdf')
            return getAssetPath('/btech_sem1.pdf')
        }
        if (semNum === 2) {
            if (deptId === 'civil') return getAssetPath('/civil_sem2.pdf')
            if (deptId === 'eee') return getAssetPath('/eee_sem2.pdf')
            if (deptId === 'ece') return getAssetPath('/ece_sem2.pdf')
            return getAssetPath('/btech_sem2.pdf')
        }
        return getAssetPath(`/syllabus_${deptId}_sem${semNum}.pdf`)
    }

    // Normalize Supabase flat fields into nested shape used by UI
    const normalizeDept = (raw) => {
        if (!raw) return null
        return {
            ...raw,
            hod: raw.hod || {
                name: raw.hod_name,
                designation: raw.hod_designation,
                experience: raw.hod_experience,
                education: raw.hod_education,
                image: raw.hod_image || '👨‍💼'
            },
            highlights: raw.highlights || [],
            subjects: raw.subjects || [],
            faculty: raw.faculty || [],
            labs: raw.labs || [],
        }
    }

    const dept = staticDept || normalizeDept(sbDept) // Use static data as primary source
    const theme = deptThemes[id] || deptThemes.cse

    const deptTimetable = timetablesData[id]
    const programKeys = deptTimetable ? Object.keys(deptTimetable.programs) : []
    const semKeys = (deptTimetable && selectedProgram) ? Object.keys(deptTimetable.programs[selectedProgram]?.semesters || {}) : []
    const currentSchedule = (deptTimetable && selectedProgram && selectedSem) 
        ? deptTimetable.programs[selectedProgram].semesters[selectedSem]?.schedule || {} 
        : {}
    const roomNum = (deptTimetable && selectedProgram && selectedSem)
        ? deptTimetable.programs[selectedProgram].semesters[selectedSem]?.room || ''
        : ''

    const handleProgramChange = (prog) => {
        setSelectedProgram(prog)
        if (deptTimetable) {
            const semesters = Object.keys(deptTimetable.programs[prog].semesters)
            if (semesters.length > 0) {
                setSelectedSem(semesters[0])
            }
        }
    }


    if (loading && !dept) {
        return <LoadingSpinner message="Loading department..." />
    }

    if (!dept) {
        return (
            <div className="container section" style={{ textAlign: 'center' }}>
                <h2>Department Not Found</h2>
                <Link to="/departments" className="btn btn-primary">Back to Departments</Link>
            </div>
        )
    }

    // Estimate column heights to determine FAQ placement dynamically
    const facultyCount = dept?.faculty?.length || 0
    const labsCount = dept?.labs?.length || 0
    const subjectsCount = dept?.subjects?.length || 0
    const hasDetailedDesc = !!dept?.detailedDescription

    const leftScore = 250 + (facultyCount * 150) + (hasDetailedDesc ? 200 : 0)
    const rightScore = (subjectsCount * 15) + (labsCount * 70) + 220
    const renderFaqsInLeft = leftScore < rightScore

    const faqSection = dept.faqs && dept.faqs.length > 0 && (
        <motion.div
            className="dept-faq-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginTop: '45px' }}
        >
            <div className="dept-section-label">
                <FiHelpCircle /> Frequently Asked Questions
            </div>
            <div className="dept-faq-list" style={{ marginTop: '20px' }}>
                {dept.faqs.map((faq, index) => {
                    const isOpen = openFaq === index
                    return (
                        <div key={index} className={`dept-faq-item ${isOpen ? 'active' : ''}`} style={{
                            borderBottom: index < dept.faqs.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                            padding: '16px 0'
                        }}>
                            <button
                                onClick={() => setOpenFaq(isOpen ? null : index)}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    fontWeight: '600',
                                    fontSize: '1rem',
                                    color: 'var(--near-black)',
                                    gap: '15px'
                                }}
                            >
                                <span>{faq.q}</span>
                                <FiChevronDown style={{
                                    transform: isOpen ? 'rotate(180deg)' : 'none',
                                    transition: 'transform 0.2s',
                                    color: 'var(--dept-primary)',
                                    flexShrink: 0
                                }} />
                            </button>
                            {isOpen && (
                                <motion.p 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    style={{
                                        marginTop: '10px',
                                        fontSize: '0.92rem',
                                        color: '#4a5568',
                                        lineHeight: '1.6'
                                    }}
                                >
                                    {faq.a}
                                </motion.p>
                            )}
                        </div>
                    )
                })}
            </div>
        </motion.div>
    )

    return (
        <div className="dept-detail-page" style={{
            '--dept-primary': theme.primary,
            '--dept-primary-light': theme.primaryLight,
            '--dept-accent': theme.accent,
            '--dept-accent-glow': theme.accentGlow,
            '--dept-tag-bg': theme.tagBg,
            '--dept-tag-border': theme.tagBorder,
        }}>
            {/* ═══ HERO SECTION ═══ */}
            <section className="dept-hero" style={{ background: theme.gradient, padding: '100px 0 90px' }}>
                {/* Animated grid pattern */}
                <div className="dept-hero-grid-pattern" />
                {/* Glow orb */}
                <div className="dept-hero-orb" style={{ background: `radial-gradient(circle, ${theme.accentGlow}, transparent 70%)` }} />

                <div className="container" style={{ position: 'relative', zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
                    <motion.div initial="hidden" animate="visible" style={{ flex: 1 }}>
                        <motion.div variants={fadeUp} custom={0}>
                            <Link to="/departments" className="dept-back-link">
                                <FiArrowLeft /> All Departments
                            </Link>
                        </motion.div>

                        <motion.div className="dept-hero-badge" variants={fadeUp} custom={0.5}
                            style={{ borderColor: `${theme.primary}40`, background: `${theme.primary}15` }}
                        >
                            <span className="dept-hero-badge-dot" style={{ background: theme.accent }} />
                            {dept.shortName} Department
                        </motion.div>

                        <motion.h1 className="dept-hero-title" variants={fadeUp} custom={1}>
                            {dept.name}
                        </motion.h1>

                        <motion.p className="dept-hero-desc" variants={fadeUp} custom={2}>
                            {dept.description}
                        </motion.p>

                        {/* Quick Stats Row */}
                        <motion.div className="dept-hero-stats" variants={fadeUp} custom={3}>
                            {dept.seats && (
                                <div className="dept-hero-stat">
                                    <span className="dept-hero-stat-value" style={{ color: theme.accent }}>{dept.seats}</span>
                                    <span className="dept-hero-stat-label">Seats</span>
                                </div>
                            )}
                            <div className="dept-hero-stat">
                                <span className="dept-hero-stat-value" style={{ color: theme.accent }}>{dept.faculty.length}</span>
                                <span className="dept-hero-stat-label">Faculty</span>
                            </div>
                            <div className="dept-hero-stat">
                                <span className="dept-hero-stat-value" style={{ color: theme.accent }}>{dept.labs.length}</span>
                                <span className="dept-hero-stat-label">Labs</span>
                            </div>
                            <div className="dept-hero-stat">
                                <span className="dept-hero-stat-value" style={{ color: theme.accent }}>{dept.subjects.length}</span>
                                <span className="dept-hero-stat-label">Subjects</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        style={{ flex: '0 0 450px', display: 'flex', justifyContent: 'flex-end', alignSelf: 'flex-end', marginBottom: '-90px' }}
                    >
                        <img 
                            src={getAssetPath(`/dept_${id === 'mechanical' ? 'mech' : id}.png?v=1`)} 
                            alt={`${dept.name} Professor`} 
                            style={{ maxWidth: '100%', maxHeight: '480px', objectFit: 'contain', objectPosition: 'bottom' }} 
                        />
                    </motion.div>
                </div>
            </section>

            {/* ═══ HIGHLIGHTS STRIP ═══ */}
            <section className="dept-highlights-strip">
                <div className="container">
                    <div className="dept-highlights-row">
                        {dept.highlights.map((h, i) => (
                            <motion.div
                                key={i}
                                className="dept-highlight-chip"
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.4 }}
                            >
                                <FiGrid className="dept-highlight-icon" />
                                {h}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ ACADEMIC RESOURCES SECTION ═══ */}
            <section className="section dept-academic-section">
                <div className="container">
                    <div className="dept-academic-grid">
                        
                        {/* Syllabus Banner */}
                        <motion.div 
                            className="dept-syllabus-banner"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            style={{ borderLeft: `5px solid ${theme.primary}` }}
                        >
                            <div className="dept-syllabus-banner-glow" style={{ background: `radial-gradient(circle at 100% 100%, ${theme.primaryLight}, transparent 60%)` }} />
                            <div className="dept-syllabus-banner-left">
                                <div className="dept-syllabus-banner-icon-box" style={{ background: theme.primaryLight, color: theme.primary }}>
                                    <FiBookOpen size={24} />
                                </div>
                                <div className="dept-syllabus-banner-info">
                                    <span className="dept-syllabus-banner-tag" style={{ color: theme.primary, background: theme.primaryLight }}>Academic Program</span>
                                    <h3>Course Syllabus & Curriculum</h3>
                                    <p>
                                        View course outlines, credit schemes, marks distributions, and download curriculum PDFs.
                                    </p>
                                    <div className="dept-syllabus-banner-stats">
                                        <div className="stat-pill">
                                            <span className="stat-dot" style={{ background: theme.accent }} />
                                            <span>{id === 'ash' ? 'Semesters 1-2' : 'Semesters 1-8'}</span>
                                        </div>
                                        <div className="stat-pill">
                                            <span className="stat-dot" style={{ background: theme.accent }} />
                                            <span>PDF Downloads</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dept-syllabus-banner-right">
                                <button 
                                    className="dept-syllabus-explore-btn"
                                    onClick={() => setSyllabusGridOpen(true)}
                                    style={{ background: theme.gradient, boxShadow: `0 8px 24px -5px ${theme.accentGlow}` }}
                                >
                                    <FiEye style={{ marginRight: 8 }} /> Explore Syllabus
                                </button>
                            </div>
                        </motion.div>

                        {/* Timetable Banner */}
                        {timetablesData[id] && (
                            <motion.div 
                                className="dept-syllabus-banner"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                style={{ borderLeft: `5px solid ${theme.accent}` }}
                            >
                                <div className="dept-syllabus-banner-glow" style={{ background: `radial-gradient(circle at 100% 100%, ${theme.accentGlow}, transparent 60%)` }} />
                                <div className="dept-syllabus-banner-left">
                                    <div className="dept-syllabus-banner-icon-box" style={{ background: `${theme.accent}20`, color: theme.accent }}>
                                        <FiLayers size={24} />
                                    </div>
                                    <div className="dept-syllabus-banner-info">
                                        <span className="dept-syllabus-banner-tag" style={{ color: theme.accent, background: `${theme.accent}15` }}>Class Schedule</span>
                                        <h3>Class Weekly Time Table</h3>
                                        <p>
                                            Check class timings, daily schedules, subjects, classroom locations, and teachers for all programs.
                                        </p>
                                        <div className="dept-syllabus-banner-stats">
                                            <div className="stat-pill">
                                                <span className="stat-dot" style={{ background: theme.primary }} />
                                                <span>Odd Semester 2025-26</span>
                                            </div>
                                            <div className="stat-pill">
                                                <span className="stat-dot" style={{ background: theme.primary }} />
                                                <span>Interactive Scheduler</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="dept-syllabus-banner-right">
                                    <button 
                                        className="dept-syllabus-explore-btn"
                                        onClick={() => setTimetableOpen(true)}
                                        style={{ background: theme.gradient, boxShadow: `0 8px 24px -5px ${theme.accentGlow}` }}
                                    >
                                        <FiEye style={{ marginRight: 8 }} /> Explore Schedule
                                    </button>
                                </div>
                            </motion.div>
                        )}
                        
                    </div>
                </div>
            </section>

            {/* ═══ MAIN CONTENT ═══ */}
            <section className="section dept-content-section">
                <div className="container">
                    <div className="dept-grid">

                        {/* ── LEFT COLUMN ── */}
                        <div className="dept-main">

                            {/* HOD Card */}
                            <div style={{ marginBottom: '35px' }}>
                                <div className="dept-section-label" style={{ marginBottom: '15px' }}>
                                    <FiUser /> Head of Department
                                </div>
                                <FacultyCard faculty={dept.hod} index={0} theme={theme} getAssetPath={getAssetPath} />
                            </div>

                            {/* Faculty Section */}
                            <div className="dept-faculty-section">
                                <div className="dept-section-header">
                                    <div className="dept-section-label">
                                        <FiUsers /> Our Faculty
                                    </div>
                                    <div className="dept-section-line" />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    {dept.faculty.map((f, i) => (
                                        <FacultyCard key={i} faculty={f} index={i} theme={theme} getAssetPath={getAssetPath} />
                                    ))}
                                </div>
                            </div>

                            {/* Department Overview - placed after faculty to fill space */}
                            {dept.detailedDescription && (
                                <motion.div
                                    className="dept-overview-card"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7 }}
                                    style={{ marginTop: '45px' }}
                                >
                                    <div className="dept-overview-glow" style={{ background: `radial-gradient(ellipse at top left, ${theme.primaryLight}, transparent 60%)` }} />
                                    <div className="dept-section-label">
                                        <FiLayers /> Department Overview
                                    </div>
                                    <p className="dept-overview-text">{dept.detailedDescription}</p>
                                </motion.div>
                            )}
                            {renderFaqsInLeft && faqSection}
                        </div>

                        {/* ── RIGHT SIDEBAR ── */}
                        <div className="dept-sidebar">

                            {/* Subjects Card */}
                            <motion.div
                                className="dept-sidebar-card"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="dept-section-label">
                                    <FiBookOpen /> Core Subjects
                                </div>
                                <div className="dept-subject-grid">
                                    {dept.subjects.map((sub, i) => (
                                        <span key={i} className="dept-subject-tag">{sub}</span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Labs Card */}
                            <motion.div
                                className="dept-sidebar-card"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.15 }}
                            >
                                <div className="dept-section-label">
                                    <FiCpu /> Laboratory Infrastructure
                                </div>
                                <div className="dept-lab-list">
                                    {dept.labs.map((lab, i) => (
                                        <motion.div
                                            key={i}
                                            className="dept-lab-item"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <div className="dept-lab-number" style={{ color: theme.accent }}>{String(i + 1).padStart(2, '0')}</div>
                                            <div className="dept-lab-info">
                                                <h4>{lab.name}</h4>
                                                <p>{lab.resources}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {!renderFaqsInLeft && faqSection}

                            {/* CTA */}
                            <motion.div
                                className="dept-cta-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                style={{ background: theme.gradient }}
                            >
                                <div className="dept-cta-content">
                                    <h3>Ready to Join?</h3>
                                    <p>Start your engineering journey with the {dept.shortName} department</p>
                                    <Link to="/admissions" className="dept-cta-btn">
                                        Apply for Admission <FiChevronRight />
                                    </Link>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ SYLLABUS GRID SELECTION MODAL (STAGE 1) ═══ */}
            <AnimatePresence>
                {syllabusGridOpen && (
                    <motion.div 
                        className="syllabus-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSyllabusGridOpen(false)}
                    >
                        <motion.div 
                            className="syllabus-grid-modal"
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 350 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                className="syllabus-modal-close"
                                onClick={() => setSyllabusGridOpen(false)}
                            >
                                <FiX size={18} />
                            </button>

                            {/* Modal Header */}
                            <div className="syllabus-grid-modal-header" style={{ borderBottom: `2px solid ${theme.primary}15` }}>
                                <div className="syllabus-modal-badge" style={{ background: theme.primaryLight, color: theme.primary }}>
                                    Program Curriculum
                                </div>
                                <h3>{dept.name} Syllabus</h3>
                                <p>Select a semester below to explore core subjects, credit distributions, and download official PDFs.</p>
                            </div>

                            {/* Scrollable grid area */}
                            <div className="syllabus-grid-modal-body">
                                <div className="sem-grid">
                                    {Array.from({ length: id === 'ash' ? 2 : 8 }, (_, idx) => {
                                        const semNum = idx + 1;
                                        const semData = semesterSyllabusData[id]?.[semNum];
                                        const subjectCount = semData?.subjects.length || 0;
                                        const theoryCount = semData?.subjects.filter(s => s.type === 'Theory').length || 0;
                                        const practicalCount = semData?.subjects.filter(s => s.type === 'Practical').length || 0;

                                        return (
                                            <div
                                                key={semNum}
                                                className="sem-card"
                                            >
                                                <div className="sem-card-glow" style={{ background: `radial-gradient(circle at 100% 0%, ${theme.primaryLight}, transparent 65%)` }} />
                                                <div className="sem-card-header">
                                                    <span className="sem-number">0{semNum}</span>
                                                    <h4 className="sem-title">Semester {semNum}</h4>
                                                </div>
                                                <div className="sem-card-meta">
                                                    <span>{subjectCount} Core Subjects</span>
                                                    <span className="sem-meta-dot" />
                                                    <span>{theoryCount}T / {practicalCount}P</span>
                                                </div>
                                                

                                                <div className="sem-card-actions">
                                                    <a 
                                                        href={getSyllabusPdfPath(id, semNum)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="sem-btn sem-btn-primary"
                                                        style={{ background: theme.primary, textDecoration: 'none', color: 'white' }}
                                                    >
                                                        <FiEye size={13} style={{ marginRight: 4 }} /> View Syllabus
                                                    </a>
                                                    <a 
                                                        href={getSyllabusPdfPath(id, semNum)}
                                                        download={`MEC_${dept.shortName}_Semester_${semNum}_Syllabus.pdf`}
                                                        className="sem-btn sem-btn-secondary"
                                                        style={{ textDecoration: 'none' }}
                                                    >
                                                        <FiDownload size={13} style={{ marginRight: 4 }} /> PDF
                                                    </a>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {timetableOpen && timetablesData[id] && (
                    <motion.div 
                        className="syllabus-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setTimetableOpen(false)}
                    >
                        <motion.div 
                            className="timetable-modal"
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 350 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                className="syllabus-modal-close"
                                onClick={() => setTimetableOpen(false)}
                            >
                                <FiX size={18} />
                            </button>

                            {/* Modal Header */}
                            <div className="timetable-modal-header" style={{ borderBottom: `2px solid ${theme.primary}15` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                                    <div>
                                        <div className="syllabus-modal-badge" style={{ background: theme.primaryLight, color: theme.primary }}>
                                            Odd Semester Schedule 2025-26
                                        </div>
                                        <h3>{dept.name} Time Table</h3>
                                        {roomNum && <p className="timetable-room-desc">Room No.: <span style={{ color: theme.primary, fontWeight: '700' }}>{roomNum}</span> • Mewat Engineering College (Waqf)</p>}
                                    </div>
                                    
                                    {/* Layout toggle tabs */}
                                    <div className="timetable-layout-selector">
                                        <button 
                                            className={`layout-tab ${timetableTab === 'grid' ? 'active' : ''}`}
                                            onClick={() => setTimetableTab('grid')}
                                            style={timetableTab === 'grid' ? { background: theme.primary, color: 'white' } : {}}
                                        >
                                            Weekly Grid
                                        </button>
                                        <button 
                                            className={`layout-tab ${timetableTab === 'list' ? 'active' : ''}`}
                                            onClick={() => setTimetableTab('list')}
                                            style={timetableTab === 'list' ? { background: theme.primary, color: 'white' } : {}}
                                        >
                                            Day View
                                        </button>
                                    </div>
                                </div>

                                {/* Dropdown filters */}
                                <div className="timetable-filters">
                                    {programKeys.length > 1 && (
                                        <div className="filter-group">
                                            <label>Program</label>
                                            <select 
                                                value={selectedProgram} 
                                                onChange={(e) => handleProgramChange(e.target.value)}
                                                style={{ borderColor: `${theme.primary}30` }}
                                            >
                                                {programKeys.map(key => (
                                                    <option key={key} value={key}>{deptTimetable.programs[key].name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                    {semKeys.length > 0 && (
                                        <div className="filter-group">
                                            <label>Semester</label>
                                            <select 
                                                value={selectedSem} 
                                                onChange={(e) => setSelectedSem(e.target.value)}
                                                style={{ borderColor: `${theme.primary}30` }}
                                            >
                                                {semKeys.map(sem => (
                                                    <option key={sem} value={sem}>{sem}th Semester</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="timetable-modal-body">
                                {timetableTab === 'grid' ? (
                                    /* Classic Grid View */
                                    <div className="timetable-grid-container">
                                        <table className="timetable-grid-table">
                                            <thead>
                                                <tr>
                                                    <th className="day-column-header">Day</th>
                                                    {periods.map((p) => (
                                                        <th key={p.id} className={p.isBreak ? 'lunch-column-header' : 'period-column-header'}>
                                                            <div className="period-id">{p.id}</div>
                                                            <div className="period-time">{p.time}</div>
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.keys(currentSchedule).map(day => {
                                                    const daySchedule = currentSchedule[day] || [];
                                                    return (
                                                        <tr key={day}>
                                                            <td className="day-cell-label">{day}</td>
                                                            {daySchedule.map((slot, sIdx) => {
                                                                if (slot.isBreak) {
                                                                    return (
                                                                        <td key={sIdx} className="lunch-cell">
                                                                            <div className="lunch-text">LUNCH</div>
                                                                        </td>
                                                                    );
                                                                }
                                                                
                                                                const isSelfStudy = slot.subject?.toLowerCase().includes('self study') || slot.subject?.toLowerCase().includes('library');
                                                                const isLab = slot.subject?.toLowerCase().includes('lab') || slot.subject?.toLowerCase().includes('training') || slot.subject?.toLowerCase().includes('project') || slot.subject?.toLowerCase().includes('visit') || slot.subject?.toLowerCase().includes('on job');
                                                                
                                                                return (
                                                                    <td 
                                                                        key={sIdx} 
                                                                        className={`schedule-cell ${isSelfStudy ? 'self-study' : ''} ${isLab ? 'lab-class' : ''}`}
                                                                    >
                                                                        {slot.subject ? (
                                                                            <div className="class-card">
                                                                                <span className="class-subject">{slot.subject}</span>
                                                                                {slot.teacher && <span className="class-teacher"><FiUser size={10} style={{ marginRight: 3 }} /> {slot.teacher}</span>}
                                                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, width: '100%' }}>
                                                                                    {slot.room && <span className="class-room"><FiMapPin size={9} /> {slot.room}</span>}
                                                                                    {slot.type === 'Online' && <span className="class-type-badge online">Online</span>}
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <span className="empty-cell">-</span>
                                                                        )}
                                                                    </td>
                                                                );
                                                            })}
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    /* Responsive Day View */
                                    <div className="timetable-list-container">
                                        {/* Day tabs selection */}
                                        <div className="day-pills">
                                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                                                <button 
                                                    key={day}
                                                    className={`day-pill ${activeDay === day ? 'active' : ''}`}
                                                    onClick={() => setActiveDay(day)}
                                                    style={activeDay === day ? { background: theme.primary, borderColor: theme.primary, color: 'white' } : {}}
                                                >
                                                    {day}
                                                </button>
                                            ))}
                                        </div>

                                        {/* List of classes for selected day */}
                                        <div className="day-timeline">
                                            {currentSchedule[activeDay]?.map((slot, sIdx) => {
                                                const periodInfo = periods[sIdx];
                                                if (slot.isBreak) {
                                                    return (
                                                        <div key={sIdx} className="timeline-item lunch-break">
                                                            <div className="timeline-time">
                                                                <FiClock style={{ marginRight: 6 }} /> {periodInfo.time}
                                                            </div>
                                                            <div className="timeline-content break-content">
                                                                <h4>Lunch Break</h4>
                                                                <p>1:10 pm to 2:00 pm</p>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                
                                                if (!slot.subject) return null;
                                                
                                                const isSelfStudy = slot.subject.toLowerCase().includes('self study') || slot.subject.toLowerCase().includes('library');
                                                const isLab = slot.subject.toLowerCase().includes('lab') || slot.subject.toLowerCase().includes('training') || slot.subject.toLowerCase().includes('project') || slot.subject.toLowerCase().includes('visit') || slot.subject.toLowerCase().includes('on job');

                                                return (
                                                    <div key={sIdx} className={`timeline-item ${isSelfStudy ? 'self-study' : ''} ${isLab ? 'lab-class' : ''}`}>
                                                        <div className="timeline-time">
                                                            <FiClock style={{ marginRight: 6 }} /> {periodInfo.time}
                                                            <span className="period-badge" style={{ background: theme.primaryLight, color: theme.primary }}>Period {periodInfo.id}</span>
                                                        </div>
                                                        <div className="timeline-content">
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <h4>{slot.subject}</h4>
                                                                {slot.type === 'Online' && <span className="class-type-badge online">Online</span>}
                                                            </div>
                                                            {slot.teacher && <p className="teacher-name"><FiUser style={{ marginRight: 5 }} /> {slot.teacher}</p>}
                                                            {slot.room && <p className="room-info"><FiMapPin style={{ marginRight: 5 }} /> Class Room: {slot.room}</p>}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
