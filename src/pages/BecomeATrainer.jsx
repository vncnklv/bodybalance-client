import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { becomeTrainer } from "../services/auth";
import { useAuth } from "../contexts/UserProvider";

export default function BecomeATrainer() {
    const [data, setData] = useState({
        price: 0,
        description: '',
        experience: 0,
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { refreshUser } = useAuth();

    const changeHandler = (e) => {
        setData(oldData => {
            const newData = { ...oldData }
            newData[e.target.name] = e.target.value
            return newData;
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await becomeTrainer(data);
            await refreshUser();
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    }


    return (<div className="flex justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col px-8 py-10 shadow-md w-96">
            <h1 className="text-2xl text-secondary font-semibold mb-4">Become trainer</h1>
            <label htmlFor="price" className="text-gray-700 text-sm mb-1">Price in $</label>
            <input type="number" name="price" onChange={changeHandler} value={data.price} min={0} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />
            <label htmlFor="experience" className="text-gray-700 text-sm mb-1">Experience in years</label>
            <input type="number" name="experience" onChange={changeHandler} value={data.experience} min={0} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />
            <label htmlFor="description" className="text-gray-700 text-sm mb-1">Description</label>
            <textarea type="text" name="description" onChange={changeHandler} value={data.description} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            <input type="submit" value="SUBMIT" className="bg-gradient-to-r from-primary to-secondary rounded-md px-20 py-4 text-white hover:cursor-pointer font-semibold disabled:animate-pulse" />
        </form>
    </div>);
}