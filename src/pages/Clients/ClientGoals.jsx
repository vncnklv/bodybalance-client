/* eslint-disable react/prop-types */
import { useState } from "react";
import { updateUserGoalsByTrainer } from "../../services/auth";

export default function ClientGoals({ client }) {
    const [userGoals, setUserGoals] = useState(client.goals);
    const [isUpdate, setIsUpdate] = useState(false);

    const onSave = async () => {
        const data = {
            calories: userGoals.protein * 4 + userGoals.fats * 9 + userGoals.carbohydrates * 4,
            protein: userGoals.protein,
            fats: userGoals.fats,
            carbohydrates: userGoals.carbohydrates
        };

        const res = await updateUserGoalsByTrainer(client._id, data);
        setUserGoals(() => res);
        setIsUpdate(false);
    }

    const changeHandler = (e) => {
        setUserGoals((prev) => {
            const newData = { ...prev }
            newData[e.target.name] = e.target.value
            newData.calories = newData.protein * 4 + newData.fats * 9 + newData.carbohydrates * 4;
            return newData;
        });
    }

    return (
        <div className="shadow-md pb-2 mb-10 w-full">
            <div className="flex justify-between mx-10 py-5">
                <span className="text-xl font-medium text-gray-800">{client.name}</span>
                <div className="flex gap-2">
                    {isUpdate
                        ? <span className="px-4 py-1 bg-secondary text-white hover:cursor-pointer" onClick={onSave}>Save</span>
                        : <span className="px-4 py-1 bg-secondary text-white hover:cursor-pointer" onClick={() => setIsUpdate(() => true)}>Update</span>
                    }
                </div>
            </div>

            <div className="flex justify-evenly text-gray-800 pb-5 text-center">
                <div className="flex flex-col">
                    <span className="text-xs font-light">CALORIES</span>
                    <span className="text-xl font-medium">{userGoals.calories}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-light">PROTEIN</span>
                    {isUpdate
                        ? <input type="number" name="protein" className="w-14 border rounded text-center text-xl font-medium" value={userGoals.protein} onChange={changeHandler} />
                        : <span className="text-xl font-medium">{userGoals.protein}</span>
                    }

                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-light">FATS</span>
                    {isUpdate
                        ? <input type="number" name="fats" className="w-14 border rounded text-center text-xl font-medium" value={userGoals.fats} onChange={changeHandler} />
                        : <span className="text-xl font-medium">{userGoals.fats}</span>
                    }

                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-light">CARBS</span>

                    {isUpdate
                        ? <input type="number" name="carbohydrates" className="w-14 border rounded text-center text-xl font-medium" value={userGoals.carbohydrates} onChange={changeHandler} />
                        : <span className="text-xl font-medium">{userGoals.carbohydrates}</span>
                    }
                </div>
            </div>

        </div>
    )
}