import { useState, useEffect } from 'react';
import {
    fetchDepartments,
    fetchDepartmentById,
    fetchEvents,
    fetchStats,
    fetchTestimonials,
    fetchFacilities,
    fetchRecruiters
} from '../lib/supabase';

// ─── Generic hook factory ─────────────────────────────────────────────────────
function useSupabaseData(fetchFn, fallback = [], deps = []) {
    const [data, setData] = useState(fallback);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        console.log(`[useSupabaseData] Fetching started...`);
        fetchFn()
            .then(result => {
                if (!cancelled) {
                    console.log(`[useSupabaseData] Fetch success:`, result ? (Array.isArray(result) ? result.length : 'object') : 'null');
                    setData(result || fallback);
                    setError(null);
                }
            })
            .catch(err => {
                if (!cancelled) {
                    console.error('[useSupabaseData] Fetch error:', err.message);
                    setError(err.message);
                    setData(fallback); // Ensure fallback is used on error
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

export function useFacilities(fallback = []) {
    const { data: facilities, loading, error } = useSupabaseData(fetchFacilities, fallback);
    return { facilities, loading, error };
}

export function useRecruiters() {
    return useSupabaseData(fetchRecruiters, []);
}
