/* eslint-disable react/prop-types */
import { usePromiseTracker } from "react-promise-tracker";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import Loader from "../../components/Loader";

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

    const NUTRIENTS_COLORS = ['#0088FE', '#FFBB28', '#FF8042'];
    const CALORIES_COLORS = ['#FF8042', '#00C49F'];

    return (
        <div className="shadow-md mb-10">
            <h2 className="text-xl font-medium text-gray-800 mx-10 py-5">Nutients</h2>
            {!promiseInProgress
                ? diary.calories > 0
                    ? <div className="flex items-center">

                        <PieChart width={270} height={200}>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={caloriesData}
                                cx="50%"
                                cy="50%"
                                outerRadius={60}
                                innerRadius={20}
                                fill="#038437"
                                label
                            >
                                {caloriesData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={CALORIES_COLORS[index % CALORIES_COLORS.length]} />
                                ))}
                            </Pie>

                            <Tooltip />
                        </PieChart>

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

                        <div className="w-full flex flex-col gap-8 text-gray-800 pb-5 text-center">
                            <div className="flex justify-evenly">
                                <div className="flex flex-col">
                                    <span className="text-xs font-light">PROTEIN</span>
                                    <span className="text-xl font-medium">{diary.protein}/{goals.protein}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-light">FATS</span>
                                    <span className="text-xl font-medium">{diary.fats}/{goals.fats}</span>

                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-light">CARBS</span>
                                    <span className="text-xl font-medium">{diary.carbohydrates}/{goals.carbohydrates}</span>
                                </div>
                            </div>
                            <div className="flex justify-evenly">
                                <div className="flex flex-col">
                                    <span className="text-xs font-light">CALORIES</span>
                                    <span className="text-xl font-medium">{diary.calories}/{goals.calories}</span>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-xs font-light">FIBER</span>
                                    <span className="text-xl font-medium">{diary.fiber}/{goals.fiber}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-light">CHOLESTEROL</span>
                                    <span className="text-xl font-medium">{diary.cholesterol}/{goals.cholesterol}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <span>Add some food first!</span>
                : <div className="py-16"><Loader /></div>
            }

        </div>
    );
}