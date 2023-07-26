/* eslint-disable react/prop-types */
import foodIcon from '../assets/broccoli.png';

export default function FoodItem({ food, setActiveFood }) {
    return (
        <>
            <div className='flex flex-row justify-between items-center mt-2 hover:bg-gray-50 hover:cursor-pointer' onClick={() => setActiveFood(() => food)}>
                <div className='flex flex-row gap-2 items-center'>
                    <img src={foodIcon} alt="food icon" className="w-8" />
                    <span>{food.name}</span>
                </div>
                <span>{food.calories} kcal</span>
            </div>
            <hr />
        </>
    )
}