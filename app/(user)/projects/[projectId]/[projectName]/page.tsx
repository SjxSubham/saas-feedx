import { db } from "@/db"; // i run the Query
import { projects as dbProjects } from "@/db/schema"; // filter krney ke liye
import { log } from "console";
import { eq } from "drizzle-orm"; // project fetch Table naMe
import Link from "next/link";
import { Globe, ChevronLeft, Code } from 'lucide-react';
import Table from "@/components/table";
import { Button } from "@/components/ui/button";

const Page = async ({ params }: {
    params: {
        projectId: string;
        projectName: string;

    }
}) => {
    if (!params.projectId) return (<div>Invalid Project ID</div>);
    const projects = await db.query.projects.findMany({
        where: (eq(dbProjects.id, parseInt(params.projectId)) && eq(dbProjects.name, params.projectName)),
        with: {
            feedbacks: true,
        },
    });

    const project = projects[0];

    return (
        <div>
            <div className="relative flex py-3 ">
                <Link href="/dashboard">
                    <Button className="bg-indigo-400 flex items-center mb-2 w-fit hover:bg-indigo-500">
                        <ChevronLeft className="h-5 w-5 mr-1" /><span className="text-lg">Back to all Projects</span>
                    </Button>
                </Link>
            </div>
            <div className="flex justify-between items-start">
                <div className="proj-info">
                    <div >
                        <h1 className="text-3xl text-white font-bold mb-3 px-5">{project.name}</h1>
                        <h2 className="text-primary-background text-white font-mono text-xl py-1 px-5">{project.description}</h2>
                    </div>
                    <div className="flex flex-col">
                        {project.url ? <Link href={project.url} className="underline text-indigo-200 flex items-center p-4"><Globe className="h-5 w-5 mr-1" /><span className="text-lg">Visit Site</span></Link> : null}
                        <Link href={`/projects/${params.projectId}/${params.projectName}/instructions`} className="underline text-indigo-200 flex items-center mt-2 px-2">
                            <Code className="h-5 w-5 mr-1" /><span className="text-lg">Share Link / Embed Code</span></Link></div>
                </div>
            </div>
            <div >
                <Table data={project.feedbacks} />
            </div>
        </div>
    )
}
export default Page;
