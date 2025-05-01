// "use client";

// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import {
//   SignUpButton,
//   SignedIn,
//   SignedOut,
// } from "@clerk/nextjs";
// import Link from "next/link";
// import { LogIn, Github } from "lucide-react";
// import Image from "next/image";
// import { useState } from "react";

// const Hero = () => {
//   const [rotateX, setRotateX] = useState(0);
//   const [rotateY, setRotateY] = useState(0);

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const { clientX, clientY, currentTarget } = e;
//     const { left, top, width, height } = currentTarget.getBoundingClientRect();

//     const x = (clientX - left) / width - 0.5; 
//     const y = (clientY - top) / height - 0.5;

//     setRotateX(y * -10);
//     setRotateY(x * 15);
//   };

//   return (
//     <section className="grow">
//       <div className="container mx-auto px-4 mb-24 mt-4 flex flex-col md:flex-row justify-center">
        
//         <motion.div
//           className="flex flex-col max-w-sm justify-center"
//           onMouseMove={handleMouseMove}
//           onMouseLeave={() => {
//             setRotateX(0);
//             setRotateY(0);
//           }}
//           style={{
//             transformStyle: "preserve-3d",
//             transform: `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
//             transition: "transform 0.1s ease-out",
//           }}
//         >
//           <div className="bg-white/100 shadow-lg p-6 rounded-3xl mt-6 relative mb-8">
//             <h1 className="mb-5 text-5xl font-extrabold leading-tight">
//               Collect your feedback seamlessly
//             </h1>
//             <p className="text-gray-500 text-lg">
//               Easily integrate FeedX and start collecting feedback today.
//             </p>
//           </div>
          
//           <div>
//             <SignedOut>
//               <SignUpButton>
//                 <div className="flex gap-3">
//                   <Button className="shadow-sm hover:shadow-gray-500">
//                     <LogIn className="w-4 h-4 mr-2" />
//                     Get Started
//                   </Button>
//                   <Button variant="secondary" asChild>
//                     <Link href="https://github.com/SjxSubham/saas-feedx/wiki">
//                       <Github className="w-4 h-4 mr-2" />
//                       Star on GitHub
//                     </Link>
//                   </Button>
//                 </div>
//               </SignUpButton>
//             </SignedOut>
//             <SignedIn>
//               <Button className="shadow-lg hover:shadow-gray-500" asChild>
//                 <Link href="/dashboard">Dashboard</Link>
//               </Button>
//             </SignedIn>
//           </div>
//         </motion.div>

//         {/* Right Section (GIF) */}
//         <motion.div
//           className="flex-1 max-w-md hover:shadow-emerald-200 shadow-md"
//           onMouseMove={handleMouseMove}
//           onMouseLeave={() => {
//             setRotateX(0);
//             setRotateY(0);
//           }}
//           style={{
//             transformStyle: "preserve-3d",
//             transform: `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
//             transition: "transform 0.1s ease-out",
//           }}
//         >
//           <Image
//             src={"/feedx.gif"}
//             alt="demo"
//             layout={"responsive"}
//             width={155}
//             height={155}
//             unoptimized={true}
//           />
//         </motion.div>
//       </div>      
//     </section>
//   );
// };

// export default Hero;




// **********************************************

"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import Link from "next/link";
import { LogIn, Github } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Hero = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    setRotateX(y * -10);
    setRotateY(x * 15);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white px-6">
      <motion.div
        className="w-20 h-40 -rotate-90 z-10 absolute rounded-3xl inset-0.5 bg-gradient-to-br from-blue-500/20 to-purple-700/20 backdrop-blur-xl"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="w-20 h-40 translate-x-32 translate-y-20 -rotate-90 z-10 absolute rounded-3xl inset-0.5 bg-gradient-to-br from-blue-500/20 to-purple-700/20 backdrop-blur-xl"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
       <motion.div
        className="w-50 h-16 translate-y-80 -rotate-10 z-0 absolute rounded-3xl inset-0.5 bg-gradient-to-br from-blue-500/20 to-purple-700/20 backdrop-blur-xl"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="w-auto h-80 rotate-180 z-0 absolute rounded-3xl inset-0.5 bg-gradient-to-br from-blue-500/20 to-purple-700/20 backdrop-blur-xl"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-center">
        {/* Left Content */}
        <motion.div
          className="p-10 bg-white/10 rounded-3xl shadow-2xl max-w-xl backdrop-blur-md"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setRotateX(0);
            setRotateY(0);
          }}
          style={{
            transformStyle: "preserve-3d",
            transform: `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-black dark:text-white">
            Collect Feedback Seamlessly
          </h1>
          <p className="text-gray-500 dark:text-white/50 text-lg mb-6">
            Easily integrate FeedX and start collecting feedback with just a few clicks.
          </p>
          <div className="flex flex-wrap gap-4">
            <SignedOut>
              <SignUpButton>
                <Button className="bg-emerald-600 hover:bg-emerald-500 shadow-lg">
                  <LogIn className="w-4 h-4 mr-2" />
                  Get Started
                </Button>
              </SignUpButton>
              <Button variant="secondary" asChild>
                <Link href="https://github.com/SjxSubham/saas-feedx/wiki">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub Docs
                </Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button className="bg-gray-700 dark:hover:bg-violet-600 dark:bg-violet-500 dark:text-gray-200 hover:bg-emerald-500 shadow-2xl hover:shadow-gray-500" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </SignedIn>
          </div>
        
        </motion.div>

        {/* Right GIF */}
        <motion.div
          className="max-w-sm rounded-xl overflow-hidden shadow-xl"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setRotateX(0);
            setRotateY(0);
          }}
          style={{
            transformStyle: "preserve-3d",
            transform: `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <Image
            src={"/feedx.gif"}
            alt="Demo"
            width={350}
            height={350}
            className="rounded-xl"
            unoptimized
          />
         
          
        </motion.div>
        <motion.div
        className="w-full h-10 -rotate-180 z-0 fixed rounded-3xl inset-0.5 bg-gradient-to-br from-blue-500/20 to-purple-700/20 backdrop-blur-xl"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      </div>
      <motion.div
        className="w-auto h-80 rotate-180 z-0 translate-y-96 absolute rounded-3xl inset-0.5 bg-gradient-to-br from-blue-500/20 to-purple-700/20 backdrop-blur-xl"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="w-20 h-40 -rotate-90 z-20 absolute -translate-y-56 translate-x-24 rounded-3xl inset-0.5 bg-gradient-to-br from-blue-500/20 to-purple-700/20 backdrop-blur-xl"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </section>
  );
};

export default Hero;
