import React, { useState } from 'react';
import { Calendar, Users, X } from 'lucide-react';
import DatePicker from 'react-datepicker';  // Asegúrate de tener esta dependencia instalada
import 'react-datepicker/dist/react-datepicker.css';  // Asegúrate de incluir el CSS de react-datepicker
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firebase } from '../../firebaseConfig'; // Asegúrate de que esta importación esté correcta

interface RoomCardProps {
  title: string;
  price: number;
  image: string;
  capacity: number;
  onBook: () => void;
}

export function RoomCard({ title, price, image, capacity }: RoomCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0); // Estado para el precio total

  const handleBookNow = () => {
    setShowModal(true);  // Al hacer clic, se muestra el modal
  };

  const handleCloseModal = () => {
    setShowModal(false);  // Cierra el modal
  };

  const handleConfirmBooking = async () => {
    if (startDate && endDate) {
      try {
        // Calcular el número de noches
        const timeDifference = endDate.getTime() - startDate.getTime(); // Diferencia en milisegundos
        const nightCount = timeDifference / (1000 * 3600 * 24); // Convertir de milisegundos a días

        if (nightCount > 0) {
          const calculatedTotalPrice = nightCount * price; // Calcular el precio total

          setTotalPrice(calculatedTotalPrice); // Actualizar el precio total

          // Obtener el usuario autenticado
          const user = firebase.auth().currentUser;

          if (user) {
            const db = getFirestore(firebase.app());  // Usamos getFirestore para obtener la base de datos
            const bookingRef = collection(db, 'bookings');  // Referencia a la colección de reservas

            // Guardar la reserva en Firestore
            await addDoc(bookingRef, {
              roomTitle: title,
              pricePerNight: price,
              totalPrice: calculatedTotalPrice,
              capacity: capacity,
              startDate: startDate,
              endDate: endDate,
              userId: user.uid,  // Asociamos la reserva con el ID del usuario autenticado
              createdAt: new Date(),  // Marca temporal de la reserva
            });

            alert('Booking confirmed!');
            setShowModal(false);  // Cerrar el modal después de guardar
          } else {
            alert('You must be logged in to confirm the booking.');
          }
        } else {
          alert('The end date must be after the start date.');
        }
      } catch (error) {
        console.error('Error saving booking:', error);
        alert('Something went wrong, please try again.');
      }
    } else {
      alert('Please select both start and end dates.');
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <div className="flex items-center justify-between text-gray-600 mb-4">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Up to {capacity} guests</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Available</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-light">
            ${price}<span className="text-sm text-gray-500">/night</span>
          </span>
          <button 
            className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors"
            onClick={handleBookNow}
          >
            Book Now
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm relative">
            <button 
              onClick={handleCloseModal} 
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-light text-black mb-4">Confirm Your Booking</h2>
            <div className="space-y-4">
              <p className="text-gray-700">Room: {title}</p>
              <p className="text-gray-700">Price: ${price} per night</p>
              <div className="text-gray-700">
                <label className="block text-sm mb-2">Select Start Date:</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => {
                    setStartDate(date);
                    setTotalPrice(0); // Resetear el precio total cuando cambian las fechas
                  }}
                  minDate={new Date()}
                  dateFormat="MMMM d, yyyy"
                  className="w-full py-2 px-3 rounded-lg bg-gray-200"
                />
              </div>
              <div className="text-gray-700">
                <label className="block text-sm mb-2">Select End Date:</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date | null) => {
                    setEndDate(date);
                    setTotalPrice(0); // Resetear el precio total cuando cambian las fechas
                  }}
                  minDate={startDate || new Date()}
                  dateFormat="MMMM d, yyyy"
                  className="w-full py-2 px-3 rounded-lg bg-gray-200"
                />
              </div>
            </div>
            <div className="text-gray-700 mb-4">
              <p>Total Price: ${totalPrice}</p> {/* Mostrar el precio total */}
            </div>
            <div className="flex items-center space-x-4 mt-6">
              <button 
                className="bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition-colors"
                onClick={handleConfirmBooking}
              >
                Confirm
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400 transition-colors"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
