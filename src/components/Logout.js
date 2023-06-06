import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserProvider";

export default function Logout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logout().then(navigate('/'));
    }, [logout, navigate]);

    return null;
}