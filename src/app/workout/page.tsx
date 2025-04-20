"use client"
import React, { useEffect, useState } from 'react'
import { Header } from '@/sections/Header'
import Form from './Form'
import Cookies from 'cookie-universal';
import { jwtDecode } from 'jwt-decode';
import WorkoutSchedule from './Plan';
import axios from 'axios';
const cookies=Cookies();
const Page=()=> {
  const [form,setFrom]=useState('');
  
  useEffect(() => {
    const FetchData = async () => {
      try {
        // Get the token from cookies
        const cookie=cookies.get('jwtoken');
        console.log(cookie)
        // Decode the JWT token
        setFrom(cookie);

        // Make a POST request with the decoded name
        
        const response = await axios.post("/getFrom", { name: cookie.name });

        if (response.status === 200) {
          // Handle success
          
          console.log("Response data:", response.data);
        }
      } catch (error) {
        console.error("Error in fetching data:", error);
      }
    };

    FetchData(); // Call the async function
  }, []);
  return (
    <>
  <div>
      <Header/>
      <Form/>
    </div>
    </>
  )
}

export default Page