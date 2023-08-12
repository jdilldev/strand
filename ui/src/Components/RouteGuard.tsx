import { createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Dashboard } from "./Dashboard";


export const RouteGuard = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    /*     
            createEffect(() => {
                if (!token) {
                    navigate('/auth', { replace: true });
                }
            }) 
     */
    return (
        <Dashboard />
    )
}