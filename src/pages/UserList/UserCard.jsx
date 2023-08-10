import { deleteUser, demoteTrainer } from "../../services/auth";

/* eslint-disable react/prop-types */
export default function UserCard({ user, refreshUsers, setActiveUser }) {
    const onDemote = async () => {
        await demoteTrainer(user._id);
        await refreshUsers();
    }

    const onDelete = async () => {
        await deleteUser(user._id);
        await refreshUsers();
        setActiveUser(() => { });
    }


    return (
        <div className="shadow-md mb-10 p-12">

            <div className="flex justify-between mx-10 py-5">
                <span className="text-xl font-medium text-gray-800">{user.username}</span>
                <div className="flex gap-2">
                    {user.role === "trainer" && <span className="px-4 py-1 bg-orange-500 text-white hover:cursor-pointer" onClick={onDemote}>Demote</span>}
                    <span className="px-4 py-1 bg-red-500 text-white hover:cursor-pointer" onClick={onDelete}>Delete</span>
                </div>
            </div>

            <div className="flex flex-row gap-16 px-10">
                <div className={`flex flex-${user.role === 'trainer' ? 'col' : 'row w-full justify-between'} gap-5`}>
                    <div className="flex flex-col">
                        <span className="text-xs font-light">NAME</span>
                        <span className="text-xl font-medium">{user.name} {user.lastName}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-light">EMAIL</span>
                        <span className="text-xl font-medium">{user.email}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-light">ROLE</span>
                        <span className="text-xl font-medium">{user.role}</span>
                    </div>
                    {user.role === "trainer" &&
                        <>
                            <div className="flex flex-col">
                                <span className="text-xs font-light">EXPERIENCE AS TRAINER</span>
                                <span className="text-xl font-medium">{user.experience} years</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-light">ACTIVE CLIENTS</span>
                                <span className="text-xl font-medium">{user.clients.length}</span>
                            </div>
                        </>
                    }
                    <div className="flex flex-col">
                        <span className="text-xs font-light">USER SINCE</span>
                        <span className="text-xl font-medium">{new Date(user.createdAt).toISOString().substring(0, 10)}</span>
                    </div>
                </div>

                {user.role === "trainer" &&
                    <div className="flex flex-col">
                        <span className="text-xs font-light">DESCRIPTION</span>
                        <span className="text-l font-medium text-justify">{user.description}</span>
                    </div>
                }

            </div>
        </div>
    )
}