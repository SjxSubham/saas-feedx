// const Feature = ({ title, description }: { title: string, description: string }) => (
//     <div className="p-5 border hover:shadow-emerald-200 rounded-lg shadow-lg">
//       <h4 className="mb-2 font-semibold">{title}</h4>
//       <p>{description}</p>
//     </div>
//   )
  
//   export default Feature;
"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const Feature = ({ title, description }: { title: string; description: string }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    const x = (clientX - left) / width - 0.5; 
    const y = (clientY - top) / height - 0.5;

    setRotateX(y * -15); 
    setRotateY(x * 15);
  };

  return (
    <motion.div
      className="p-5 border hover:shadow-emerald-200 rounded-lg shadow-lg bg-white"
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
      <h4 className="mb-2 font-semibold">{title}</h4>
      <p>{description}</p>
    </motion.div>
  );
};

export default Feature;
