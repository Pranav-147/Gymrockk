import React from 'react';
import stars from "@/assets/stars.png"
function Ahero() {
  return (
    <div  className='bg-black relative overflow-clip text-white bg-[linear-gradient(to_bottom,#000,#374151_36%,#6B7280_65%,#9CA3AF_82%)] py-[72px]'>
      <div className='container' 
      >
        <div className='flex justify-center'>
        <h1 className='text-7xl md:text-8xl inline-flex font-bold tracking-tighter text-center'>One task 
            <br/>at a time</h1>
            </div>
            <div className='flex justify-center'>
        <p className='text-center text-xl mt-8 mb-8 max-w-md'>
          Celebrate the joy of accomplishment with an app designed to track 
          progress, motivate your efforts, and celebrate your successes.
        </p>
        </div>
      </div>
      <div className='absolute h-[375px] w-[750px] md:w-[1736px]  md:h-[768px] lg:w-[2536px]  lg:h-[808px]   md:py-24 rounded-full bg-[radial-gradient(closest-side,#000_82%,#9CA3AF)] left-1/2 -translate-x-1/2'></div>
      </div>
  );
}

export default Ahero;
