import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contexts/UserProvider";

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ redirectPath = '/', children, }) => {
    const { isAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate(redirectPath, { replace: true });
        }
    }, [isAuth, navigate, redirectPath]);

    return children;
};
