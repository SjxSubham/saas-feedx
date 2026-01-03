import {
  ClerkProvider,
} from '@clerk/nextjs'
import './globals.css'
import PageHeader from '@/components/page-headers'
import { ThemeProvider } from '@/components/ThemeContext';
import { Toaster } from 'react-hot-toast';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <Toaster position="top-center" />
          <ThemeProvider>
            <PageHeader />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
