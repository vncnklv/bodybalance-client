import Food from "./Food";

/* eslint-disable react/prop-types */
export default function Meal({ name, data, deleteFoodFromMeal, setActiveFood }) {
    const deleteHandler = (foodId) => {
        deleteFoodFromMeal(foodId, name);
    }

    const onFoodClick = (food, quantity, _id) => {
        setActiveFood(() => ({ food, quantity, _id, mealName: name }));
    }

    return (
        <div className="px-12 pb-2">
            <hr />
            <span className='text-lg text-gray-800'>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
            <div className="w-full px-4">
                {data.foods.length == 0
                    ? <span>No foods in this meal!</span>
                    : data?.foods.map(food => <Food key={food._id} data={food} deleteHandler={deleteHandler} onFoodClick={onFoodClick} />)
                }
            </div>
        </div>
    )
}