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
      <body>
        
        
          <PageHeader/>
          
          {children}
          </body>
      </html>
    </ClerkProvider>
    
  );
}
