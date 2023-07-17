import Image from 'next/image'
import { Inter } from 'next/font/google'
import GiphyLogo from '../images/1280px-Giphy-logo.svg.png'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
    <h1 className='text-3xl font-bold'>WELCOME TO YOUR GIPHY</h1>
    <Image src={GiphyLogo} width={160} height={40} alt='giphy logo'/>
    <div>
      <Link href={"ironman"} className='block text-center my-4 text-blue-500 hover:text-blue-200'>IRON MAN GIPHY</Link>
      <Link href={"search"} className='block text-center my-4 text-blue-500 hover:text-blue-200' >SEARCH YOUR GIPHY</Link>
    </div>
    </main>
  )
}
