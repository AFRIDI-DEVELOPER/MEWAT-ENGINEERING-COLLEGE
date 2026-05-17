export const departments = [
    {
        id: 'cse',
        name: 'Computer Science & Engineering',
        shortName: 'CSE',
        seats: 60,
        description: 'The CSE department offers a cutting-edge curriculum covering algorithms, data structures, AI, machine learning, web development, and software engineering.',
        icon: '\uD83D\uDCBB',
        iconImg: '/images/cursor/icon_21.webp',
        highlights: ['Modern Computer Labs', 'Industry Collaborations', 'Coding Bootcamps', 'Smart Classrooms'],
        hod: {
            name: 'Dr. Mohd Shahid',
            designation: 'HOD & Associate Professor',
            experience: '18+ Years',
            education: 'Ph.D in Computer Science',
            image: '👨‍💼'
        },
        faculty: [
            { name: 'Dr. Mohd Shahid', designation: 'Associate Professor', specialization: 'Machine Learning', experience: '18 Years' },
            { name: 'Dr. Pratul Sharma', designation: 'Assistant Professor', specialization: 'Computer Networks', experience: '10 Years' },
            { name: 'Dr. Aakib Jawed Khan', designation: 'Assistant Professor', specialization: 'Software Engineering', experience: '8 Years' },
            { name: 'Ms. Farhat Jahan', designation: 'Assistant Professor', specialization: 'Data Structures', experience: '6 Years' }
        ],
        labs: [
            { name: 'Computer Networking Lab', resources: 'Cisco Switches, Routers, LAN Trainers' },
            { name: 'AI & Data Science Lab', resources: 'High Performance GPUs, Python/Anaconda Environment' },
            { name: 'Web Development Lab', resources: 'Modern IDEs, Hosting Servers' },
            { name: 'Software Engineering Lab', resources: 'Case Tools, Project Management Software' }
        ],
        subjects: ['Artificial Intelligence', 'Data Mining', 'Compiler Design', 'Operating Systems', 'Cloud Computing', 'Computer Networks']
    },
    {
        id: 'civil',
        name: 'Civil Engineering',
        shortName: 'CE',
        seats: 60,
        description: 'Training future civil engineers with hands-on experience in structural design, construction management, surveying, and environmental engineering.',
        icon: '\uD83C\uDFD7\uFE0F',
        iconImg: '/images/cursor/icon_15.webp',
        highlights: ['Material Testing Lab', 'Survey Instruments', 'CAD Software', 'Site Visits'],
        hod: {
            name: 'Dr. Nina Godhara',
            designation: 'HOD & Professor',
            experience: '20+ Years',
            education: 'Ph.D in Civil Engineering',
            image: '👷‍♂️'
        },
        faculty: [
            { name: 'Dr. Vaseem Akram', designation: 'Professor', specialization: 'Structures', experience: '18 Years' },
            { name: 'Mr. Irfan Khan', designation: 'Assistant Professor', specialization: 'Geotech', experience: '10 Years' },
            { name: 'Ms. Sana Malik', designation: 'Assistant Professor', specialization: 'Environmental Engg', experience: '7 Years' }
        ],
        labs: [
            { name: 'Structural Engineering Lab', resources: 'UTM Machines, Concrete Testing' },
            { name: 'Surveying Lab', resources: 'Total Station, Theodolites, Dumpy Levels' },
            { name: 'Fluid Mechanics Lab', resources: 'Turbines, Pumps, Venturimeters' },
            { name: 'Geotechnical Lab', resources: 'Soil Testing Kits' }
        ],
        subjects: ['Structural Analysis', 'Surveying', 'Hydraulics', 'Soil Mechanics', 'Concrete Technology', 'RC Design']
    },
    {
        id: 'mechanical',
        name: 'Mechanical Engineering',
        shortName: 'ME',
        seats: 30,
        description: 'Comprehensive program covering thermodynamics, manufacturing, CAD/CAM, robotics, and automotive engineering with state-of-the-art workshops.',
        icon: '\u2699\uFE0F',
        iconImg: '/images/cursor/icon_16.webp',
        highlights: ['Workshop Facilities', 'CAD/CAM Lab', 'Thermal Lab', 'Industrial Visits'],
        hod: {
            name: 'Mr. Raffi Khan',
            designation: 'Head of Department',
            experience: '12+ Years',
            education: 'M.Tech, Ph.D (Pursuing)',
            image: '🔧'
        },
        faculty: [
            { name: 'Mr. Raffi Khan', designation: 'Associate Professor', specialization: 'Thermal Engg', experience: '12 Years' },
            { name: 'Mr. Adil Shah', designation: 'Assistant Professor', specialization: 'Manufacturing', experience: '9 Years' },
            { name: 'Mr. Zeeshan Ali', designation: 'Assistant Professor', specialization: 'Robotics', experience: '6 Years' }
        ],
        labs: [
            { name: 'Central Workshop', resources: 'Lathe Machines, Milling, Welding' },
            { name: 'Thermal Engineering Lab', resources: 'IC Engines, Boilers' },
            { name: 'CAD/CAM Lab', resources: 'SolidWorks, AutoCAD, CNC Simulation' },
            { name: 'Automobile Lab', resources: 'Engine Cut-sections, Chassis Models' }
        ],
        subjects: ['Thermodynamics', 'Machine Design', 'Heat Transfer', 'Manufacturing Processes', 'CAD/CAM', 'Mechatronics']
    },
    {
        id: 'eee',
        name: 'Electrical & Electronics Engineering',
        shortName: 'EEE',
        seats: 30,
        description: 'Focuses on power systems, electrical machines, control systems, and electronics, preparing students for careers in energy and electrical sectors.',
        icon: '\u26A1',
        iconImg: '/images/cursor/icon_18.webp',
        highlights: ['Power Systems Lab', 'Electrical Machines Lab', 'Control Systems Lab', 'Smart Grid Training'],
        hod: {
            name: 'Mr. Mohd Umar Khan',
            designation: 'HOD & Associate Professor',
            experience: '16+ Years',
            education: 'Ph.D in Power Systems (Pursuing)',
            image: '⚡'
        },
        faculty: [
            { name: 'Mr. Mohd Umar Khan', designation: 'Associate Professor', specialization: 'Power Systems', experience: '16 Years' },
            { name: 'Mr. Kamaluddin Khan', designation: 'Assistant Professor', specialization: 'Control Systems', experience: '12 Years' }
        ],
        labs: [
            { name: 'Electrical Machines Lab', resources: 'AC/DC Motors, Transformers' },
            { name: 'Control Systems Lab', resources: 'PLC Trainers, Servomotors' },
            { name: 'Power Electronics Lab', resources: 'Choppers, Inverters' },
            { name: 'Simulation Lab', resources: 'MATLAB, PSpice' }
        ],
        subjects: ['Power Systems', 'Control Theory', 'Electrical Machines', 'Digital Electronics', 'Microprocessors', 'Signals & Systems']
    },
    {
        id: 'ece',
        name: 'Electronics & Communication Engineering',
        shortName: 'ECE',
        seats: 30,
        description: 'Covers communication systems, signal processing, VLSI design, embedded systems, and IoT with well-equipped laboratory infrastructure.',
        icon: '\uD83D\uDCE1',
        iconImg: '/images/cursor/icon_12.webp',
        highlights: ['Communication Lab', 'VLSI Lab', 'Embedded Systems Lab', 'IoT Workshop'],
        hod: {
            name: 'Dr. Abid Hussain',
            designation: 'HOD & Professor',
            experience: '20+ Years',
            education: 'Ph.D in Electronics',
            image: '📡'
        },
        faculty: [
            { name: 'Dr. Abid Hussain', designation: 'Professor', specialization: 'Communication', experience: '20 Years' },
            { name: 'Ms. Ruqaiya Bano', designation: 'Assistant Professor', specialization: 'Embedded Systems', experience: '7 Years' }
        ],
        labs: [
            { name: 'Analog Communication Lab', resources: 'CROs, Signal Generators' },
            { name: 'Digital Electronics Lab', resources: 'Trainer Kits, IC Testers' },
            { name: 'Embedded Lab', resources: 'Arduino, Raspberry Pi, ARM kits' },
            { name: 'VLSI Design Lab', resources: 'Xilinx, Cadence tools' }
        ],
        subjects: ['Wireless Communication', 'VLSI Design', 'Digital Signal Processing', 'Embedded Systems', 'Antennas', 'Analog Circuits']
    },
    {
        id: 'ash',
        name: 'Applied Sciences & Humanities',
        shortName: 'AS&H',
        seats: 60,
        description: 'Provides foundational education in mathematics, physics, chemistry, English, and management to all engineering students.',
        icon: '\uD83D\uDCDA',
        iconImg: '/images/cursor/icon_10.webp',
        highlights: ['Physics Lab', 'Chemistry Lab', 'Language Lab', 'Mathematics Resource Center'],
        hod: {
            name: 'Dr. Mehwish Alam',
            designation: 'HOD (Applied Sciences)',
            experience: '10+ Years',
            education: 'Ph.D in Applied Mathematics',
            image: '📐'
        },
        faculty: [
            { name: 'Dr. Mehwish Alam', designation: 'Associate Professor', specialization: 'Mathematics', experience: '10 Years' },
            { name: 'Dr. Imran Qureshi', designation: 'Assistant Professor', specialization: 'Physics', experience: '8 Years' },
            { name: 'Ms. Tabassum', designation: 'Assistant Professor', specialization: 'Professional Ethics', experience: '6 Years' }
        ],
        labs: [
            { name: 'Applied Physics Lab', resources: 'Laser kits, Optical Benches' },
            { name: 'Applied Chemistry Lab', resources: 'Spectrometers, Chemical Analysis' },
            { name: 'Communication Lab', resources: 'Linguaphone, Audio Aids' }
        ],
        subjects: ['Engg Mathematics', 'Engg Physics', 'Engg Chemistry', 'Communication Skills', 'Environmental Science', 'Ethics']
    }
];

