import { createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";


export const RouteGuard = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    createEffect(() => {
        if (!token) {
            navigate('/auth', { replace: true });
        }
    })

    return (
        <div>
            <p>route guard of somethin</p>
        </div>
    )
}