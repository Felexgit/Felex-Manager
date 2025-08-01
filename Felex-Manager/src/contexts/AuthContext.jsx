import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        // Check if Supabase is accessible
        const checkSupabaseConnection = async () => {
            try {
                await fetch('https://cfrdytbujeihrmcrtvay.supabase.co/rest/v1/', {
                    method: 'HEAD',
                    mode: 'no-cors'
                });
                setIsOnline(true);
            } catch (error) {
                console.warn('Supabase não está acessível, usando modo offline:', error);
                setIsOnline(false);
            }
        };

        checkSupabaseConnection();

        // Get initial session
        const getInitialSession = async () => {
            try {
                if (!isOnline) {
                    // Check for demo user in localStorage when offline
                    const demoUser = localStorage.getItem('demoUser');
                    if (demoUser) {
                        setUser(JSON.parse(demoUser));
                    }
                    setLoading(false);
                    return;
                }

                const { data: { session }, error } = await supabase.auth.getSession();
                if (error) {
                    console.error('Error getting session:', error);
                    setError(error.message);
                } else {
                    setUser(session?.user ?? null);
                }
            } catch (error) {
                console.error('Error in getInitialSession:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getInitialSession();

        // Listen for auth changes (only when online)
        if (isOnline) {
            const { data: { subscription } } = supabase.auth.onAuthStateChange(
                async (event, session) => {
                    try {
                        setUser(session?.user ?? null);
                        setError(null);
                    } catch (error) {
                        console.error('Error in auth state change:', error);
                        setError(error.message);
                    } finally {
                        setLoading(false);
                    }
                }
            );

            return () => subscription.unsubscribe();
        }
    }, [isOnline]);

    const signOut = async () => {
        try {
            if (isOnline) {
                await supabase.auth.signOut();
            } else {
                // Clear demo user from localStorage when offline
                localStorage.removeItem('demoUser');
            }
            setUser(null);
        } catch (error) {
            console.error('Error signing out:', error);
            setError(error.message);
        }
    };

    const value = {
        user,
        loading,
        signOut,
        isAuthenticated: !!user,
        error,
        isOnline
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 