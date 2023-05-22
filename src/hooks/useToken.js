import { useEffect, useState } from "react";

export const useToken = () => {
    const [token, setTokenState] = useState(null);
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
        const value = localStorage.getItem('token');
        if (value) {
            setTokenState(value);
            setHasToken(true);
        }
    }, []);

    const removeToken = () => {
        setTokenState(null);
        setHasToken(false);
        localStorage.removeItem('token');
    }

    const setToken = (t) => {
        localStorage.setItem("token", JSON.stringify(t));
        setHasToken(true);
        setTokenState(t);
    }

    return { hasToken, token, setToken, removeToken }
};