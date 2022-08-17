import type {NextPage} from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-white dark:bg-slate-800">
            <Head>
                <title>Hugman - Games</title>
            </Head>
            <Link href="/games/craftle">
                <button
                    className="rounded-full py-2 px-4 bg-gradient-to-br from-red-400 to-yellow-400 font-bold">Craftle
                </button>
            </Link>
        </div>
    )
}

export default Home
