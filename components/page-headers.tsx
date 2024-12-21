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

const PageHeader = () => {
    const [loading, setLoading] = useState(false); 

    return (
        <header className='w-full sticky transition-all inset-x-0 top-0 z-30 transition-all bg-white/20 backdrop-blur-md'>
            <div className='w-full max-w-screen-xl px-2.5 lg:px-20 relative mx-auto border-b'>
                <div className='flex h-14 items-center justify-between'>
                    <Link href="/">
                        {loading ? (
                            <Loading /> // Render loading 
                        ) : (
                            <Image src="/image.svg" alt="Logo" width={110} height={90} />
                        )}
                    </Link>
                    <div>
                        <SignedOut>
                            <SignInButton>
                                <Button className='bg-black rounded-md'>Sign IN</Button>
                            </SignInButton>
                            <SignUpButton>
                                <Button className='bg-slate-600 ml-2 rounded-md'>Sign Up</Button>
                            </SignUpButton>
                        </SignedOut>
                        <SignedIn>
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