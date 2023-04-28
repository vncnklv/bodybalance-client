import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    });
    const login = useLogin();

    const changeHandler = (e) => {
        setUserData(oldData => {
            const newData = { ...oldData }
            newData[e.target.name] = e.target.value
            return newData;
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login.mutate(userData);
    }

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col px-8 py-10 shadow-md w-96">
                <h1 className="text-2xl text-secondary font-semibold mb-4">LOGIN</h1>
                <label htmlFor="username" className="text-gray-700 text-sm mb-1">Username</label>
                <input type="text" name="username" onChange={changeHandler} value={userData.username} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />
                <label htmlFor="password" className="text-gray-700 text-sm mb-1">Password</label>
                <input type="password" name="password" onChange={changeHandler} value={userData.password} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />
                {login.isError && <p className="text-red-500 text-sm text-center mb-4">{login.error.message}</p>}
                <input type="submit" disabled={login.isLoading} value="LOGIN" className="bg-gradient-to-r from-primary to-secondary rounded-md px-20 py-4 text-white hover:cursor-pointer font-semibold disabled:animate-pulse" />
                <p className="text-center mt-6 text-sm">Don’t have an account? Create one <Link to={'/register'} className="text-primary font-semibold">here</Link>.</p>
            </form>
        </div>
    )
}
