import CopyButton from "@/components/copy-btn";
import CopyBtn from "@/components/CopyButton";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import {
  ChevronLeft,
  Share2,
  Code,
  Link as LinkIcon,
  Copy,
  ExternalLink,
  Sparkles,
  CheckCircle,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { projects as dbProjects } from "@/db/schema";

const Page = async ({
  params,
}: {
  params: {
    projectId: string;
    projectName: string;
  };
}) => {
  if (!params.projectId) return <div>Invalid Project ID</div>;
  if (!params.projectName) return <div>Invalid Project Name</div>;
  if (!process.env.WIDGET_URL) return <div>Missing WIDGET_URL</div>;

  const projects = await db.query.projects.findMany({
    where:
      eq(dbProjects.name, params.projectName) &&
      eq(dbProjects.id, parseInt(params.projectId)),
    with: {
      feedbacks: true,
    },
  });

  const project = projects[0];

  const widgetUrl = `https://feed-x-widget.vercel.app/?projectId=${params.projectId}&projectName=${params.projectName}`;

  const embedCode = `<my-widget project-id="${params.projectId}"></my-widget>
<script src="${process.env.WIDGET_URL}/widget.umd.js"></script>`;

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <div>
        <Button
          variant="secondary"
          className="rounded-full hover:scale-105 transition-all shadow-sm group"
          asChild
        >
          <Link href={`/projects/${params.projectId}/${project.name}`}>
            <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Project
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
            <Code className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-mono">
              Start Collecting Feedback
            </h1>
            <p className="text-muted-foreground mt-1">
              Share your feedback link or embed the widget on your site
            </p>
          </div>
        </div>
      </div>

      {/* Project Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative group p-4 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden">
          <div className="absolute -right-10 -top-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
          <div className="relative z-10">
            <p className="text-sm text-muted-foreground mb-1">Project ID</p>
            <p className="text-2xl font-bold font-mono bg-gradient-to-r from-primary via-emerald-400 to-primary bg-clip-text text-transparent bg-[length:200%_100%]">
              {params.projectId}
            </p>
          </div>
        </div>
        <div className="relative group p-4 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden">
          <div className="absolute -right-10 -top-10 w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors" />
          <div className="relative z-10">
            <p className="text-sm text-muted-foreground mb-1">Project Name</p>
            <p className="text-2xl font-bold font-mono bg-gradient-to-r from-emerald-400 via-primary to-emerald-400 bg-clip-text text-transparent bg-[length:200%_100%]">
              {params.projectName}
            </p>
          </div>
        </div>
      </div>

      {/* Option 1: Share Link */}
      <div className="relative group">
        {/* Animated border */}
        <div className="absolute -inset-[1px] rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div
            className="absolute inset-[-200%]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, hsl(var(--primary)), transparent 30%)",
              animation: "spin 3s linear infinite",
            }}
          />
        </div>

        <div className="relative p-6 rounded-2xl border border-border/50 bg-background/80 backdrop-blur-xl overflow-hidden">
          {/* Background glow */}
          <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -left-20 -bottom-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                <LinkIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Option 1: Share Link</h2>
                <p className="text-sm text-muted-foreground">
                  Share this link with others to collect feedback
                </p>
              </div>
            </div>

            {/* URL Display */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border/50 font-mono text-sm break-all">
              <span className="text-muted-foreground">{widgetUrl}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                className="flex-1 sm:flex-none rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all group/btn"
                asChild
              >
                <Link href={widgetUrl} target="_blank">
                  <Share2 className="w-4 h-4 mr-2" />
                  Open Feedback Page
                  <ExternalLink className="w-3 h-3 ml-2 opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
                </Link>
              </Button>
              <div className="flex-1 sm:flex-none">
                <CopyBtn text={widgetUrl} />
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-3">
              {["No code required", "Instant setup", "Mobile friendly"].map(
                (feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-sm"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-primary/20 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-primary/20 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <span className="text-muted-foreground font-medium px-4">OR</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Option 2: Embed Code */}
      <div className="relative group">
        {/* Animated border */}
        <div className="absolute -inset-[1px] rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div
            className="absolute inset-[-200%]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, hsl(var(--primary)), transparent 30%)",
              animation: "spin 3s linear infinite",
            }}
          />
        </div>

        <div className="relative p-6 rounded-2xl border border-border/50 bg-background/80 backdrop-blur-xl overflow-hidden">
          {/* Background glow */}
          <div className="absolute -right-20 -top-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute -left-20 -bottom-20 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <Code className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  Option 2: Embed Widget
                </h2>
                <p className="text-sm text-muted-foreground">
                  Add this code to your website to embed the feedback widget
                </p>
              </div>
            </div>

            {/* Code Block */}
            <div className="relative">
              <div className="absolute top-3 right-3 z-10">
                <CopyButton text={embedCode} />
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto">
                <pre className="text-sm">
                  <code>
                    <span className="text-pink-400">&lt;my-widget</span>
                    <span className="text-sky-300"> project-id</span>
                    <span className="text-white">=</span>
                    <span className="text-emerald-400">
                      &quot;{params.projectId}&quot;
                    </span>
                    <span className="text-pink-400">
                      &gt;&lt;/my-widget&gt;
                    </span>
                    {"\n"}
                    <span className="text-pink-400">&lt;script</span>
                    <span className="text-sky-300"> src</span>
                    <span className="text-white">=</span>
                    <span className="text-emerald-400">
                      &quot;{process.env.WIDGET_URL}/widget.umd.js&quot;
                    </span>
                    <span className="text-pink-400">&gt;&lt;/script&gt;</span>
                  </code>
                </pre>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-3">
              {["Customizable", "Lightweight", "Works everywhere"].map(
                (feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/5 border border-purple-500/10 text-sm"
                  >
                    <Zap className="w-3.5 h-3.5 text-purple-500" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-purple-500/20 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-purple-500/20 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Help Card */}
      <div className="relative p-5 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden">
        <div className="absolute -right-10 -top-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Need help?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Check out our{" "}
              <Link
                href="https://github.com/SjxSubham/saas-feedx/wiki"
                target="_blank"
                className="text-primary hover:underline"
              >
                documentation
              </Link>{" "}
              for detailed integration guides and customization options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
