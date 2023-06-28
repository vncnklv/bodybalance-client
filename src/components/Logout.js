import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserProvider";

export default function Logout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const isMountedRef = useRef(true);

    useEffect(() => {
        if (isMountedRef.current) {
            logout().then(() => {
                navigate('/');
            });
        }

        return () => {
            isMountedRef.current = false;
        };
    }, [logout, navigate]);

    return null;
}