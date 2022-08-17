import Link from 'next/link'

export default function Navbar() {
    return <nav className="sticky top-0 flex justify-center space-x-4 bg-gray-200">
        <Link href="/"><a
            className="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">Home</a></Link>
        <Link href="/games"><a
            className="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">Games</a></Link>
    </nav>
}