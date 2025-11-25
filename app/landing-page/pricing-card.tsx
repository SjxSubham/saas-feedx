"use client";
import { PricingPlan } from "./pricing-section";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const PricingCard = ({
  title,
  price,
  description,
  features,
  isPopular,
  url,
}: PricingPlan) => {
  const router = useRouter();

  const onClick = () => {
    router.push(url);
  };

  return (
    <div className="card-accent relative flex flex-col justify-between h-96 w-96 p-6 text-white transition">
      {isPopular && (
        <div className="absolute top-3 right-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold shadow-sm">
          Popular
        </div>
      )}
      <div>
        <div className="inline-flex items-end">
          <h1 className="font-extrabold text-3xl">₹{price}</h1>
        </div>
        <h2 className="font-bold text-xl my-2">{title}</h2>
        <p>{description}</p>
        <div className="flex-grow border-t border-gray-400 opacity-25 my-3"></div>
        <ul>
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex flex-row items-center font-mono gap-2 my-2"
            >
              <div className="rounded-full flex items-center justify-center bg-white/10 w-4 h-4 mr-2">
                <Check className="text-white" width={10} height={10} />
              </div>
              <p>{feature}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Button variant="accent" onClick={onClick} className="w-full">
          Select Plan
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
