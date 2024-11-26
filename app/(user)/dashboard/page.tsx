import NewProjBtn from "@/components/new.proj";
import { Button } from "@/components/ui/button";
import {db} from "@/db";
import { projects} from "@/db/schema";
import {auth, currentUser} from "@clerk/nextjs/server";

import { log } from "console";
export default async function Page(){
    const { userId } = auth();
    

    const allProjects = await db.select().from(projects);
   
    
    
    return (
       <div><NewProjBtn/></div>

    )
}