import { createContext, useContext, useEffect, useState } from 'react';
import { getUser, loginUser, logoutUser, registerUser } from '../services/auth';
import { useToken } from '../hooks/useToken';
import { useNavigate } from 'react-router';

const Context = createContext({});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(Context);
}

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const { tokenIsLoading, hasToken, setToken, removeToken } = useToken();
    const navigate = useNavigate();

    useEffect(() => {
        if (hasToken && !user) {
            setIsLoading(true);
            getUser().then((data) => {
                setIsAuth(() => true);
                setUser(() => data);
                setIsLoading(false);
            }).catch(() => {
                removeToken();
                setIsAuth(() => false);
                navigate('/login');
                setIsLoading(false);
            });
        }

        if (!hasToken && !tokenIsLoading) {
            setIsLoading(false);
        }
    }, [hasToken, removeToken, user, navigate, tokenIsLoading]);

    const login = async (userData) => {
        try {
            const res = await loginUser(userData);
            setToken(res.token);
            setIsAuth(() => true);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    const register = async (userData) => {
        try {
            const res = await registerUser(userData);
            setToken(res.token);
            setIsAuth(true);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    const logout = async () => {
        setIsAuth(() => false);
        await logoutUser();
        removeToken();
        setUser(() => null)
    }

    return (
        <Context.Provider value={{ isAuth, user, login, register, logout, isLoading }}>
            {children}
        </Context.Provider>
    )
};