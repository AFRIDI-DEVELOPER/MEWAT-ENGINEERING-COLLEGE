import { useState, useEffect } from 'react';
import {
    fetchDepartments,
    fetchDepartmentById,
    fetchEvents,
    fetchStats,
    fetchTestimonials,
    fetchFacilities,
    fetchRecruiters,
    fetchCollegeInfo
} from '../lib/supabase';

// ─── Generic hook factory ─────────────────────────────────────────────────────
function useSupabaseData(fetchFn, fallback = [], deps = []) {
    const [data, setData] = useState(fallback);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        fetchFn()
            .then(result => {
                if (!cancelled) {
                    setData(result);
                    setError(null);
                }
            })
            .catch(err => {
                if (!cancelled) {
                    console.warn('Supabase fetch error, using fallback data:', err.message);
                    setError(err.message);
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return { data, loading, error };
}

// ─── Exported Hooks ───────────────────────────────────────────────────────────

export function useDepartments() {
    return useSupabaseData(fetchDepartments, []);
}

export function useDepartment(id) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;
        let cancelled = false;
        setLoading(true);
        fetchDepartmentById(id)
            .then(result => {
                if (!cancelled) { setData(result); setError(null); }
            })
            .catch(err => {
                if (!cancelled) {
                    console.warn('Department fetch error:', err.message);
                    setError(err.message);
                }
            })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, [id]);

    return { data, loading, error };
}

export function useEvents() {
    return useSupabaseData(fetchEvents, []);
}

export function useStats() {
    return useSupabaseData(fetchStats, []);
}

export function useTestimonials() {
    return useSupabaseData(fetchTestimonials, []);
}

export function useFacilities() {
    return useSupabaseData(fetchFacilities, []);
}

export function useRecruiters() {
    return useSupabaseData(fetchRecruiters, []);
}

export function useCollegeInfo() {
    return useSupabaseData(fetchCollegeInfo, null);
}
