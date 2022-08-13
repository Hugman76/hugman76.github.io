import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-white dark:bg-slate-800">
          <a href="/games/craftle"><button className="rounded-full bg-orange-400 py-2 px-4 font-bold">Craftle</button></a>
      </div>
  )
}

export default Home
