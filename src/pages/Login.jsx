import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserProvider";

export default function Login() {
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { login } = useAuth();

    const changeHandler = (e) => {
        setUserData(oldData => {
            const newData = { ...oldData }
            newData[e.target.name] = e.target.value
            return newData;
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(userData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col px-8 py-10 shadow-md w-96">
                <h1 className="text-2xl text-secondary font-semibold mb-4">LOGIN</h1>
                <label htmlFor="username" className="text-gray-700 text-sm mb-1">Username</label>
                <input type="text" name="username" onChange={changeHandler} value={userData.username} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />
                <label htmlFor="password" className="text-gray-700 text-sm mb-1">Password</label>
                <input type="password" name="password" onChange={changeHandler} value={userData.password} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                <input type="submit" value="LOGIN" className="bg-gradient-to-r from-primary to-secondary rounded-md px-20 py-4 text-white hover:cursor-pointer font-semibold disabled:animate-pulse" />
                <p className="text-center mt-6 text-sm">Don’t have an account? Create one <Link to={'/register'} className="text-primary font-semibold">here</Link>.</p>
            </form>
        </div>
    )
}
