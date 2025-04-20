"use client";
import React, { useState } from 'react';

// Define types for the props and conversation data
interface SearchProps {
  onSendComplete: (conversation: { question: string; response: string }) => void;
}

interface Conversation {
  question: string;
  response: string;
}

export default function Search({ onSendComplete }: SearchProps) {
  const [input, setInput] = useState<string>("");

  async function Output(input: string, addConversation: (conversation: Conversation) => void) {
    setInput("");
    try {
      const response = await fetch("http://localhost:5000/generate", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ input_sequence: input }),
      });

      if (response.ok) {
        const res = await response.json();
        // const output = res["output"].split("assistant")[1]?.trim() || "";
        console.log(res)
        
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <section className='fixed bottom-0 left-0 md:left-1/2 md:-translate-x-1/2 w-full p-4 backdrop-blur-md'>
      <div className='flex justify-center'>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className='w-full pl-5 md:w-[60vw] p-2 border border-gray-300/20 bg-black/70 text-white rounded-full'
          placeholder='Search'
        />
        <button 
          onClick={() => Output(input, onSendComplete)} 
          className='ml-2 p-2 bg-gradient-to-l from-gray-400 to-gray-600 text-white rounded-full'
        >
          Submit
        </button>
      </div>
    </section>
  );
}
