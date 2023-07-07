import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setGoal } from "../services/auth";

export default function Goals() {
    const [goals, setGoals] = useState({
        goal: '',
        activityLevel: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { state } = useLocation();
    const { bodyInformation } = state;

    const changeHandler = (e) => {
        setGoals(oldData => {
            const newData = { ...oldData }
            newData[e.target.name] = e.target.value
            return newData;
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await setGoal({ ...goals, ...bodyInformation });
            navigate('/dashboard')
        } catch (err) {
            setError(() => err.message);
        }

    }

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col px-8 py-10 shadow-md w-96">
                <h1 className="text-2xl text-secondary font-semibold mb-4">Goals</h1>

                <label htmlFor="goal" className="text-gray-700 text-sm mb-1">Goal</label>
                <select
                    name="goal"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                    onChange={changeHandler}
                    value={goals.goal}
                >
                    <option value="" disabled>Select a goal</option>
                    <option value="lose weight">Lose weight</option>
                    <option value="maintain weight">Maintain weight</option>
                    <option value="gain weight">Gain weight</option>
                </select>

                <label htmlFor="activityLevel" className="text-gray-700 text-sm mb-1">Activity Level</label>
                <select
                    name="activityLevel"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                    onChange={changeHandler}
                    value={goals.activityLevel}
                >
                    <option value="" disabled>Select an activity level</option>
                    <option value="sedentary">Sedentary</option>
                    <option value="lightly active">Lightly active</option>
                    <option value="moderately active">Moderately active</option>
                    <option value="active">Active</option>
                    <option value="very active">Very active</option>
                </select>

                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                <input type="submit" value="NEXT"
                    className="bg-gradient-to-r from-primary to-secondary rounded-md px-20 py-4 text-white hover:cursor-pointer font-semibold disabled:animate-pulse" />

            </form>
        </div>
    )
}
