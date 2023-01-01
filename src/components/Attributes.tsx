import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "./Account";

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
            <h1>Update your Plan</h1>
            <form onSubmit={onSubmit}>
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
