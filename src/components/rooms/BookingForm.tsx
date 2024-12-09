import React, { useState } from 'react';
import { firebase } from '../../firebaseConfig'; // Asegúrate de importar Firebase correctamente
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';

interface BookingFormProps {
  room: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export function BookingForm({ room, onSuccess, onCancel }: BookingFormProps) {
  const { isLoggedIn } = useAuth();
  const [guestName, setGuestName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Asegúrate de que el usuario esté autenticado antes de permitir la reserva
  if (!isLoggedIn) {
    alert('You must be logged in to make a booking.');
    return null; // Si no está logueado, no mostramos el formulario
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestName || !startDate || !endDate) {
      alert('Please fill all fields');
      return;
    }

    try {
      // Obtenemos la referencia a Firestore
      const db = getFirestore(firebase.app());

      // Obtener el usuario actual
      const user = firebase.auth().currentUser;
      if (user) {
        // Guardar la reserva en la colección 'bookings'
        await addDoc(collection(db, 'bookings'), {
          roomId: room.id,
          roomName: room.name,
          guestName: guestName,
          startDate: startDate,
          endDate: endDate,
          userId: user.uid, // Asociamos la reserva con el ID del usuario
          createdAt: serverTimestamp(),
        });

        // Llamamos a la función onSuccess al completar la reserva
        onSuccess();
      } else {
        alert('User not authenticated.');
      }
    } catch (error) {
      console.error('Error creating booking: ', error);
      alert('Failed to create booking');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-300 mb-1">Guest Name</label>
        <input
          type="text"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-1">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-1">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div className="flex space-x-4">
        <button 
          type="submit"
          className="bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition-colors"
        >
          Confirm Booking
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

