import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/UserProvider";
import { deleteFood, getDiary } from "../../services/meals";
import Meal from "./Meal";

export default function Dashboard() {
    const [diary, setDiary] = useState({});

    const { isAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            getDiary()
                .then(res => { setDiary(() => res) })
                .catch(err => console.log(err));
        }

    }, [isAuth, navigate]);

    const deleteFoodFromMeal = async (foodId, meal) => {
        const res = await deleteFood(diary._id, foodId, meal);
        setDiary(() => res);
    }

    return (
        <main className="max-w-screen-lg m-auto">
            <div className="shadow-md">
                <div className="flex justify-between mx-10 py-5">
                    <span className="text-xl font-medium text-gray-800">Meals</span>
                    <span className="px-4 py-1 bg-secondary text-white">Add Food</span>
                </div>

                {Object.keys(diary) != 0 &&
                    <>
                        <Meal data={diary.breakfast} name={'breakfast'} deleteFoodFromMeal={deleteFoodFromMeal} />
                        <Meal data={diary.lunch} name={'lunch'} deleteFoodFromMeal={deleteFoodFromMeal} />
                        <Meal data={diary.dinner} name={'dinner'} deleteFoodFromMeal={deleteFoodFromMeal} />
                        <Meal data={diary.snacks} name={'snacks'} deleteFoodFromMeal={deleteFoodFromMeal} />
                    </>
                }
            </div>
        </main>
    )

}