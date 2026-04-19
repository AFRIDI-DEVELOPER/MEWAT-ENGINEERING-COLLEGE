-- ============================================================
-- MEC Website — Supabase Database Schema & Seed Data
-- Run this entire file in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ─── DEPARTMENTS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS departments (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    short_name TEXT,
    seats INTEGER,
    description TEXT,
    icon TEXT,
    icon_img TEXT,
    highlights TEXT[],
    subjects TEXT[],
    hod_name TEXT,
    hod_designation TEXT,
    hod_experience TEXT,
    hod_education TEXT,
    hod_image TEXT
);

-- ─── FACULTY ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faculty (
    id SERIAL PRIMARY KEY,
    department_id TEXT REFERENCES departments(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    designation TEXT,
    specialization TEXT,
    experience TEXT
);

-- ─── LABS ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS labs (
    id SERIAL PRIMARY KEY,
    department_id TEXT REFERENCES departments(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    resources TEXT
);

-- ─── EVENTS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT,
    description TEXT,
    type TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── STATS ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS stats (
    id TEXT PRIMARY KEY,
    label TEXT,
    value INTEGER,
    suffix TEXT,
    icon TEXT,
    sort_order INTEGER DEFAULT 0
);

-- ─── TESTIMONIALS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    name TEXT,
    branch TEXT,
    quote TEXT,
    avatar TEXT
);

-- ─── FACILITIES ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS facilities (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    icon TEXT,
    gradient TEXT,
    accent_color TEXT,
    features TEXT[],
    image_url TEXT,
    sort_order INTEGER DEFAULT 0
);

-- ─── RECRUITERS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS recruiters (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

-- ============================================================
-- SEED DATA
-- ============================================================

-- Departments
INSERT INTO departments (id, name, short_name, seats, description, icon, icon_img, highlights, subjects, hod_name, hod_designation, hod_experience, hod_education, hod_image) VALUES
('cse', 'Computer Science & Engineering', 'CSE', 60,
 'The CSE department offers a cutting-edge curriculum covering algorithms, data structures, AI, machine learning, web development, and software engineering.',
 '💻', '/images/cursor/icon_21.webp',
 ARRAY['Modern Computer Labs', 'Industry Collaborations', 'Coding Bootcamps', 'Smart Classrooms'],
 ARRAY['Artificial Intelligence', 'Data Mining', 'Compiler Design', 'Operating Systems', 'Cloud Computing', 'Computer Networks'],
 'Dr. Shamim Sharma', 'HOD & Associate Professor', '15+ Years', 'Ph.D in Computer Science', '👨‍💼'),

('civil', 'Civil Engineering', 'CE', 60,
 'Training future civil engineers with hands-on experience in structural design, construction management, surveying, and environmental engineering.',
 '🏗️', '/images/cursor/icon_15.webp',
 ARRAY['Material Testing Lab', 'Survey Instruments', 'CAD Software', 'Site Visits'],
 ARRAY['Structural Analysis', 'Surveying', 'Hydraulics', 'Soil Mechanics', 'Concrete Technology', 'RC Design'],
 'Dr. Vaseem Akram', 'HOD & Professor', '18+ Years', 'Ph.D in Structural Engineering', '👷‍♂️'),

('mechanical', 'Mechanical Engineering', 'ME', 30,
 'Comprehensive program covering thermodynamics, manufacturing, CAD/CAM, robotics, and automotive engineering with state-of-the-art workshops.',
 '⚙️', '/images/cursor/icon_16.webp',
 ARRAY['Workshop Facilities', 'CAD/CAM Lab', 'Thermal Lab', 'Industrial Visits'],
 ARRAY['Thermodynamics', 'Machine Design', 'Heat Transfer', 'Manufacturing Processes', 'CAD/CAM', 'Mechatronics'],
 'Mr. Raffi Khan', 'Head of Department', '12+ Years', 'M.Tech, Ph.D (Pursuing)', '🔧'),

('eee', 'Electrical & Electronics Engineering', 'EEE', 30,
 'Focuses on power systems, electrical machines, control systems, and electronics, preparing students for careers in energy and electrical sectors.',
 '⚡', '/images/cursor/icon_18.webp',
 ARRAY['Power Systems Lab', 'Electrical Machines Lab', 'Control Systems Lab', 'Smart Grid Training'],
 ARRAY['Power Systems', 'Control Theory', 'Electrical Machines', 'Digital Electronics', 'Microprocessors', 'Signals & Systems'],
 'Dr. Shabana Khatoon', 'HOD & Associate Professor', '14+ Years', 'Ph.D in Power Systems', '⚡'),

('ece', 'Electronics & Communication Engineering', 'ECE', 30,
 'Covers communication systems, signal processing, VLSI design, embedded systems, and IoT with well-equipped laboratory infrastructure.',
 '📡', '/images/cursor/icon_12.webp',
 ARRAY['Communication Lab', 'VLSI Lab', 'Embedded Systems Lab', 'IoT Workshop'],
 ARRAY['Wireless Communication', 'VLSI Design', 'Digital Signal Processing', 'Embedded Systems', 'Antennas', 'Analog Circuits'],
 'Dr. Abid Hussain', 'HOD & Professor', '20+ Years', 'Ph.D in Electronics', '📡'),

('ash', 'Applied Sciences & Humanities', 'AS&H', 60,
 'Provides foundational education in mathematics, physics, chemistry, English, and management to all engineering students.',
 '📚', '/images/cursor/icon_10.webp',
 ARRAY['Physics Lab', 'Chemistry Lab', 'Language Lab', 'Mathematics Resource Center'],
 ARRAY['Engg Mathematics', 'Engg Physics', 'Engg Chemistry', 'Communication Skills', 'Environmental Science', 'Ethics'],
 'Dr. Mehwish Alam', 'HOD (Applied Sciences)', '10+ Years', 'Ph.D in Applied Mathematics', '📐')
ON CONFLICT (id) DO NOTHING;

-- Faculty
INSERT INTO faculty (department_id, name, designation, specialization, experience) VALUES
('cse', 'Dr. Shamim Sharma', 'Associate Professor', 'Machine Learning', '15 Years'),
('cse', 'Mr. Mohd Anas', 'Assistant Professor', 'Cloud Computing', '8 Years'),
('cse', 'Ms. Farhat Jahan', 'Assistant Professor', 'Data Structures', '6 Years'),
('cse', 'Mr. Salman Khan', 'Assistant Professor', 'Web Technologies', '5 Years'),
('civil', 'Dr. Vaseem Akram', 'Professor', 'Structures', '18 Years'),
('civil', 'Mr. Irfan Khan', 'Assistant Professor', 'Geotech', '10 Years'),
('civil', 'Ms. Sana Malik', 'Assistant Professor', 'Environmental Engg', '7 Years'),
('mechanical', 'Mr. Raffi Khan', 'Associate Professor', 'Thermal Engg', '12 Years'),
('mechanical', 'Mr. Adil Shah', 'Assistant Professor', 'Manufacturing', '9 Years'),
('mechanical', 'Mr. Zeeshan Ali', 'Assistant Professor', 'Robotics', '6 Years'),
('eee', 'Dr. Shabana Khatoon', 'Associate Professor', 'Power Systems', '14 Years'),
('eee', 'Mr. Faisal Khan', 'Assistant Professor', 'Control Systems', '8 Years'),
('ece', 'Dr. Abid Hussain', 'Professor', 'Communication', '20 Years'),
('ece', 'Ms. Ruqaiya Bano', 'Assistant Professor', 'Embedded Systems', '7 Years'),
('ash', 'Dr. Mehwish Alam', 'Associate Professor', 'Mathematics', '10 Years'),
('ash', 'Dr. Imran Qureshi', 'Assistant Professor', 'Physics', '8 Years'),
('ash', 'Ms. Tabassum', 'Assistant Professor', 'Professional Ethics', '6 Years');

-- Labs
INSERT INTO labs (department_id, name, resources) VALUES
('cse', 'Computer Networking Lab', 'Cisco Switches, Routers, LAN Trainers'),
('cse', 'AI & Data Science Lab', 'High Performance GPUs, Python/Anaconda Environment'),
('cse', 'Web Development Lab', 'Modern IDEs, Hosting Servers'),
('cse', 'Software Engineering Lab', 'Case Tools, Project Management Software'),
('civil', 'Structural Engineering Lab', 'UTM Machines, Concrete Testing'),
('civil', 'Surveying Lab', 'Total Station, Theodolites, Dumpy Levels'),
('civil', 'Fluid Mechanics Lab', 'Turbines, Pumps, Venturimeters'),
('civil', 'Geotechnical Lab', 'Soil Testing Kits'),
('mechanical', 'Central Workshop', 'Lathe Machines, Milling, Welding'),
('mechanical', 'Thermal Engineering Lab', 'IC Engines, Boilers'),
('mechanical', 'CAD/CAM Lab', 'SolidWorks, AutoCAD, CNC Simulation'),
('mechanical', 'Automobile Lab', 'Engine Cut-sections, Chassis Models'),
('eee', 'Electrical Machines Lab', 'AC/DC Motors, Transformers'),
('eee', 'Control Systems Lab', 'PLC Trainers, Servomotors'),
('eee', 'Power Electronics Lab', 'Choppers, Inverters'),
('eee', 'Simulation Lab', 'MATLAB, PSpice'),
('ece', 'Analog Communication Lab', 'CROs, Signal Generators'),
('ece', 'Digital Electronics Lab', 'Trainer Kits, IC Testers'),
('ece', 'Embedded Lab', 'Arduino, Raspberry Pi, ARM kits'),
('ece', 'VLSI Design Lab', 'Xilinx, Cadence tools'),
('ash', 'Applied Physics Lab', 'Laser kits, Optical Benches'),
('ash', 'Applied Chemistry Lab', 'Spectrometers, Chemical Analysis'),
('ash', 'Communication Lab', 'Linguaphone, Audio Aids');

-- Events
INSERT INTO events (title, date, description, type, image_url) VALUES
('Annual Technical Fest - TechMEC 2026', 'March 2026', 'A grand celebration of technology featuring hackathons, coding competitions, robotics challenges, and expert talks.', 'fest', '/images/event-fest.png'),
('Campus Placement Drive', 'Feb 2026', 'Multiple top companies visiting campus for recruitment. Students from all branches participated actively.', 'placement', '/images/event-placement.png'),
('Workshop on AI & Machine Learning', 'Jan 2026', 'A hands-on workshop conducted by industry experts covering latest trends in artificial intelligence.', 'workshop', '/images/event-workshop.png'),
('Sports Day Celebration', 'Dec 2025', 'Annual sports day with various indoor and outdoor events promoting physical fitness and team spirit.', 'sports', '/images/event-sports.png')
ON CONFLICT DO NOTHING;

-- Stats
INSERT INTO stats (id, label, value, suffix, icon, sort_order) VALUES
('placed',     'Students Placed', 500, '+', '💼', 1),
('gate',       'GATE Qualified',   50, '+', '🎓', 2),
('air',        'Best GATE AIR',    48, '',  '🏆', 3),
('recruiters', 'Recruiters',       30, '+', '🤝', 4),
('books',      'Library Books', 18000, '+', '📖', 5),
('acres',      'Campus Acres',     15, '',  '🌳', 6)
ON CONFLICT (id) DO NOTHING;

-- Testimonials
INSERT INTO testimonials (name, branch, quote, avatar) VALUES
('Mohd Arif', 'CSE, Batch 2020', 'MEC provided me with excellent education and practical skills. The faculty''s dedication and modern labs helped me secure a great position at an MNC.', '👨‍💻'),
('Saba Parveen', 'Civil Engineering, Batch 2021', 'Being a girl from a rural area, the 50% fee concession was a blessing. The supportive environment at MEC helped me grow both personally and professionally.', '👩‍🔬'),
('Rahul Sharma', 'Mechanical Engineering, Batch 2019', 'MEC''s emphasis on practical learning through workshops and industrial visits gave me hands-on experience that made me job-ready from day one.', '👨‍🔧'),
('Nazia Khan', 'ECE, Batch 2022', 'The placement cell at MEC is very active. I got placed in my dream company through campus placement. The training programs were very helpful.', '👩‍💼');

-- Facilities
INSERT INTO facilities (id, name, tagline, description, icon, gradient, accent_color, features, image_url, sort_order) VALUES
('hostel', 'Hostel', 'Home Away From Home', 'Separate hostels for boys and girls with mess facility, Wi-Fi, and 24/7 security. Comfortable rooms with modern amenities.', '🏠', 'linear-gradient(135deg, #3A5A40 0%, #588157 100%)', '#3A5A40', ARRAY['Wi-Fi Connectivity', 'Mess Facility', '24/7 Security', 'Recreation Room'], '/images/college-bg.png', 1),
('library', 'Library', 'Knowledge at Your Fingertips', 'A well-equipped library with over 18,000 volumes including textbooks, reference books, journals, and digital resources.', '📚', 'linear-gradient(135deg, #5C4033 0%, #8B6347 100%)', '#7B4F2E', ARRAY['18,000+ Books', 'E-Journals', 'Reading Hall', 'Digital Library'], '/images/college-bg-1.jpg', 2),
('labs', 'Laboratories', 'Hands-On Learning Excellence', 'State-of-the-art labs for all departments equipped with latest instruments and software for practical learning.', '🔬', 'linear-gradient(135deg, #1A3A5C 0%, #2E6DA4 100%)', '#1A5276', ARRAY['Department Labs', 'Computer Labs', 'Workshop', 'Language Lab'], '/images/college-bg-2.png', 3),
('transport', 'Transport', 'Safe & Convenient Commute', 'College bus service covering major routes in Nuh and surrounding areas for convenient commute.', '🚌', 'linear-gradient(135deg, #7D4A00 0%, #C47A1A 100%)', '#B7600C', ARRAY['Multiple Routes', 'GPS Tracked', 'Faculty Bus', 'Affordable Fare'], '/images/college-bg-3.png', 4),
('sports', 'Sports & Gymnasium', 'Fitness Meets Excellence', 'Multi-purpose sports ground, indoor gymnasium, and facilities for cricket, football, basketball, and volleyball.', '🏋️', 'linear-gradient(135deg, #4A235A 0%, #7D3C98 100%)', '#6C3483', ARRAY['Gymnasium', 'Cricket Ground', 'Basketball Court', 'Indoor Games'], '/images/college-bg.png', 5),
('language-lab', 'Language Lab', 'Speak With Confidence', 'Modern language lab with audio-visual aids to enhance communication skills and English proficiency.', '🗣️', 'linear-gradient(135deg, #1A4A5A 0%, #1A7A8A 100%)', '#117A8B', ARRAY['Audio-Visual Aids', 'Communication Training', 'Personality Development', 'Soft Skills'], '/images/college-bg-1.jpg', 6)
ON CONFLICT (id) DO NOTHING;

-- Recruiters
INSERT INTO recruiters (name) VALUES
('Infosys'), ('Wipro'), ('TCS'), ('HCL Technologies'), ('Tech Mahindra'),
('Cognizant'), ('Byju''s'), ('Lenskart'), ('Delhivery'), ('Zomato'),
('NTT Data'), ('Sopra Steria'), ('Newgen Software'), ('iEnergizer'),
('BSNL'), ('NHPC'), ('Indian Army')
ON CONFLICT DO NOTHING;

-- ─── Enable Row Level Security (RLS) with public read ─────────
ALTER TABLE departments  ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty      ENABLE ROW LEVEL SECURITY;
ALTER TABLE labs         ENABLE ROW LEVEL SECURITY;
ALTER TABLE events       ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats        ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities   ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruiters   ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read departments"  ON departments  FOR SELECT USING (true);
CREATE POLICY "Public read faculty"      ON faculty      FOR SELECT USING (true);
CREATE POLICY "Public read labs"         ON labs         FOR SELECT USING (true);
CREATE POLICY "Public read events"       ON events       FOR SELECT USING (true);
CREATE POLICY "Public read stats"        ON stats        FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read facilities"   ON facilities   FOR SELECT USING (true);
CREATE POLICY "Public read recruiters"   ON recruiters   FOR SELECT USING (true);
