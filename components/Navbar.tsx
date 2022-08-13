export default function Navbar() {
    return <nav className="sticky top-0 flex justify-center space-x-4 bg-gray-200">
        <a href="/"
           className="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">Home</a>
        <a href="/games"
           className="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">Games</a>
    </nav>
}