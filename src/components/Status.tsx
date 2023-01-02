import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { AccountContext } from "./Account";

const Status = () => {
    const [status, setStatus] = useState(false);
    const { getSession, logout } = useContext(AccountContext);

    //Pasar un status desde el context o un redux o cambiar este componente y no decir "please Login"
    //y colocarlo dentro de un componente ya login como Setting.tsx para obtener la session de getSession.
    useEffect(() => {
        getSession()
            .then((session) => {
                console.log("Session:", session);
                setStatus(true);
            })
            .catch(() => {
                console.log("You must logIn");
            });
    }, []);

    return (
        <div>
            {status ? <button onClick={logout}>Logout</button> : "please login"}
        </div>
    );
};

export default Status;
