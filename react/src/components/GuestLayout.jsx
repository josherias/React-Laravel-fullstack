import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function GuestLayout() {
    const { token } = useStateContext();

    //if user is already authenticated and tries to access thes pages
    if (token) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}

export default GuestLayout;
