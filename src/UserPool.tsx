import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_Rw3gJpPzZ",
    ClientId: "ht71jgvg1vilpkep3d0eo6q1j",
};

export default new CognitoUserPool(poolData);
