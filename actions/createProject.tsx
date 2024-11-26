'use server';
import { db } from "@/db";
import {projects} from "@/db/schema";
import {auth, currentUser} from "@clerk/nextjs/server";
import { log } from "node:console";
import { url } from "node:inspector";
import { describe } from "node:test";
import {redirect }from "next/navigation";
export async function createProject(formData: FormData){
    const {userId} = auth();


    const project = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        url: formData.get("url") as string,
        userId,
    }
    // console.log(`Creating new project with data: ${JSON.stringify(project)}`);
    // console.log(`Current User: ${JSON.stringify(userId)}`);
    
    
    const [newProject] = await db.insert(projects).values(project).returning({insertedId: projects.id})

   
    

    // return newProject.insertedId;
    redirect(`/projects/${newProject.insertedId}'}/instructions`);
    
}