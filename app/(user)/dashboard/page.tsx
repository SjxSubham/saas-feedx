"use client;"
import NewProjBtn from "@/components/new.proj";
import { Button } from "@/components/ui/button";
import {db} from "@/db";
import { motion } from "framer-motion";   //addition
import { projects} from "@/db/schema";
import {auth, currentUser} from "@clerk/nextjs/server";
import {eq} from "drizzle-orm";
import ProjectsList from "./projects-list";
import { getSubscription } from "@/actions/userSubscription";
import {maxFreeProjects} from "@/lib/payments";
import { log } from "console";
export default async function Page(){
    const { userId } = auth();
    if(!userId) {
        return null;
    }
    

    const userProjects = await db.select().from(projects).where(eq(projects.userId, userId));
   
    const subscribed = await getSubscription({userId});
    
    return (
       <div>
        <div className="flex items-center justify-center gap-3">
        <h1 className="text-3xl text-gray-200 font-bold font-mono text-center my-4 ">Your Projects List</h1>
        {/* {userProjects.length < maxFreeProjects && (
            <p className="text-gray-400">You can only add: {maxFreeProjects - userProjects.length}</p>
        )} */}
        </div>
        {subscribed !== true && userProjects.length > maxFreeProjects ? null:<NewProjBtn/>}
        {!subscribed ? <ProjectsList projects={userProjects}/> : null}
        
        </div>

    )
}