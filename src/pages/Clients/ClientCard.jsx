/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import WeightChart from "../Weight/WeightChart"
import WeeklyInfo from "../Weight/WeeklyInfo";
import ClientGoals from "./ClientGoals";

export default function ClientCard({ client }) {
    const [weightIns, setWeightIns] = useState([]);

    useEffect(() => {
        setWeightIns(() => client.weightIns);
    }, [client.weightIns])

    return (
        <>
            <div className="flex justify-between gap-5 mt-5">
                <ClientGoals client={client} />
                <WeeklyInfo weightIns={weightIns} />
            </div>
            <WeightChart weightIns={weightIns} />
        </>
    )
}