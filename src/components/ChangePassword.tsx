import { useState } from "react";
import { useContext } from "react";
import { AccountContext } from "./Account";

const ChangePassword = () => {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const { getSession } = useContext(AccountContext);

    const onSubmit = (event) => {
        event.preventDefault();

        getSession().then(({ user }) => {
            user.changePassword(password, newPassword, (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(result);
                }
            });
        });
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="password">Current Password</label>
                <input
                    type="text"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <label htmlFor="newpassword">New Password</label>
                <input
                    type="text"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                />
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;
