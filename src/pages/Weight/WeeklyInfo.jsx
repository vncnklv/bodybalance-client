/* eslint-disable react/prop-types */
import { startOfISOWeek, endOfISOWeek } from "date-fns"
import { useCallback, useEffect, useState } from "react";

export default function WeeklyInfo({ weightIns }) {
    const [weeklyInfo, setWeeklyInfo] = useState({
        averageWeightThisWeek: 0,
        averageWeightLastWeek: 0,
        weightChange: 0
    });

    const getWeightInsByWeekStartAndEnd = useCallback((start, end) => {
        return weightIns.filter(w => {
            const wDate = new Date(w.date);
            return wDate >= start && wDate <= end;
        });
    }, [weightIns]);

    useEffect(() => {
        const startofCurrentWeek = startOfISOWeek(new Date());
        const endOfCurrentWeek = endOfISOWeek(new Date());
        const weightInsCurrentWeek = getWeightInsByWeekStartAndEnd(startofCurrentWeek, endOfCurrentWeek);
        const averateWeightThisWeek = weightInsCurrentWeek.reduce((acc, curr) => acc + curr.weight, 0) / weightInsCurrentWeek.length;

        const startOfLastWeek = startOfISOWeek(new Date(startofCurrentWeek - 1));
        const endOfLastWeek = endOfISOWeek(startOfLastWeek);
        const weightInsLastWeek = getWeightInsByWeekStartAndEnd(startOfLastWeek, endOfLastWeek);
        const averateWeightLastWeek = weightInsLastWeek.reduce((acc, curr) => acc + curr.weight, 0) / weightInsLastWeek.length;

        const weightChange = averateWeightThisWeek - averateWeightLastWeek;

        setWeeklyInfo({
            averageWeightThisWeek: averateWeightThisWeek.toFixed(1),
            averageWeightLastWeek: averateWeightLastWeek.toFixed(1),
            weightChange: weightChange.toFixed(1)
        });
    }, [weightIns, setWeeklyInfo, getWeightInsByWeekStartAndEnd]);



    return (
        <div className="shadow-md pb-2 mb-10 w-full">
            <div className="mx-10 py-5">
                <span className="text-xl font-medium text-gray-800">Weekly Information</span>
            </div>

            {weeklyInfo.averageWeightThisWeek == "NaN" || weeklyInfo.averageWeightLastWeek == "NaN"
                ? <div className="flex justify-center text-gray-800 text-center">
                    <span className="text-xl">Not enough data to show weekly information</span>
                </div>
                : <div className="flex justify-evenly text-gray-800 text-center">
                    <div className="flex flex-col">
                        <abbr title="Average Weight This Week" className="text-xs font-light">AWTW</abbr>
                        <span className="text-xl font-medium">{weeklyInfo.averageWeightThisWeek} kg</span>
                    </div>

                    <div className="flex flex-col">
                        <abbr title="Average Weight Last Week" className="text-xs font-light">AWLW</abbr>
                        <span className="text-xl font-medium">{weeklyInfo.averageWeightLastWeek} kg</span>
                    </div>

                    <div className="flex flex-col">
                        <abbr title="Weight Change" className="text-xs font-light">WC</abbr>
                        <span className="text-xl font-medium">{weeklyInfo.weightChange} kg</span>
                    </div>

                    <div className="flex flex-col">
                        <abbr title="Weight Change in %" className="text-xs font-light">WCIP</abbr>
                        <span className="text-xl font-medium">{(((weeklyInfo.averageWeightThisWeek - weeklyInfo.averageWeightLastWeek) / weeklyInfo.averageWeightLastWeek) * 100).toFixed(2)} %</span>
                    </div>
                </div>


            }

        </div>
    )
}