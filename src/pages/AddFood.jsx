import { useState } from "react";
import { addFood } from "../services/meals";
import { useNavigate } from "react-router-dom";

export default function AddFood() {
    const [foodData, setFoodData] = useState({
        name: '',
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fats: 0,
        fiber: 0,
        cholesterol: 0,
        sugar: 0,
    });
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        console.log(foodData);
        if (foodData.calories === 0) {
            return setError('Invalid food data');
        }

        try {
            await addFood(foodData);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    }

    const changeHandler = (e) => {
        setFoodData(oldData => {
            const newData = { ...oldData }
            newData[e.target.name] = e.target.value

            if(e.target.name === 'protein' || e.target.name === 'carbohydrates' || e.target.name === 'fats') {
                newData.calories = (newData.protein * 4) + (newData.carbohydrates * 4) + (newData.fats * 9);
            }

            return newData;
        });
    
    }

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col px-8 py-10 shadow-md w-96">
                <h1 className="text-2xl text-secondary font-semibold mb-4">ADD FOOD</h1>

                <label htmlFor="name" className="text-gray-700 text-sm mb-1">Name</label>
                <input type="text" name="name" onChange={changeHandler} value={foodData.name}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />

                <div className="flex flex-row gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-gray-700 text-sm mb-1">Protein</label>
                        <input type="number" name="protein" onChange={changeHandler} value={foodData.protein}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-gray-700 text-sm mb-1">Fats</label>
                        <input type="number" name="fats" onChange={changeHandler} value={foodData.fats}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />
                    </div>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-gray-700 text-sm mb-1">Carbs</label>
                        <input type="number" name="carbohydrates" onChange={changeHandler} value={foodData.carbohydrates}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-gray-700 text-sm mb-1">Fiber</label>
                        <input type="number" name="fiber" onChange={changeHandler} value={foodData.fiber}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />
                    </div>
                </div>
                <div className="flex flex-row gap-4">

                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-gray-700 text-sm mb-1">Cholesterol</label>
                        <input type="number" name="cholesterol" onChange={changeHandler} value={foodData.cholesterol}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-gray-700 text-sm mb-1">Sugar</label>
                        <input type="number" name="sugar" onChange={changeHandler} value={foodData.sugar}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                <input type="submit" value="ADD" className="bg-gradient-to-r from-primary to-secondary rounded-md px-20 py-4 text-white hover:cursor-pointer font-semibold disabled:animate-pulse" />
            </form>
        </div>
    );
}