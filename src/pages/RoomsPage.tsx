import React, { useState } from 'react';
import { RoomCard } from '../components/rooms/RoomCard';
import { rooms } from '../data/rooms';
import { useAuth } from '../context/AuthContext';
import DatePicker from 'react-datepicker';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { firebase } from '../firebaseConfig'; // Asegúrate de que esta importación esté correcta

export function RoomsPage() {
  const { isLoggedIn } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Maneja el clic en "Book Now"
  const handleBook = (room: any) => {
    setSelectedRoom(room);
  };

  // Maneja el éxito de la reserva
  const handleBookingSuccess = () => {
    alert('Your booking has been successful!');
    setSelectedRoom(null);
  };

  // Cancela la reserva y cierra el formulario
  const handleCancelBooking = () => {
    setSelectedRoom(null);
  };

  // Enviar la reserva a Firestore
  const handleSubmitBooking = async () => {
    if (startDate && endDate && selectedRoom && isLoggedIn) {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          const db = getFirestore(firebase.app()); // Usamos getFirestore para obtener la base de datos

          // Guardar la reserva en la colección de Firebase
          const bookingRef = collection(db, 'bookings');
          await addDoc(bookingRef, {
            roomId: selectedRoom.id,
            startDate: startDate,
            endDate: endDate,
            userId: user.uid, // Asociamos la reserva con el ID del usuario autenticado
            roomName: selectedRoom.name, // Nombre de la habitación
            createdAt: firebase.firestore.FieldValue.serverTimestamp(), // Timestamp de la creación
          });

          handleBookingSuccess(); // Llama a la función de éxito
        } else {
          alert('You must be logged in to make a reservation.');
        }
      } catch (error) {
        console.error('Error saving booking:', error);
        alert('Something went wrong, please try again.');
      }
    } else {
      alert('Please select start and end dates.');
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-light text-amber-500 mb-6">Available Rooms</h1>
      <div className="grid gap-6">
        {rooms.map((room) => (
          <RoomCard key={room.id} {...room} onBook={() => handleBook(room)} />
        ))}
      </div>

      {selectedRoom && (
        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-light text-white mb-4">Book: {selectedRoom.name}</h2>

          <div className="text-white mb-4">
            <label className="block text-sm mb-2">Select Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              minDate={new Date()}
              dateFormat="MMMM d, yyyy"
              className="w-full py-2 px-3 rounded-lg bg-gray-800 text-white"
            />
          </div>

          <div className="text-white mb-4">
            <label className="block text-sm mb-2">Select End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              minDate={startDate || new Date()}
              dateFormat="MMMM d, yyyy"
              className="w-full py-2 px-3 rounded-lg bg-gray-800 text-white"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleSubmitBooking}
              className="bg-green-500 text-white px-4 py-2 rounded-lg w-full hover:bg-green-600"
            >
              Book Now
            </button>
            <button
              onClick={handleCancelBooking}
              className="bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
