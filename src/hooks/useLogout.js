import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useToken } from "./useToken";
import { useUser } from "./useUser";

export const useLogout = () => {
    const { removeToken } = useToken();
    const { userQuery } = useUser();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            removeToken();
            userQuery.refetch();
            navigate('/');
        }
    });
}