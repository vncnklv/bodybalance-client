import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="h-16 shadow-md flex items-center justify-around mb-36">
            <Link to={'/'} className="text-2xl text-primary font-bold">BodyBalance</Link>
            <div className="flex gap-2">
                <Link to={'/login'} className="font-medium px-6 py-2 text-gray-800 hover:text-black">Login</Link>
                <Link to={'/register'} className="font-medium bg-secondary rounded-full px-10 py-2 text-gray-800 hover:text-black">Register</Link>
            </div>
        </header>
    )
}
