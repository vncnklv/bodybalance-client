import biceps from "../../assets/biceps.png";

/* eslint-disable react/prop-types */
export default function TrainerItem({ trainer, setActiveTrainer }) {
    return (
        <>
            <div className='flex flex-row justify-between items-center mt-2 hover:bg-gray-50 hover:cursor-pointer' onClick={() => setActiveTrainer(() => trainer)}>
                <div className='flex flex-row gap-2 items-center'>
                    <img src={biceps} alt="food icon" className="w-8" />
                    <span>{trainer.name} {trainer.lastName} - {trainer.username}</span>
                </div>
                <span>{trainer.clients.length} clients / {trainer.experience} year{trainer.experience > 1 && 's'} experience</span>
            </div>
            <hr />
        </>
    )
}