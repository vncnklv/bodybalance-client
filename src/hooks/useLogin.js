import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useToken } from "./useToken";
import { useUser } from "./useUser";

export const useLogin = () => {
    const { setToken } = useToken();
    const { userQuery } = useUser();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            setToken(data.token);
            userQuery.refetch();
            navigate('/');
        }
    });
}