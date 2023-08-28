import Footer from '@/components/footer/footer';
import { Header } from '@/components/header/header';
import MyProgressBar from '@/components/progressBar/progresbar';
import { Providers } from "@/providers/Providers";
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            <MyProgressBar/>
            <div className="flex flex-col justify-between relative min-h-screen">
              <Header />    
              <div className="container">
                <main>{children}</main>                   
              </div>
              <Footer/>
            </div>
            <ToastContainer 
              position="bottom-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
        </Providers>
      </body>
    </html>

  )
}
