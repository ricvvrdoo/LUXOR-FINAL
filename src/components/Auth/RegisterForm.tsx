import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password, firstName, lastName);
      navigate('/login'); // Redirige al login después de registrarse
    } catch (error) {
      console.error('Error signing up:', error);
      // Aquí podrías mostrar un mensaje de error si el registro falla
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light text-amber-500 mb-2">LUXOR</h1>
        <p className="text-gray-400">Create your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full bg-gray-900 text-white border border-gray-800 rounded-lg py-3 pl-4 pr-4 focus:outline-none focus:border-amber-500"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full bg-gray-900 text-white border border-gray-800 rounded-lg py-3 pl-4 pr-4 focus:outline-none focus:border-amber-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-900 text-white border border-gray-800 rounded-lg py-3 pl-4 pr-4 focus:outline-none focus:border-amber-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-900 text-white border border-gray-800 rounded-lg py-3 pl-4 pr-4 focus:outline-none focus:border-amber-500"
        />

        <button
          type="submit"
          className="w-full bg-amber-500 text-black font-medium py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-amber-400 transition-colors"
        >
          <span>Sign Up</span>
        </button>
      </form>

      <p className="text-center mt-6 text-gray-400">
        Already have an account?{' '}
        <a href="/login" className="text-amber-500 hover:text-amber-400">
          Login
        </a>
      </p>
    </div>
  );
}
