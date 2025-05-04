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
import Feature from './feature';
import { motion } from "framer-motion";

const features = [
  { title: 'Seamless Integration', description: 'Easily integrate with your existing tools and services.' },
  { title: 'Customizable', description: 'Customize FeedX to fit your needs and preferences.' },
  { title: 'Analytics', description: 'Track and analyze feedback to make informed decisions.' },
  { title: 'Secure', description: 'Your data is safe and secure with FeedX.' },
  { title: 'Scalable', description: 'Grow your business with FeedX as you scale.' },
  { title: 'Fast Support', description: 'Get help when you need it with our fast support team.' }
];

const FeaturesSection = () => {
  return (
    <motion.section
      className="container mx-auto max-w-screen-xl px-4 py-10 rounded-t-3xl text-white"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif font-extrabold">Features</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 rounded-t-3xl shadow-md hover:shadow-emerald-400 transition"
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-white/80">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
