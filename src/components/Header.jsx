import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
export default function Header() {
    const { isLogged, user } = useUser();

    return (
        <header className="h-16 shadow-md flex items-center justify-around mb-36">
            <Link to={'/'} className="text-2xl text-primary font-bold">BodyBalance.</Link>

            {isLogged

                ? <div className="flex gap-2"><Link to={'/profile'} className="font-medium px-6 py-2 text-gray-800 hover:text-black text-sm">{user.username}</Link>
                    <Link to={'/logout'} className="font-medium px-6 py-2 text-gray-800 hover:text-black text-sm">Logout</Link></div>
                : <div className="flex gap-2">
                    <Link to={'/login'} className="font-medium px-6 py-2 text-gray-800 hover:text-black text-sm">LOG IN</Link>
                    <Link to={'/register'} className="font-medium bg-secondary rounded-full px-10 py-2 text-gray-800 text-sm hover:text-black ">SIGN UP</Link>
                </div>
            }


        </header>
    )
}
