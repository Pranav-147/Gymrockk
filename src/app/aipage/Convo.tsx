"use client";
import React, { useEffect, useState, useRef } from 'react';
import Lottie from 'lottie-react';
import animationData from './lottie.json';

// Define the type for a conversation
interface Conversation {
  question: string;
  response: string;
}

function Convo({ refreshTrigger }: { refreshTrigger: any }) {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const containerRef = useRef<HTMLDivElement>(null); // Create a ref for the conversation container

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/members/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: "Hello" })
      });

      if (response.ok) {
        const responseData: Conversation[] = await response.json();
        setConversations(responseData);
        setIsDataLoaded(true);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  useEffect(() => {
    if (isDataLoaded && containerRef.current) {
      // Scroll to the bottom of the container
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [conversations, isDataLoaded]);

  return (
    <div className='pb-36 border-t border-white/40'>
      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari, and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge, and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
      <div
        ref={containerRef}  // Attach ref to the container div
        className='mt-5 max-h-[500px] overflow-y-auto scrollbar-hide' // Set a max height and enable scrolling with hidden scrollbar
      >
        {isDataLoaded ? (
          conversations.map((conversation, index) => (
            <div key={index} className='mb-4 p-2'>
              <div className='ml-5 font-bold inline-block p-4 bg-gradient-to-r from-slate-300 to-gray-600 border-4 rounded-full border-white/40 bg-clip-text text-transparent'>
                <span>&#8226;</span> {conversation.question}
              </div>
              <div className='p-5 flex'>
                <span className='mr-2'>
                  <Lottie className='h-10 w-10' animationData={animationData} />
                </span>
                <div>
                  {conversation.response}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default Convo;
