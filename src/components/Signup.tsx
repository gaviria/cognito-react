import { CognitoUser } from "amazon-cognito-identity-js";
import { useState } from "react";
import UserPool from "../UserPool";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState(1); //step 1 is Signup and 2 is code verification
    const [codeVerification, setCodeVerification] = useState("");

    //React.ChangeEvent<HTMLInputElement>
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        UserPool.signUp(email, password, [], [], (err, data) => {
            if (err) {
                console.log(err);
            }
            console.log(data);
            setStep(2);
        });
    };

    const onConfirmCode = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user = new CognitoUser({
            Username: email,
            Pool: UserPool,
        });

        user.confirmRegistration(codeVerification, true, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
        });
    };

    return (
        <div>
            {step === 1 && (
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
                            onChange={(event) =>
                                setPassword(event?.target.value)
                            }
                            placeholder="Password"
                        />
                    </div>
                    <button type="submit">Signup</button>
                </form>
            )}
            {step === 2 && (
                <form onSubmit={onConfirmCode}>
                    <h2>Code verification</h2>
                    <label htmlFor="codeVerification">Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <label htmlFor="codeVerification">Code Verification:</label>
                    <input
                        type="text"
                        onChange={(event) =>
                            setCodeVerification(event.target.value)
                        }
                    />
                    <button>Confirm Account</button>
                </form>
            )}
        </div>
    );
};

export default Signup;
