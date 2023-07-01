// implement searchbar
// pagination
// fetch and visualise foods

import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"
import { getFoods } from "../../services/meals";
import FoodItem from "./FoodItem";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Pager from "./Pager";
import FoodDescription from "./FoodDescription";
import { useParams } from "react-router-dom";

export default function FoodList() {
    const [foods, setFoods] = useState([]);
    const [activeFood, setActiveFood] = useState({});
    const { promiseInProgress } = usePromiseTracker({ area: 'foods' })
    const [pages, setPages] = useState({ page: 1 });
    const [search, setSearch] = useState('');

    const { diaryId } = useParams();

    useEffect(() => {
        trackPromise(
            getFoods(pages.page, search)
                .then(res => {
                    setFoods(() => res.foods);
                    setPages(old => ({
                        ...old,
                        nextPage: res.nextPage || false
                    }))
                })
                .catch(err => console.log(err)), 'foods')
    }, [pages.page, search]);

    const goToPage = (page) => {
        setPages(() => ({ page }))
    }

    const onSearch = (e) => {
        setSearch(() => e.target.parentElement.firstChild.value);
        if (pages.page != 1)
            setPages(() => ({ page: 1 }))
    }

    return (
        <>
            <div className="shadow-md">
                <h2 className="text-xl font-medium text-gray-800 mx-10 py-5">Foods</h2>

                <div className="flex flex-row gap-5 px-14 items-center">
                    <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    <span className="px-5 py-2 bg-secondary text-white  hover:cursor-pointer" onClick={onSearch}>Search</span>
                </div>

                {promiseInProgress
                    ? <span>Loading</span>
                    : <>
                        <div className="px-16 py-2">
                            {foods.length == 0
                                ? <span>There is no foods found!</span>
                                : foods.map(food => <FoodItem key={food._id} food={food} setActiveFood={setActiveFood} />)
                            }
                        </div>
                        <Pager {...pages} goToPage={goToPage} />
                    </>
                }
            </div>
            {Object.keys(activeFood).length !== 0 && <FoodDescription key={activeFood._id} food={activeFood} setActiveFood={setActiveFood} diaryId={diaryId} />}
        </>
    )
}