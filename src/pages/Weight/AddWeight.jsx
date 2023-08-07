/* eslint-disable react/prop-types */
import { useState } from "react";
import { addUserWeight } from "../../services/auth";

export default function AddWeight({ updateUserWeightIns }) {
    const [weightData, setWeightData] = useState({
        date: new Date().toISOString().slice(0, 10),
        weight: 0
    });
    const [error, setError] = useState("");

    const changeHandler = (e) => {
        setWeightData((prev) => {
            const newData = { ...prev }
            newData[e.target.name] = e.target.value
            return newData;
        });
    }

    const addHandler = async () => {
        try{
            await addUserWeight(weightData);
            updateUserWeightIns();
            setError("");
        } catch(err) {
            setError(err.message);
        }
    }

    return (
        <div className="shadow-md pb-2 mb-10 w-full">
            <div className="flex justify-between mx-10 py-5">
                <span className="text-xl font-medium text-gray-800">Weight</span>
                <span className="px-4 py-1 bg-secondary text-white hover:cursor-pointer" onClick={addHandler}>Add</span>
            </div>

            <div className="flex justify-evenly text-gray-800 pb-5">

                <div className="flex flex-col">
                    <span className="text-xs font-light">DATE</span>
                    <input type="date" name="date" className={`border rounded text-center text-xl font-medium ${error && 'border-red-600'}`} value={weightData.date} onChange={changeHandler} />
                </div>

                <div className="flex flex-col">
                    <span className="text-xs font-light">WEIGHT</span>
                    <input type="NUMBER" name="weight" className="w-28 border rounded text-center text-xl font-medium" value={weightData.weight} onChange={changeHandler} />
                </div>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
    )
}