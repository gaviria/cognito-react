import { CognitoUser } from "amazon-cognito-identity-js";
import { FormEvent, useState } from "react";
import UserPool from "../UserPool";
import style from "../assets/css/styles.module.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState(1); //step 1 is Signup and 2 is code verification
    const [codeVerification, setCodeVerification] = useState("");
    const navigate = useNavigate();

    //React.ChangeEvent<HTMLInputElement>
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        UserPool.signUp(email, password, [], [], (err, data) => {
            if (err) {
                console.log(err);
            }
            console.log(data);
            setStep(2);
        });
    };

    const onConfirmCode = (e: FormEvent<HTMLFormElement>) => {
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
            navigate("/");
        });
    };

    return (
        <div className={style.container}>
            {step === 1 && (
                <form onSubmit={onSubmit} className={style.signup_form}>
                    <legend className={style.legend_text}>Sign Up</legend>
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
                    <button type="submit">Signup</button>
                </form>
            )}
            {step === 2 && (
                <form
                    onSubmit={onConfirmCode}
                    className={style.code_verification_form}
                >
                    <legend className={style.legend_text}>
                        Verify Account
                    </legend>
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
