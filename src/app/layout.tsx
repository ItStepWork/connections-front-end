import { Header } from '@/components/header/header'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

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
        <div className="wrapper">
          <div className="container">
            <Header />
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
