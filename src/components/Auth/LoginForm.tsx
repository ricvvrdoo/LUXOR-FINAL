import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password); // Llamamos a la función login
      navigate('/'); // Redirigir al usuario a la página principal después de hacer login
    } catch (error) {
      console.error('Login error:', error);
      // Aquí podrías mostrar un mensaje de error si el login falla
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light text-amber-500 mb-2">LUXOR</h1>
        <p className="text-gray-400">Welcome back to luxury</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-900 text-white border border-gray-800 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-900 text-white border border-gray-800 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-amber-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-500 text-black font-medium py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-amber-400 transition-colors"
        >
          <LogIn size={20} />
          <span>Sign In</span>
        </button>
      </form>

      <p className="text-center mt-6 text-gray-400">
        Don't have an account?{' '}
        <a href="/register" className="text-amber-500 hover:text-amber-400">
          Sign up
        </a>
      </p>
    </div>
  );
}

