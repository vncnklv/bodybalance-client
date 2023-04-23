import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
    }

    const onChangeUsername = (e) => {
        setUsername(prev => prev = e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(prev => prev = e.target.value);
    }

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col px-8 py-10 shadow-md w-96">
                <label htmlFor="username" className="text-gray-700">Username</label>
                <input type="text" name="username" onChange={onChangeUsername} value={username} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />
                <label htmlFor="password" className="text-gray-700">Password</label>
                <input type="password" name="password" onChange={onChangePassword} value={password} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />
                <p className="text-red-500 text-sm text-center mb-4">Error message</p>
                <input type="submit" value="Login" className="bg-gradient-to-r from-primary to-secondary rounded-md px-20 py-4 text-white hover:cursor-pointer" />
                <p className="text-center mt-6">Don't have an account? <Link to={'/register'} className="text-primary font-semibold">Register</Link></p>
            </form>
        </div>
    )
}
