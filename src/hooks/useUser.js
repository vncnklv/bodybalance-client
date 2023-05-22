import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/auth";
import { useToken } from "./useToken";
import { useState } from "react";

export const useUser = () => {
    const [user, setUser] = useState(null);
    const [isLogged, setIsLogged] = useState(false);
    const { hasToken } = useToken();

    const userQuery = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        enabled: hasToken,
        retry: false,
        onSuccess: (data) => {
            setUser(data);
            setIsLogged(true);
        },
        onError: () => {
            setUser(null);
            setIsLogged(false);
        }
    });

    return { user, isLogged, userQuery };
};