// Navigation links
export const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Departments', path: '/departments' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Placements', path: '/placements' },
    { name: 'Campus', path: '/campus' },
    { name: 'Contact', path: '/contact' }
];

// Statistics
export const stats = [
    { id: 'placed', label: 'Students Placed', value: 500, suffix: '+', icon: '💼' },
    { id: 'gate', label: 'GATE Qualified', value: 50, suffix: '+', icon: '🎓' },
    { id: 'air', label: 'Best GATE AIR', value: 48, suffix: '', icon: '🏆' },
    { id: 'recruiters', label: 'Recruiters', value: 30, suffix: '+', icon: '🤝' },
    { id: 'books', label: 'Library Books', value: 40000, suffix: '+', icon: '📖' },
    { id: 'acres', label: 'Campus Acres', value: 28, suffix: '', icon: '🌳' }
];

// Highlights
export const highlights = [
    {
        title: 'WAQF Establishment',
        description: 'Established by the Haryana Waqf Board, Government of Haryana',
        icon: '🏛️'
    },
    {
        title: 'AICTE Approved',
        description: 'All programs are approved by AICTE, New Delhi',
        icon: '✅'
    },
    {
        title: 'Gurugram University Affiliated',
        description: 'Affiliated to Gurugram University, Haryana',
        icon: '🎓'
    },
    {
        title: '100% Placement Assistance',
        description: 'Dedicated placement cell with 100% placement assistance',
        icon: '💼'
    },
    {
        title: '50% Fee Concession for Girls',
        description: 'Special fee concession for girl students to promote women in engineering',
        icon: '👩‍🎓'
    },
    {
        title: 'GATE 2024 Success',
        description: 'Produced GATE AIR 48 (Dipanshu Garg) and multiple top ranks',
        icon: '🏆'
    },
    {
        title: 'Modern Infrastructure',
        description: 'State-of-the-art labs, library, hostel, and sports facilities',
        icon: '🏛️'
    }
];

