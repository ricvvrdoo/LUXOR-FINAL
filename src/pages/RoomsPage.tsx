import React from 'react';
import { RoomCard } from '../components/rooms/RoomCard.tsx';
import { rooms } from '../data/rooms.ts';

export function RoomsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-light text-amber-500 mb-6">Available Rooms</h1>
      <div className="grid gap-6">
        {rooms.map((room) => (
          <RoomCard key={room.id} {...room} />
        ))}
      </div>
    </div>
  );
}