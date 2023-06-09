import { Link } from "react-router-dom";
import { useAuth } from "../contexts/UserProvider";

export default function Header() {
    const { isAuth, user } = useAuth();

    return (
        <header className="h-16 shadow-md flex items-center justify-around mb-24">
            <Link to={isAuth ? '/dashboard' : '/'} className="text-2xl text-primary font-bold">BodyBalance.</Link>

            {isAuth
                ? <div className="flex gap-2"><Link to={'/profile'} className="font-medium px-6 py-2 text-gray-800 hover:text-black">{user?.username}</Link>
                    <Link to={'/logout'} className="font-medium px-6 py-2 text-gray-800 hover:text-black">Logout</Link></div>
                : <div className="flex gap-2">
                    <Link to={'/login'} className="font-medium px-6 py-2 text-gray-800 hover:text-black text-sm">LOG IN</Link>
                    <Link to={'/register'} className="font-medium bg-secondary rounded-full px-10 py-2 text-gray-800 text-sm hover:text-black ">SIGN UP</Link>
                </div>
            }


        </header>
    )
}
