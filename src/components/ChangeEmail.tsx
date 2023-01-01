import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { useState } from "react";
import { useContext } from "react";
import { AccountContext } from "./Account";

const ChangeEmail = () => {
    const [newEmail, setNewEmail] = useState("");
    const [password, setPassword] = useState("");

    const { getSession, authenticate } = useContext(AccountContext);

    const onSubmit = (event) => {
        event.preventDefault();

        getSession().then(({ user, email }) => {
            authenticate(email, password).then(() => {
                const attributes = [
                    new CognitoUserAttribute({
                        Name: "email",
                        Value: newEmail,
                    }),
                ];
                user.updateAttributes(attributes, (err, results) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(results);
                    }
                });
            });
        });
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="newEmail">New Email</label>
                <input
                    type="text"
                    value={newEmail}
                    onChange={(event) => setNewEmail(event.target.value)}
                />
                <label htmlFor="password">Current Password</label>
                <input
                    type="text"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit">Change Email</button>
            </form>
        </div>
    );
};

export default ChangeEmail;
