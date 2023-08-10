import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";

import Nutrients from "./Nutrients";
import Meal from "./Meal";
import FoodDescription from "../../components/FoodDescription";

import { getUserGoals } from "../../services/auth";
import { deleteFood, getDiary } from "../../services/meals";
import Dater from "./Dater";
import Loader from "../../components/Loader";

export default function Dashboard() {
    const [diary, setDiary] = useState({});
    const [userGoals, setUserGoals] = useState({});
    const [activeFood, setActiveFood] = useState({});

    const { state } = useLocation();
    const { date: currentDate } = state || {};
    const [date, setDate] = useState(currentDate || new Date().toISOString().substring(0, 10));

    const navigate = useNavigate();
    const { promiseInProgress } = usePromiseTracker({ area: 'diary' });

    useEffect(() => {
        trackPromise(
            Promise.all([getDiary(date), getUserGoals()])
                .then(res => {
                    setDiary(() => res[0])
                    setUserGoals(() => res[1])
                }),
            'diary');
    }, [date]);

    useEffect(() => {
        if (!promiseInProgress && userGoals.calories === 0) {
            navigate('/set-body-info');
        }
    }, [navigate, promiseInProgress, userGoals.calories]);

    const deleteFoodFromMeal = async (foodId, meal) => {
        const res = await deleteFood(diary._id, foodId, meal);

        if (activeFood._id === foodId) {
            setActiveFood(() => ({}));
        }

        setDiary(() => res);
    }

    return (
        <>
            <div className="shadow-md pb-2 mb-10">

                <div className="flex justify-between mx-10 py-5">
                    <span className="text-xl font-medium text-gray-800">Meals</span>
                    <Link to={`/add-food/${diary._id}?date=${date}`} className="px-4 py-1 bg-secondary text-white">Add Food</Link>
                </div>


                {!promiseInProgress
                    ? <>{Object.keys(diary) != 0 &&
                        <>
                            <Meal data={diary.breakfast} name={'breakfast'} deleteFoodFromMeal={deleteFoodFromMeal} setActiveFood={setActiveFood} />
                            <Meal data={diary.lunch} name={'lunch'} deleteFoodFromMeal={deleteFoodFromMeal} setActiveFood={setActiveFood} />
                            <Meal data={diary.dinner} name={'dinner'} deleteFoodFromMeal={deleteFoodFromMeal} setActiveFood={setActiveFood} />
                            <Meal data={diary.snacks} name={'snacks'} deleteFoodFromMeal={deleteFoodFromMeal} setActiveFood={setActiveFood} />
                            <Dater date={date} setDate={setDate} />
                        </>
                    }</>
                    : <div className="py-28"><Loader /></div>
                }

            </div>

            {Object.keys(activeFood).length !== 0 &&
                <FoodDescription
                    key={activeFood._id}
                    food={activeFood.food}
                    currentQuantity={activeFood.quantity}
                    _id={activeFood._id}
                    mealName={activeFood.mealName}
                    diaryId={diary._id}
                    setActiveFood={setActiveFood}
                    deleteFoodFromMeal={deleteFoodFromMeal}
                    setDiary={setDiary}
                />}

            {diary.calories > 0 && <Nutrients diary={diary} goals={userGoals} />}
        </>

    )

}