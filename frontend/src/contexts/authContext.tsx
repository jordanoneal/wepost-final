'use client'

import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { IUser } from "@common.interfaces";
import { useRouter } from "next/navigation";

interface AuthContextType {
    user: IUser | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const router = useRouter();

    const verifyToken = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get('http://localhost:4000/auth/verify', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
                return response.data;
            } catch (err: any) {
                console.error('Token verification failed:', err);
                localStorage.removeItem('token');
            }
        }
        // router.push('/login');
    }

    useEffect(() => {
        verifyToken();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:4000/auth/login', { username, password }, { withCredentials: true });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setUser(response.data.user);
                router.push('/');
            }
        } catch (err: any) {
            console.error('Login failed:', err);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    }

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}