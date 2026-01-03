import { Github } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-border mt-20 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold tracking-tighter glow-text">FeedX</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Collect feedback, build better products.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="https://github.com/SjxSubham/saas-feedx"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-background border border-border hover:border-primary/50 hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.5)] transition-all duration-300"
          >
            <div className="bg-foreground text-background p-1 rounded-full group-hover:scale-110 transition-transform">
              <Github className="w-4 h-4" />
            </div>
            <span className="font-semibold text-sm group-hover:text-primary transition-colors">Star on GitHub</span>
          </Link>
        </div>

        <div className="text-sm text-muted-foreground">
          © 2024 FeedX. Made by Sjx.
        </div>
      </div>
    </footer>
  );
};
export default Footer;
