import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/ApiService";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name && !email && !password) return;

    try {
      const response = await registerUser(name, email, password);
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
    <div className="register-page">
      <h1>Registro</h1>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
};

export default Register;
