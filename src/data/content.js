// College departments
export const departments = [
    {
        id: 'cse',
        name: 'Computer Science & Engineering',
        shortName: 'CSE',
        seats: 60,
        description: 'The CSE department offers a cutting-edge curriculum covering algorithms, data structures, AI, machine learning, web development, and software engineering.',
        icon: '💻',
        highlights: ['Modern Computer Labs', 'Industry Collaborations', 'Coding Bootcamps', 'Smart Classrooms']
    },
    {
        id: 'civil',
        name: 'Civil Engineering',
        shortName: 'CE',
        seats: 60,
        description: 'Training future civil engineers with hands-on experience in structural design, construction management, surveying, and environmental engineering.',
        icon: '🏗️',
        highlights: ['Material Testing Lab', 'Survey Instruments', 'CAD Software', 'Site Visits']
    },
    {
        id: 'mechanical',
        name: 'Mechanical Engineering',
        shortName: 'ME',
        seats: 30,
        description: 'Comprehensive program covering thermodynamics, manufacturing, CAD/CAM, robotics, and automotive engineering with state-of-the-art workshops.',
        icon: '⚙️',
        highlights: ['Workshop Facilities', 'CAD/CAM Lab', 'Thermal Lab', 'Industrial Visits']
    },
    {
        id: 'eee',
        name: 'Electrical & Electronics Engineering',
        shortName: 'EEE',
        seats: 30,
        description: 'Focuses on power systems, electrical machines, control systems, and electronics, preparing students for careers in energy and electrical sectors.',
        icon: '⚡',
        highlights: ['Power Systems Lab', 'Electrical Machines Lab', 'Control Systems Lab', 'Smart Grid Training']
    },
    {
        id: 'ece',
        name: 'Electronics & Communication Engineering',
        shortName: 'ECE',
        seats: 30,
        description: 'Covers communication systems, signal processing, VLSI design, embedded systems, and IoT with well-equipped laboratory infrastructure.',
        icon: '📡',
        highlights: ['Communication Lab', 'VLSI Lab', 'Embedded Systems Lab', 'IoT Workshop']
    },
    {
        id: 'ash',
        name: 'Applied Sciences & Humanities',
        shortName: 'AS&H',
        seats: null,
        description: 'Provides foundational education in mathematics, physics, chemistry, English, and management to all engineering students.',
        icon: '📚',
        highlights: ['Physics Lab', 'Chemistry Lab', 'Language Lab', 'Mathematics Resource Center']
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
    { label: 'Students Placed', value: 500, suffix: '+' },
    { label: 'GATE Qualified', value: 50, suffix: '+' },
    { label: 'Best GATE AIR', value: 48, suffix: '' },
    { label: 'Recruiters', value: 30, suffix: '+' },
    { label: 'Library Books', value: 18000, suffix: '+' },
    { label: 'Campus Acres', value: 15, suffix: '' }
];

// Highlights
export const highlights = [
    {
        title: 'AICTE Approved',
        description: 'All programs are approved by AICTE, New Delhi',
        icon: '✅'
    },
    {
        title: 'DCRUST Affiliated',
        description: 'Affiliated to Deenbandhu Chhotu Ram University of Science & Technology, Murthal',
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
        title: 'GATE Toppers',
        description: 'Produced GATE toppers with AIR 48 and multiple top ranks',
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
        avatar: '👨‍💻'
    },
    {
        name: 'Saba Parveen',
        branch: 'Civil Engineering, Batch 2021',
        quote: 'Being a girl from a rural area, the 50% fee concession was a blessing. The supportive environment at MEC helped me grow both personally and professionally.',
        avatar: '👩‍🔬'
    },
    {
        name: 'Rahul Sharma',
        branch: 'Mechanical Engineering, Batch 2019',
        quote: 'MEC\'s emphasis on practical learning through workshops and industrial visits gave me hands-on experience that made me job-ready from day one.',
        avatar: '👨‍🔧'
    },
    {
        name: 'Nazia Khan',
        branch: 'ECE, Batch 2022',
        quote: 'The placement cell at MEC is very active. I got placed in my dream company through campus placement. The training programs were very helpful.',
        avatar: '👩‍💼'
    }
];

// Events/News
export const events = [
    {
        title: 'Annual Technical Fest - TechMEC 2026',
        date: 'March 2026',
        description: 'A grand celebration of technology featuring hackathons, coding competitions, robotics challenges, and expert talks.',
        type: 'fest'
    },
    {
        title: 'Campus Placement Drive',
        date: 'Feb 2026',
        description: 'Multiple top companies visiting campus for recruitment. Students from all branches participated actively.',
        type: 'placement'
    },
    {
        title: 'Workshop on AI & Machine Learning',
        date: 'Jan 2026',
        description: 'A hands-on workshop conducted by industry experts covering latest trends in artificial intelligence.',
        type: 'workshop'
    },
    {
        title: 'Sports Day Celebration',
        date: 'Dec 2025',
        description: 'Annual sports day with various indoor and outdoor events promoting physical fitness and team spirit.',
        type: 'sports'
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
        description: 'Separate hostels for boys and girls with mess facility, Wi-Fi, and 24/7 security. Comfortable rooms with modern amenities.',
        icon: '🏠',
        features: ['Wi-Fi Connectivity', 'Mess Facility', '24/7 Security', 'Recreation Room']
    },
    {
        name: 'Library',
        description: 'A well-equipped library with over 18,000 volumes including textbooks, reference books, journals, and digital resources.',
        icon: '📖',
        features: ['18,000+ Books', 'E-Journals', 'Reading Hall', 'Digital Library']
    },
    {
        name: 'Laboratories',
        description: 'State-of-the-art labs for all departments equipped with latest instruments and software for practical learning.',
        icon: '🔬',
        features: ['Department Labs', 'Computer Labs', 'Workshop', 'Language Lab']
    },
    {
        name: 'Transport',
        description: 'College bus service covering major routes in Nuh and surrounding areas for convenient commute.',
        icon: '🚌',
        features: ['Multiple Routes', 'GPS Tracked', 'Faculty Bus', 'Affordable Fare']
    },
    {
        name: 'Sports & Gymnasium',
        description: 'Multi-purpose sports ground, indoor gymnasium, and facilities for cricket, football, basketball, and volleyball.',
        icon: '🏋️',
        features: ['Gymnasium', 'Cricket Ground', 'Basketball Court', 'Indoor Games']
    },
    {
        name: 'Language Lab',
        description: 'Modern language lab with audio-visual aids to enhance communication skills and English proficiency.',
        icon: '🗣️',
        features: ['Audio-Visual Aids', 'Communication Training', 'Personality Development', 'Soft Skills']
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
        tuitionFee: '₹35,000 / year',
        hostelFee: '₹25,000 / year',
        girlsDiscount: '50% concession on tuition fee for girl students',
        scholarships: 'Various state and central government scholarships available'
    },
    programs: departments.filter(d => d.seats !== null).map(d => ({
        name: `B.Tech in ${d.name}`,
        seats: d.seats,
        duration: '4 Years'
    }))
};

// About section data
export const aboutData = {
    history: 'Mewat Engineering College (WAQF) was established with the vision of providing quality technical education to the students of Mewat region and beyond. Located in the serene village of Palla, District Nuh (Mewat), Haryana, the college has grown to become a premier engineering institution in the region.',
    vision: 'To be a center of excellence in technical education, producing competent engineers who contribute to the national development and upliftment of the Mewat region.',
    mission: [
        'To provide quality technical education accessible to all sections of society',
        'To develop competent engineers with strong ethical values',
        'To promote research and innovation in engineering and technology',
        'To foster industry-academia collaboration for practical learning',
        'To empower women through engineering education with special incentives'
    ],
    coreValues: [
        { title: 'Excellence', description: 'Striving for the highest standards in education and research', icon: '⭐' },
        { title: 'Inclusivity', description: 'Welcoming students from all backgrounds, especially underserved communities', icon: '🤝' },
        { title: 'Innovation', description: 'Encouraging creative thinking and technological advancement', icon: '💡' },
        { title: 'Integrity', description: 'Maintaining honesty and ethical standards in all endeavors', icon: '🛡️' }
    ]
};
