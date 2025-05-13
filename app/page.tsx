import Image from "next/image";

import LandingPage from "./landing-page";
import { GridBackgroundDemo } from "@/components/ui/glowing-stars";
import NetworkStatusToast from "@/components/NetworkStatusToast";
// import Footer from "./landing-page/footer"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
     <div className="absolute inset-0 -z-10">
        <NetworkStatusToast />
        <GridBackgroundDemo />
      </div>
      <LandingPage />
      
    </main>
  );
}