// Testimonials
export const testimonials = [
    {
        name: 'Mohd Arif',
        branch: 'CSE, Batch 2020',
        quote: 'MEC provided me with excellent education and practical skills. The faculty\'s dedication and modern labs helped me secure a great position at an MNC.',
        avatar: '👨‍💻',
        rating: 4.8,
        currentPosition: 'Software Engineer at Microsoft'
    },
    {
        name: 'Saba Parveen',
        branch: 'Civil Engineering, Batch 2021',
        quote: 'Being a girl from a rural area, the 50% fee concession was a blessing. The supportive environment at MEC helped me grow both personally and professionally.',
        avatar: '👩‍🔬',
        rating: 4.9,
        currentPosition: 'SDO, Haryana Government'
    },
    {
        name: 'Rahul Sharma',
        branch: 'Mechanical Engineering, Batch 2019',
        quote: 'MEC\'s emphasis on practical learning through workshops and industrial visits gave me hands-on experience that made me job-ready from day one.',
        avatar: '👨‍🔧',
        rating: 4.7,
        currentPosition: 'Production Manager at Maruti Suzuki'
    },
    {
        name: 'Nazia Khan',
        branch: 'ECE, Batch 2022',
        quote: 'The placement cell at MEC is very active. I got placed in my dream company through campus placement. The training programs were very helpful.',
        avatar: '👩‍💼',
        rating: 4.8,
        currentPosition: 'System Analyst at TCS'
    }
];

