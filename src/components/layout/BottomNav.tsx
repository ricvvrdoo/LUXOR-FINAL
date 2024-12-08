import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BedDouble, Gift, User, Coffee } from 'lucide-react';

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 w-full bg-black border-t border-amber-900/30 pb-safe">
      <div className="flex justify-around items-center h-16">
        <NavLink to="/" className={({ isActive }) => 
          `flex flex-col items-center space-y-1 ${isActive ? 'text-amber-500' : 'text-gray-400'}`
        }>
          <Home size={20} />
          <span className="text-xs">Home</span>
        </NavLink>
        <NavLink to="/rooms" className={({ isActive }) => 
          `flex flex-col items-center space-y-1 ${isActive ? 'text-amber-500' : 'text-gray-400'}`
        }>
          <BedDouble size={20} />
          <span className="text-xs">Rooms</span>
        </NavLink>
        <NavLink to="/services" className={({ isActive }) => 
          `flex flex-col items-center space-y-1 ${isActive ? 'text-amber-500' : 'text-gray-400'}`
        }>
          <Coffee size={20} />
          <span className="text-xs">Services</span>
        </NavLink>
        <NavLink to="/loyalty" className={({ isActive }) => 
          `flex flex-col items-center space-y-1 ${isActive ? 'text-amber-500' : 'text-gray-400'}`
        }>
          <Gift size={20} />
          <span className="text-xs">Loyalty</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => 
          `flex flex-col items-center space-y-1 ${isActive ? 'text-amber-500' : 'text-gray-400'}`
        }>
          <User size={20} />
          <span className="text-xs">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
}