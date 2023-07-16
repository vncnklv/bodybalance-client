import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";

import Nutrients from "./Nutrients";
import Meal from "./Meal";
import FoodDescription from "../../components/FoodDescription";

import { getUserGoals } from "../../services/auth";
import { deleteFood, getDiary } from "../../services/meals";

export default function Dashboard() {
    const [diary, setDiary] = useState({});
    const [userGoals, setUserGoals] = useState({});
    const [activeFood, setActiveFood] = useState({});
    
    const navigate = useNavigate();
    const { promiseInProgress } = usePromiseTracker({ area: 'diary' });

    useEffect(() => {
        trackPromise(
            Promise.all([getDiary(), getUserGoals()])
                .then(res => {
                    setDiary(() => res[0])
                    setUserGoals(() => res[1])
                }),
            'diary');
    }, []);

    useEffect(() => {
        if(!promiseInProgress && userGoals.calories === 0) {
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
                    <Link to={`/add-food/${diary._id}`} className="px-4 py-1 bg-secondary text-white">Add Food</Link>
                </div>


                {!promiseInProgress
                    ? <>{Object.keys(diary) != 0 &&
                        <>
                            <Meal data={diary.breakfast} name={'breakfast'} deleteFoodFromMeal={deleteFoodFromMeal} setActiveFood={setActiveFood} />
                            <Meal data={diary.lunch} name={'lunch'} deleteFoodFromMeal={deleteFoodFromMeal} setActiveFood={setActiveFood} />
                            <Meal data={diary.dinner} name={'dinner'} deleteFoodFromMeal={deleteFoodFromMeal} setActiveFood={setActiveFood} />
                            <Meal data={diary.snacks} name={'snacks'} deleteFoodFromMeal={deleteFoodFromMeal} setActiveFood={setActiveFood} />
                        </>
                    }</>
                    : <span>Loading</span>
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

            <Nutrients diary={diary} goals={userGoals} />
        </>

    )

}