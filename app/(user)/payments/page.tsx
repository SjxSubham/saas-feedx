import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import ManageSubscription from "./manage-subscription";
import {
  Crown,
  Sparkles,
  Check,
  Zap,
  Shield,
  Clock,
  CreditCard,
} from "lucide-react";

const page = async () => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }
  const subscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, userId),
  });

  const plan = subscription && subscription.subscribed ? "Premium" : "Free";
  const isPremium = plan === "Premium";

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-mono flex items-center gap-3">
          <CreditCard className="w-8 h-8 text-primary" />
          Subscription
        </h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing details
        </p>
      </div>

      {/* Main Card */}
      <div className="relative group">
        {/* Animated border gradient for premium */}
        {isPremium && (
          <div className="absolute -inset-[2px] rounded-2xl overflow-hidden">
            <div
              className="absolute inset-[-200%] animate-spin-slow"
              style={{
                background:
                  "conic-gradient(from 0deg, #c4f820, #10b981, #3b82f6, #8b5cf6, #c4f820)",
                animationDuration: "6s",
              }}
            />
          </div>
        )}

        <div
          className={`relative p-8 rounded-2xl border bg-background/80 backdrop-blur-xl overflow-hidden ${
            isPremium ? "border-0" : "border-border/50"
          }`}
        >
          {/* Background glow effects */}
          <div
            className={`absolute -right-20 -top-20 w-60 h-60 rounded-full blur-3xl ${
              isPremium ? "bg-primary/30" : "bg-primary/10"
            }`}
          />
          <div
            className={`absolute -left-20 -bottom-20 w-48 h-48 rounded-full blur-3xl ${
              isPremium ? "bg-purple-500/20" : "bg-emerald-500/10"
            }`}
          />

          {/* Content */}
          <div className="relative z-10 space-y-6">
            {/* Plan Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`p-4 rounded-2xl ${
                    isPremium
                      ? "bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/30"
                      : "bg-muted border border-border"
                  }`}
                >
                  {isPremium ? (
                    <Crown className="w-8 h-8 text-primary" />
                  ) : (
                    <Sparkles className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Plan</p>
                  <h2
                    className={`text-3xl font-bold ${
                      isPremium
                        ? "bg-gradient-to-r from-primary via-emerald-400 to-primary bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient"
                        : "text-foreground"
                    }`}
                  >
                    {plan}
                  </h2>
                </div>
              </div>

              {isPremium && (
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-medium text-primary">
                    Active
                  </span>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {isPremium ? (
                <>
                  <FeatureItem
                    icon={Zap}
                    text="Unlimited Projects"
                    active={true}
                  />
                  <FeatureItem
                    icon={Shield}
                    text="Priority Support"
                    active={true}
                  />
                  <FeatureItem
                    icon={Sparkles}
                    text="Advanced Analytics"
                    active={true}
                  />
                  <FeatureItem
                    icon={Clock}
                    text="Early Access Features"
                    active={true}
                  />
                </>
              ) : (
                <>
                  <FeatureItem icon={Check} text="5 Projects" active={true} />
                  <FeatureItem
                    icon={Check}
                    text="Basic Analytics"
                    active={true}
                  />
                  <FeatureItem
                    icon={Zap}
                    text="Unlimited Projects"
                    active={false}
                  />
                  <FeatureItem
                    icon={Shield}
                    text="Priority Support"
                    active={false}
                  />
                </>
              )}
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <ManageSubscription />
            </div>

            {/* Info text */}
            {isPremium && (
              <p className="text-sm text-muted-foreground text-center">
                Thank you for being a Premium subscriber!
              </p>
            )}
          </div>

          {/* Corner decorations */}
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-primary/20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-primary/20 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Additional Info Card */}
      {!isPremium && (
        <div className="relative p-6 rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden group">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">
                Unlock Premium Features
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Upgrade to Premium for unlimited projects, advanced analytics,
                and priority support.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function FeatureItem({
  icon: Icon,
  text,
  active,
}: {
  icon: React.ElementType;
  text: string;
  active: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
        active
          ? "bg-primary/5 border border-primary/10"
          : "bg-muted/50 border border-border/50 opacity-50"
      }`}
    >
      <div
        className={`p-1.5 rounded-lg ${
          active
            ? "bg-primary/10 text-primary"
            : "bg-muted text-muted-foreground"
        }`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <span
        className={`text-sm font-medium ${
          active ? "text-foreground" : "text-muted-foreground line-through"
        }`}
      >
        {text}
      </span>
      {active && <Check className="w-4 h-4 text-emerald-500 ml-auto" />}
    </div>
  );
}

export default page;
