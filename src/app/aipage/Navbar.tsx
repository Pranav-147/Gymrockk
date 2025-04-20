import React from 'react'
import Logo from "@/assets/logo.svg"
import MenuLogo from "@/assets/icon-menu.svg"
export default function Navbar() {
  return (
    <section>
        <div className='contianer p-4 flex justify-between'>
            <div>
                <Logo className="h-8 w-8" />
            </div>
            <div className='bg-gradient-to-r from-gray-400 via-gray-500 to-gray-500 text-lg bg-clip-text text-transparent'>
                Sector
            </div>
            <div>
                <MenuLogo />
            </div>
        </div>
    </section>
  )
}
