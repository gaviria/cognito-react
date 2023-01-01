import { useContext, useEffect, useState } from "react";
import { AccountContext } from "./Account";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import DeleteUser from "./DeleteUser";
import Attributes from "./Attributes";

const Settings = () => {
    const { getSession } = useContext(AccountContext);
    const [loggedin, setLoggedIn] = useState(false);

    useEffect(() => {
        getSession()
            .then(() => {
                setLoggedIn(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            {loggedin && (
                <>
                    <h2>Setting</h2>
                    <ChangePassword />
                    <ChangeEmail />
                    <DeleteUser />
                    <Attributes />
                </>
            )}
        </div>
    );
};

export default Settings;
