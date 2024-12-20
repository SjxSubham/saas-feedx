import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    SignUpButton,
} from '@clerk/nextjs';


import Image from 'next/image';
import {Button} from "@/components/ui/button"
import HeaderMenu from './header-menu';

const PageHeader = () => {
    return (
        <header className='w-full sticky transition-all inset-x-0 top-0 z-30 transition-all bg-white/20 backdrop-blur-md'>
            <div className='w-full max-w-screen-xl px-2.5 lg:px-20 relative mx-auto border-b'>
                <div className='flex h-14 items-center justify-between'>
                    <Image src="/feedx.svg" alt="Logo" width={70} height={70} />
                    <div>
                    <SignedOut>
                        <SignInButton >
                        <Button className='bg-black rounded-md'>Sign IN</Button>
                        </SignInButton>
                        <SignUpButton>
                        <Button className='bg-slate-600 ml-2 rounded-md'>Sign Up</Button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <HeaderMenu/>
                        <UserButton />
                    </SignedIn>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default PageHeader;