// import Feature from './feature';

// const features = [
//   {
//     title: 'Seamless Integration',
//     description: 'Easily integrate with your existing tools and services.',
//   },
//   {
//     title: 'Customizable',
//     description: 'Customize FeedX to fit your needs and preferences.',
//     icon: 'icon-2',
//   },
//   {
//     title: 'Analytics',
//     description: 'Track and analyze feedback to make informed decisions.',
//   },
//   {
//     title: 'Secure',
//     description: 'Your data is safe and secure with FeedX.',
//   },
//   {
//     title: 'Scalable',
//     description: 'Grow your business with FeedX as you scale.',
//   },
//   {
//     title: 'Fast Support',
//     description: 'Get help when you need it with our fast support team.',
//   }
// ];

// const FeaturesSection = () => {
//   return (
//     <section className="container mx-auto max-w-screen-xl px-4 my-24 flex items-center flex-col">
//       <h2 className="mb-6 text-2xl font-bold">Features</h2>
//       <div className="container mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {features.map((feature, index) => (
//             <Feature key={index} {...feature} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default FeaturesSection;

//********************************** */

"use client";
import Feature from "./feature";
import { motion } from "framer-motion";
import { Puzzle, Wand2, BarChart3, ShieldCheck, Zap, Headphones } from "lucide-react";

const features = [
  {
    title: "Seamless Integration",
    description: "Plug and play. Works with React, Vue, Svelte, and vanilla JS in seconds.",
    icon: <Puzzle className="w-6 h-6" />,
  },
  {
    title: "Fully Customizable",
    description: "Style the widget to match your brand perfectly with CSS variables.",
    icon: <Wand2 className="w-6 h-6" />,
  },
  {
    title: "Advanced Analytics",
    description: "Gain insights from user feedback with our powerful dashboard.",
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    title: "Enterprise Security",
    description: "SOC2 compliant. Your data is encrypted and safe with us.",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    title: "Infinite Scalability",
    description: "From 10 to 10 million users, we scale with you instantly.",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    title: "24/7 Priority Support",
    description: "Our dedicated team is ready to help you anytime, anywhere.",
    icon: <Headphones className="w-6 h-6" />,
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <h2 className="text-primary font-bold tracking-widest mb-4 text-sm">Why FeedX?</h2>
          <h3 className="text-4xl md:text-5xl font-bold glow-text mb-6">
            Built for modern <span className="text-muted-foreground">engineering teams.</span>
          </h3>
          <p className="text-lg text-muted-foreground">
            Everything you need to collect, analyze, and act on user feedback without the bloat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Feature {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
