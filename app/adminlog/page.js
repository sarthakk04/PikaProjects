"use client";
import { useState } from "react";
import Image from "next/image";

export default function AdminLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      window.location.href = "/admin/buyers";
    } else {
      alert("Invalid credentials. Try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-200 via-pink-200 to-red-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 border border-yellow-400">
        <div className="flex justify-center mb-4">
          <Image
            src="/pikachu.png"
            alt="Pikachu"
            width={80}
            height={80}
          />
        </div>
        <h2 className="text-2xl font-bold text-center text-yellow-700 mb-6">
          Pokémon Admin Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your trainer name"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your Pokémon password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
