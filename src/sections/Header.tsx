'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LogoIcon from "@/assets/icon-menu.svg"
import MenuIcon from "@/assets/logo.svg"
import logo from "./logo.png"
import Image from "next/image"
import Link from "next/link"

export const Header = () => {
  const [show, setShow] = useState(false)

  const menuItems = [
    { title: "About", href: "/about" },
    { title: "WorkOut", href: "/workout" },
    { title: "Dietplan", href: "/dietplan" },
    { title: "Queries", href: "/aipage" },
  ]

  const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <header className="py-4 md:border-b border-white/30 md:border-none sticky top-0 z-50 backdrop-blur">
      <div className="container py-2 relative">
        {/* Desktop menu */}
        <div className="nav hidden md:flex lg:flex items-center justify-center gap-5 border border-white/30 rounded-md py-3 lg:w-1/2 md:w-3/4 mx-auto">
          <div className="h-11 w-11">
            <Image src={logo} alt="Logo" width={44} height={44} />
          </div>
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} className="font-mono">
              {item.title}
            </Link>
          ))}
          <button className="bg-orange-600 text-white rounded-lg px-4 py-2">Sign up</button>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <div className="flex justify-between items-center">
            <div className="h-11 w-11">
              <Image src={logo} alt="Logo" width={44} height={44} />
            </div>
            <button onClick={() => setShow(!show)} className="h-11 w-11" aria-label="Toggle menu">
              <LogoIcon className="h-9 w-9" />
            </button>
          </div>
          <AnimatePresence>
            {show && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={menuVariants}
                className="absolute left-0 right-0 bg-black shadow-lg mt-2 py-4 px-6 rounded-b-lg"
              >
                {menuItems.map((item) => (
                  <motion.div key={item.href} variants={itemVariants}>
                    <Link
                      href={item.href}
                      className="block font-mono py-2 text-lg hover:text-orange-600 transition-colors"
                      onClick={() => setShow(false)}
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={itemVariants}>
                  <button
                    className="w-full bg-orange-600 text-white rounded-lg px-4 py-2 mt-4"
                    onClick={() => setShow(false)}
                  >
                    Sign up
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}