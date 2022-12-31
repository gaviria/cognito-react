import { useState } from "react";
import UserPool from "../UserPool";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        UserPool.signUp(email, password, [], [], (err, data) => {
            if (err) {
                console.log(err);
            }
            console.log(data);
        });
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h2>Signup</h2>
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
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
