'use client'

import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/authContext';

export default function Login() {
  const [isClient, setIsClient] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login, isAuthenticated, user } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    if (!username || !password) {
      console.log('Please fill in all fields');
      return;
    }
    await login(username, password);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (isAuthenticated) {
    return <div>Welcome back, {user?.username}!</div>
  }

  return (
    <div className='w-full h-screen flex justify-center items-center bg-gray-200 p-4'>
      <form className='bg-white shadow-lg rounded-lg p-6 flex flex-col w-full max-w-sm'>
        <img
          src='/Login.png'
          alt='Logo'
          className='mx-auto mb-6 cover'
        />
        <div className='relative flex items-center mb-4'>
          <FontAwesomeIcon icon={faUser} size='lg' className='absolute left-3 text-gray-500' />
          <input
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            className='w-full pl-10 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400'
            type="text"
            placeholder='Username'
          />
        </div>
        <div className='relative flex items-center mb-4'>
          <FontAwesomeIcon icon={faLock} size='lg' className='absolute left-3 text-gray-500' />
          <input
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            className='w-full pl-10 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400'
            type="password"
            placeholder='Password'
          />
        </div>
        <button type='button' onClick={handleLogin} className='p-3 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 mt-6'>Login</button>
      </form>
    </div>
  );
}
