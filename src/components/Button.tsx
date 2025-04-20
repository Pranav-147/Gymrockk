import React from 'react'

export default function Button(props:React.PropsWithChildren) {
  return (
    <button className="relative py-2 px-3 rounded-lg font-medium text-sm bg-gradient-to-b from-[#191522] to-[grey] shadow-[0px_0px_12px_#a8a5a5]">
              {/* Layer 1: Gradient Overlay */}
              <div className="absolute inset-8">
                <div className="rounded-lg border border-white/20 absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
              </div>

              {/* Layer 2: Border Overlay */}
              <div className="rounded-lg border absolute inset-0 border-white/20 [mask-image:linear-gradient(to_top,black,transparent)]"></div>

              {/* Layer 3: Shadow Overlay */}
              <div className="rounded-lg absolute inset-0 shadow-[0_0_10px_rgb(184, 180, 180)]"></div>

              <span>{props.children}</span>
            </button>
  )
}
