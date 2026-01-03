import PricingCard from "./pricing-card";

export type PricingPlan = {
  title: string;
  price: number;
  description: string;
  isPopular: boolean;
  features: string[];
  url: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    title: "Free",
    price: 0,
    description: "For small teams just getting started",
    isPopular: false,
    url: "/dashboard",
    features: [
      "5 projects",
      "Unlimited users",
      "2GB storage",
      "Priority support",
    ],
  },
  {
    title: "Monthly",
    price: 29.00,
    description: "For growing teams, Industries",
    isPopular: true,
    url: "/payments/subscribe?plan=monthly",
    features: [
      "Unlimited projects",
      "Unlimited users",
      "5GB storage",
      "Priority support",
    ],
  },
  {
    title: "Yearly",
    price: 99.00,
    description: "Upgrade to save more!",
    isPopular: false,
    url: "/payments/subscribe?plan=yearly",
    features: [
      "Unlimited projects",
      "Unlimited users",
      "50GB storage",
      "24/7 support",
    ],
  },
]


const PricingSection = () => {
  return (
    <div className="relative py-24 px-4 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Plans & Pricing</h2>
        <h1 className="text-4xl md:text-5xl font-bold text-center glow-text mb-6">
          Simple Pricing <span className="text-muted-foreground">for Everyone</span>
        </h1>
        <p className="text-xl text-muted-foreground text-center max-w-2xl mb-16">
          Choose the plan that fits your needs. No hidden fees, cancel anytime.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PricingSection;