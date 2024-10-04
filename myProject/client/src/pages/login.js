import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setMemberName }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        email,
        password,
      });
      // console.log(response);
      alert(response.data.message);
      setMemberName(email);
      navigate("/member");
    } catch (e) {
      console.log(e);
      alert(e.response.data);
    }
  };

  return (
    <div className="login-container">
      <h2>會員登入</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">登入</button>
      </form>
      <button onClick={() => navigate("/register")}>註冊會員</button>
    </div>
  );
};

export default Login;
