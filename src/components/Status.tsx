import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { AccountContext } from "./Account";

const Status = () => {
    const [status, setStatus] = useState(false);
    const { getSession, logout } = useContext(AccountContext);

    useEffect(() => {
        getSession()
            .then((session) => {
                console.log("Session:", session);
                setStatus(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            {status ? <button onClick={logout}>Logout</button> : "please login"}
        </div>
    );
};

export default Status;
