import { createContext, useContext, useEffect, useState } from 'react';
import { getUser, loginUser, logoutUser, registerUser } from '../services/auth';
import { useToken } from '../hooks/useToken';

const Context = createContext({});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(Context);
}

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const { hasToken, setToken, removeToken } = useToken();

    useEffect(() => {
        if (hasToken && !user) {
            getUser().then((data) => {
                setUser(() => data);
                setIsAuth(() => true);
            }).catch(() => {
                setToken(null);
            });
        }
    }, [hasToken, setToken, user]);

    const login = async (userData) => {
        try {
            const res = await loginUser(userData);
            setToken(res.token);
            setIsAuth(true);
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
        await logoutUser();
        setUser(() => null)
        setIsAuth(() => false);
        removeToken();
    }

    return (
        <Context.Provider value={{ isAuth, user, login, register, logout }}>
            {children}
        </Context.Provider>
    )
};