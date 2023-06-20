import { createContext, useContext, useEffect, useState } from 'react';
import { getUser, loginUser, logoutUser, registerUser } from '../services/auth';
import { useToken } from '../hooks/useToken';
import { useNavigate } from 'react-router';
import { trackPromise } from 'react-promise-tracker';

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
    const navigate = useNavigate();

    useEffect(() => {
        if (hasToken && !user) {
            trackPromise(
                getUser().then((data) => {
                    setUser(() => data);
                    setIsAuth(() => true);
                }).catch(() => {
                    removeToken();
                    setIsAuth(() => false);
                    navigate('/login');
                }), 'user');
        }
    }, [hasToken, removeToken, user, navigate]);

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
        <Context.Provider value={{ isAuth, user, login, register, logout }}>
            {children}
        </Context.Provider>
    )
};