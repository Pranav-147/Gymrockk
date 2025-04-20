'use client'

import axios from 'axios';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cookies } from 'next/headers';
export default function Page() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    console.log(name, password);

    try {
      const res = await axios.post('/api/getUser', { name, password });

      if (res.status === 200) {
        const { token, user } = res.data;
        // Store the token in localStorage (or cookie if needed)
        localStorage.setItem('jwtoken', token);
        console.log('Login successful:', user);

        // Redirect to the desired page
        router.push('/');
      } else {
        setError('Invalid credentials');
        console.log('Error:', res.data.error);
      }
    } catch (error) {
      setError('An error occurred during login');
      console.error('Error logging in:', error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="bg-gray-950 md:bg-gradient-to-tr md:from-orange-400 md:to-orange-600 md:p-[5px] w-full max-w-[500px] rounded-lg">
        <div className="bg-black rounded-lg p-1">
          <div className="text-center mb-14 mt-7">
            <span className="text-5xl text-center mb-8 bg-clip-text text-transparent bg-gradient-to-tr from-orange-400 to-orange-600">
              Login
            </span>
          </div>
          <form onSubmit={handleSubmit} className="flex items-center flex-col gap-4">
            <div className="w-3/4   rounded-md bg-gradient-to-r from-orange-400 to-orange-700">
              <textarea
                className="p w-full text-[1rem] flex items-center justify-center text-center border-none rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                placeholder="User name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ verticalAlign: 'middle' }}
              />
            </div>
            <div className="w-3/4 p-[2px]  rounded-md ">
              <textarea
                className="p-2 text-[1rem] w-full flex text-center justify-center items-center  border-none rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ verticalAlign: 'middle' }}
              />
            </div>
            <button
              type="submit"
              className="mt-4 p-2 bg-gradient-to-tr from-orange-400 to-orange-600 text-white rounded-md hover:from-orange-500 hover:to-orange-700 transition-colors"
            >
              Submit
            </button>
          </form>
          {error && (
            <div className="text-red-500 mt-4 text-center">
              {error}
            </div>
          )}
          <div className="backdrop-blur mt-0 items-center justify-center flex overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              className="orb z-10 relative top-28 h-40 w-40 md:h-40 md:w-40 rounded-full shadow-[-40px_-40px_50px_#ff8c00,40px_-40px_50px_#ff8c00,40px_40px_50px_#fffa5b,-40px_40px_50px_#ff8c00]"
              style={{
                filter: 'blur(10px)',
              }}
            >
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top_right,#eb5d0f,transparent)]"></div>
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_bottom_left,#eb5d0f,transparent)]"></div>
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top_left,#eb5d0f,transparent)]"></div>
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_bottom_right,#fffa5b,transparent)]"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
