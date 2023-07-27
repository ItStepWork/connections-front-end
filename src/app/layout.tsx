'use client';
import { Header } from '@/components/header/header';
import type { Metadata } from 'next';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { Inter } from 'next/font/google';
import { Providers } from "@/components/Providers";
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Connections',
  description: 'Connections Social Network',
  manifest: '/manifest.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <div className="container">
            <main>{children}</main>
            <ProgressBar height="4px"
              color="#016FB9"
              options={{ showSpinner: false }}
              shallowRouting />
          </div>
        </Providers>
      </body>
    </html>

  )
}
