"use client";
import { PricingPlan } from "./pricing-section";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

const PricingCard = ({ title, price, description, features, isPopular, url }: PricingPlan) => {
  const router = useRouter();

  const onClick = () => {
    router.push(url);
  }

  return (
    <div className="border flex flex-col justify-between bg-white/10 backdrop-blur-lg rounded-xl h-96 w-96 p-6 hover:shadow-emerald-300 shadow-md text-white transition">

      {
        isPopular && (
          <div className="absolute top-0 right-0 bg-gray-900 text-white px-2 py-1 rounded-bl-lg rounded-tr-lg">
            Popular
          </div>
        )
      }
      <div>
        <div className="inline-flex items-end">
          <h1 className="font-extrabold text-3xl">₹{price}</h1>
        </div>
        <h2 className="font-bold text-xl my-2">
          {title}
        </h2>
        <p>{description}</p>
        <div className="flex-grow border-t border-gray-400 opacity-25 my-3"></div>
        <ul>
          {
            features.map((feature, index) => (
              <li key={index} className="flex flex-row items-center font-mono gap-2 my-2">
                <div className="rounded-full flex items-center justify-center bg-gray-900 w-4 h-4 mr-2">
                  <Check className="text-white" width={10} height={10} />
                </div>
                <p>{feature}</p>
              </li>
            ))
          }
        </ul>
      </div>
      <div>
        <button onClick={onClick} className="bg-gray-900 py-2 mt-3 rounded-lg text-white w-full">
          Select Plan
        </button>
      </div>
    </div>
  )
}

export default PricingCard;