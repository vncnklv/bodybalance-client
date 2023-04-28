import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useToken } from "./useToken";
import { useUser } from "./useUser";

export const useRegister = () => {
    const { setToken } = useToken();
    const { userQuery } = useUser();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            setToken(data.token);
            userQuery.refetch();
            navigate('/');
        }
    });
}