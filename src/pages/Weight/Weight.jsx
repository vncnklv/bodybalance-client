import { useEffect, useState } from "react";
import AddWeight from "./AddWeight";
import WeeklyInfo from "./WeeklyInfo";
import WeightChart from "./WeightChart";
import { getUserWeightIns } from "../../services/auth";

export default function Weight() {
    const [weightIns, setWeightIns] = useState([]);

    useEffect(() => {
        updateUserWeightIns();
    }, [])

    const updateUserWeightIns = () => {
        getUserWeightIns()
            .then(res => setWeightIns(res.sort((a, b) => new Date(a.date) - new Date(b.date))))
            .catch(err => console.log(err));
    }

    return (
        <>
            <div className="flex justify-between gap-5">
                <AddWeight updateUserWeightIns={updateUserWeightIns} />
                <WeeklyInfo weightIns={weightIns} />
            </div>
            <WeightChart weightIns={weightIns} />
        </>
    )
}