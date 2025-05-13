import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'
import PageHeader from '@/components/page-headers'
import { ThemeProvider } from '@/components/ThemeContext';
import { Toaster } from 'react-hot-toast';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (   
    <ClerkProvider>
     <html lang = "en">
     
<body>
{/* <Script id="feedx-widget" src='https://feed-x-widget.vercel.app/widget.umd.js'>
</Script> */}
<Toaster position="top-center" />
          <ThemeProvider>
          <PageHeader/>
          
          {children}
          </ThemeProvider>
          </body>
      </html>
    </ClerkProvider>
    
  );
}