// Events/News
export const events = [
    {
        title: 'International Conference - RTREAET-2025',
        date: 'March 15, 2025',
        description: '4th Online International Conference on Recent Trends & Emerging Advancements in Engineering and Technology.',
        type: 'fest',
        image: '/images/event-fest.png'
    },
    {
        title: 'Campus Placement Drive',
        date: 'Feb 2026',
        description: 'Multiple top companies visiting campus for recruitment. Students from all branches participated actively.',
        type: 'placement',
        image: '/images/event-placement.png'
    },
    {
        title: 'Workshop on AI & Machine Learning',
        date: 'Jan 2026',
        description: 'A hands-on workshop conducted by industry experts covering latest trends in artificial intelligence.',
        type: 'workshop',
        image: '/images/event-workshop.png'
    },
    {
        title: 'Sports Day Celebration',
        date: 'Dec 2025',
        description: 'Annual sports day with various indoor and outdoor events promoting physical fitness and team spirit.',
        type: 'sports',
        image: '/images/event-sports.png'
    }
];

// Contact information
export const contactInfo = {
    address: 'Village Palla, District Nuh (Mewat), Haryana - 122107',
    phone: ['+91-1267-272045', '+91-1267-272046'],
    email: ['info@mecw.ac.in', 'principal@mecw.ac.in'],
    website: 'www.mecw.ac.in',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3524.367!2d76.9876!3d28.1234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMewat+Engineering+College!5e0!3m2!1sen!2sin!4v1234567890'
};

