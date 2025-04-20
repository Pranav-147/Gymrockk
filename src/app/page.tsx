"use client"
import { CallToAction } from "@/sections/CallToAction";
import { Features } from "@/sections/Features";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import {Hero} from "@/sections/Hero";
import { LogoTicker } from "@/sections/LogoTicker";
import { Testimonials } from "@/sections/Testimonials";
import Cookies from "cookie-universal";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {jwtDecode} from 'jwt-decode';
const cookies=Cookies();
export default function Home() {
  const router=useRouter();
  useEffect(()=>{
    const allcookies=cookies.get('jwtoken');

    if(!allcookies){
      router.push("/login");
    }
    
  })

  return < >
    <Header />
    <Hero />
    <LogoTicker />
    <Features/>
    <CallToAction/>
    <Testimonials/>
    <Footer/>

    
  </> ;
}
