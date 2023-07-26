import { useEffect, useState } from "react";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { getUserFoods } from "../../services/auth";
import FoodItem from "../../components/FoodItem";
import Pager from "../../components/Pager";
import { Link } from "react-router-dom";

export default function MyFoods() {
    const [foods, setFoods] = useState([]);
    const [pages, setPages] = useState({ page: 1 });
    const [search, setSearch] = useState('');

    const { promiseInProgress } = usePromiseTracker({ area: 'myFoods' });

    useEffect(() => {
        trackPromise(
            getUserFoods(pages.page, search)
                .then(res => {
                    setFoods(() => res.foods);
                    setPages(old => ({
                        ...old,
                        nextPage: res.nextPage || false
                    }));
                }),
            'myFoods');
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
        <div className="shadow-md pb-2 mb-10">
            <div className="flex justify-between mx-10 py-5">
                <span className="text-xl font-medium text-gray-800">My Foods</span>
                <Link to={"/add-food"} className="px-4 py-1 bg-secondary text-white">Add</Link>
            </div>

            <div className="flex flex-row gap-5 px-14 items-center">
                <input type="text" className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <span className="px-5 py-1 bg-secondary text-white  hover:cursor-pointer" onClick={onSearch}>Search</span>
            </div>

            <div className="px-16 py-2">
                {foods.length == 0
                    ? search 
                    ? <span>No foods found!</span>
                    : <span>You have no foods!</span>
                    : promiseInProgress
                        ? <span>Loading</span>
                        : foods.map(food => <FoodItem key={food._id} food={food} />)

                }
            </div>
            {foods.length > 0 && <Pager {...pages} goToPage={goToPage} />}


        </div>
    )
}