// Campus facilities
export const facilities = [
    {
        name: 'Hostel',
        tagline: 'Home Away From Home',
        description: 'Separate hostels for boys and girls with mess facility, Wi-Fi, and 24/7 security. Comfortable rooms with modern amenities.',
        icon: '\uD83C\uDFE0',
        gradient: 'linear-gradient(135deg, #3A5A40 0%, #588157 100%)',
        accentColor: '#3A5A40',
        features: ['Wi-Fi Connectivity', 'Mess Facility', '24/7 Security', 'Recreation Room'],
        image: '/images/college-bg.png',
        details: {
            head: {
                name: 'Mr. Salim Khan',
                designation: 'Hostel Warden (Boys)',
                contact: '+91-98765-43210',
                email: 'warden.boys@mecw.ac.in'
            },
            headGirls: {
                name: 'Ms. Rukhsana Begum',
                designation: 'Hostel Warden (Girls)',
                contact: '+91-98765-43211',
                email: 'warden.girls@mecw.ac.in'
            },
            roomTypes: [
                { type: 'Single Occupancy', rent: '₹3,500 / month', amenities: ['Attached Bathroom', 'Study Table', 'Wardrobe', 'Fan & Light'] },
                { type: 'Double Occupancy', rent: '₹2,500 / month', amenities: ['Common Bathroom', 'Study Tables', 'Wardrobes', 'Fan & Light'] },
                { type: 'Triple Occupancy', rent: '₹2,000 / month', amenities: ['Common Bathroom', 'Shared Study Area', 'Wardrobes', 'Fan & Light'] }
            ],
            annualFee: '₹44,000 / year (Boys & Girls)',
            messFee: 'Included in Annual Fee',
            securityDeposit: '₹5,000 (One-time, Refundable)',
            security: [
                '24/7 CCTV Surveillance with 80+ cameras',
                'Biometric entry/exit system',
                'Security guards at all entry points',
                'Regular rounds by warden staff',
                'Visitor log system & identity verification',
                'Emergency panic buttons in each block'
            ],
            wifi: {
                provider: 'BSNL Broadband',
                speed: '100 Mbps (shared)',
                coverage: 'All hostel blocks & common areas',
                timings: '6:00 AM – 11:00 PM',
                charge: 'Free (included in hostel fee)'
            },
            mess: {
                timings: [
                    { meal: 'Breakfast', time: '7:00 AM – 9:00 AM' },
                    { meal: 'Lunch', time: '12:30 PM – 2:30 PM' },
                    { meal: 'Snacks', time: '5:00 PM – 6:00 PM' },
                    { meal: 'Dinner', time: '7:30 PM – 9:30 PM' }
                ],
                type: 'Pure Vegetarian & Non-Vegetarian options',
                catering: 'Managed by licensed caterer'
            },
            amenities: [
                'Common Room with TV & indoor games',
                'Laundry & ironing facility',
                'Hot water supply',
                'Gymnasium access',
                'Reading room & study hall',
                'Medical room with first aid',
                'Generator backup 24/7',
                'Parking for two-wheelers'
            ],
            rules: [
                'Entry curfew: 9:00 PM (Boys), 7:00 PM (Girls)',
                'No outsiders allowed in rooms',
                'Prior permission required for night-out',
                'No smoking or alcohol in hostel premises'
            ]
        }
    },
    {
        name: 'Central Library',
        tagline: 'Knowledge at Your Fingertips',
        description: 'A well-equipped, computerized, and centrally air-conditioned library with over 40,000 volumes including textbooks, reference books, journals, and a dedicated Book Bank.',
        icon: '\uD83D\uDCDA',
        gradient: 'linear-gradient(135deg, #5C4033 0%, #8B6347 100%)',
        accentColor: '#7B4F2E',
        features: ['40,000+ Books', 'Book Bank Facility', 'E-Journals', 'Digital Library'],
        image: '/images/college-bg-1.jpg',
        details: {
            head: {
                name: 'Mr. Aslam Qureshi',
                designation: 'Chief Librarian',
                contact: '+91-98765-43212',
                email: 'library@mecw.ac.in'
            },
            timings: '8:00 AM – 8:00 PM (Mon–Sat), 10:00 AM – 4:00 PM (Sun)',
            collection: [
                { category: 'Engineering Textbooks', count: '30,000+' },
                { category: 'Reference Books', count: '5,000+' },
                { category: 'Journals & Magazines', count: '1,800+' },
                { category: 'E-Books & E-Journals', count: '3,500+' },
                { category: 'Question Banks & Past Papers', count: 'All branches' },
                { category: 'National Newspapers', count: '8 dailies' }
            ],
            digital: [
                'NPTEL Video Lectures access',
                'IEEE Xplore digital library',
                'Springer Online Journals',
                'DELNET membership',
                '35-seat digital reading room',
                'High-speed internet access'
            ],
            services: [
                'Home lending (14-day period)',
                'Photocopy & scanning facility',
                'Book reservation system',
                'Inter-library loan',
                'Reference & bibliography services',
                'New arrivals notice board'
            ],
            annualFee: '₹500 / year (refundable deposit on books)',
            seatingCapacity: 120
        }
    },
    {
        name: 'Laboratories',
        tagline: 'Hands-On Learning Excellence',
        description: 'State-of-the-art labs for all departments equipped with latest instruments and software for practical learning.',
        icon: '\uD83D\uDD2C',
        gradient: 'linear-gradient(135deg, #1A3A5C 0%, #2E6DA4 100%)',
        accentColor: '#1A5276',
        features: ['Department Labs', 'Computer Labs', 'Workshop', 'Language Lab'],
        image: '/images/college-bg-2.png',
        details: {
            head: {
                name: 'Dr. Mohd. Tariq',
                designation: 'Lab Coordinator',
                contact: '+91-98765-43213',
                email: 'labs@mecw.ac.in'
            },
            totalLabs: 18,
            labs: [
                { dept: 'Computer Science', labs: ['Programming Lab', 'AI & Data Science Lab', 'Networking Lab', 'Web Dev Lab'], software: 'Python, MATLAB, Cisco Packet Tracer' },
                { dept: 'Civil Engineering', labs: ['Structural Engg Lab', 'Surveying Lab', 'Fluid Mechanics Lab', 'Geotechnical Lab'], software: 'AutoCAD, STAAD Pro' },
                { dept: 'Mechanical', labs: ['Central Workshop', 'Thermal Lab', 'CAD/CAM Lab', 'Automobile Lab'], software: 'SolidWorks, ANSYS' },
                { dept: 'EEE / ECE', labs: ['Electrical Machines Lab', 'Power Electronics Lab', 'Communication Lab', 'VLSI Lab'], software: 'MATLAB, PSpice, Xilinx' },
                { dept: 'Applied Sciences', labs: ['Physics Lab', 'Chemistry Lab', 'Language Lab'], software: 'LabView, Chemsketch' }
            ],
            timings: '9:00 AM – 5:00 PM (Mon–Sat)',
            safety: [
                'Fire extinguishers in every lab',
                'First aid kits readily available',
                'Safety gloves & goggles provided',
                'Proper earthing & power safety measures'
            ]
        }
    },
    {
        name: 'Transport',
        tagline: 'Safe & Convenient Commute',
        description: 'College bus service covering major routes in Nuh and surrounding areas for convenient commute.',
        icon: '\uD83D\uDE8C',
        gradient: 'linear-gradient(135deg, #7D4A00 0%, #C47A1A 100%)',
        accentColor: '#B7600C',
        features: ['Multiple Routes', 'GPS Tracked', 'Faculty Bus', 'Affordable Fare'],
        image: '/images/college-bg-3.png',
        details: {
            head: {
                name: 'Mr. Imran Ali',
                designation: 'Transport In-charge',
                contact: '+91-98765-43214',
                email: 'transport@mecw.ac.in'
            },
            fleetSize: 12,
            routes: [
                { route: 'Nuh → MEC (via Tauru)', stops: 'Nuh, Tauru, Nagina', timing: '7:30 AM / 5:30 PM' },
                { route: 'Gurgaon → MEC', stops: 'Gurgaon, Sohna, Nuh', timing: '7:00 AM / 6:00 PM' },
                { route: 'Mewat Local Route', stops: 'Palla, Piangwan, Nagina', timing: '7:30 AM / 5:30 PM' },
                { route: 'Faridabad → MEC', stops: 'Faridabad, Ballabhgarh, Hodal', timing: '6:30 AM / 6:30 PM' },
                { route: 'Rewari → MEC', stops: 'Rewari, Palhawas', timing: '7:00 AM / 6:00 PM' }
            ],
            fees: [
                { distance: 'Up to 10 km', annual: '₹8,000' },
                { distance: '10–25 km', annual: '₹12,000' },
                { distance: '25–50 km', annual: '₹18,000' },
                { distance: '50+ km', annual: '₹22,000' }
            ],
            safety: [
                'GPS tracking on all buses',
                'Trained & licensed drivers',
                'Speed governors installed',
                'Regular vehicle maintenance checks',
                'First aid kit on every bus',
                'Female escort for girls\' routes'
            ]
        }
    },
    {
        name: 'Sports & Gymnasium',
        tagline: 'Fitness Meets Excellence',
        description: 'Multi-purpose sports ground, indoor gymnasium, and facilities for cricket, football, basketball, and volleyball.',
        icon: '\uD83C\uDFCB\uFE0F',
        gradient: 'linear-gradient(135deg, #4A235A 0%, #7D3C98 100%)',
        accentColor: '#6C3483',
        features: ['Gymnasium', 'Cricket Ground', 'Basketball Court', 'Indoor Games'],
        image: '/images/college-bg.png',
        details: {
            head: {
                name: 'Mr. Salman Raza',
                designation: 'Sports Director',
                contact: '+91-98765-43215',
                email: 'sports@mecw.ac.in'
            },
            outdoorFacilities: [
                'Cricket Ground with pitch & practice nets',
                'Football ground (full-size)',
                'Volleyball court',
                'Kabaddi & Kho-Kho ground',
                'Athletics track (200m)',
                'Badminton courts (outdoor)'
            ],
            indoorFacilities: [
                'Fully equipped Gymnasium',
                'Table Tennis room',
                'Carom & Chess boards',
                'Basketball court (indoor)',
                'Boxing ring',
                'Yoga & Meditation room'
            ],
            gymEquipment: [
                'Treadmills × 6',
                'Multi-gym station',
                'Free weights & dumbbells',
                'Cycling machines × 4',
                'Rowing machine × 2',
                'Pull-up & dip station'
            ],
            timings: '6:00 AM – 8:00 AM & 4:00 PM – 7:00 PM',
            gymFee: '₹500 / month (students), ₹1,000 / month (staff)',
            achievements: [
                'Inter-University Cricket Championship – 2024 Runners-Up',
                'Haryana State Kabaddi – 3rd Place (2023)',
                'Table Tennis District Champion – 2024'
            ]
        }
    },
    {
        name: 'Language Lab',
        tagline: 'Speak With Confidence',
        description: 'Modern language lab with audio-visual aids to enhance communication skills and English proficiency.',
        icon: '\uD83D\uDDE3\uFE0F',
        gradient: 'linear-gradient(135deg, #1A4A5A 0%, #1A7A8A 100%)',
        accentColor: '#117A8B',
        features: ['Audio-Visual Aids', 'Communication Training', 'Personality Development', 'Soft Skills'],
        image: '/images/college-bg-1.jpg',
        details: {
            head: {
                name: 'Ms. Tabassum',
                designation: 'Language Lab In-charge',
                contact: '+91-98765-43216',
                email: 'languagelab@mecw.ac.in'
            },
            seatingCapacity: 40,
            equipment: [
                '40 individual headphone workstations',
                'Smart interactive board',
                'HD projector & screen',
                'Linguaphone system',
                'Audio-visual recording setup',
                'High-speed internet terminals'
            ],
            programs: [
                { name: 'Business Communication', duration: '30 hrs/semester', outcome: 'Workplace communication skills' },
                { name: 'Spoken English', duration: '20 hrs/semester', outcome: 'Fluency & pronunciation' },
                { name: 'Group Discussion & GD Training', duration: '10 hrs/semester', outcome: 'Interview preparation' },
                { name: 'Presentation Skills', duration: '10 hrs/semester', outcome: 'Public speaking confidence' },
                { name: 'Personality Development', duration: '15 hrs/semester', outcome: 'Soft skills & etiquette' }
            ],
            software: [
                'ORELL Language Learning Software',
                'British Council learning modules',
                'Grammar & vocabulary builders',
                'Mock interview simulation software'
            ],
            timings: '9:00 AM – 5:00 PM (Mon–Sat)'
        }
    }
];

