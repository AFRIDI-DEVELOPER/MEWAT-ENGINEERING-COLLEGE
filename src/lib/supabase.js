import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. App will use static fallbacks.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');


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

// ─── College Info ─────────────────────────────────────────────────────────────
export async function fetchCollegeInfo() {
    const { data, error } = await supabase
        .from('college_info')
        .select('*')
        .eq('id', 'main')
        .single();
    if (error) throw error;
    return data;
}

// ─── Contact Submissions ──────────────────────────────────────────────────────
export async function submitContactForm(formData) {
    const { data, error } = await supabase
        .from('contact_submissions')
        .insert([formData]);
    if (error) throw error;
    return data;
}

// ─── Students / Portal ────────────────────────────────────────────────────────
export async function fetchStudentByRollNo(rollNo) {
    const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('roll_no', rollNo)
        .single();
    if (error) throw error;
    return data;
}

// ─── Storage: Get Public URL ──────────────────────────────────────────────────
export function getStorageUrl(bucket, path) {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
}

