import { Link } from "react-router-dom";
import { useAuth } from "../contexts/UserProvider";
import logoutIcon from '../assets/logout.png'

export default function Header() {
    const { isAuth, user } = useAuth();

    return (
        <>
            <header className="h-16 shadow-md flex items-center justify-around mb-16">
                <Link to={isAuth ? '/dashboard' : '/'} className="text-2xl text-primary font-bold">BodyBalance.</Link>

                {isAuth
                    ? <div className="flex items-center gap-4">
                        <div>
                            <Link to={'/dashboard'} className="px-4 py-2 text-gray-700 hover:text-black">Dashboard</Link>
                            <Link to={'/weight'} className="px-4 py-2 text-gray-700 hover:text-black">Weight</Link>
                            {!user?.trainer && <Link to={'/trainers'} className="px-4 py-2 text-gray-700 hover:text-black">Trainers</Link>}
                            {user?.role === "trainer" && <Link to={'/clients'} className="px-4 py-2 text-gray-700 hover:text-black">Clients</Link>}
                            {user?.role === "admin" && <Link to={'/admin'} className="px-4 py-2 text-gray-700 hover:text-black">User List</Link>}
                        </div>
                        <div className="flex items-center ">
                            <Link to={'/profile'} className=" px-4 py-2 text-gray-700 hover:text-black">Profile</Link>
                            <Link to={'/logout'} className="w-4"><img className="w-4" src={logoutIcon} /></Link>
                        </div>
                    </div>
                    : <div className="flex gap-2">
                        <Link to={'/login'} className="font-medium px-6 py-2 text-gray-800 hover:text-black text-sm">LOG IN</Link>
                        <Link to={'/register'} className="font-medium bg-secondary rounded-full px-10 py-2 text-gray-800 text-sm hover:text-black ">SIGN UP</Link>
                    </div>
                }
            </header>
        </>
    )
}
