"use client";
import { useState } from "react";
import { login } from "../services/firebase-auth";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/admin/listUndangan");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-700 to-pink-500 min-h-screen flex flex-col justify-center items-center">
      {/* <div className="bg-purple-700 min-h-screen flex flex-col justify-center items-center"> */}
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">
          Login
        </h1>

        {error && (
          <div className="mb-4 text-center text-sm text-red-600 bg-red-100 px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {/* Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
    // </div>
  );
}
