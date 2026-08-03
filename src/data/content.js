export const departments = [
    {
        id: 'cse',
        name: 'Computer Science & Engineering',
        shortName: 'CSE',
        seats: 60,
        description: 'The Computer Science & Engineering Department is well equipped with latest hardware and software in order to provide students with a great deal of hands-on exposure in software designing, coding, testing, deployments, and overall programming capabilities. Funds are being made available to the CSE Department to upgrade hardware and software facilities to create best-in-class infrastructure and provide access to every student to train them for industry readiness and top placements. All labs are fully air-conditioned.',
        detailedDescription: 'The department organizes additional out of syllabus activities like seminars, group discussions, technical debates on current trends in the field of Computer Science and Engineering. The department currently has Computer Labs with latest hardware and software configuration for students. Labs have state-of-the-art facilities and infrastructure. CSE Department provides internet facility to students, faculty and other staff members of the College. Internet lab is used for web surfing and for acquiring useful information for academic pursuits.',
        icon: '\uD83D\uDCBB',
        iconImg: '/images/cursor/icon_21.webp',
        highlights: ['Modern Computer Labs', 'Industry Collaborations', 'Coding Bootcamps', 'Smart Classrooms', 'Fully AC Labs', 'Internet Facility'],
        hod: {
            name: 'Dr. Mohd. Shahid',
            designation: 'HOD & Assistant Professor',
            experience: '15+ Years',
            email: 'shahid27.jmi@gmail.com',
            phone: '+91-9990112185',
            image: '/faculty/cse/Dr. Mohd Shahid, CSED.jpg',
            education: [
                'Ph.D. – Software Engineering, Jamia Millia Islamia (2020)',
                'M.Tech – Computer Engineering, Al-Falah School of Engg. (MDU, 2010)',
                'B.Tech – Computer Engineering, Jamia Millia Islamia (2007)'
            ],
            bio: 'Joined as Assistant Professor in the Dept. of CS&E in 2012. Started career as Lecturer at BHCET, Faridabad (2008–2012). Published 15 research papers in International & National journals and conferences.',
            interests: ['Soft Computing', 'Data Structures & Algorithms', 'Theory of Automata', 'Computer Networking'],
            papers: 15,
        },
        faculty: [
            {
                name: 'Dr. Aakib Jawed Khan',
                designation: 'Assistant Professor',
                experience: '16+ Years',
                email: 'aakibjawed@gmail.com',
                phone: '+91-9991946186',
                image: '/faculty/cse/Dr. AAkib Jawed Khan, CSED.png',
                education: [
                    'Ph.D. – Pursuing, Jamia Millia Islamia, New Delhi',
                    'M.Tech – CS&E, Jamia Hamdard University, New Delhi',
                    'B.E – CS&E, MDU Rohtak, Haryana'
                ],
                bio: 'Joined as Lecturer in 2010, currently Coordinator of CSE Dept. Qualified UGC-JRF NET (2013). Played a key role in establishing several department laboratories.',
                interests: ['Computer Science & Engineering'],
                papers: null,
            },
            {
                name: 'Dr. Sher Jung',
                designation: 'Assistant Professor',
                experience: '18+ Years',
                email: 'sherjung2005@gmail.com',
                phone: '+91-9812437896',
                image: '/faculty/cse/Dr. SHerjung.png',
                education: [
                    'Ph.D. – CS&E, M.D. University Rohtak (2019)',
                    'M.Tech – Computer Engineering, M.D. University (2010)',
                    'B.Tech – CSE, M.D. University (2005)'
                ],
                bio: 'Joined in 2019. Has 8.5 years teaching experience at Al-Falah University & 3.5 years as Admission Officer at MEC. Published 5 papers in international journals & 12 in conferences.',
                interests: ['Data Structures & Algorithms', 'Computer Networking', 'Artificial Intelligence', 'Python'],
                papers: 17,
            },
            {
                name: 'Ms. Neeti Malik',
                designation: 'Assistant Professor (On Leave)',
                experience: '5+ Years',
                email: 'neemalik@gmail.com',
                phone: null,
                image: '/faculty/cse/Ms. Neeti Malik.jpeg',
                education: [
                    'M.Tech – CS&E, Shridhar University, Pillani, Rajasthan',
                    'MBA – Information Technology, SCDL Pune',
                    'DAC – CDAC Pune',
                    'B.E – Information Technology, Lingayas College, Faridabad'
                ],
                bio: 'Joined in 2019. Has 5+ years of teaching experience and 1 year of industrial experience as Design Engineer at GE, Bangalore.',
                interests: ['Computer Science & Engineering', 'Information Technology'],
                papers: null,
            },
            {
                name: 'Mr. Azaz Khan',
                designation: 'Assistant Professor',
                experience: '10+ Years',
                email: 'azazkhancse@gmail.com',
                phone: '+91-8053945480',
                image: '/faculty/cse/Mr. Azaz Khan.jpg',
                education: [
                    'M.Tech – Computer Science, MDU Rohtak (2018)',
                    'B.Tech – CS&E, MDU Rohtak (2014)'
                ],
                bio: 'Joined in 2019. Has 3 years of industry experience. Holds Microsoft Certificate in Programming (HTML5 with JavaScript). Published 2 research papers in UGC-approved International Journals.',
                interests: ['Web Development', 'Computer Science'],
                papers: 2,
            },
            {
                name: 'Dr. Anam Mobin',
                designation: 'Assistant Professor (Guest)',
                experience: '5+ Years',
                email: 'anammobin92@gmail.com',
                phone: '+91-9950716097',
                image: '/faculty/cse/Dr. Anam Mobin.jpeg',
                education: [
                    'Ph.D. – Electronics & Communication Engg., JMI New Delhi (2023)',
                    'M.Tech – Electronics Engineering, AMU Aligarh (2016)',
                    'B.Tech – Electronics Engineering, AMU Aligarh (2014)'
                ],
                bio: 'Qualified GATE multiple times (ECE) & UGC-NET JRF twice. Worked as JRF and Asst. Prof. (contractual) at JMI. Published 7 research papers in internationally indexed journals.',
                interests: ['Wireless Communication', 'Mobile Communication', '5G & Beyond'],
                papers: 7,
            },
            {
                name: 'Ms. Shariqua Razi',
                designation: 'Assistant Professor (Guest)',
                experience: '3+ Years',
                email: 'shariqua.razi.sr@gmail.com',
                phone: '+91-8572881384',
                image: '/faculty/cse/Ms. SHARIQUA Razi.png',
                education: [],
                bio: null,
                interests: [],
                papers: null,
            },
            {
                name: 'Mr. Naseem Ahmad',
                designation: 'Assistant Professor (Guest)',
                experience: '10+ Years',
                email: 'naseemahmed0592@gmail.com',
                phone: '+91-8586954767',
                image: null,
                education: [],
                bio: null,
                interests: [],
                papers: null,
            },
        ],
        labs: [
            { name: 'Programming for Problem Solving Using C', resources: 'C Programming Environment, Turbo C, GCC Compiler' },
            { name: 'Engineering Graphics and Web Design Lab', resources: 'AutoCAD, HTML/CSS/JS Tools' },
            { name: 'Data Structures & Algorithms Lab Using C', resources: 'C/C++ IDEs, Visualization Tools' },
            { name: 'Advanced Data Structures Lab', resources: 'Advanced Algorithm Simulators' },
            { name: 'Database Management Systems Lab', resources: 'MySQL, Oracle, SQL Server' },
            { name: 'Programming with C++ Lab', resources: 'C++ Compilers, OOP Tools' },
            { name: 'Python Programming Lab', resources: 'Python/Anaconda, Jupyter Notebooks' },
            { name: 'Operating System Lab', resources: 'Linux Systems, Shell Programming' },
            { name: 'R-Programming Lab', resources: 'RStudio, Data Analysis Tools' },
            { name: 'Programming in Java Lab', resources: 'JDK, Eclipse/IntelliJ IDE' },
            { name: 'Computer Network Lab', resources: 'Cisco Switches, Routers, LAN Trainers' },
            { name: 'Advanced Java Lab', resources: 'J2EE, Spring Framework, Servlet Tools' },
            { name: 'Design and Analysis of Algorithm Lab', resources: 'Algorithm Visualization, Complexity Analyzers' },
            { name: 'Internet of Things Lab', resources: 'Arduino, Raspberry Pi, Sensors' },
            { name: 'Neural Networks Lab', resources: 'TensorFlow, Keras, GPU Workstations' },
            { name: 'Big Data Analytics Lab', resources: 'Hadoop, Spark, Data Pipelines' },
            { name: 'Machine Learning Lab', resources: 'Scikit-learn, Python ML Libraries' },
            { name: 'Institutional Project Lab', resources: 'Project Development Environment' }
        ],
        subjects: ['Data Structures & Algorithms', 'Operating Systems', 'Computer Networks', 'Database Management', 'Machine Learning', 'Neural Networks', 'Big Data Analytics', 'Internet of Things', 'Design & Analysis of Algorithms', 'Java Programming', 'Python Programming', 'R-Programming'],
        faqs: [
            { q: "What are the primary career roles for CSE graduates?", a: "Graduates typically secure roles in Software Engineering, Web Development, Cloud Computing, and AI/ML Engineering in leading IT firms." },
            { q: "Are there industry projects or coding bootcamps?", a: "Yes, the department organizes regular coding bootcamps, developer workshops, and hands-on institutional projects to build real-world developer capabilities." },
            { q: "What facilities are available in the computer labs?", a: "Our computer labs are fully air-conditioned and equipped with high-speed internet, modern hardware systems, and industry-standard software environments." },
            { q: "Do students receive placement assistance?", a: "The college hosts a dedicated Training & Placement Cell that trains students on mock interviews, soft skills, and connects them with campus recruitment drives." }
        ]
    },
    {
        id: 'civil',
        name: 'Civil Engineering',
        shortName: 'CE',
        seats: 60,
        description: 'The Civil Engineering Department was started in 2011–12 as a part of the college\'s expansion to meet growing demand for technical education in the region. The Department offers B.Tech program in Civil Engineering with an approved intake of 60 seats. The program is affiliated to Gurugram University, Gurugram (GUG) and approved by AICTE.',
        detailedDescription: 'It focuses on core areas like structural engineering, construction technology, water resources and environmental engineering, surveying, soil mechanics and foundation engineering combining theoretical knowledge with practical exposure through laboratory work and field studies, including Computer Aided Civil Engineering Drawing & Analysis using various software. The department encourages research-oriented learning and problem-solving skills. It aims to produce competent engineers who can contribute effectively to society by designing safe, efficient, and sustainable infrastructure.',
        icon: '\uD83C\uDFD7\uFE0F',
        iconImg: '/images/cursor/icon_15.webp',
        highlights: ['Material Testing Lab', 'Survey Instruments', 'CAD Software', 'Site Visits', 'Field Studies', 'Research Oriented'],
        hod: {
            name: 'Mr. Kaushar Hussain',
            designation: 'HOD & Assistant Professor',
            experience: '12+ Years',
            email: 'kaushar.hussain@gmail.com',
            phone: '+91-9868047105',
            image: '/faculty/ced/Mr. Kaushar Hussain.jpg',
            education: [
                'M.E. – Water Resources & Hydraulic Engineering, Jadavpur University (2011)',
                'B.Tech. – Civil Engineering, Jamia Millia Islamia (2007)'
            ],
            bio: 'Contributing to the development of CE Deptt since 2012. Served as HoD from 2017 to 2022. Experience in structural design using STAAD.PRO, STRAP, ETABS as a Design Engineer. Contributed to various projects by National Afforestation & Eco-development Board.',
            interests: ['Desalination techniques', 'Wastewater treatment', 'Groundwater recharge', 'Water resources'],
        },
        faculty: [
            {
                name: 'Dr. Nadeem A Khan',
                designation: 'Assistant Professor (On Leave)',
                experience: '13+ Years',
                email: 'nadeem.khan@mecw.ac.in',
                phone: '+91-9813717319',
                image: '/faculty/ced/Dr. Nadeem A Khan.jpg',
                education: [
                    'Ph.D. – Jamia Millia Islamia, New Delhi (2022)',
                    'M.Tech. – Environmental Engineering (Honors), AMU (2011)'
                ],
                bio: 'Currently working as Post Doc Fellow in KFUPM, Saudi Arabia. Worked as HoD from 2014 to 2017. Awarded Best Young Scientist Award (Male) by LWT India. Editorial board member of Nature journal- Scientific Reports. Published more than 10 PATENTS.',
                interests: ['Environmental Engineering', 'Wastewater treatment', 'GIS mapping'],
                papers: 80,
            },
            {
                name: 'Dr. Tofeeq Alam',
                designation: 'Assistant Professor',
                experience: '4+ Years',
                email: 'tofeeq.alam@mecw.ac.in',
                phone: '+91-9058016190',
                image: '/faculty/ced/Dr. Tofeeq Alam.jpg',
                education: [
                    'Ph.D. – Environmental Engineering, AMU (2021)',
                    'M.Tech. – Environmental Engineering (Hons.), AMU (2015)',
                    'B.Tech. – Civil Engineering, AKTU Lucknow (2012)'
                ],
                bio: 'Worked as Research Fellow (JRF/SRF) for two years in the International Indo-Euro Collaborated Research Project SWINGS. Qualified GATE 2013 with 94 Percentile.',
                interests: ['Environmental Engineering', 'Water and Wastewater Treatment', 'Natural Wetlands'],
                papers: 10,
            },
            {
                name: 'Prof. Vimal Gupta',
                designation: 'Professor (Adjunct)',
                email: 'vimalgupta@hmctech.co.in',
                image: '/faculty/ced/Vimal Gupta.jpg'
            },
            {
                name: 'Prof. Mansoor Ul Haq Khan',
                designation: 'Professor',
                email: 'skylinebuilders2011@gmail.com',
                image: '/faculty/ced/Mr. Mansoor Ali Khan.jpg'
            },
            {
                name: 'Mr. Syed Emaduddin Ahmed',
                designation: 'Assistant Professor',
                email: 'emad.ahmed06@gmail.com',
                phone: '+91-9971773390',
                image: '/faculty/ced/Mr. Syed Emaduddin Ahmed.jpg'
            },
            {
                name: 'Mr. Asruddin',
                designation: 'Assistant Professor (Guest)',
                phone: '+91-9996971754',
                image: '/faculty/ced/Mr. Asruddin.jpg'
            },
            {
                name: 'Mr. Irshad',
                designation: 'Assistant Professor (Guest)',
                phone: '+91-9996971754',
                image: '/faculty/ced/Mr. Irshad.jpg'
            }
        ],
        labs: [
            { name: 'Building Drawing Lab', resources: 'Drawing Boards, Drafting Instruments' },
            { name: 'Engineering Mechanics Lab', resources: 'Mechanics Testing Equipment' },
            { name: 'Fluid Mechanics Lab', resources: 'Turbines, Pumps, Venturimeters' },
            { name: 'Surveying Lab', resources: 'Total Station, Theodolites, Dumpy Levels' },
            { name: 'Fluid Mechanics II Lab', resources: 'Advanced Flow Measurement Systems' },
            { name: 'Structural Analysis Lab', resources: 'UTM Machines, Structural Models' },
            { name: 'Surveying II Lab', resources: 'GPS, EDM, Advanced Survey Instruments' },
            { name: 'Material Testing & Evaluation Lab', resources: 'Concrete Testing, Material Analysis' },
            { name: 'RCC Drawing Lab', resources: 'Reinforcement Detailing Tools' },
            { name: 'Transportation Engineering Lab', resources: 'CBR, Aggregate Testing Equipment' },
            { name: 'Soil Mechanics Lab', resources: 'Soil Testing Kits, Triaxial Apparatus' },
            { name: 'Design of Steel', resources: 'Steel Design Software, Models' },
            { name: 'Structure Drawing Lab', resources: 'AutoCAD, Structural Drafting Tools' },
            { name: 'Engineering Geology Lab', resources: 'Rock & Mineral Specimens, Maps' },
            { name: 'Environmental Engineering Lab', resources: 'Water Quality Testing Kits' },
            { name: 'Foundation Engineering Lab', resources: 'Bearing Capacity Equipment' },
            { name: 'Irrigation Drawing Lab', resources: 'Canal & Dam Design Tools' },
            { name: 'Estimating Costing and Valuation Lab', resources: 'Estimation Software' },
            { name: 'Computer Aided Civil Engineering Design', resources: 'AutoCAD, STAAD.Pro, ETABS' },
            { name: 'Project Work', resources: 'Project Development Environment' },
            { name: 'Research Publication', resources: 'Research Tools & Resources' },
            { name: 'Industrial Training', resources: 'Industry Partnerships' }
        ],
        subjects: ['Structural Analysis', 'Surveying', 'Fluid Mechanics', 'Soil Mechanics', 'Construction Technology', 'Environmental Engineering', 'Transportation Engineering', 'Foundation Engineering', 'RCC Design', 'Steel Design', 'Engineering Geology', 'Irrigation Engineering'],
        faqs: [
            { q: "Which design software tools are part of the curriculum?", a: "Students are trained in industry-leading tools like AutoCAD, STAAD.Pro, and ETABS for structural modeling and design." },
            { q: "What hands-on field experience is offered?", a: "We conduct surveying camps, geological study trips, and concrete testing workshops in our advanced material testing labs." },
            { q: "What are the career opportunities in Civil Engineering?", a: "Graduates find opportunities in structural designing, infrastructure development, environmental engineering, and government services like PWD." },
            { q: "Is there a focus on sustainable construction?", a: "Yes, the program emphasizes eco-friendly construction techniques, rainwater harvesting architectures, and green design practices." }
        ]
    },
    {
        id: 'mechanical',
        name: 'Mechanical Engineering',
        shortName: 'ME',
        seats: 60,
        description: 'The Mechanical Engineering Department is one of the important departments of MEC. It has state-of-the-art infrastructure and best facilities. It has qualified and dedicated faculty, with academic as well as industrial experience.',
        detailedDescription: 'The department focuses on equipping students with strong fundamentals in mechanical sciences, thermal engineering, design, analysis, manufacturing and maintenance of mechanical systems, supported by modern laboratories and industry-oriented training.',
        icon: '\u2699\uFE0F',
        iconImg: '/images/cursor/icon_16.webp',
        highlights: ['Workshop Facilities', 'Advanced CAD/CAM Lab', 'Honda Lab', 'Modern CNC & Automation Lab', 'Industrial Oriented Training'],
        hod: {
            name: 'Dr. Gaurav Aggarwal',
            designation: 'HOD',
            experience: '16+ Years',
            education: 'B. Tech, M. Tech, Ph.D.',
            email: 'gaurav.citm@gmail.com',
            phone: '98930656646',
            image: '/faculty/med/Dr. Gaurav Aggarwal.jpg'
        },
        faculty: [
            {
                name: 'Prof. Vineet Jain',
                designation: 'Professor',
                experience: '25+ Years',
                email: 'vjdj2004@gmail.com',
                phone: '+91-8901510570',
                image: '/faculty/med/October4-2019-10-45amVJ.jpg',
                education: [
                    'Ph.D. – Mechanical Engineering, YMCA',
                    'M.Tech. – Manufacturing and Automation, YMCA',
                    'B.E. – Mechanical Engineering, N.I.T. Kurukshetra'
                ],
                bio: 'Possesses more than 20 years’ experience in teaching and industry. Written three books in mechanical engineering. Published papers in international journals like Elsevier, Springer, Emerald, Inderscience, etc.',
                interests: ['Manufacturing technology', 'Operation research', 'Decision making', 'ISM', 'GTMA', 'AHP']
            },
            {
                name: 'Dr. Mohammad Faris',
                designation: 'Assistant Professor',
                experience: '16+ Years',
                email: 'farismecw@gmail.com',
                phone: '+91-9991030028',
                image: '/faculty/med/Dr. Mohammad Faris.jpg'
            },
            {
                name: 'Dr. Mohsin Khan',
                designation: 'Assistant Professor',
                experience: '12+ Years',
                email: 'mohsin.deen@gmail.com',
                phone: '+91-9050816883',
                image: '/faculty/med/July25-2019-3-56pmMohsin khan Photograph HWB.jpg',
                education: [
                    'Ph.D. – Mechanical Engineering, DTU (2025)',
                    'M.Tech. – Thermal Engineering, MVN University',
                    'B.Tech. – Mechanical Engineering, Mewat Engineering College (2014)'
                ],
                bio: 'Joined Mewat Engineering College in 2019. Published extensively in SCIE, SCOPUS-indexed, and UGC Care-listed journals. Recognized with numerous certificates, medals, and prizes for excellence in technical presentations.',
                interests: ['Computational Fluid Dynamics (CFD)', 'Spray Coating', 'Additive Manufacturing', '3D Printing', 'Internal Combustion Engines', 'Automobile Engineering']
            },
            {
                name: 'Dr. Adnan Akhlaq',
                designation: 'Assistant Professor',
                experience: '15+ Years',
                email: 'adnanakhlaq87@gmail.com',
                phone: '+91-9897342786',
                image: '/faculty/med/Dr. AdnanAkhlaq.png',
                education: [
                    'M.Tech – Machine Design, AMU (2011)',
                    'B.Tech – Mechanical Engineering (2009)'
                ],
                bio: 'Joined MEC in 2012. Twice qualified Gate in 2009 and 2010. Published/presented 3 research papers in National Conferences.',
                interests: ['Machine Design', 'Smart Structures', 'Mechanisms & Machines', 'Robotics']
            },
            {
                name: 'Dr. Mohd Iqbal',
                designation: 'Assistant Professor',
                experience: '15+ Years',
                email: 'mohmadiqbal_86@yahoo.com',
                phone: '+91-9467325101',
                image: '/faculty/med/Dr. Mohd Iqbal.png',
                education: [
                    'Pursuing Ph.D. – YMCAUST, Faridabad',
                    'M. Tech. – Integrated Product Design & Manufacturing, GJU Hisar (2011)',
                    'B. Tech – Mechanical Engineering, Kurukshetra University (2009)'
                ],
                bio: 'Joined MEC in 2012. Worked at Applied College of Management and Engineering, Palwal (2011-2012) and JIET, Jind (2008-2009). Published 4 papers in International journals and Conferences.',
                papers: 4
            },
            {
                name: 'Dr. Wasim Akram',
                designation: 'Assistant Professor',
                experience: '15+ Years',
                email: 'wasimakramkhan18@gmail.com',
                phone: '+91-9717524636',
                image: '/faculty/med/Dr. Wasim Akram.jpg',
                education: [
                    'M. Tech. – Machine Design (2013)',
                    'B.Tech. – Mechanical Engineering (2010)'
                ],
                bio: 'University topper in M.Tech with 85.5%. Received best lecturer’s award at BHCET Faridabad. Worked as Head of the department of mechanical engineering at WIT Sohna. Joined MEC in August 2014.'
            },
            {
                name: 'Ms. Sultana',
                designation: 'Assistant Professor',
                experience: '9+ Years',
                email: 'sultana9555@gmail.com',
                phone: '+91-7015971605',
                image: '/faculty/med/Ms. Sultana.jpeg',
                education: [
                    'M.Tech – Manufacturing Technology, Kurukshetra University (2015)',
                    'B.Tech. – Chaudhary Devilal University Sirsa (2013)'
                ],
                bio: 'Appointed as Assistant Professor at MEC in 2019. Previously worked as Visiting Faculty in Government Polytechnic College for Women in Faridabad from 2016. Published 4 research papers.',
                papers: 4
            },
            {
                name: 'Mr. Ayaz Mehmood',
                designation: 'Assistant Professor',
                experience: '17+ Years',
                email: 'ayaz.amu09@gmail.com',
                phone: '+91-8059104876',
                image: '/faculty/med/Mr. Ayaz Mehmood.png',
                education: [
                    'M.Tech. – Thermal Science, AMU Aligarh (2009)',
                    'B.Tech. – AMU (2006)'
                ],
                bio: 'Assistant Professor since 2011. Worked as Senior Lecturer in World Institute of Technology, Sohna (2010-2011) and guest faculty in Zakir Hussain College of Engg. & Tech, AMU (2007-2010).',
                interests: ['Thermodynamic', 'Heat Transfer', 'Refrigeration', 'Air Conditioning']
            },
            {
                name: 'Mr. Nazim Ali Khan',
                designation: 'Assistant Professor',
                experience: '18+ Years',
                email: 'mail2nazim@gmail.com',
                phone: '+91-9013461834',
                image: '/faculty/med/Mr. Nazim Ali Khan.jpg',
                education: [
                    'M. Tech. – Production, Singhania University (2012)',
                    'B.Tech – Mechanical Engineering, Al-Falah School of Engg. & Tech.',
                    'Diploma in Mechanical Engineering design, CADD Centre'
                ],
                bio: 'Joined MEC as lecturer in 2010. Started career at Dee Development Engineers Pvt. Ltd. (2007-2009) where he rapidly got promoted to Sr. Engineer in Quality Control.'
            },
            {
                name: 'Prof. (Dr.) Shamama Ahmed',
                designation: 'Faculty',
                image: '/faculty/med/Prof.(Dr. Shamama Ahmed.jpg'
            }
        ],
        labs: [
            { name: 'Engineering Graphics & Drawing', resources: 'Drawing Boards, AutoCAD Station' },
            { name: 'Workshop Technology', resources: 'Lathe Machines, Milling, Shaping Machines' },
            { name: 'Strength of Materials Lab', resources: 'Universal Testing Machine, Torsion Testing' },
            { name: 'Engineering Mechanics Lab', resources: 'Friction Slides, Truss Models, Jib Cranes' },
            { name: 'Kinematics of Machine Lab', resources: 'Gyroscopic Couple setup, Governor setup' },
            { name: 'Dynamics of Machine Lab', resources: 'Balancing setup, Vibration analysis tools' },
            { name: 'Fluid Mechanics Lab', resources: 'Orifice Meter Setup, Venturimeter Setup' },
            { name: 'Fluid Machine Lab', resources: 'Pelton Wheel Turbine, Francis Turbine' },
            { name: 'Instrumentation & Control Lab', resources: 'Temperature & Pressure Transducers' },
            { name: 'Automobile Engineering Lab', resources: 'Chassis Models, Multi-cylinder petrol engine' },
            { name: 'ICE & Gas Turbines Lab', resources: 'Internal Combustion Engine setups' },
            { name: 'Advanced CAD/CAM Lab', resources: 'SolidWorks, AutoCAD, CNC Lathe Simulation' },
            { name: 'Manufacturing Technology Lab', resources: 'Welding Setup, Casting Sand testing' },
            { name: 'Heat Transfer Lab', resources: 'Thermal Conductivity setup, Heat Exchangers' },
            { name: 'Steam & Power Generation Lab', resources: 'Steam Engine Model, Boiler Models' },
            { name: 'Materials Science Lab', resources: 'Metallurgical Microscopes, Polishers' },
            { name: 'Refrigeration & Air- Conditioning Lab', resources: 'Refrigeration Cycle setup, AC trainers' },
            { name: 'Honda Lab', resources: 'Specially Sponsored Automotive Training Engine & Setup' }
        ],
        subjects: ['Thermodynamics', 'Machine Design', 'Heat Transfer', 'Manufacturing Processes', 'CAD/CAM', 'Automobile Engineering', 'Fluid Mechanics', 'Fluid Machinery', 'Power Plant Engineering', 'Material Science', 'Refrigeration & Air Conditioning', 'Kinematics of Machines'],
        faqs: [
            { q: "What is the specialized Honda Lab?", a: "The Honda Lab is an industry-sponsored training lab equipped with engines and cut-section chassis models to give students real-world automotive insights." },
            { q: "What software tools do students learn?", a: "We train our students in CAD/CAM tools such as SolidWorks, AutoCAD, and CNC simulation software." },
            { q: "What workshop facilities are available?", a: "Our central workshop is equipped with standard tools including lathes, milling machinery, shapers, and fabrication/welding equipment." },
            { q: "What industries recruit ME graduates?", a: "Graduates find careers in automotive manufacturing, thermal power stations, aerospace firms, robotics engineering, and heavy machinery production." }
        ]
    },
    {
        id: 'eee',
        name: 'Electrical & Electronics Engineering',
        shortName: 'EEE',
        seats: 60,
        description: 'The Electrical and Electronics Engineering Department has qualified faculty having research and teaching experience. The EEE Department has modern laboratories to make students aware of recent developments in the field and also enable them to compete in job market.',
        detailedDescription: 'Students are trained using laboratory facilities in the areas of electricity generation, transmission, distribution and control and also in design and manufacturing activities. A number of the lab experiments are kit based. The labs are well equipped with quality machinery and manned by experienced technical and lab assistants and capable of meeting the requirements and challenges faced by students.',
        icon: '\u26A1',
        iconImg: '/images/cursor/icon_18.webp',
        highlights: ['Electricity Generation & Control Lab', 'Smart Grid Training', 'Industrial Machinery', 'Kit-Based Lab Experiments', 'Modern SCADA & PLC Systems'],
        hod: {
            name: 'Dr. Mohd. Faraz Ahmer',
            designation: 'HOD',
            experience: '17+ Years',
            education: 'B.Tech, M.Tech, Ph.D.',
            email: 'farazahmer007@gmail.com',
            phone: '9837120981',
            image: '/faculty/eeed/Dr. Mohammad Faraz Ahmer.png',
            bio: 'Mr. Ahmer is working as Assistant Professor in Electrical & Electronics Engineering since 2012. He did his B.E. in 2007 and M.Tech. in Power System & Drives in 2009 from Aligarh Muslim University. He has also done Diploma in Engineering (Electrical & Instrumentation) with Honours in 2003 from A.M.U Aligarh. He taught at Aligarh University from 2009 to 2011. He has published 15 research papers in reputed international journals and conferences and presented one paper in national conference at NIT Hamirpur. His areas of interest are AGC, Electrospinning and Renewable Energy Resources.'
        },
        faculty: [
            {
                name: 'Prof. Khwaja M Rafi',
                designation: 'Director / Professor (F.N.A.Sc.)',
                experience: '25+ Years',
                email: 'kmrafi1@gmail.com',
                phone: '+91-9873717806',
                image: '/faculty/eeed/director_khwaja_rafi.png',
                bio: 'In recognition of his valuable services to the emancipation of minority community, Dr. Khwaja M Rafi was conferred with ” SITARE-E-JAMIA” Award 2017 by Alumnai association JMI, Lucknow. Now he has been bestowed the responsibility as Director of Mewat Engineering College.'
            },
            {
                name: 'Dr. Shamshad Ali',
                designation: 'Assistant Professor',
                experience: '22+ Years',
                email: 'shamshad.jmi@gmail.com',
                phone: '9718184339',
                image: '/faculty/eeed/DR. Shamshad Ali.png'
            },
            {
                name: 'Dr. Tazeem Ahmad Khan',
                designation: 'Associate Professor',
                experience: '25+ Years',
                email: 'tazeemkhan1991@gmail.com',
                phone: '9718747468',
                image: '/faculty/eeed/Dr. Tazeem A Khan.jpg'
            },
            {
                name: 'Mr. Mohd Umar Khan',
                designation: 'Assistant Professor',
                experience: '30+ Years',
                email: 'mukhan.lko@gmail.com',
                phone: '9050135552',
                image: '/faculty/eeed/Mr. Mohd Umar.jpg',
                education: [
                    'M. Tech. – Instrumentation and Control, AMU (2003)',
                    'B. Sc. Engineering (Electrical) – AMU (1994)'
                ],
                interests: ['Control system', 'Instrumentation', 'Electrical Machines']
            },
            {
                name: 'Dr. Mohammad Junaid Khan',
                designation: 'Assistant Professor (On Leave)',
                experience: '10+ Years',
                email: 'mohammad.khan444@gmail.com',
                phone: '9569365512',
                image: '/faculty/eeed/Dr. Mohammad Juniad Khan.jpeg',
                education: [
                    'Ph.D. – Electrical Engineering, NITTTR Chandigarh (2019)',
                    'M. Tech. – PEC University of Technology Chandigarh (2011)',
                    'B. Tech. – Ujjain Engineering College (2009)'
                ],
                bio: 'Selected for Post Doctorate Fellowship (PDF) at IIT Guwahati. Has granted 01 Indian patent and 02 patents filed. Published 43 research articles including 10 SCI. Awarded Best Paper from RPIIT 2020.',
                interests: ['Artificial Intelligence', 'Controllers', 'Optimization and Control Techniques', 'Renewable Energy Sources'],
                papers: 43
            },
            {
                name: 'Mrs. Shahina Bano',
                designation: 'Assistant Professor',
                experience: '20+ Years',
                email: 'ershahina@gmail.com',
                phone: '+91-9758233716',
                image: '/faculty/eeed/Ms. Shahina Bano.jpeg',
                education: [
                    'M.Tech – Instrumentation and Control, AMU (2006)',
                    'B. Tech. – Electrical Engineering, Jamia Millia Islamia (2001)'
                ],
                bio: 'Joined in 2019. Started career as Lecturer and Assistant Professor at Anand Engineering College, Agra from 2006 to 2014. Worked at Hindustan Institute of Technology and Management, Agra from 2014 to 2019.'
            },
            {
                name: 'Mr. Kamaluddin Khan',
                designation: 'Guest Lecturer',
                email: 'kamaluddinkhan1@gmail.com',
                image: '/faculty/eeed/Mr. kamaluddin Khan.jpg',
                education: [
                    'M.Sc. Engineering – Electrical Engineering, AMU',
                    'B.Sc. Engineering – AMU'
                ],
                bio: 'Joined as Guest Lecturer. Worked for 20 years in the Department of Electrical Engineering at AMU. Taught for 15 years at Yanbu Industrial College in Saudi Arabia.',
                interests: ['Microprocessors', 'Microcontrollers', 'Electric Drives', 'Power Electronics']
            },
            {
                name: 'Prof. D. K. Sharma',
                designation: 'Professor (Adjunct)',
                image: '/faculty/eeed/Prof. D. K. Sharma.jpg'
            },
            {
                name: 'Mr. Afroz Khalid',
                designation: 'Associate Professor (Adjunct)',
                email: 'afrozkhalid00@gmail.com',
                image: '/faculty/eeed/Mr. Afroz Khalid.jpg'
            },
            {
                name: 'Mr. Kamil Hasan',
                designation: 'Assistant Professor',
                experience: '18+ Years',
                phone: '+91-9818396251',
                image: '/faculty/eeed/KAMIL.jpg'
            },
            {
                name: 'Mr. Ishrat Jamal Nasir',
                designation: 'Assistant Professor',
                experience: '15+ Years',
                email: 'ishratjamaln@gmail.com',
                phone: '9953238357'
            },
            {
                name: 'Syed Moazzam Ali',
                designation: 'Assistant Professor',
                phone: '8954970013'
            }
        ],
        labs: [
            { name: 'Electrical Technology Lab', resources: 'Basic Electrical Kits, Multimeters, Power Supplies' },
            { name: 'Instrumentation Lab', resources: 'Transducers, Measurement Bridges, Calibration Kits' },
            { name: 'Control Systems Engineering Lab', resources: 'Servomotors, Feedback Control Systems, PID Controllers' },
            { name: 'Electrical Machines - I Lab', resources: 'DC Motors, DC Generators, Single Phase Transformers' },
            { name: 'Electrical Workshop Lab', resources: 'Wiring Materials, Winding Machines, Tools' },
            { name: 'Network Theory Lab', resources: 'Network Theorems Verification Kits, RLC Circuits' },
            { name: 'Electrical Machine-II Lab', resources: 'AC Motors, Alternators, Three Phase Transformers' },
            { name: 'Power Electronics Lab', resources: 'SCR, Choppers, Inverters, Cycloconverters' },
            { name: 'PLCS & SCADA Lab', resources: 'PLC Trainers, SCADA Software, Simulation Panels' },
            { name: 'Electrical Measurement', resources: 'Galvanometers, Wattmeters, Energy Meters' },
            { name: 'Power Systems Lab', resources: 'Transmission Line Simulators, Relays, Circuit Breaker Models' },
            { name: 'Computer Aided Electrical M/c Design', resources: 'Electrical CAD Software, Simulation Environments' }
        ],
        subjects: ['Power Systems', 'Control Theory', 'Electrical Machines', 'Digital Electronics', 'Power Electronics', 'Electrical Measurements', 'Network Theory', 'SCADA & PLCs', 'Electrical Machine Design', 'Signals & Systems', 'Instrumentation'],
        faqs: [
            { q: "What advanced automation labs are available?", a: "Students train in the PLCS & SCADA Lab, Power Electronics Lab, and the Power Systems Lab with modern simulation panels." },
            { q: "What industries hire EEE graduates?", a: "Graduates are recruited by power generation firms, smart grid developers, industrial automation sectors, and electrical design companies." },
            { q: "Are there opportunities in clean energy research?", a: "Yes, our academic modules cover solar photovoltaic setups, wind turbine mechanics, and smart power grids integration." },
            { q: "What design software is covered in EEE?", a: "We teach electrical simulations using widely-used tools including MATLAB, PSpice, and electrical layout CAD suites." }
        ]
    },
    {
        id: 'ece',
        name: 'Electronics & Communication Engineering',
        shortName: 'ECE',
        seats: 30,
        description: 'The teaching and learning processes in Electronics and Communication Engineering Department (ECE) have been designed in a way that helps students get placement in leading telecom, electronics design, equipment manufacturing and IT companies and jobs in other sectors like education sector and different public sector organizations.',
        detailedDescription: 'The department has well qualified and experienced faculty the labs house quality equipment along with the Software like MatLab, PSPICE, XILINX with microprocessor kits for real time applications. FPGA, CPLD are used by the students of this department to keep them abreast with the market. The strength of the department lies in its state-of-the-art and well equipped Labs. Labs are quite spacious and a number of students perform experiments at one time. Every lab has Instruction manuals for every experiment the students perform and are regularly revised.',
        icon: '\uD83D\uDCE1',
        iconImg: '/images/cursor/icon_12.webp',
        highlights: ['Microprocessor Kits', 'Xilinx & VLSI Software', 'FPGA & CPLD Training', 'MatLab & PSPICE Lab', 'Spacious & Modern Labs'],
        hod: {
            name: 'Dr. Shaheen Khan',
            designation: 'HOD & Sr. Assistant Professor',
            experience: '20+ Years',
            email: 'shaheen.khan.2@gmail.com',
            phone: '+91-8930340170',
            image: '/faculty/eced/Dr. Shaheen Khan.png',
            education: [
                'Ph.D. – Jamia Millia Islamia, New Delhi (2020)',
                'M.Tech. – ITM University, Gurgaon (2006)',
                'B.Tech. – Electronics & Communication, ITM University (2001)'
            ],
            bio: 'Joined the College in 2010. Worked in Hewitt Associates (India) Pvt. Ltd. (a US based MNC) during 2005 - 2010. Briefly worked in the UK (Hemel Hampstead). Life member of IETE.',
        },
        faculty: [
            {
                name: 'Dr. Naseem Ahmad',
                designation: 'Assistant Professor',
                experience: '17+ Years',
                email: 'naseem047@gmail.com',
                phone: '+91-8569803605',
                image: '/faculty/eced/Dr. Naseem_Ahmed.png',
                education: [
                    'Pursuing Ph.D. – NIT Silchar',
                    'M.Tech. – Electronics and Communication Engineering (2009)',
                    'B.E. – Electronics and Communication Engineering (2007)'
                ],
                bio: 'Joined as Assistant Professor in 2012. Previously worked as a lecturer in several academic institutions in the NCR region.',
            },
            {
                name: 'Mr. Adil Zaidi',
                designation: 'Assistant Professor',
                experience: '15+ Years',
                email: 'adil.zaidi@mecw.ac.in',
                phone: '+91-8700023374',
                image: '/faculty/eced/Mr. Adil Zaidi.jpg',
                education: [
                    'M.Tech. – VLSI Design, Maharishi Dayanand University',
                    'B.Tech. – Electronics & Communication Engineering, UPTU Lucknow (2008)'
                ],
                bio: 'Joined MEC in 2013. Previously served as Assistant Professor at IILM (2010-2013) and Alpine College of Engineering. Co-Guide of two M.Tech Dissertations.',
                interests: ['Analog and Digital VLSI', 'Low Power Circuits', 'Nanoelectronics Circuits'],
                papers: 4
            },
            {
                name: 'Mr. Azeem Zaidi',
                designation: 'Assistant Professor',
                email: 'azeem.zaidi@mecw.ac.in'
            },
            {
                name: 'Mr. Sajid Hussain',
                designation: 'Assistant Professor',
                email: 'hsajid36@gmail.com',
                phone: '+91-9813392062',
            }
        ],
        labs: [
            { name: 'Basics of Electronics Lab', resources: 'Basic Electronics Component Kits, Multimeters, Breadboards' },
            { name: 'Analog Electronics Lab', resources: 'Diodes, Transistor Kit setups, CROs' },
            { name: 'Data Communication Lab', resources: 'Modem setups, Data transmission simulation systems' },
            { name: 'Microprocessors and Interfacing Lab', resources: '8085 & 8086 Microprocessor kits, interfacing cards' },
            { name: 'VLSI Lab', resources: 'Xilinx design software, FPGA & CPLD boards' },
            { name: 'Analog Electronic Circuits Lab', resources: 'Oscilloscope, Function Generators, Power supply units' },
            { name: 'Digital Electronics Lab', resources: 'Logic gate trainer kits, IC test equipment' },
            { name: 'Digital Signal Processing Lab', resources: 'MatLab software, DSP starter boards' },
            { name: 'Radar Engineering Lab', resources: 'Radar trainer setup, microwave test bench' },
            { name: 'Microcontroller & Embedded System Lab', resources: '8051 Microcontrollers, Keil software, Arduino setups' },
            { name: 'Electronic Measurement & Instrumentation Lab', resources: 'Bridges setups, transducers, digital instrumentation' },
            { name: 'PCB and Electronic Workshop Lab', resources: 'PCB designing tools, etching and drilling machine tools' },
            { name: 'Communications System Lab', resources: 'AM/FM transmitter & receiver setups, spectrum analyzer' },
            { name: 'Digital System Design Lab', resources: 'HDL simulation software, FPGA kits' },
            { name: 'Wireless & Satellite Communication Lab', resources: 'Satellite trainer setups, antenna setup tools' },
            { name: 'Principal of Communications Lab', resources: 'Signal modulator and demodulator setups' },
            { name: 'Project Lab', resources: 'General prototyping systems, soldering stations' }
        ],
        subjects: ['Wireless Communication', 'VLSI Design', 'Digital Signal Processing', 'Embedded Systems', 'Microprocessors', 'Radar Engineering', 'Satellite Communication', 'Analog Electronics', 'Digital Electronics', 'Network Analysis', 'Antennas & Propagation'],
        faqs: [
            { q: "What programming and hardware tools are used?", a: "We train students on MATLAB, Xilinx (for VLSI/FPGA design), PSPICE, and microprocessor/microcontroller kits." },
            { q: "What sectors hire ECE graduates?", a: "Graduates work in telecom networks, electronics design, embedded systems, and modern IoT equipment manufacturing industries." },
            { q: "Is there practical training on Embedded Systems?", a: "Yes, our dedicated embedded systems lab facilitates learning with Arduino, Raspberry Pi, and ARM architecture modules." },
            { q: "Do students build custom circuit designs?", a: "Yes, in the PCB and Electronic Workshop Lab, students learn to design, etch, drill, and solder their own operational circuit boards." }
        ]
    },
    {
        id: 'ash',
        name: 'Applied Sciences & Humanities',
        shortName: 'AS&H',
        description: 'The department is progressing with a vision for developing efficient and technically sound students to outperform in their career worldwide.',
        detailedDescription: 'Our mission is to educate students, with individual attention, provide world-class quality education and take care of character building. The excellent education system provided by the department is aimed at making a distinctive and positive impact on the students and the society.',
        icon: '\uD83D\uDCDA',
        iconImg: '/images/cursor/icon_10.webp',
        highlights: ['Physics Lab', 'Applied Chemistry Lab', 'English Language Lab', 'Individual Student Attention', 'Character Building Focus'],
        hod: {
            name: 'Dr. Khalid Hussain',
            designation: 'HOD',
            experience: '16+ Years',
            email: 'khalidchem83@yahoo.co.in',
            phone: '+91-8295564786',
            image: '/faculty/ash/Dr. Khalid Hussain.png',
            education: [
                'Ph.D. – Synthetic Studies, Kurukshetra University',
                'M.Sc. – Organic Chemistry, Kurukshetra University (2006)'
            ],
            bio: 'Associate Professor in Chemistry since 2012. Qualified four times CSIR-JRF NET. Got First position in M.Sc entrance exam. Worked as Head of Chemistry Department from 2010 to 2012. Editor and member in various conferences and seminars.',
            interests: ['Synthetic studies involving Hypervalent Iodine reagents'],
            papers: 14
        },
        faculty: [
            {
                name: 'Prof. Ali Mohammad',
                designation: 'Professor (F.N.A.Sc.)',
                email: 'alimohammad08@gmail.com',
                image: '/faculty/ash/Prof. Ali Mohammad.jpg'
            },
            {
                name: 'Dr. Kaleem Ahmed Quraishi',
                designation: 'Associate Professor',
                experience: '20+ Years',
                email: 'kaleemspn@yahoo.co.in',
                phone: '+91-9718921060',
                image: '/faculty/ash/Dr. Kaleem A Quraishi.png',
                education: [
                    'Ph.D. – Mathematics, Jamia Millia Islamia (2011)',
                    'M.Sc. – Mathematics with Computer Science, Jamia Millia Islamia (2005)'
                ],
                bio: 'Associate Professor in Mathematics since 2010. Started career as Lecturer at Al-Falah School of Engineering & Technology (2005). Life time member of Rajasthan Ganita Parishad and Society of Special Functions. Controller of Examinations and Incharge of AICTE approval committee.',
                papers: 52
            },
            {
                name: 'Dr. Mohammad Chaman',
                designation: 'Associate Professor',
                experience: '20+ Years',
                email: 'chamanmce@rediffmail.com',
                phone: '+91-8059370882',
                image: '/faculty/ash/Dr. Mohd Chaman.png',
                education: [
                    'Ph.D. – AMU Aligarh (2004)',
                    'M.Phil – AMU Aligarh (2002)',
                    'M.Sc. – AMU Aligarh (1999)'
                ],
                bio: 'Associate Professor in the Department of Physics. Worked as Guest Faculty in Department of Applied Physics, AMU from 2005 to 2011. Life member of Solid State Nuclear Track Detectors (SSNTD) Society of India. Associated with Centre of Excellence in Materials Science, AMU.',
                interests: ['Synthesis and characterization of nano-materials'],
                papers: 10
            },
            {
                name: 'Dr. Afzal Fatima',
                designation: 'Assistant Professor',
                experience: '20+ Years',
                email: 'afzaalfatima26@gmail.com',
                phone: '+91-8901106230',
                image: '/faculty/ash/Dr. Afzal fatima.png',
                education: [
                    'Ph.D. – English, Lingayas University, Faridabad',
                    'M.Phil – Madurai Kamraj University',
                    'M.A. – English, Allahabad University (2001)'
                ],
                bio: 'Assistant Professor in English since 2010. Started career as lecturer at Al-Falah School of Engineering & Technology (2001-2004). Worked with M.K.M Group of Colleges for Girls, Hodal from 2008 to 2010. More than eight years of teaching experience.'
            },
            {
                name: 'Dr. Dilshad Ahamad',
                designation: 'Assistant Professor',
                email: 'dlshdhmd4@gmail.com',
                education: [
                    'Ph.D.', 'M.Phil.', 'M.Sc.', 'B.Sc.'
                ]
            }
        ],
        labs: [
            { name: 'Physics Lab', resources: 'Equipped with sophisticated equipment for experiments in physics, plus a separate dark room for optics experiments.' },
            { name: 'Chemistry Lab', resources: 'Well-equipped Applied Chemistry Lab to get hands-on experience of classroom theoretical concepts.' },
            { name: 'English Language Lab', resources: 'Dedicated language training facilities focusing on soft skills and English communication confidence.' }
        ],
        subjects: ['Engineering Mathematics', 'Engineering Physics', 'Engineering Chemistry', 'Communication Skills', 'Environmental Science', 'Professional Ethics'],
        faqs: [
            { q: "Why is the AS&H department crucial for engineering?", a: "It builds the absolute fundamentals of mathematics, physics, and chemistry required to excel in advanced engineering semesters." },
            { q: "How does the English Language Lab help students?", a: "It utilizes modern audio-visual aids and interactive software to develop strong soft skills, presentation confidence, and interview readiness." },
            { q: "What physical labs are set up for AS&H?", a: "We host specialized labs for Applied Physics (including lasers/optics darkroom) and Applied Chemistry (including spectrometry and analytics)." },
            { q: "Do students get personalized mentoring?", a: "Yes, we emphasize individual attention with regular mentor-mentee interaction, personality development courses, and counseling." }
        ]
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
    { id: 'placed', label: 'Students Placed', value: 500, suffix: '+', icon: '💼', image: '/images/stat-placed.png' },
    { id: 'gate', label: 'GATE Qualified', value: 50, suffix: '+', icon: '🎓', image: '/images/stat-gate.png' },
    { id: 'air', label: 'Best GATE AIR', value: 48, suffix: '', icon: '🏆', image: '/images/stat-air.png' },
    { id: 'recruiters', label: 'Recruiters', value: 30, suffix: '+', icon: '🤝', image: '/images/stat-recruiters.png' },
    { id: 'books', label: 'Library Books', value: 40000, suffix: '+', icon: '📖', image: '/images/stat-books.png' },
    { id: 'acres', label: 'Campus Acres', value: 28, suffix: '', icon: '🌳', image: '/images/stat-acres.png' }
];

// Highlights
export const highlights = [
    {
        title: 'WAQF Establishment',
        description: 'Established by the Haryana Waqf Board, Government of Haryana',
        icon: '🏛️',
        image: '/images/waqf-illustration.png'
    },
    {
        title: 'AICTE Approved',
        description: 'All programs are approved by AICTE, New Delhi',
        icon: '✅',
        image: '/images/aicte-illustration-v2.png'
    },
    {
        title: 'Gurugram University Affiliated',
        description: 'Affiliated to Gurugram University, Haryana',
        icon: '🎓',
        image: '/images/gurugram-illustration-v2.png'
    },
    {
        title: '100% Placement Assistance',
        description: 'Dedicated placement cell with 100% placement assistance',
        icon: '💼',
        image: '/images/placement-illustration.png'
    },
    {
        title: '50% Fee Concession for Girls',
        description: 'Special fee concession for girl students to promote women in engineering',
        icon: '👩‍🎓',
        image: '/images/girls-illustration.png'
    },
    {
        title: 'GATE 2024 Success',
        description: 'Produced GATE AIR 48 (Dipanshu Garg) and multiple top ranks',
        icon: '🏆',
        image: '/images/gate-illustration.png'
    },
    {
        title: 'Modern Infrastructure',
        description: 'State-of-the-art labs, library, hostel, and sports facilities',
        icon: '🏛️',
        image: '/images/infrastructure-illustration.png'
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
    address: 'Village Palla, Nuh Mewat, Haryana - 122107',
    phone: ['+91 8930340170', '+91 9897342786', '+91 8810610254'],
    email: ['info@mecw.ac.in'],
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

// Recruiters / Recruiting Companies
export const recruiters = [
    'DHBVN', 'ATL', 'Tata Power', 'BHEL', 'Bosch',
    'Indian Oil', 'IBM', 'Hero', 'Infosys', 'CRPF',
    'Mahindra Last Mile Mobility', 'Delhi Metro', 'Roop Polymers Ltd.',
    'GAIL (India) Limited', 'HeliumFour Solar', 'Tech Mahindra', 'CEMtics',
    'UNO Minda', 'L&T Hydrocarbon', 'Sona Comstar',
    'Bihar Technical Service Commission', 'Haryana PWD', 'Syrma SGS',
    'MUVI', 'CJPL', 'POWERGRID'
];

// Placement & Higher Studies Achievers
export const placementAlumni = [
    { name: 'Dipanshu Garg', achievement: 'GATE-2024, AIR-48, CSE', details: 'M.Tech. IIT, Bombay' },
    { name: 'Aslam', achievement: 'GATE-2025, AIR-410, CSI', details: 'M.Tech. IIT Delhi' },
    { name: 'Sammi', achievement: 'GATE-2025, CSE', details: 'M.Tech. IT, DTU, Delhi' },
    { name: 'Mohsin Anwar', achievement: 'CUET-PG-2025, DS/AI', details: 'SCORE 155/300, M.Tech. JNU' },
    { name: 'Prashant Kumar Singh', achievement: 'GATE-2024, CSE Qualify', details: 'M.Tech. AI/ML, DTU, Delhi' },
    { name: 'Mohd Faisal', achievement: 'M.Tech. Data Science', details: 'Jamia Millia Islamia' },
    { name: 'Samina Parween', achievement: 'M.Tech. Power System', details: 'Aligarh Muslim University' },
    { name: 'Mohammad Shaban', achievement: 'JRF, BITS PILANI', details: 'Hyderabad' },
    { name: 'Shazia Aftab', achievement: 'GATE-2025, EEE Qualify', details: 'M.Tech. Mechatronics Engineering, NIT Trichy' },
    { name: 'Madiha Viqar', achievement: 'MBA, IT', details: 'Jamia Millia Islamia' },
    { name: 'Mohammad Uzair', achievement: 'M.Tech. Green Energy', details: 'Sustainable Development, AMU' },
    { name: 'Juned Akram', achievement: 'M.Tech. Data Science', details: 'Jamia Millia Islamia' },
    { name: 'Haris Shoaib', achievement: 'M.Tech. AI', details: 'Aligarh Muslim University' },
    { name: 'Ruksina Khan', achievement: 'M.Tech. AI', details: 'Jamia Millia Islamia' },
    { name: 'Omaima Farooqui', achievement: 'M.Tech. EEE', details: 'Jamia Millia Islamia' },
    { name: 'Moin Khan', achievement: 'M.Tech. Earthquake Engg.', details: 'Jamia Millia Islamia' },
    { name: 'Dipti', achievement: 'M.Tech. CSE', details: 'J.C. Bose University, YMCA, Faridabad' },
    { name: 'Imtiyaz Najar', achievement: 'Ph.D. & Postdoctoral Fellow', details: 'University of Malaysia Sarawak' },
    { name: 'Majid Khan', achievement: 'Ph.D.', details: 'IIT, Mandi' },
    { name: 'Mohd Raheel Shams', achievement: 'M.Tech. Green Energy', details: 'Sustainable Development, AMU' },
];

// Proud Alumni — Entrepreneurs, Leaders, Govt Officers, Engineers
export const proudAlumni = [
    // Entrepreneurs & Leaders
    { name: 'Mir Shaz Ali', role: 'Founder & CEO', organization: 'Expanse Rocket Scientist', category: 'leader' },
    { name: 'Zaurez Ahmad', role: 'Founder and MD', organization: 'Zaurays Solar', category: 'leader' },
    { name: 'Bhart Bhushan Raghav', role: 'Founder & MD', organization: 'Hydrotech Automation and Solutions', category: 'leader' },
    { name: 'Moin Khan', role: 'Software Developer', organization: 'IBM India Pvt. Ltd.', category: 'leader' },
    { name: 'Pragati Bhardwaj', role: 'Junior Programmer', organization: 'Mini Secretariat, Nuh', category: 'leader' },
    { name: 'Fidaus Ahmad Malik', role: 'Director', organization: 'Resonance Coaching Institute, SAPORE', category: 'leader' },
    { name: 'Md Kamran Akhtar', role: 'Founder & MD', organization: 'WebSolGuru', category: 'leader' },
    { name: 'Zishan Ahmad', role: 'Electrical Engineer (OHTL)', organization: 'Saudi Arabia', category: 'leader' },
    { name: 'Zaid Rajput', role: 'CEO: SISS, IITM', organization: 'CEO: Rajput Building Developer', category: 'leader' },
    { name: 'Irfan Aryan', role: 'Assistant Manager', organization: 'UNO MINDA LTD.', category: 'corporate' },
    { name: 'Fazruddin', role: 'Network Administrator', organization: 'Corpotrate Infotech Pvt. Ltd', category: 'corporate' },
    { name: 'Mohd Daood', role: 'Project Engineer', organization: 'DMRC', category: 'corporate' },
    { name: 'Wahid Hussain', role: 'Sr. SEO Analyst', organization: 'Muvi Entertainment Pvt. Ltd', category: 'corporate' },
    { name: 'Sucharita Bansal', role: 'TGT Computer Teacher', organization: 'PW School, Gurugram', category: 'corporate' },
    { name: 'Mohd Akram Anwar', role: 'Sr. System Engineer', organization: 'Infosys', category: 'corporate' },
    { name: 'Mohd Rashid Khan', role: 'Sr. System Engineer', organization: 'Infosys', category: 'corporate' },
    // Government & Public Sector
    { name: 'Samran', role: 'GATE-2017, EEE, AIR-51', organization: 'Executive Engineer, POWERGRID', category: 'govt' },
    { name: 'Riyaz Khan', role: 'SDO', organization: 'Govt. of Haryana', category: 'govt' },
    { name: 'Sarfaraz', role: 'Junior Engineer', organization: 'PWD B&R Department', category: 'govt' },
    { name: 'Shehzad Kamal', role: 'Junior Engineer', organization: 'DHBVN', category: 'govt' },
    { name: 'Imran Khan', role: 'Senior Mechanical Engineer', organization: 'GAIL (INDIA) Limited', category: 'govt' },
    { name: 'Arif Hussain', role: 'Junior Engineer', organization: 'DHBVN', category: 'govt' },
    { name: 'Musarraf', role: 'Junior Engineer', organization: 'PWD', category: 'govt' },
    { name: 'Tasleem', role: 'Junior Engineer', organization: 'PWD', category: 'govt' },
    { name: 'Shamim Ahmad', role: 'Junior Engineer', organization: 'PWD', category: 'govt' },
    { name: 'Aasif Ali', role: 'Junior Engineer', organization: 'DHBVN', category: 'govt' },
    { name: 'Razi Ahmad', role: 'Junior Engineer', organization: 'BTSC', category: 'govt' },
    { name: 'Rashad', role: 'Junior Engineer', organization: 'BTSC', category: 'govt' },
    { name: 'Shahid', role: 'Junior Engineer', organization: 'PWD', category: 'govt' },
    { name: 'Shahid Hussain', role: 'Junior Engineer', organization: 'DHBVN', category: 'govt' },
    { name: 'Saad', role: 'Cyber Crime', organization: 'Haryana Police', category: 'govt' },
    { name: 'Sarfaraz Ahmed', role: 'Junior Engineer', organization: 'DHBVN', category: 'govt' },
    { name: 'Rashid Hussain', role: 'Haryana Police', organization: 'Haryana Police', category: 'govt' },
    { name: 'Mukhtar', role: 'Haryana Police', organization: 'Haryana Police', category: 'govt' },
];

// Industry Collaborations
export const industryCollaborations = [
    {
        name: 'SOLAR Lab (SUKAM Power Systems)',
        icon: '☀️',
        description: 'MEC started a Centre for Smart Solar Energy in collaboration with SUKAM Power Systems Limited. It has got capacity of 5 kW. It serves as a hands-on learning and research platform for students of different streams to carry out their project work in the area of renewable energy.'
    },
    {
        name: 'Honda Two-Wheeler Ltd.',
        icon: '🏍️',
        description: 'MEC established an Automotive Training Lab in collaboration with Honda Motorcycle & Scooter India to provide hands-on training in two-wheeler servicing and maintenance and equip students with industry-standard automotive tools and techniques.'
    },
    {
        name: 'WAMSI (Waqf Asset Mapping)',
        icon: '🗺️',
        description: 'MEC has started the GIS mapping of Haryana Waqf properties to digitally map waqf properties across the state with an objective to generate transparency & accountability, revenue optimization and better identification and legal tracking of illegally occupied waqf assets.'
    },
    {
        name: 'MMTC Limited',
        icon: '🏛️',
        description: 'MMTC, a Miniratna Central Public Sector Undertaking under the Ministry of Commerce & Industry, Government of India, has actively engaged with MEC through its Corporate Social Responsibility (CSR) initiatives. The collaboration focuses on scholarships for deserving students and skill development programs.'
    },
    {
        name: 'MSME Technology Centre Bhiwandi',
        icon: '🏭',
        description: 'MEC collaborates with the Ministry of Micro, Small & Medium Enterprises (MSME), Government of India, to promote skill-based learning, industry exposure, and entrepreneurship. Students gain hands-on experience in advanced manufacturing technologies, CAD/CAM systems, automation tools, and product design processes.'
    },
    {
        name: 'ICAT Manesar',
        icon: '🚗',
        description: 'ICAT is a government-backed automotive R&D and testing hub with world-class facilities for homologation, NVH, crash testing, EV validation and new startup incubation centre. MEC partners with ICAT for organizing workshops, industrial training, and seminars for engineering students.'
    },
    {
        name: 'Uno Minda',
        icon: '⚡',
        description: 'MEC has initiated collaboration with Uno Minda, a global leader in automotive components and electronic systems, to bridge academic learning and industrial skills by offering students industrial trainings, technical workshops for hands-on experience in automotive electronics, embedded systems, sensor integration, and quality assurance.'
    },
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
    history: [
        "The Haryana Waqf Board is the parental body which was established by the Haryana Government under section 13 (1) of the Waqf Act, 1995 vide its Notification No. 18/2/96-3JJ (I) dated 1.08.2003 with its headquarters at 50, Sardar Patel Marg, Ambala Cantt. The Board has been actively engaged in various educational and welfare programmes. Mewat Engineering College was established by the Haryana Waqf Board as one of the institutions for promoting knowledge and learning among the Muslim minority community. Looking into the vast potential of industrial development in the state, the Board took a conscious decision and established Mewat Engineering College in the minority concentrated and educationally backward region of the state to produce skilled and trained manpower in the emerging areas of technology.",
        "Mewat Engineering College (WAQF) was established by the Haryana Waqf Board (Government of Haryana) in 2010 to provide quality technical education to the students of the Mewat region and beyond. Situated on a sprawling 28-acre campus in Palla, Nuh, the college is a pioneer institution in the region, bridging the gap in professional education for underserved communities.",
        "Approved by AICTE, New Delhi, and affiliated to Gurugram University, Gurugram (GUG), MEC offers B.Tech programs in five engineering disciplines with a total intake of 210 students per year. The college is known for its inclusive approach, offering 50% fee concession for girl students to promote women in engineering."
    ],
    vision: 'Strongly nourished by optimism, diligence, ingenuity and a strong sense of responsibility towards creating purposeful impact in the globe by achieving excellence in technical education, research, innovation and high ideals for a global society.',
    mission: [
        'To identify global needs and areas of specialization based on stakeholders.',
        'To produce highly motivated scientific Professionals, Entrepreneurs and researchers.',
        'To provide an innovative, teaching, mechanisms, good human values, requisite skills and competencies for the needs of industry and humanity.',
        'To encourage collaboration with educational institutes, Industry and reputed research institutes.'
    ],
    coreValues: [
        { title: 'Integrity', description: 'Academic integrity and accountability.', icon: '🛡️' },
        { title: 'Respect', description: 'Respecting students as budding engineers and scientists', icon: '🤝' },
        { title: 'Innovation', description: 'embarking on a journey towards innovation and entrepreneurship.', icon: '🚀' },
        { title: 'Excellence', description: 'Appreciation of intellectual excellence and creativity.', icon: '🏆' }
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
    },
    objectives: [
        { text: "To produce highly skilled, technically trained and <span class='highlight-orange'>globally competitive manpower</span> in emerging areas of technology." },
        { text: "To <span class='highlight-orange'>provide conducive environment</span> to the faculty, staff and the students where they can pursue their goals." },
        { text: "To provide <span class='highlight-orange'>state-of-the-art infrastructure</span> - buildings, machinery, equipment and other facilities to enable the students to acquire necessary skills and required level of knowledge." },
        { text: "To develop appropriate <span class='highlight-orange'>linkages with industry</span>, community and other fellow institutions in India and abroad to fulfil its objective of achieving academic excellence. To <span class='highlight-orange'>develop overall personality of students</span> to enable them to achieve success in their future endeavours." },
        { text: "To <span class='highlight-orange'>inculcate moral, ethical and spiritual values</span> in students for becoming responsible citizens." },
        { text: "To <span class='highlight-orange'>undertake research and development</span> for the country and for the benefit of common man." },
        { text: "To <span class='highlight-orange'>develop low cost technology</span> and transfer the same to the unorganized sector to enhance productivity." },
        { text: "To provide facilities and convenient <span class='highlight-orange'>spaces for differently-abled</span> students and staff." },
        { text: "To create awareness amongst the faculty, staff, students and the community towards the need and benefits of <span class='highlight-purple'>pollution-free environment</span>" }
    ]
};

// Leadership / Director data
export const directorData = {
    name: 'Prof. Dr. Khwaja M Rafi',
    title: 'Director',
    institution: 'Mewat Engineering College, Nuh',
    message: [
        "I welcome you to Mewat Engineering College, a place where we nurture youth and excellence, transform young talented students in to adults with a sense of social responsibility and human values. We strive to train the students to become excellent technocrats, thinkers and entrepreneurs of the society and complete human beings. I am sure that you would use this opportunity to realize your full potential and bring out the best in you. I am also sure that the excellent academic environment and the opportunity to participate in co-curricular activities will also help you in developing your personality and in your all-round development. During your stay at MEC, you will feel energetic in homely atmosphere. I believe that your stay in MEC will be a fulfilling experience. We need to work even more harder to maintain excellence in teaching and to achieve pioneer position in the area of technical education. I strongly believe that the key to success of any college is the dedicated efforts of its each and every stakeholder. I am sure and confident that with the help, support and commitment of our highly qualified faculty members, most supportive administration, dedicated staff members, and highly motivated & enthusiastic students, we shall be able to carve the way in pursuit of our vision and add to the professional development of the state and country.",
        "I wish you all the best!"
    ],
    image: '/images/director.png'
};
