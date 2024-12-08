import React from 'react';
import { LoyaltyCard } from '../components/loyalty/LoyaltyCard.tsx';
import { Gift } from 'lucide-react';
import { rewards } from '../data/rewards.ts';

export function LoyaltyPage() {
  return (
    <div className="p-6 space-y-8">
      <LoyaltyCard points={2500} level="Gold" />
      
      <div>
        <h2 className="text-xl font-light text-amber-500 mb-4">Available Rewards</h2>
        <div className="space-y-4">
          {rewards.map((reward) => (
            <div key={reward.id} className="bg-gray-900 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-white">{reward.title}</h3>
                  <p className="text-sm text-gray-400">{reward.description}</p>
                </div>
                <div className="flex items-center space-x-1 text-amber-500">
                  <Gift size={16} />
                  <span>{reward.points}</span>
                </div>
              </div>
              <button className="w-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 py-2 rounded-lg mt-2 transition-colors">
                Redeem
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


