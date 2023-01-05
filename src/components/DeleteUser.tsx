import { useContext } from "react";
import { AccountContext } from "./Account";

const DeleteUser = () => {
    const { getSession } = useContext(AccountContext);

    const onDeleteUser = () => {
        getSession().then(({ user }) => {
            user.deleteUser(function (err, result) {
                if (err) {
                    alert(err.message || JSON.stringify(err));
                    return;
                }
                console.log("call result: " + result);
            });
        });
    };

    return (
        <>
            <h1>Are you sure?</h1>
            <button onClick={onDeleteUser}>Delete User</button>
        </>
    );
};

export default DeleteUser;
