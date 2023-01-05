import { FormEvent, MouseEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "./Account";
import style from "../assets/css/styles.module.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { authenticate } = useContext(AccountContext);

    //ChangeEvent<HTMLFormElement>
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        authenticate(email, password)
            .then((data) => {
                console.log("Logged in!", data);
                navigate(`/settings`, { replace: true });
            })
            .catch((err) => {
                console.error("Failed to login", err);
            });
    };

    const onClicSingUpPage = (e: MouseEvent) => {
        e.preventDefault();
        navigate(`/signup`, { replace: true });
    };

    const onClicForgotPassword = (e: MouseEvent) => {
        e.preventDefault();
        navigate(`/forgotpassword`, { replace: true });
    };

    return (
        <div className={style.container}>
            <form onSubmit={onSubmit} className={style.login_form}>
                <legend className={style.legend_text}>Login</legend>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email"
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="text"
                    value={password}
                    onChange={(event) => setPassword(event?.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Login</button>
            </form>
            <div className={style.login_options}>
                <a
                    href="#"
                    className={style.signup_link}
                    onClick={onClicSingUpPage}
                >
                    Sign up
                </a>
                <a
                    href="#"
                    className={style.remember_password_link}
                    onClick={onClicForgotPassword}
                >
                    Forgot Password
                </a>
            </div>
        </div>
    );
};

export default Login;
