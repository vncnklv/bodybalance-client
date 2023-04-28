import { useEffect, useState } from "react";

export const useToken = () => {
    const [token, setTokenState] = useState(null);

    useEffect(() => {
        const value = localStorage.getItem('token');
        if (value) {
            setTokenState(value);
        }
    }, []);

    const removeToken = () => {
        setTokenState(null);
        localStorage.removeItem('token');
    }

    const setToken = (t) => {
        localStorage.setItem("token", JSON.stringify(t));
        setTokenState(t);
    }

    return { token, setToken, removeToken }
};