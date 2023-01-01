import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Account } from "./components/Account";
import Status from "./components/Status";
import Settings from "./components/Settings";
import ForgotPassword from "./components/ForgotPassword";
import Attributes from "./components/Attributes";

function App() {
    return (
        <div className="App">
            <Account>
                <Status />
                <Signup />
                <Login />
                <ForgotPassword />
                <Settings />
                <Attributes />
            </Account>
        </div>
    );
}

export default App;
