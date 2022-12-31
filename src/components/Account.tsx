import { createContext } from "react";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";

const AccountContext = createContext();

const Account = (props) => {
    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = UserPool.getCurrentUser();
            if (user) {
                user.getSession((err, session) => {
                    if (err) {
                        reject();
                    } else {
                        resolve(session);
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
        if (user) {
            user.signOut();
        }
    };
    return (
        <AccountContext.Provider value={{ authenticate, getSession, logout }}>
            {props.children}
        </AccountContext.Provider>
    );
};

export { Account, AccountContext };
