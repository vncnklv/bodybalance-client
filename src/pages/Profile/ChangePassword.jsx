import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../services/auth";

export default function ChangePassoword() {
    const [data, setData] = useState({
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setData(oldData => {
            const newData = { ...oldData }
            newData[e.target.name] = e.target.value
            return newData;
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.oldPassword || !data.newPassword || !data.repeatNewPassword) return setError('All fields are required');
        if (data.newPassword !== data.repeatNewPassword) return setError('Passwords do not match');
        if (data.newPassword === data.oldPassword) return setError('New password must be different from old password');

        try {
            await changePassword(data);
            navigate('/dashboard')
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col px-8 py-10 shadow-md w-96">
                <h1 className="text-2xl text-secondary font-semibold mb-4">Change Passoword</h1>
                <label htmlFor="oldPassword" className="text-gray-700 text-sm mb-1">Old Password</label>
                <input type="password" name="oldPassword" onChange={changeHandler} value={data.oldPassword} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />
                <label htmlFor="newPassword" className="text-gray-700 text-sm mb-1">New Password</label>
                <input type="password" name="newPassword" onChange={changeHandler} value={data.newPassword} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />
                <label htmlFor="repeatNewPassword" className="text-gray-700 text-sm mb-1">Repeat New Password</label>
                <input type="password" name="repeatNewPassword" onChange={changeHandler} value={data.repeatNewPassword} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                <input type="submit" value="CHANGE" className="bg-gradient-to-r from-primary to-secondary rounded-md px-20 py-4 text-white hover:cursor-pointer font-semibold disabled:animate-pulse" />
            </form>
        </div>
    )
}
