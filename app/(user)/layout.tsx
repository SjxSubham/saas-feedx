import Loading from "./loading";
import { Suspense } from "react";
export default function UserLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className='container mx-auto max-w-7xl px-4 py-8 md:py-12 min-h-screen'>
            <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
    )
}