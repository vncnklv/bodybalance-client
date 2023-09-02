/* eslint-disable react/prop-types */
import { usePromiseTracker } from "react-promise-tracker";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Loader from "../../components/Loader";

export default function WeightChart({ weightIns }) {
    const { promiseInProgress } = usePromiseTracker({ area: 'weight' });
   
    const data = weightIns.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
    }).reduce((acc, curr) => {
        acc.push({ date: curr.date, weight: curr.weight });
        return acc;
    }, []);

    return (
        <div className="shadow-md pb-2 mb-10 w-full py-5">
            {promiseInProgress
                ? <div className="py-28"><Loader /></div>
                : <>
                    <span className="text-xl font-medium text-gray-800 mx-10">Chart</span>
                    <div className="w-full flex justify-center my-5">
                        <ResponsiveContainer width="90%" height={300}>
                            <LineChart data={data}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="weight" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </>
            }

        </div>
    )
}