import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        repeatPassword: '',
        email: '',
        firstName: '',
        lastName: '',
    });

    const changeHandler = (e) => {
        setUserData(oldData => {
            const newData = { ...oldData }
            newData[e.target.name] = e.target.value
            return newData;
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData);
    }

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col px-8 py-8 shadow-md w-96">
                <h1 className="text-2xl text-secondary font-semibold mb-4">REGISTER</h1>

                <label htmlFor="username" className="text-gray-700 text-sm mb-1">Username</label>
                <input type="text" name="username" onChange={changeHandler} value={userData.username} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />

                <label htmlFor="username" className="text-gray-700 text-sm mb-1">E-mail</label>
                <input type="email" name="email" onChange={changeHandler} value={userData.email} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />

                <div className="flex flex-row gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-gray-700 text-sm mb-1">Password</label>
                        <input type="password" name="password" onChange={changeHandler} value={userData.password} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-gray-700 text-sm mb-1">Repeat Password</label>
                        <input type="password" name="repeatPassword" onChange={changeHandler} value={userData.repeatPassword} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />
                    </div>
                </div>

                <label htmlFor="firstName" className="text-gray-700 text-sm mb-1">First Name</label>
                <input type="text" name="firstName" onChange={changeHandler} value={userData.firstName} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />

                <label htmlFor="lastName" className="text-gray-700 text-sm mb-1">Last Name</label>
                <input type="text" name="lastName" onChange={changeHandler} value={userData.lastName} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />


                <p className="text-red-500 text-sm text-center mb-4">Error message</p>

                <input type="submit" value="REGISTER" className="bg-gradient-to-r from-primary to-secondary rounded-md px-20 py-4 text-white hover:cursor-pointer font-semibold" />

                <p className="text-center mt-6 text-sm">Already have an account? Log in <Link to={'/login'} className="text-primary font-semibold">here</Link>.</p>
            </form>
        </div>
    )
}
