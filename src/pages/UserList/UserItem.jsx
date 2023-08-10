import userIcon from "../../assets/user_icon.png";
import { deleteUser, demoteTrainer } from "../../services/auth";

/* eslint-disable react/prop-types */
export default function UserItem({ user, setActiveUser, refreshUsers}) {
    
    const onDemote = async (e) => {
        e.stopPropagation();
        await demoteTrainer(user._id);
        await refreshUsers();
    }

    const onDelete = async (e) => {
        e.stopPropagation();
        await deleteUser(user._id);
        await refreshUsers();
    }

    return (
        <>
            <div className='flex flex-row justify-between items-center mt-2 hover:bg-gray-50 hover:cursor-pointer' onClick={() => setActiveUser(() => user)}>
                <div className='flex flex-row gap-2 items-center'>
                    <img src={userIcon} alt="food icon" className="w-8" />
                    <span>{user.name} {user.lastName} - {user.username} - {user.role}</span>
                </div>
                <div className="flex gap-2">
                    {user.role === "trainer" && <span className="bg-orange-500 text-white px-1 hover:cursor-pointer" onClick={onDemote}>Demote</span>}
                    <span className="bg-red-500 text-white px-1 hover:cursor-pointer" onClick={onDelete}>Delete</span>
                </div>
            </div>
            <hr />
        </>
    )
}