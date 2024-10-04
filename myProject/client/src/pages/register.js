import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/user/register", {
        username,
        email,
        password,
      });
      alert("註冊成功！");
      navigate("/login");
    } catch (e) {
      alert(e.response.data);
    }
  };

  return (
    <div className="register-container">
      <h2>會員註冊</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="username">用戶名</label>
          <input
            type="text"
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">信箱</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">密碼</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">註冊</button>
      </form>
      <button className="login-button" onClick={() => navigate("/login")}>
        會員登入
      </button>
    </div>
  );
};

export default Register;
