import { db } from "@/db"; // i run the Query
import { projects as dbProjects } from "@/db/schema"; // filter krney ke liye
import { log } from "console";
import { eq } from "drizzle-orm"; // project fetch Table naMe
import Link from "next/link";
import { Globe, ChevronLeft, Code } from "lucide-react";
import Table from "@/components/table";
import { Button } from "@/components/ui/button";

const Page = async ({
  params,
}: {
  params: {
    projectId: string;
    projectName: string;
  };
}) => {
  if (!params.projectId) return <div>Invalid Project ID</div>;
  const projects = await db.query.projects.findMany({
    where:
      eq(dbProjects.id, parseInt(params.projectId)) &&
      eq(dbProjects.name, params.projectName),
    with: {
      feedbacks: true,
    },
  });

  const project = projects[0];

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <div className="my-4">
        <Button variant="secondary" className="rounded-full hover:scale-105 transition-all shadow-sm" asChild>
          <Link href="/dashboard">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </Button>
      </div>

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight glow-text text-foreground">{project.name}</h1>
          <p className="text-xl text-muted-foreground">{project.description}</p>
        </div>
        <div className="flex items-center gap-4">
          {project.url && (
            <Button variant="secondary" className="shadow-sm hover:scale-105 transition-transform px-6" asChild>
              <Link href={project.url} target="_blank">
                <Globe className="w-4 h-4 mr-2" />
                Visit Site
              </Link>
            </Button>
          )}
          <Button className="bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 rounded-lg px-6" asChild>
            <Link href={`/projects/${params.projectId}/${params.projectName}/instructions`}>
              <Code className="w-4 h-4 mr-2" />
              Share Link
            </Link>
          </Button>
        </div>
      </div>

      {/* Table Container */}
      <div className="glass-panel p-6 rounded-2xl overflow-hidden border border-white/5">
        <Table data={project.feedbacks} />
      </div>
    </div>
  );
};
export default Page;
