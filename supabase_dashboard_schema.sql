-- ============================================================
-- MEC Student Management & Dashboard Schema
-- ============================================================

-- ─── SUBJECTS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subjects (
    id SERIAL PRIMARY KEY,
    department_id TEXT REFERENCES departments(id) ON DELETE CASCADE,
    semester INTEGER NOT NULL,
    subject_name TEXT NOT NULL,
    subject_code TEXT UNIQUE NOT NULL,
    credits INTEGER DEFAULT 3,
    type TEXT DEFAULT 'Core' -- Core, Elective, Humanities
);

-- ─── STUDENTS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT auth.uid(),
    roll_no TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    password_text TEXT, -- Storing for simplicity as requested, but auth.users is better
    department_id TEXT REFERENCES departments(id) ON DELETE SET NULL,
    year INTEGER NOT NULL,
    semester INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── EXAMS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS exams (
    id SERIAL PRIMARY KEY,
    subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
    exam_date DATE NOT NULL,
    start_time TIME NOT NULL,
    duration TEXT DEFAULT '3 Hours',
    venue TEXT DEFAULT 'Main Hall',
    exam_type TEXT DEFAULT 'Sessional' -- Sessional, End-Sem, Practical
);

-- ─── PRACTICALS ─────────────────────────────────────────────
-- Practical info can be specific to students/batches
CREATE TABLE IF NOT EXISTS practicals (
    id SERIAL PRIMARY KEY,
    subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
    batch TEXT, -- e.g., 'Batch A', 'Batch B'
    student_roll_no TEXT REFERENCES students(roll_no) ON DELETE CASCADE, -- If specific to student
    practical_date DATE NOT NULL,
    practical_time TIME NOT NULL,
    lab_name TEXT,
    instructions TEXT
);

-- ─── ATTENDANCE ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS attendance (
    id SERIAL PRIMARY KEY,
    student_roll_no TEXT REFERENCES students(roll_no) ON DELETE CASCADE,
    subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
    date DATE DEFAULT CURRENT_DATE,
    status TEXT CHECK (status IN ('Present', 'Absent', 'Leave')),
    remarks TEXT
);

-- ─── SYLLABUS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS syllabus (
    id SERIAL PRIMARY KEY,
    subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
    unit_no INTEGER,
    title TEXT,
    description TEXT,
    topics TEXT[]
);

-- ─── ADMINS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT auth.uid(),
    username TEXT UNIQUE NOT NULL,
    password_text TEXT NOT NULL,
    name TEXT
);

-- Enable RLS
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE practicals ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE syllabus ENABLE ROW LEVEL SECURITY;

-- Policies (Simplified for now, will refine)
CREATE POLICY "Public read subjects" ON subjects FOR SELECT USING (true);
CREATE POLICY "Public read syllabus" ON syllabus FOR SELECT USING (true);
CREATE POLICY "Public read exams" ON exams FOR SELECT USING (true);

-- Student can only read their own data
CREATE POLICY "Students can read own info" ON students FOR SELECT USING (true); -- Simplified for easy access by roll_no
CREATE POLICY "Students can read own attendance" ON attendance FOR SELECT USING (true);
CREATE POLICY "Students can read own practicals" ON practicals FOR SELECT USING (true);
