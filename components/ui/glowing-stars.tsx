// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { AnimatePresence, motion } from "motion/react";
// import { cn } from "@/lib/utils";

// export const GridBackgroundDemo = ({
//   className,
//   children,
// }: {
//   className?: string;
//   children?: React.ReactNode;
// }) => {
//   const [mouseEnter, setMouseEnter] = useState(false);

//   return (
//     <div
//       onMouseEnter={() => {
//         setMouseEnter(true);
//       }}
//       onMouseLeave={() => {
//         setMouseEnter(false);
//       }}
//       className={cn(
//         "bg-[linear-gradient(110deg,white_0.6%,#f9f9f9)] p-0 h-screen w-screen fixed top-0 left-0 m-0 rounded-xl border border-[#eaeaea] dark:border-neutral-600",
//         className
//       )}
//     >
//       <div className="flex justify-center items-center h-full">
//         <Illustration mouseEnter={mouseEnter} />
//       </div>
//       <div className="absolute bottom-0 w-full px-4 pb-6">{children}</div>
//     </div>
//   );
// };

// export const GlowingStarsDescription = ({
//   className,
//   children,
// }: {
//   className?: string;
//   children?: React.ReactNode;
// }) => {
//   return (
//     <p className={cn("text-base text-white max-w-[16rem]", className)}>
//       {children}
//     </p>
//   );
// };

// export const GlowingStarsTitle = ({
//   className,
//   children,
// }: {
//   className?: string;
//   children?: React.ReactNode;
// }) => {
//   return (
//     <h2 className={cn("font-bold text-2xl text-[#eaeaea]", className)}>
//       {children}
//     </h2>
//   );
// };

// export const Illustration = ({ mouseEnter }: { mouseEnter: boolean }) => {
//   const stars = 108;
//   const columns = 18;

//   const [glowingStars, setGlowingStars] = useState<number[]>([]);

//   const highlightedStars = useRef<number[]>([]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       highlightedStars.current = Array.from({ length: 5 }, () =>
//         Math.floor(Math.random() * stars)
//       );
//       setGlowingStars([...highlightedStars.current]);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div
//       className="h-48 p-1 w-full"
//       style={{
//         display: "grid",
//         gridTemplateColumns: `repeat(${columns}, 1fr)`,
//         gap: `1px`,
//       }}
//     >
//       {[...Array(stars)].map((_, starIdx) => {
//         const isGlowing = glowingStars.includes(starIdx);
//         const delay = (starIdx % 10) * 0.1;
//         const staticDelay = starIdx * 10;
//         return (
//           <div
//             key={`matrix-col-${starIdx}}`}
//             className="relative flex items-center justify-center"
//           >
//             <Star
//               isGlowing={mouseEnter ? true : isGlowing}
//               delay={mouseEnter ? staticDelay : delay}
//             />
//             {mouseEnter && <Glow delay={staticDelay} />}
//             <AnimatePresence mode="wait">
//               {isGlowing && <Glow delay={delay} />}
//             </AnimatePresence>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// const Star = ({ isGlowing, delay }: { isGlowing: boolean; delay: number }) => {
//   return (
//     <motion.div
//       key={delay}
//       initial={{
//         scale: 0.5,
//       }}
//       animate={{
//         scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
//         background: isGlowing ? "#fff" : "#666",
//       }}
//       transition={{
//         duration: 2,
//         ease: "easeInOut",
//         delay: delay,
//       }}
//       className={cn("bg-[#666] h-[1px] w-[1px] rounded-full relative z-20")}
//     ></motion.div>
//   );
// };

// const Glow = ({ delay }: { delay: number }) => {
//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//       }}
//       animate={{
//         opacity: 1,
//       }}
//       transition={{
//         duration: 2,
//         ease: "easeInOut",
//         delay: delay,
//       }}
//       exit={{
//         opacity: 0,
//       }}
//       className="absolute  left-1/2 -translate-x-1/2 z-10 h-[4px] w-[4px] rounded-full bg-gray-500 blur-[1px] shadow-2xl shadow-indigo-400"
//     />
//   );
// };


import { cn } from "@/lib/utils";
import React from "react";

export function GridBackgroundDemo() {
  return (
        <div className="relative flex h-full w-full items-center justify-center bg-white dark:bg-black">
          <div
            className={cn(
              "absolute inset-0",
              "[background-size: screen(100%)]",
              "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
              "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
            )}
          />
         
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
          <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
            
          </p>
        </div>
  );
}