// Recruiters
export const recruiters = [
    'Infosys', 'Wipro', 'TCS', 'HCL Technologies', 'Tech Mahindra',
    'Cognizant', 'Byju\'s', 'Lenskart', 'Delhivery', 'Zomato',
    'NTT Data', 'Sopra Steria', 'Newgen Software', 'iEnergizer',
    'BSNL', 'NHPC', 'Indian Army'
];

// Admission info
export const admissionInfo = {
    eligibility: 'Candidates must have passed 10+2 examination with Physics, Chemistry, and Mathematics with minimum 45% aggregate marks (40% for reserved categories).',
    process: [
        'Fill the online application form on the official website',
        'Upload required documents (10th, 12th marksheets, photographs)',
        'Admission through HSTES counselling / JEE Main score',
        'Report to the college with original documents',
        'Pay the admission fee and complete registration'
    ],
    feeStructure: {
        tuitionFeeBoys: '₹49,500 / year',
        tuitionFeeGirls: '₹19,750 / year',
        hostelFee: '₹44,000 / year',
        girlsDiscount: 'Special concession of ~60% for girl students',
        scholarships: 'Various state (PMS) and central government (MOMA) scholarships available'
    },
    programs: departments.filter(d => d.seats !== null).map(d => ({
        name: `B.Tech in ${d.name}`,
        seats: d.seats,
        duration: '4 Years'
    }))
};

