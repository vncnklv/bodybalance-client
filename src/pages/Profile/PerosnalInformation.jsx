import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/UserProvider";

export default function PersonalInformation() {
    const { user } = useAuth();

    return (
        <div className="shadow-md pb-2 mb-10 w-full">
            <div className="flex justify-between mx-10 py-5">
                <span className="text-xl font-medium text-gray-800">Info</span>
                <div className="flex gap-2">
                    {user.role !== "trainer" && <Link to={'/become-a-trainer'} className="px-4 py-1 bg-secondary text-white">Become a trainer</Link>}
                    <Link to={'/change-password'} className="px-4 py-1 bg-secondary text-white">Change password</Link>
                </div>
            </div>

            <div className="flex justify-evenly text-gray-800 pb-5">
                {!user.trainter && <div className="flex flex-col">
                    <span className="text-xs font-light">USERNAME</span>
                    <span className="font-medium">{user.username}</span>
                </div>}
                <div className="flex flex-col">
                    <span className="text-xs font-light">NAME</span>
                    <span className="font-medium">{user.name} {user.lastName}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-light">E-MAIL</span>
                    <span className="font-medium">{user.email}</span>
                </div>
                {user.trainer && <div className="flex flex-col">
                    <span className="text-xs font-light">TRAINER</span>
                    <span className="font-medium">Test Testov</span>
                </div>}
            </div>


        </div>
    )
}