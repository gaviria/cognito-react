import "./App.css";
import { Route, Routes } from "react-router";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Account } from "./components/Account";
import Status from "./components/Status";
import Settings from "./components/Settings";
import ForgotPassword from "./components/ForgotPassword";
import ChangePassword from "./components/ChangePassword";
import ChangeEmail from "./components/ChangeEmail";
import DeleteUser from "./components/DeleteUser";
import Attributes from "./components/Attributes";

function App() {
    return (
        <div className="App">
            <Account>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/forgotpassword"
                        element={<ForgotPassword />}
                    />
                    <Route path="/settings/*" element={<Settings />}>
                        <Route
                            path="changepassword"
                            element={<ChangePassword />}
                        />
                        <Route path="changeemail" element={<ChangeEmail />} />
                        <Route path="deleteuser" element={<DeleteUser />} />
                        <Route path="attributes" element={<Attributes />} />
                    </Route>
                </Routes>
            </Account>
        </div>
    );
}

export default App;
