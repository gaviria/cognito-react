import { useContext, useState } from "react";
import { AccountContext } from "./Account";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { authenticate } = useContext(AccountContext);

    const onSubmit = (event) => {
        event.preventDefault();
        authenticate(email, password)
            .then((data) => {
                console.log("Logged in!", data);
            })
            .catch((err) => {
                console.error("Failed to login", err);
            });
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h2>Login</h2>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Email"
                    />
                    <label htmlFor="password"></label>
                    <input
                        type="text"
                        value={password}
                        onChange={(event) => setPassword(event?.target.value)}
                        placeholder="Password"
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
