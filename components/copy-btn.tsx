"use client";
import { Clipboard } from 'lucide-react';
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
                alert('Copied to clipboard');
            })
        }
        
        return (
            <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild><button onClick={ ()=> copyToClipboard(text)} className="text-slate-50 absolute right-0 top-0 p-2" >
            <Clipboard size={20}/></button>
            </TooltipTrigger>
            <TooltipContent>
            <p>Copy code</p>
            </TooltipContent>
        </Tooltip>
        </TooltipProvider>

            
        )
  
};

export default CopyBtn;