import { useEffect, useState } from "react";

export const useToken = () => {
    const [token, setTokenState] = useState(null);
    const [hasToken, setHasToken] = useState(false);
    const [tokenIsLoading, setTokenIsLoading] = useState(true);

    useEffect(() => {
        const value = localStorage.getItem('token');
        if (value != undefined) {
            setTokenState(value);
            setHasToken(true);
        } else {
            localStorage.clear();
        }
        setTokenIsLoading(false);
    }, []);

    const removeToken = () => {
        localStorage.removeItem('token');
        setTokenState(() => null);
        setHasToken(() => false);
    }

    const setToken = (t) => {
        localStorage.setItem("token", JSON.stringify(t));
        setHasToken(() => true);
        setTokenState(() => t);
    }

    return { hasToken, token, setToken, removeToken, tokenIsLoading }
};