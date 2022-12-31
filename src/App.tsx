import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Account } from "./components/Account";

function App() {
    return (
        <div className="App">
            <Account>
                <Signup />
                <Login />
            </Account>
        </div>
    );
}

export default App;
