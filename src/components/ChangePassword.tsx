import { useState, FormEvent } from "react";
import { useContext } from "react";
import { AccountContext } from "./Account";
import style from "../assets/css/styles.module.css";

const ChangePassword = () => {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const { getSession } = useContext(AccountContext);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
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
        <div className={style.container}>
            <form onSubmit={onSubmit} className={style.user_password_form}>
                <legend className={style.legend_text}>Change Password</legend>
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
