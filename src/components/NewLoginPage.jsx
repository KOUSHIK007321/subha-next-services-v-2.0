"use client";

import React, { useState } from "react";
import localFont from "next/font/local";
import { motion, AnimatePresence } from "framer-motion";
import { useActionState } from "react";
import { login, register } from "@/actions/auth";
import {
  User,
  Lock,
  Mail,
  LogIn,
  UserPlus,
  Eye,
  EyeOff,
  X,
} from "lucide-react";

const myFont = localFont({ src: "../fonts/JungleFlame-nAAv4.otf" });

export default function LoginSignupPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [loginState, loginAction, isLoginPending] = useActionState(
    login,
    undefined
  );
  const [registerState, registerAction, isRegisterPending] = useActionState(
    register,
    undefined
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    resetEmail: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log("Password reset requested for:", formData.resetEmail);
    alert(`Password reset link sent to ${formData.resetEmail}`);
    setIsForgotPasswordOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 120,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 150,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  // No longer needed as we're using server actions

  return (
    <div className="min-h-[75vh] p-12 bg-gray-700 flex items-center justify-center">
      <motion.div
        className="bg-gray-800 rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden border-2 border-gray-700"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
      >
        {/* SCS Heading */}
        <div className={`${myFont.className} text-center py-6 text-white`}>
          <h1 className="text-7xl">SCS</h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-4 flex items-center justify-center space-x-2 transition-all duration-300 
              ${isLogin
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            type="button"
          >
            <LogIn className="text-xl" />
            <span>Login</span>
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-4 flex items-center justify-center space-x-2 transition-all duration-300 
              ${!isLogin
                ? "bg-green-800 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            type="button"
          >
            <UserPlus className="text-xl" />
            <span>Sign Up</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.form
              key="login"
              action={loginAction}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
              className="p-8 space-y-6"
            >
              {/* Email Input */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  defaultValue={loginState?.email || formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {loginState?.errors?.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {loginState.errors.email}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  required
                  className="w-full p-3 pl-10 pr-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
                {loginState?.errors?.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {loginState.errors.password}
                  </p>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoginPending}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isLoginPending ? (
                  "Loading..."
                ) : (
                  <>
                    <LogIn />
                    <span>Login</span>
                  </>
                )}
              </button>

              {/* Forgot Password */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsForgotPasswordOpen(true)}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Forgot Password?
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.form
              key="signup"
              action={registerAction}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
              className="p-8 space-y-6"
            >
              {/* Name Input (Optional based on your registration logic) */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  required
                  className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  defaultValue={registerState?.email || formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {registerState?.errors?.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {registerState.errors.email}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  required
                  className="w-full p-3 pl-10 pr-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
                {registerState?.errors?.password && (
                  <div className="text-red-500 text-sm mt-1">
                    <p>Password must:</p>
                    <ul className="list-disc list-inside ml-4">
                      {Array.isArray(registerState.errors.password) ? (
                        registerState.errors.password.map((err, index) => (
                          <li key={index}>{err}</li>
                        ))
                      ) : (
                        <li>{registerState.errors.password}</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  required
                  className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {registerState?.errors?.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {registerState.errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                disabled={isRegisterPending}
                className="w-full bg-green-800 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 disabled:bg-green-600 disabled:cursor-not-allowed"
              >
                {isRegisterPending ? (
                  "Loading..."
                ) : (
                  <>
                    <UserPlus />
                    <span>Sign Up</span>
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {isForgotPasswordOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.97 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-800 rounded-2xl w-full max-w-md p-8 relative shadow-xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsForgotPasswordOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Reset Password
              </h2>

              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    name="resetEmail"
                    value={formData.resetEmail}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    className="w-full p-3 pl-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send Reset Link
                </button>
              </form>

              <p className="text-center text-gray-400 mt-4 text-sm">
                We'll send a password reset link to your email
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
