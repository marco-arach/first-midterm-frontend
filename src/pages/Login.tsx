import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/ApiService";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!email && !password) return;

        try {
            const response = await loginUser(email, password);
            if (response.success) {
                navigate("/main");
            } else {
                console.error(response.error);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
