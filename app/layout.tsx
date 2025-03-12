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
      {/* <Script src='https://feed-x-widget.vercel.app/feedx.umd.cjs'>
      </Script> */}
      <title>FeedX</title>
      <link rel="icon" href="/favicon.ico" />
      </Head>
<body>
<Script id="feedx-widget" src='https://feed-x-widget.vercel.app/feedx.umd.cjs'>
</Script>
        
          <PageHeader/>
          
          {children}
          </body>
      </html>
    </ClerkProvider>
    
  );
}
