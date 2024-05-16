'use client';
import React from 'react'
import { useRouter } from 'next/navigation'


export default function Logo() {
    const router = useRouter();
    const navigateHome = () => {
        router.push('/');
    }
    return (
        <div className="flex items-center justify-between mb-4">
            <img
                src="/vercel.svg"
                alt="Logo"
                className="w-12 h-12 rounded-full cursor-pointer"
                onClick={(navigateHome)}
            />
        </div>
    )
}
