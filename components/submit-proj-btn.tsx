"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import {Loader2} from "lucide-react";

const SubmitButton = () => {
    const {pending} = useFormStatus();
    return (
        <Button className="bg-gradient-to-tr from-indigo-600 via-pink-600 to-purple-600 p-0.5"type="submit">{pending ? <> 
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating...</> : "Create Project"}</Button>
    );
}
export default SubmitButton;