import React from 'react';
import { Hotel } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Hotel className="h-6 w-6 text-amber-600" />
          <span className="text-xl font-light">LUXOR</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/rooms" className="text-gray-600 hover:text-amber-600 transition-colors">Rooms</a>
          <a href="/services" className="text-gray-600 hover:text-amber-600 transition-colors">Services</a>
          <a href="/loyalty" className="text-gray-600 hover:text-amber-600 transition-colors">Loyalty</a>
          <a href="/profile" className="text-gray-600 hover:text-amber-600 transition-colors">Profile</a>
        </nav>
      </div>
    </header>
  );
}