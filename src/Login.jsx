import { useState } from "react"
import "./Login.css"

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(){
        if (username == "kayla" && password == "123"){
            onLogin(true);
        } else{
            alert("Invalid username or password");
        }
    }

    return (
        <div className = "login-page">
            <div className = "login-container">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <h2>Username:</h2>
                    <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    />
                    <h2>Password:</h2>
                    <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
