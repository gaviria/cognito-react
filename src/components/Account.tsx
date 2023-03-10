import { createContext } from "react";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";
import { useNavigate } from "react-router-dom";

const AccountContext = createContext();
type props = {
    children: JSX.Element | JSX.Element[];
};

const Account = (props: props) => {
    const navigate = useNavigate();

    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = UserPool.getCurrentUser();
            if (user) {
                user.getSession(async (err, session) => {
                    if (err) {
                        reject();
                    } else {
                        const attributes = await new Promise(
                            (resolve, reject) => {
                                user.getUserAttributes((err, attributes) => {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        const results = {};

                                        for (let attribute of attributes) {
                                            const { Name, Value } = attribute;
                                            results[Name] = Value;
                                        }
                                        resolve(results);
                                    }
                                });
                            }
                        );
                        resolve({ user, ...session, ...attributes });
                    }
                });
            } else {
                reject();
            }
        });
    };
    const authenticate = async (Username: string, Password: string) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username: Username,
                Pool: UserPool,
            });

            const authDetails = new AuthenticationDetails({
                Username: Username,
                Password: Password,
            });

            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log("onSuccess:", data);
                    resolve(data);
                },
                onFailure: (err) => {
                    console.error("onFailure:", err);
                    reject(err);
                },
                newPasswordRequired: (data) => {
                    console.log("newPasswordRequired:", data);
                    resolve(data);
                },
            });
        });
    };

    const logout = () => {
        const user = UserPool.getCurrentUser();

        try {
            user.signOut();
            console.log("Successful Logout");
            navigate("/");
        } catch (err) {
            console.log("error Logout", err);
        }
    };
    return (
        <AccountContext.Provider value={{ authenticate, getSession, logout }}>
            {props.children}
        </AccountContext.Provider>
    );
};

export { Account, AccountContext };
