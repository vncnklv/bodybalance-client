/* eslint-disable react/prop-types */
import foodIcon from '../../assets/broccoli.png';
import binIcon from '../../assets/bin.png';

export default function Food({ data: { quantity, food, _id }, deleteHandler, onFoodClick }) {
    const onDelete = (e) => {
        e.stopPropagation();
        deleteHandler(_id);
    }

    return (
        <>
            <div className='flex flex-row justify-between items-center mt-2 hover:bg-gray-50 hover:cursor-pointer' onClick={() => onFoodClick(food, quantity, _id)}>
                <div className='flex flex-row gap-2 items-center'>
                    <img src={foodIcon} alt="food icon" className="w-8" />
                    <span>{food.name}</span>
                </div>
                <span>{100 * quantity}g, {food.calories * quantity} kcal</span>
                <div className='bg-red-500 w-6 h-6 p-1 hover:cursor-pointer' onClick={onDelete}>
                    <img src={binIcon} alt="bin icon" />
                </div>
            </div>
           
        </>
    )
}