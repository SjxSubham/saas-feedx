import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'
import PageHeader from '@/components/page-headers'
import Script from 'next/script'
import Head from 'next/head'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (   
    <ClerkProvider>
     <html lang = "en">
      
        <Head>
          <Script src="https://feed-x-widget.vercel.app/feedx.umd.cjs">
          </Script>
          {/* <my-widget></my-widget> */}
        </Head>
        <body>
        <Script src="https://feed-x-widget.vercel.app/feedx.umd.cjs">
        </Script>
        {/* <my-widget></my-widget> */}
          <PageHeader/>
          
          {children}
        </body>
      </html>
    </ClerkProvider>
    
  );
}
