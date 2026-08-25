import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Departments ─────────────────────────────────────────────────────────────
export async function fetchDepartments() {
    const { data, error } = await supabase
        .from('departments')
        .select('*, faculty(*), labs(*)');
    if (error) throw error;
    return data;
}

export async function fetchDepartmentById(id) {
    const { data, error } = await supabase
        .from('departments')
        .select('*, faculty(*), labs(*)')
        .eq('id', id)
        .single();
    if (error) throw error;
    return data;
}

// ─── Events ──────────────────────────────────────────────────────────────────
export async function fetchEvents() {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
}

// ─── Notifications ───────────────────────────────────────────────────────────
export async function fetchNotifications() {
    const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
}

export async function addNotification(notificationData) {
    const { data, error } = await supabase
        .from('notifications')
        .insert([notificationData])
        .select();
    if (error) throw error;
    return data[0];
}

export async function deleteNotification(id) {
    const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id);
    if (error) throw error;
}

// ─── Stats ───────────────────────────────────────────────────────────────────
export async function fetchStats() {
    const { data, error } = await supabase
        .from('stats')
        .select('*');
    if (error) throw error;
    return data;
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
export async function fetchTestimonials() {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*');
    if (error) throw error;
    return data;
}

// ─── Facilities ───────────────────────────────────────────────────────────────
export async function fetchFacilities() {
    const { data, error } = await supabase
        .from('facilities')
        .select('*');
    if (error) throw error;
    return data;
}

// ─── Recruiters ───────────────────────────────────────────────────────────────
export async function fetchRecruiters() {
    const { data, error } = await supabase
        .from('recruiters')
        .select('*')
        .order('name');
    if (error) throw error;
    return data.map(r => r.name);
}

// ─── Storage: Get Public URL ──────────────────────────────────────────────────
export function getStorageUrl(bucket, path) {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
}

// ─── Student Management System ──────────────────────────────────────────────
export async function fetchStudents() {
    const { data, error } = await supabase
        .from('students')
        .select('*, departments(name)');
    if (error) throw error;
    return data;
}

export async function addStudent(studentData) {
    const { data, error } = await supabase
        .from('students')
        .insert([studentData])
        .select();
    if (error) throw error;
    return data[0];
}

export async function fetchSubjects(deptId, semester) {
    let query = supabase.from('subjects').select('*');
    if (deptId) query = query.eq('department_id', deptId);
    if (semester) query = query.eq('semester', semester);
    const { data, error } = await query;
    if (error) throw error;
    return data;
}

export async function addSubject(subjectData) {
    const { data, error } = await supabase
        .from('subjects')
        .insert([subjectData])
        .select();
    if (error) throw error;
    return data[0];
}

export async function fetchExams(subjectId) {
    let query = supabase.from('exams').select('*, subjects(subject_name, subject_code)');
    if (subjectId) query = query.eq('subject_id', subjectId);
    const { data, error } = await query;
    if (error) throw error;
    return data;
}

export async function addExam(examData) {
    const { data, error } = await supabase
        .from('exams')
        .insert([examData])
        .select();
    if (error) throw error;
    return data[0];
}

export async function fetchPracticals(rollNo) {
    let query = supabase.from('practicals').select('*, subjects(subject_name, subject_code)');
    if (rollNo) query = query.eq('student_roll_no', rollNo);
    const { data, error } = await query;
    if (error) throw error;
    return data;
}

export async function addPractical(practicalData) {
    const { data, error } = await supabase
        .from('practicals')
        .insert([practicalData])
        .select();
    if (error) throw error;
    return data[0];
}

export async function fetchAttendance(rollNo) {
    const { data, error } = await supabase
        .from('monthly_attendance')
        .select('*')
        .eq('student_roll_no', rollNo);
    if (error) throw error;
    return data;
}

export async function markAttendance(attendanceData) {
    const { data, error } = await supabase
        .from('attendance')
        .insert([attendanceData])
        .select();
    if (error) throw error;
    return data[0];
}

export async function fetchSyllabus(subjectId) {
    const { data, error } = await supabase
        .from('syllabus')
        .select('*')
        .eq('subject_id', subjectId)
        .order('unit_no');
    if (error) throw error;
    return data;
}

export async function submitContactForm({ name, email, phone, subject, message }) {
    const { error } = await supabase
        .from('contact_submissions')
        .insert([{ name, email, phone, subject, message }]);
    if (error) throw error;
}

export async function studentLogin(rollNo, password) {
    const { data, error } = await supabase
        .from('students')
        .select('*, departments(name)')
        .eq('roll_no', rollNo)
        .eq('password_text', password)
        .single();
    if (error) throw new Error('Invalid Roll No or Password');
    return data;
}
