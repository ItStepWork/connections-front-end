'use client';
import { Header } from '@/components/header/header';
import { UserStoreDto } from '@/dto/userDataDto';
import { Providers } from "@/providers/Providers";
import { Loading } from '@nextui-org/react';
import type { Metadata } from 'next';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { Montserrat } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';

const inter = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Connections',
  description: 'Connections Social Network',
  //manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      <head>
        <link
          rel="manifest"
          href="/manifest.json"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <Header />
          <div className="container">
          <UserStoreDto/>
          <Suspense fallback={<Loading/>}>
            <main> {children}</main>
          </Suspense>
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
