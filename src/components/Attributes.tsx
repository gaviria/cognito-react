import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "./Account";
import style from "../assets/css/styles.module.css";

const Attributes = () => {
    const [plan, setPlan] = useState("");

    const { getSession } = useContext(AccountContext);

    useEffect(() => {
        getSession().then((data) => {
            console.log("Data: ", data);
            setPlan(data["custom:plan"] ?? "");
        });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        getSession().then(({ user }) => {
            const attributes = [
                new CognitoUserAttribute({
                    Name: "custom:plan",
                    Value: plan,
                }),
            ];
            user.updateAttributes(attributes, (err, result) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(result);
            });
        });
    };

    return (
        <div>
            <form onSubmit={onSubmit} className={style.attributes_form}>
                <legend className={style.legend_text}>Update your Plan</legend>
                <input
                    type="text"
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                />
                <button type="submit">Change Plan</button>
            </form>
        </div>
    );
};

export default Attributes;
