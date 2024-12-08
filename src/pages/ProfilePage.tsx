import React from 'react';
import { Mail, Phone, MapPin, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function ProfilePage() {
  const { logout } = useAuth();

  return (
    <div className="p-6 space-y-8">
      <div className="text-center">
        <div className="w-24 h-24 bg-amber-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-3xl text-black">MP</span>
        </div>
        <h1 className="text-2xl font-light text-white">Maiquel Puma</h1>
        <p className="text-gray-400">Gold Member</p>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-900 p-4 rounded-lg flex items-center space-x-4">
          <Mail className="w-5 h-5 text-amber-500" />
          <span className="text-gray-300">m.puma@gmail.com</span>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg flex items-center space-x-4">
          <Phone className="w-5 h-5 text-amber-500" />
          <span className="text-gray-300">+56 9 1234 5678</span>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg flex items-center space-x-4">
          <MapPin className="w-5 h-5 text-amber-500" />
          <span className="text-gray-300">Av. Balmaceda #892, Santiago</span>
        </div>
      </div>

      <div className="pt-4">
        <button 
          onClick={logout}
          className="w-full bg-red-500/10 text-red-500 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-red-500/20 transition-colors"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}