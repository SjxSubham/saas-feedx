"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { AlignJustify, X, Folder, CreditCard } from 'lucide-react';
  import { useState } from "react";
import { Button } from "@/components/ui/button";
import  Link from "next/link";
  const HeaderMenu = () => {
    const [open, setOpen] = useState<boolean>(false);


    const toggleMenu = () => {
        setOpen(prevOpen => !prevOpen);
    }
    return (
        <DropdownMenu open={open} onOpenChange={toggleMenu}>
            <DropdownMenuTrigger asChild>
            <Button onClick={toggleMenu} className="bg-transparent dark:bg-transparent mr-4" variant="secondary">{
             open ? <X className="h-6 w-6 "/> : <AlignJustify className="h-6 w-6 "/>
    }
            </Button>
            </DropdownMenuTrigger>
  
  <DropdownMenuContent className="w-56">
    <DropdownMenuItem asChild>
        <Link href="/dashboard" className="flex">
        <Folder className="mr-2 h-4 w-4"/><span>Projects</span>
        </Link></DropdownMenuItem>
    <DropdownMenuItem asChild>
        <Link href="/payments/subscribe" className="flex">
        <CreditCard className="mr-2 h-4 w-4"/><span>Billing</span>
        </Link></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

    )
  }
  export default HeaderMenu;
