import React from 'react'
import Ecosystem from "@/assets/icon-click.svg"
import Logo from "@/assets/logo.svg" 
import { AnimatePresence,motion } from 'framer-motion'
const features=[
    {
        title:"Integration Ecosystem",
        description:"Enjoy customizable lists , team work tools , and smart tracking all in one place"
    },{
        title:"Goal Setting and tracking",
        description:"Enjoy customizable lists , team work tools , and smart tracking all in one place"
    },{
        title:"SOmething ",
        description:"Enjoy customizable lists , team work tools , and smart tracking all in one place"
    }
]

export default function Features() {
  return (
    <div className='bg-black bg-gradient-to-b from-black  to-gray-500 text-white mt-20'>
        <div className='container'>
            <h2
            className='text-center font-bold text-5xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-100  to-gray-600'
            >Everyting you need </h2>
            <p className='text-center mt-10 text-xl text-white/70 '>
                Enjoy customizable lists , team work tools , and smart tracking all in one place
                . Set taks ,get reminders , and see your progress simply and quickly
            </p>
            <div className='mt-16 flex flex-col gap-4 md:flex-row'>
                {features.map(({title,description})=>(
                    <div key={title} className='border border-white/30 px-5 py-10 text-center rounded-lg'>
                        <div className='inline-flex justify-center items-center'>
                            <Logo className="h-8 w-8" />
                        </div>
                        <div className='mt-6 font-bold'>
                            {title}
                        </div>
                        <div className='mt-2 text-white/70'>{description}</div>
                        </div>
                ))}
            </div>
        </div>
    </div>
  )
}
