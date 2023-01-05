import UserPool from "../UserPool";
import { FormEvent, useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import style from "../assets/css/styles.module.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [stage, setStage] = useState(1); // 1 = email stage, 2 = code stage
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const navigate = useNavigate();

    const getUser = () => {
        return new CognitoUser({
            Username: email,
            Pool: UserPool,
        });
    };

    const onSendCode = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        getUser().forgotPassword({
            onSuccess: (data) => {
                console.log("onSuccess:", data);
            },
            onFailure: (err) => {
                console.error("onFailure:", err);
            },
            inputVerificationCode: (data) => {
                console.log("Input code:", data);
                setStage(2);
            },
        });
    };

    const onResetPassword = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (newPassword !== confirmNewPassword) {
            console.error("Passwords are not the same");
            return;
        }

        getUser().confirmPassword(code, newPassword, {
            onSuccess: (data) => {
                console.log("onSuccess:", data);
                navigate("/");
            },
            onFailure: (err) => {
                console.error("onFailure:", err);
            },
        });
    };

    return (
        <div className={style.container}>
            {stage === 1 && (
                <form onSubmit={onSendCode} className={style.password_form}>
                    <legend className={style.legend_text}>
                        Forgot Pasword
                    </legend>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit">Send Verification Code</button>
                </form>
            )}
            {stage === 2 && (
                <form
                    onSubmit={onResetPassword}
                    className={style.password_form}
                >
                    <legend className={style.legend_text}>
                        Change Password
                    </legend>
                    {!email && (
                        <>
                            <label htmlFor="email">Email:</label>
                            <input
                                id="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </>
                    )}

                    <label htmlFor="code">Code:</label>
                    <input
                        id="code"
                        type="text"
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        id="newPassword"
                        type="text"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <label htmlFor="confirmNewPassword">
                        Confirm New Password:
                    </label>
                    <input
                        id="confirmNewPassword"
                        type="text"
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <button type="submit">Change Password</button>
                </form>
            )}
        </div>
    );
};

export default ForgotPassword;
