/* eslint-disable react/prop-types */
export default function Dater({ date, setDate }) {
    const goToNextDate = () => {
        setDate(() => {
            const currentDate = new Date(date);
            const nextDate = new Date(currentDate);
            nextDate.setDate(currentDate.getDate() + 1);
            return nextDate.toISOString().substring(0, 10);
        });
    }

    const goToPrevDate = () => {
        setDate(() => {
            return new Date(new Date(date) - 1).toISOString().substring(0, 10);
        });
    }

    return (
        <div className="flex items-center justify-center py-4">
            <span className="px-5 py-1 bg-primary text-white  hover:cursor-pointer" onClick={goToPrevDate}>Previous</span>
            <span className="text-lg px-2">{date}</span>
            <span className="px-5 py-1 bg-primary text-white  hover:cursor-pointer" onClick={goToNextDate}>Next</span>
        </div>
    );
}