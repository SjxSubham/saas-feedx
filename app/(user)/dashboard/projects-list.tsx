import { InferSelectModel } from "drizzle-orm";
import {projects} from "@/db/schema";
import {Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SubsribeBtn from "../payments/subscribe-btn";
import {monthlyPlanId} from "@/lib/payments";
import {Lock} from "lucide-react"
type Project = InferSelectModel<typeof projects>;
type Props = {
    projects: Project[];
}
const ProjectList = (props: Props) =>{
    return (
        <div>
            <ul className="grid grid-cols-1 md:grid-cols-3 m-5 p-4 gap-4">
                {props.projects.map((project: Project) => (
                    <li key={project.id}>
                        <Card className="max-w-[350px] flex flex-col h-full">
                            <CardHeader className="flex-1">
                                <CardTitle>{project.name}</CardTitle>
                                <CardDescription>{project.description}</CardDescription>
                            </CardHeader>
                            <Link href={`/projects/${project.id}`}>
                            <Button className="from-gray-950 via-gray-700 to-gray-500 bg-gradient-to-r justify-center ">View Project</Button>
                            </Link>
                            <CardFooter>

                            </CardFooter>
                        </Card>
                    </li>
                ))}
                <Card className="max-w-[350px] flex flex-col h-full bg-gray-300">
                    <CardHeader className="flex-1">
                        <CardTitle className="flex flex-row text-sm md:text-lg justify-center">
                            <Lock size={10} className="h-4 w-4 md:h-8 md:w-8 mr-2"/>
                            <span> Upgrade to Premium</span></CardTitle>
                        <CardDescription className="mt-3 flex flex-3 justify-center">Unlock unlimited Projects</CardDescription>
                        </CardHeader>
                <div className="w-fit mx-auto mb-4">
                <SubsribeBtn price={monthlyPlanId} />
                </div>
                </Card>
            </ul>
        </div>
    )
}
export default ProjectList;