/* eslint-disable react/prop-types */
import { usePromiseTracker } from "react-promise-tracker";
import { Pie, PieChart, Tooltip } from "recharts";

export default function Nutrients({ diary, goals }) {
    const { promiseInProgress } = usePromiseTracker({ area: 'diary' });
    const nutrientsData = [
        { name: 'Carbohydrates', value: diary.carbohydrates },
        { name: 'Fats', value: diary.fats },
        { name: 'Protein', value: diary.protein },
    ];
    const caloriesData = [
        { name: 'Calories', value: diary.calories },
        { name: 'Calories left', value: goals.calories - diary.calories },
    ];

    return (
        <div className="shadow-md mb-10">
            <h2 className="text-xl font-medium text-gray-800 mx-10 py-5">Nutients</h2>
            {!promiseInProgress
                ? diary.calories > 0
                    ? <div className="flex h-96 items-center">

                        <PieChart width={300} height={300}>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={nutrientsData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                innerRadius={30}
                                fill="#038437"
                                label
                            />
                            
                            <Tooltip />
                        </PieChart>

                        <PieChart width={300} height={300}>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={caloriesData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                innerRadius={30}
                                fill="#038437"
                                label
                            />
                            
                            <Tooltip />
                        </PieChart>

                        <div className="m-auto">
                            <p>Calories: {diary.calories}/{goals.calories} kcal</p>
                            <p>Protein: {diary.protein}/{goals.protein} g</p>
                            <p>Carbohydrates: {diary.carbohydrates}/{goals.carbohydrates} g</p>
                            <p>Fats: {diary.fats}/{goals.fats} g</p>
                            <p>Fiber: {diary.fiber}/{goals.fiber} g</p>
                            <p>Cholesterol: {diary.cholesterol}/{goals.cholesterol}</p>
                        </div>
                    </div>
                    : <span>Add some food first!</span>
                : <span>Loading</span>
            }

        </div>
    );
}