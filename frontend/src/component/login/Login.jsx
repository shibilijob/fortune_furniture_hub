import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import { dataContext } from '../../context/AppContext';
import API from '../../api/API';

function Login() {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(dataContext);

const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await API.post(
      "/login",
      { email, password },
      { withCredentials: true }
    );

    const user = response.data.userData;

    swal("Login successful!");

    // Save user in context only (NOT password)
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    
    // Redirect based on role
    navigate(user.role === "admin" ? "/admin" : "/");

  } catch (err) {
    const message =
      err.response?.data?.message || "Login failed";

    setError(message);
    swal("Error", message, "error");
  }
};

  return (
    <div className="flex justify-center items-center h-screen">

      <div className="h-[380px] md:w-[450px] w-[95%] rounded-lg shadow-[0_1px_6px_black] flex justify-center items-center">

        <form onSubmit={handleLogin} className="w-full px-6">

          <h2 className="text-center text-2xl font-semibold mb-4">Login</h2>

          {/* email */}
          <label className="block mb-1">Enter your email</label>
          <input
            type='email'
            placeholder="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password */}
          <label className="block mb-1">Enter your Password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Checkbox */}
          <div className="flex items-center gap-2 mb-3">
            <input type="checkbox" className="accent-blue-600" />
            <label>I am sure</label>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center mb-2">{error}</p>
          )}

          {/* Login Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[60%] bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>

          {/* Signup */}
          <p className="mt-3 text-center text-sm">
            If you do not have an account, please{' '}
            <span
              onClick={() => navigate('/signup')}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Create account
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;
