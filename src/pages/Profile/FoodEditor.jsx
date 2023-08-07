import { useEffect, useState } from "react";
import { deleteFoodItem } from "../../services/meals";

/* eslint-disable react/prop-types */
export default function FoodEditor({ food, removeActiveFood }) {
    const [activeFood, setActiveFood] = useState({
        name: '',
        calories: 0,
        protein: 0,
        fats: 0,
        carbohydrates: 0,
        fiber: 0,
        sugar: 0,
        cholesterol: 0,
    });

    useEffect(() => {
        setActiveFood((old) => ({ ...old, ...food }));
    }, [food]);

    const changeHandler = (e) => {
        setActiveFood(prev => {
            const newData = { ...prev }

            if (e.target.value >= 0)
                newData[e.target.name] = e.target.value

            if (e.target.name === 'protein' || e.target.name === 'fats' || e.target.name === 'carbohydrates')
                newData.calories = newData.protein * 4 + newData.fats * 9 + newData.carbohydrates * 4;

            return newData;
        });
    }

    const deleteHandler = async () => {
        const result = confirm('Are you sure you want to delete this food?');

        if (result){
            await deleteFoodItem(activeFood._id);
            removeActiveFood();
        }
    }

    const saveHandler = () => {
        console.log('save');
    }

    return (
        <div className="shadow-md mb-10 pb-8">
            <div className="flex justify-between mx-10 py-5">
                <span className="text-xl font-medium text-gray-800">Edit {activeFood.name}</span>
                <div className="flex gap-2">
                    <span className="px-4 py-1 bg-red-600 text-white hover:cursor-pointer" onClick={deleteHandler}>Delete</span>
                    <span className="px-4 py-1 bg-secondary text-white hover:cursor-pointer" onClick={saveHandler}>Save</span>
                </div>
            </div>

            <div className="flex flex-col gap-4 px-20">
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs font-light">CALORIES</span>
                        <span className="w-48 border rounded text-center text-xl font-medium">{activeFood.calories}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-light">PROTEIN</span>
                        <input type="number" name="protein" className="w-48 border rounded text-center text-xl font-medium" value={activeFood.protein} onChange={changeHandler} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-light">FATS</span>
                        <input type="number" name="fats" className="w-48 border rounded text-center text-xl font-medium" value={activeFood.fats} onChange={changeHandler} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-light">CARBS</span>
                        <input type="number" name="carbohydrates" className="w-48 border rounded text-center text-xl font-medium" value={activeFood.carbohydrates} onChange={changeHandler} />
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs font-light">FIBER</span>
                        <input type="number" name="fiber" className="w-48 border rounded text-center text-xl font-medium" value={activeFood.fiber} onChange={changeHandler} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-light">SUGAR</span>
                        <input type="number" name="sugar" className="w-48 border rounded text-center text-xl font-medium" value={activeFood.sugar} onChange={changeHandler} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-light">CHOLESTEROL</span>
                        <input type="number" name="cholesterol" className="w-48 border rounded text-center text-xl font-medium" value={activeFood.cholesterol} onChange={changeHandler} />
                    </div>
                </div>
            </div>
        </div>
    )
}