import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SimpleBurger from "./SimpleBurger";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "user" && password === "1234") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/home");
    } else {
      alert("البيانات غير صحيحة");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#f1f1f1]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-lg shadow-md w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube"
            className="w-32 mb-4"
          />
          <h2 className="text-xl font-medium text-gray-700">تسجيل الدخول</h2>
        </div>

        <input
          type="text"
          placeholder="اسم المستخدم هو user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="أدخل كلمة المرور 1234"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-[#cc0000] text-white font-semibold py-3 rounded hover:bg-[#b30000] transition-colors"
        >
          تسجيل الدخول
        </button>

        <div className="text-center mt-4 text-sm text-gray-600">
          <a href="#" className="hover:underline">
            هل نسيت كلمة المرور؟
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
