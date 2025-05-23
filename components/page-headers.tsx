"use client";
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    SignUpButton,
} from '@clerk/nextjs';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react'; 
import { Button } from "@/components/ui/button";
import HeaderMenu from './header-menu';
import Loading from '@/app/(user)/loading';
import ThemeToggleButton from '@/components/ThemeToggleButton';

const PageHeader = () => {
    const [loading, setLoading] = useState(false); 

    return (
        <header className='w-full sticky inset-x-0 top-0 z-30 transition-all bg-white/20 backdrop-blur-md'>
            <div className='w-full max-w-screen-xl px-2.5 lg:px-20 relative mx-auto border-stone-100'>
                <div className='flex h-14 items-center justify-between'>
                    <Link href="/" className="relative">
                        {loading ? (
                            <Loading />
                        ) : (
                            < div className="relative w-[110px] h-[90px] flex items-center justify-center">
                                
                                    <Image 
                                        src="/image.svg" 
                                        alt="FeedX Logo" 
                                        width={100} 
                                        height={90}
                                        className="object-contain  dark:bg-gradient-to-r from-purple-100  to-purple-100 rounded-xl "
                                        priority
                                    />
                            </div>
                        )}
                    </Link>
                    <div className="flex items-center gap-4">
                        <SignedOut>
                            <SignInButton>
                                <Button className='bg-black rounded-md'>Sign IN</Button>
                            </SignInButton>
                            <SignUpButton>
                                <Button className='bg-slate-600 ml-2 rounded-md'>Sign Up</Button>
                            </SignUpButton>
                        </SignedOut>
                        <SignedIn>
                            <div className='flex '>
                            <ThemeToggleButton/> 
                            </div>
                            <HeaderMenu />
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default PageHeader;