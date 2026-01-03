import LandingPage from "./landing-page";
import NetworkStatusToast from "@/components/NetworkStatusToast";

export default function Home() {
  return (
    <main className="min-h-screen w-full relative">
      <NetworkStatusToast />
      <LandingPage />
    </main>
  );
}