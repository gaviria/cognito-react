import { useContext, useEffect, useState } from "react";
import { AccountContext } from "./Account";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import style from "../assets/css/styles.module.css";

const Settings = () => {
    const { getSession, logout } = useContext(AccountContext);
    const [loggedin, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getSession()
            .then(() => {
                setLoggedIn(true);
            })
            .catch(() => {
                console.log("You must logIn to get User Options");
                navigate("/");
            });
    }, []);

    return (
        <div>
            {loggedin && (
                <>
                    <nav className={style.nav_settings}>
                        <NavLink
                            to="changepassword"
                            className={({ isActive }) =>
                                isActive ? style.isactive_link : undefined
                            }
                        >
                            Change Password
                        </NavLink>
                        <NavLink
                            to="changeemail"
                            className={({ isActive }) =>
                                isActive ? style.isactive_link : undefined
                            }
                        >
                            Change Email
                        </NavLink>
                        <NavLink
                            to="deleteuser"
                            className={({ isActive }) =>
                                isActive ? style.isactive_link : undefined
                            }
                        >
                            Delete Account
                        </NavLink>
                        <NavLink
                            to="attributes"
                            className={({ isActive }) =>
                                isActive ? style.isactive_link : undefined
                            }
                        >
                            Update Attributes
                        </NavLink>
                        <button onClick={logout}>Logout</button>
                    </nav>
                    <Outlet />
                </>
            )}
        </div>
    );
};

export default Settings;
