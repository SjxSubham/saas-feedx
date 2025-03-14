"use client";

import { Share2 } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
    const CopyBtn = ({ text }:{
        text: string
    }) => {
        const copyToClipboard = (text: string) => {
            navigator.clipboard.writeText(text).then(() => {
                alert('Link Copied to clipboard');
            })
        }
        
        return (
            <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild><button onClick={ ()=> copyToClipboard(text)} className="text-gray-500 mb-2 p-2" >
            <Share2 size={20}/></button>
            </TooltipTrigger>
            <TooltipContent>
            <p>Copy Link</p>
            </TooltipContent>
        </Tooltip>
        </TooltipProvider>

            
        )
  
};

export default CopyBtn;
