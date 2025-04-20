"use client"
import a from "@/assets/logo-acme.png";
import a1 from "@/assets/logo-apex.png";
import a2 from "@/assets/logo-celestial.png";
import a3 from "@/assets/logo-quantum.png";
import a4 from "@/assets/logo-pulse.png";
import a5 from "@/assets/logo-echo.png";
import {motion} from "framer-motion"
export const LogoTicker = () => {
  return (
    <section className="py-10 ">
      <div className="container ">
        <div className="flex items-center">
          <div className="flex flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]" >
            <motion.div className="flex flex-none pr-14 gap-14 "
            initial={{translateX:"-50%"}}
            animate={{translateX:'0'}}
            transition={{duration:"30",
              repeat:Infinity,
              ease:"linear"
            }}
            >
              {[a, a1, a2, a4, a3, a5,a, a1, a2, a4, a3, a5].map((logo) => (
                <img
                  src={logo.src}
                  className="h-6 w-auto"
                  key={logo.src}
                  alt="Company Logo"
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
