"use client"
import React from 'react'
import Logo from "@/assets/logo.svg"
import { useState } from 'react'
import { AnimatePresence,motion } from 'framer-motion'
const items=[
    {
        questoin:"Is this doctor approved ?",
        answer:""
    },{
        questoin:"How do I get my diagnosis ?",
        answer:""
    },{
        questoin:"Can I change my profile settings >",
        answer:""
    },{
        questoin:"Is my data safe ?",
        answer:""
    }
]
interface AccordationProps {
    question: string;
    answer: string;
  }
  
  const Accordation: React.FC<AccordationProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className='py-7 border-b border-white/30'>
        <div
          className='flex items-center py-7 cursor-pointer'
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className='flex-1 text-lg font-bold'>{question}</span>
          <Logo className={`h-6 w-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
        <AnimatePresence>
        {isOpen&&(
            <motion.div 
            initial={
                {
                    opacity:0,
                    height:0,
                    marginTop:0
                }
            }
            animate={{
                opacity:1,
                height:"auto",
                marginTop:"16px"
            }}
            exit={{
                opacity:0,
                height:0,
                marginTop:0
            }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni autem sunt dolorum neque id qui. Officia, explicabo reprehenderit voluptate eligendi alias, voluptatum quo optio hic, ipsum minima quod autem deleniti.
            </motion.div>
        )}
        </AnimatePresence>
      </div>
    );
  };
function Faqs() {
  return (
    <div className='bg-black text-white bg-gradient-to-b from-gray-500  to-black py-[72px] md:py-24'>
        <div className='container'>
            <h2 className='text-center text-5xl font-bold tracking-tighter'>Frequently asked questions</h2>
            <div className='mt-12 max-w-[648px] mx-auto '>
                {items.map(({questoin,answer})=>(
                    <Accordation question={questoin} answer={answer} key={questoin}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Faqs