import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Account } from "./components/Account";
import Status from "./components/Status";
import Settings from "./components/Settings";

function App() {
    return (
        <div className="App">
            <Account>
                <Status />
                <Signup />
                <Login />
                <Settings />
            </Account>
        </div>
    );
}

export default App;
