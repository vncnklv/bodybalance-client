import { useNavigate } from "react-router-dom";
import { hireTrainer } from "../../services/auth";
import { useAuth } from "../../contexts/UserProvider";

/* eslint-disable react/prop-types */
export default function TrainerCard({ trainer }) {
    const navigate = useNavigate();
    const { refreshUser } = useAuth();

    const onHire = async () => {
        await hireTrainer({ trainerId: trainer._id });
        await refreshUser();
        navigate('/dashboard');
    }

    return (
        <div className="shadow-md mb-10 pb-10">
            <div className="flex flex-row justify-between mx-10 py-10">
                <span className="text-xl font-medium text-gray-800">{trainer.username}</span>
                <span className="px-4 py-1 bg-secondary text-white" onClick={onHire}>Hire</span>
            </div>

            <div className="flex flex-row gap-10 px-12">
                <div className="h-full flex flex-col justify-between">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col">
                            <span className="text-xs font-light">NAME</span>
                            <span className="text-xl font-medium">{trainer.name} {trainer.lastName}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-light">EMAIL</span>
                            <span className="text-xl font-medium">{trainer.email}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-light">EXPERIENCE</span>
                            <span className="text-xl font-medium">{trainer.experience} years</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-light">ACTIVE CLIENTS</span>
                            <span className="text-xl font-medium">{trainer.clients.length}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-light">DESCRIPTION</span>
                    <span className="text-l text-justify">{trainer.description}</span>
                </div>
            </div>
        </div>
    );
}