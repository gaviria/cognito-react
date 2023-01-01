import UserPool from "../UserPool";
import { useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";

const ForgotPassword = () => {
    const [stage, setStage] = useState(1); // 1 = email stage, 2 = code stage
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const getUser = () => {
        return new CognitoUser({
            Username: email,
            Pool: UserPool,
        });
    };

    const onSendCode = (event) => {
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

    const onResetPassword = (event) => {
        event.preventDefault();

        if (newPassword !== confirmNewPassword) {
            console.error("Passwords are not the same");
            return;
        }

        getUser().confirmPassword(code, newPassword, {
            onSuccess: (data) => {
                console.log("onSuccess:", data);
            },
            onFailure: (err) => {
                console.error("onFailure:", err);
            },
        });
    };

    return (
        <div>
            {stage === 1 && (
                <form onSubmit={onSendCode}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit">Send Verification Code</button>
                </form>
            )}
            {stage === 2 && (
                <form onSubmit={onResetPassword}>
                    <label htmlFor="code">Code:</label>
                    <input
                        type="text"
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <label htmlFor="newpassword">New Password:</label>
                    <input
                        type="text"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <label htmlFor="confirmnewpassword">
                        Confirm New Password:
                    </label>
                    <input
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
