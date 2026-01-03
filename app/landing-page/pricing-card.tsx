"use client";
import { PricingPlan } from "./pricing-section";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    <div
      className={cn(
        "glass-panel rounded-lg relative flex flex-col justify-between p-8 min-h-[500px] transition-all duration-300 hover:-translate-y-2",
        isPopular ? "border-primary/50 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)]" : "hover:border-primary/20"
      )}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-lg">
          Most Popular
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <p className="text-muted-foreground mt-2">{description}</p>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-foreground">₹{price}</span>
          <span className="text-muted-foreground">/mo</span>
        </div>

        <div className="h-px bg-border w-full" />

        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-3 text-sm"
            >
              <div className={cn(
                "rounded-full flex items-center justify-center w-6 h-6 shrink-0",
                isPopular ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
              )}>
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="text-gray-800 dark:text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <Button
          onClick={onClick}
          variant={isPopular ? "default" : "outline"}
          className={cn(
            "w-full h-12 rounded-xl text-base font-semibold transition-all",
            isPopular
              ? "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20"
              : "border-border hover:bg-secondary"
          )}
        >
          {isPopular ? "Get Started" : "Choose Plan"}
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
