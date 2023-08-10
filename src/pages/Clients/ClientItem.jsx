import biceps from "../../assets/biceps.png";

/* eslint-disable react/prop-types */
export default function ClientItem({ client, setActiveClient }) {
    return (
        <>
            <div className='flex flex-row justify-start items-center mt-2 hover:bg-gray-50 hover:cursor-pointer' onClick={() => setActiveClient(() => client)}>
                <div className='flex flex-row gap-2 items-center'>
                    <img src={biceps} alt="food icon" className="w-8" />
                    <span>{client.name} {client.lastName} - {client.username}</span>
                </div>
            </div>
            <hr />
        </>
    )
}