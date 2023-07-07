import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function BodyInformation() {
    const [bodyInformation, setBodyInformation] = useState({
        gender: '',
        age: '',
        weight: '',
        height: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setBodyInformation(oldData => {
            const newData = { ...oldData }
            newData[e.target.name] = e.target.value
            return newData;
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!bodyInformation.gender) throw new Error('Gender is not selected.');
            if (!bodyInformation.age) throw new Error('Age is missing.');
            if (!bodyInformation.weight) throw new Error('Weight is missing.');
            if (!bodyInformation.height) throw new Error('Height is missing.');

            navigate('/set-goals', { state: { bodyInformation } });
        } catch (err) {
            setError(() => err.message)
                ;
        }

    }

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col px-8 py-10 shadow-md w-96">
                <h1 className="text-2xl text-secondary font-semibold mb-4">Body Information</h1>

                <label htmlFor="gender" className="text-gray-700 text-sm mb-1">Gender</label>
                <select
                    name="gender"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                    onChange={changeHandler}
                    value={bodyInformation.gender}
                >
                    <option value="" disabled>Select a gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <label htmlFor="age" className="text-gray-700 text-sm mb-1">Age</label>
                <input type="number" name="age" onChange={changeHandler} value={bodyInformation.age} min={1}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />

                <label htmlFor="weight" className="text-gray-700 text-sm mb-1">Weight</label>
                <input type="number" name="weight" onChange={changeHandler} value={bodyInformation.weight} min={1}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />

                <label htmlFor="height" className="text-gray-700 text-sm mb-1">Height</label>
                <input type="number" name="height" onChange={changeHandler} value={bodyInformation.height} min={1}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />

                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                <input type="submit" value="NEXT"
                    className="bg-gradient-to-r from-primary to-secondary rounded-md px-20 py-4 text-white hover:cursor-pointer font-semibold disabled:animate-pulse" />

                <p className="text-center mt-6 text-sm">Mastered your body? Become a trainer <Link to={'/become-a-trainer'} className="text-primary font-semibold">here</Link>.</p>
            </form>
        </div>
    )
}
