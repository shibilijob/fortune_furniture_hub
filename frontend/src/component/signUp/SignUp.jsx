import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { dataContext } from '../../context/AppContext';
import API from '../../api/API';

function SignUp() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const { setUser } = useContext(dataContext)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert('Please fill in all fields');
      return;
    }

    if (!accepted) {
      alert('You must accept the terms and conditions');
      return;
    }

    const newUser = {
      username,
      email,
      password
    }

    try {
        const { data } = await API.post("/registerUser",
          newUser,
          { withCredentials: true })

        setUser(data.newUser);
        localStorage.setItem("user", JSON.stringify(data.newUser));
        
        alert('Sign-up successful')

        setUsername('')
        setEmail('')
        setPassword('')
        setAccepted(false)

        navigate('/login')

    } catch (error) {
        console.log(error,"can't create user")
        console.log(error.response)

        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message

        alert(message)
      }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">

      <div className="
        w-full 
        max-w-md 
        md:max-w-lg
        bg-white 
        rounded-xl 
        shadow-xl 
        p-6 
        md:p-8
      ">

        <h2 className="text-center text-2xl md:text-3xl font-semibold mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username */}
          <div>
            <label className="block mb-1 text-sm md:text-base">
              Enter your username
            </label>
            <input
              type="text"
              value={username}
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm md:text-base">
              Enter your Email
            </label>
            <input
              type="email"
              value={email}
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm md:text-base">
              Enter your Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Show Password */}
          <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="accent-blue-600"
            />
            <label>Show password</label>
          </div>

          {/* Accept Terms */}
          <div className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="accent-blue-600 mt-1"
            />
            <label>
              Accept the terms and conditions
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>

        </form>

      </div>

    </div>
  )
}

export default SignUp
