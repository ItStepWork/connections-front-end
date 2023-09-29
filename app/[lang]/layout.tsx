import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Locale, i18n } from '../../i18n.config';
import { Providers } from "../../providers/Providers";
import Footer from './components/footer/footer';
import MyProgressBar from './components/progressBar/progresbar';
import './globals.css';
import HeaderPage from './header/page';

const inter = Montserrat({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Connections',
  description: 'Connections Social Network',
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { lang: Locale}
}) {

  return (

    <html lang={params.lang}>
      <head>
        <meta charSet="utf-8" />
        <link
          crossOrigin="use-credentials"
          rel="manifest"
          href={"/manifest.json"}
        />
            
      </head>
      <body className={inter.className}>
     
          <Providers>
              <MyProgressBar/>
              <div className="flex flex-col justify-between relative min-h-screen overflow-auto">
                <HeaderPage lang={params.lang}/>    
                <div className="container px-3">
                  <main>{children}</main>                   
                </div>
                <Footer lang={params.lang}/>
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
