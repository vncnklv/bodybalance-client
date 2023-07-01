import { useState } from "react";
import { Pie, PieChart, Tooltip } from "recharts";
import { addFoodToDiary } from "../../services/meals";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function FoodDescription({ food, setActiveFood, diaryId }) {
    const [quantity, setQuantity] = useState(1);
    const [meal, setMeal] = useState("");
    const navigate = useNavigate();

    const nutrientsData = [
        { name: 'Carbohydrates', value: Number((food.carbohydrates * quantity).toFixed(1)) },
        { name: 'Fats', value: Number((food.fats * quantity).toFixed(1)) },
        { name: 'Protein', value: Number((food.protein * quantity).toFixed(1)) },
    ];

    const addFood = async (redirect) => {
        await addFoodToDiary(diaryId, meal, quantity, food._id);
        if (redirect) {
            navigate('/dashboard')
        }
    }

    return (
        <div className="shadow-md mb-10">
            <h2 className="text-xl font-medium text-gray-800 mx-10 py-5">{food.name}</h2>
            <div className="flex flex-row items-center px-10 justify-around">
                <PieChart width={200} height={200}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={nutrientsData}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        innerRadius={30}
                        fill="#038437"
                        label
                    />
                    <Tooltip />
                </PieChart>


                <div className="m-auto">
                    <p>Calories: {(food.calories * quantity).toFixed(1)} kcal</p>
                    <p>Protein: {(food.protein * quantity).toFixed(1)} g</p>
                    <p>Carbohydrates: {(food.carbohydrates * quantity).toFixed(1)} g</p>
                    <p>Fats: {(food.fats * quantity).toFixed(1)} g</p>
                    {food.fiber && <p>Fiber: {(food.fiber * quantity).toFixed(1)} g</p>}
                    {food.cholesterol && <p>Cholesterol: {(food.cholestero * quantity).toFixed(1)}</p>}
                </div>

                <div>
                    <div className="flex flex-col items-center gap-1 mb-1">
                        <div className="w-full">
                            <label className="text-sm" htmlFor="quantity">Quantity: </label>
                            <input type="number" name="quantity"
                                className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={e => setQuantity(e.target.value)}
                                value={quantity}
                                min={0}
                            />
                        </div>

                        <div className="w-full">
                            <label className="text-sm" htmlFor="meal">Meal:</label>
                            <select
                                name="meal"
                                className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={e => setMeal(e.target.value)}
                                value={meal}
                            >
                                <option value="" disabled>Select a meal</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                                <option value="snacks">Snacks</option>
                            </select>
                        </div>
                    </div>


                    <div className="flex gap-1">
                        <span className="px-5 py-1 bg-red-500 text-white  hover:cursor-pointer" onClick={() => setActiveFood({})}>Cancel</span>
                        <span className="px-5 py-1 bg-secondary text-white  hover:cursor-pointer" onClick={() => addFood()}>Add</span>
                        <span className="px-5 py-1 bg-primary text-white  hover:cursor-pointer" onClick={() => addFood(true)}>Add & Finish</span>
                    </div>
                </div>

            </div>
        </div>
    )
}