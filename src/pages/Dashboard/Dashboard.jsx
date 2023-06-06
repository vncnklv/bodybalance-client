import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/UserProvider";
import { getDiary } from "../../services/meals";
import Meal from "./Meal";

export default function Dashboard() {
    const [diary, setDiary] = useState({});

    const { isAuth } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        if (!isAuth) {
            navigate('/', { replace: true });
        }

        getDiary()
            .then(res => setDiary(() => res))
            .catch(err => console.log(err));

    }, [isAuth, navigate]);

    return (
        <main className="max-w-screen-lg m-auto">
            <div className="shadow-md">
                <div className="flex justify-between mx-10 py-5">
                    <h1 className="text-xl font-medium text-gray-700">Meals</h1>
                    <span className="px-4 py-1 bg-secondary text-white">Add Food</span>
                </div>

                {Object.keys(diary) != 0 &&
                    <>
                        <Meal data={diary.breakfast} name={'breakfast'} />
                        <Meal data={diary.lunch} name={'lunch'} />
                        <Meal data={diary.dinner} name={'dinner'} />
                        <Meal data={diary.snacks} name={'snack'} />
                    </>
                }
            </div>
        </main>
    )

}