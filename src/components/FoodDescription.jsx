import { useState } from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { addFoodToDiary, updateFoodInDiary } from "../services/meals";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function FoodDescription({ food, setActiveFood, diaryId, currentQuantity, mealName, _id, deleteFoodFromMeal, setDiary, date }) {
    const [quantity, setQuantity] = useState(currentQuantity * 100 || 100);
    const [meal, setMeal] = useState(mealName || "");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const NUTRIENTS_COLORS = ['#0088FE', '#FFBB28', '#FF8042'];

    const nutrientsData = [
        { name: 'Carbohydrates', value: Number((food.carbohydrates * quantity / 100).toFixed(1)) },
        { name: 'Fats', value: Number((food.fats * quantity / 100).toFixed(1)) },
        { name: 'Protein', value: Number((food.protein * quantity / 100).toFixed(1)) },
    ];

    const addFood = async (redirect) => {
        try {
            await addFoodToDiary(diaryId, meal, quantity / 100, food._id);
            setError('');
            if (redirect) {
                navigate('/dashboard', { state: { date } });
            }
        } catch (err) {
            setError(err.message);
        }
    }

    const updateFood = async () => {
        const updatedDiary = await updateFoodInDiary(diaryId, mealName, _id, { quantity: quantity / 100, meal });
        setDiary(() => updatedDiary);
        setActiveFood(() => ({}))
    }

    const deleteFood = () => {
        deleteFoodFromMeal(_id, meal);
        setActiveFood(() => ({}));
    }

    return (
        <div className="shadow-md mb-10">
            <h2 className="text-xl font-medium text-gray-800 mx-10 py-5">{food.name}</h2>
            <div className="flex flex-row items-center px-10 justify-around">
                <PieChart width={270} height={200}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={nutrientsData}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        innerRadius={20}
                        fill="#038437"
                        label
                    >
                        {nutrientsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={NUTRIENTS_COLORS[index % NUTRIENTS_COLORS.length]} />
                        ))}
                    </Pie>

                    <Tooltip />
                </PieChart>


                <div className="m-auto">

                    <div className="flex flex-col gap-8 text-gray-800 pb-5 text-center">
                        <div className="flex justify-evenly gap-6">
                            <div className="flex flex-col">
                                <span className="text-xs font-light">PROTEIN</span>
                                <span className="text-xl font-medium">{(food.protein * quantity / 100).toFixed(1)} g</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-light">FATS</span>
                                <span className="text-xl font-medium">{(food.fats * quantity / 100).toFixed(1)} g</span>

                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-light">CARBS</span>
                                <span className="text-xl font-medium">{(food.carbohydrates * quantity / 100).toFixed(1)} g</span>
                            </div>
                        </div>
                        <div className="flex justify-evenly gap-6">
                            <div className="flex flex-col">
                                <span className="text-xs font-light">CALORIES</span>
                                <span className="text-xl font-medium">{(food.calories * quantity / 100).toFixed(1)}</span>
                            </div>

                            {food.fiber && food.fiber !== 0
                                ? <div className="flex flex-col">
                                    <span className="text-xs font-light">FIBER</span>
                                    <span className="text-xl font-medium">{(food.fiber * quantity / 100).toFixed(1)} g</span>
                                </div>
                                : ''
                            }

                            {food.cholesterol && food.cholesterol !== 0
                                ? <div className="flex flex-col">
                                    <span className="text-xs font-light">CHOLESTEROL</span>
                                    <span className="text-xl font-medium">{(food.cholesterol * quantity / 100).toFixed(1)} g</span>
                                </div>
                                : ''
                            }

                            {food.sugar && food.sugar != 0
                                ? <div className="flex flex-col">
                                    <span className="text-xs font-light">SUGAR</span>
                                    <span className="text-xl font-medium">{(food.sugar * quantity / 100).toFixed(1)} g</span>
                                </div>
                                : ''
                            }
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex flex-col items-center gap-1 mb-1">
                        <div className="w-full">
                            <label className="text-sm" htmlFor="quantity">Quantity in grams: </label>
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
                                className={`shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error && "border-red-700"}`}
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


                    <div className="flex gap-1 justify-between mt-3">
                        <span className="px-5 py-1 bg-red-500 text-white  hover:cursor-pointer" onClick={() => setActiveFood({})}>Cancel</span>
                        {_id
                            ? <>
                                <span className="px-5 py-1 bg-red-500 text-white  hover:cursor-pointer" onClick={() => deleteFood()}>Delete</span>
                                <span className="px-5 py-1 bg-primary text-white  hover:cursor-pointer" onClick={() => updateFood()}>Update</span>
                            </>
                            : <>
                                <span className="px-5 py-1 bg-secondary text-white  hover:cursor-pointer" onClick={() => addFood()}>Add</span>
                                <span className="px-5 py-1 bg-primary text-white  hover:cursor-pointer" onClick={() => addFood(true)}>Add & Finish</span>
                            </>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}