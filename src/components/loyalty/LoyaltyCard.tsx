import React from 'react';
import { Award, Gift } from 'lucide-react';

interface LoyaltyCardProps {
  points: number;
  level: string;
}

export function LoyaltyCard({ points, level }: LoyaltyCardProps) {
  return (
    <div className="bg-gradient-to-br from-amber-600 to-amber-800 text-white rounded-xl p-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-sm opacity-80">Loyalty Program</p>
          <h3 className="text-2xl font-medium">{level} Member</h3>
        </div>
        <Award className="w-8 h-8" />
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm opacity-80">Points Balance</span>
          <span className="text-xl">{points}</span>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all"
            style={{ width: `${Math.min((points / 5000) * 100, 100)}%` }}
          />
        </div>
      </div>
      
      <button className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors">
        <Gift className="w-4 h-4" />
        <span>Redeem Points</span>
      </button>
    </div>
  );
}