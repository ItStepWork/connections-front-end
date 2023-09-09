'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


export default function LocaleSwitcher() {
  const pathName = usePathname()

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <div className='flex gap-x-1'>
      <Link href={redirectedPathName('ua')} locale={'ua'} className='text-gray-900 dark:text-dark_text_gray hover:text-button_blue_BG transition-all duration-300 ease-in'>Ua</Link>   
      <p className='text-gray-900 dark:text-dark_text_gray'>/</p>    
      <Link href={redirectedPathName('en')} locale={'en'} className='text-gray-900 dark:text-dark_text_gray hover:text-button_blue_BG transition-all duration-300 ease-in'>En</Link>
    </div>
  )
}