// About section data
export const aboutData = {
    history: 'Mewat Engineering College (WAQF) was established by the Haryana Waqf Board (Government of Haryana) in 2010 to provide quality technical education to the students of the Mewat region and beyond. Situated on a sprawling 28-acre campus in Palla, Nuh, the college is a pioneer institution in the region, bridging the gap in professional education for underserved communities.',
    vision: 'To achieve excellence in technical education, research, and innovation while creating a purposeful impact globally.',
    mission: [
        'To identify the global needs of industry and society and translate them into academic programs',
        'To produce motivated professionals and entrepreneurs with strong ethical values',
        'To provide innovative teaching and learning mechanisms for all students',
        'To foster collaboration with leading industry and research institutes'
    ],
    coreValues: [
        { title: 'Excellence', description: 'Striving for the highest standards in education and research', icon: '\u2B50' },
        { title: 'Inclusivity', description: 'Welcoming students from all backgrounds, especially underserved communities', icon: '\uD83E\uDD1D' },
        { title: 'Innovation', description: 'Encouraging creative thinking and technological advancement', icon: '\uD83D\uDCA1' },
        { title: 'Integrity', description: 'Maintaining honesty and ethical standards in all endeavors', icon: '\uD83D\uDEE1\uFE0F' }
    ],
    preview: {
        title: 'Empowering Engineers, Transforming Lives',
        description: 'Mewat Engineering College (WAQF) is a premier engineering institution situated in the serene surroundings of Village Palla, District Nuh. Committed to transforming lives through quality technical education, we offer programs in 5 engineering disciplines.',
        features: [
            'AICTE Approved Programs',
            'Experienced Faculty',
            'Modern Laboratories',
            '100% Placement Support'
        ]
    }
};

// Leadership / Director data
export const directorData = {
    name: 'Prof. (Dr.) Khwaja M. Rafi',
    title: 'Director',
    institution: 'Mewat Engineering College',
    message: [
        'Welcome to Mewat Engineering College (WAQF). Our institution is dedicated to providing quality technical education that empowers students from all backgrounds, especially the underserved communities of the Mewat region.',
        'We believe in nurturing not just engineers, but responsible citizens who can contribute to the nation\'s progress. With our experienced faculty, modern infrastructure, and industry-aligned curriculum, we are committed to shaping the future leaders of technology.',
        'I invite all aspiring engineers to join our family and embark on a transformative journey of learning and growth.'
    ],
    image: '/images/director.png'
};
