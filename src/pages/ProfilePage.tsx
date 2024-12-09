import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, LogOut, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export function ProfilePage() {
  const { logout } = useAuth();
  const [userData, setUserData] = useState<any>(null);  // Estado para guardar los datos del usuario
  const [phone, setPhone] = useState<string>('');  // Estado para teléfono
  const [address, setAddress] = useState<string>('');  // Estado para dirección
  const user = firebase.auth().currentUser;  // Obtener el usuario autenticado

  useEffect(() => {
    if (user) {
      const db = firebase.firestore();
      const userRef = db.collection('users').doc(user.uid);  // Acceder a los datos del usuario por su UID
      
      // Obtener los datos del usuario desde Firestore
      userRef.get().then((doc) => {
        if (doc.exists) {
          setUserData(doc.data());  // Establecer los datos del usuario en el estado
          setPhone(doc.data()?.phone || '');  // Establecer el teléfono si existe
          setAddress(doc.data()?.address || '');  // Establecer la dirección si existe
        } else {
          console.log('No such user!');
        }
      }).catch((error) => {
        console.error("Error getting user data: ", error);
      });
    }
  }, [user]);  // Solo ejecutar cuando el usuario cambie

  const handleSaveChanges = async () => {
    if (user) {
      const db = firebase.firestore();
      const userRef = db.collection('users').doc(user.uid);

      // Actualizar los datos del usuario en Firestore
      try {
        await userRef.update({
          phone,
          address
        });
        alert('Changes saved successfully!');
      } catch (error) {
        console.error('Error saving changes: ', error);
        alert('Failed to save changes');
      }
    }
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary">
        <div className="text-amber-500">Loading...</div>
      </div>
    );  // Mostrar un mensaje de carga si los datos aún no están disponibles
  }

  return (
    <div className="p-6 space-y-8">
      <div className="text-center">
        <div className="w-24 h-24 bg-amber-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-3xl text-black">{userData.firstName?.[0]}{userData.lastName?.[0]}</span>
        </div>
        <h1 className="text-2xl font-light text-white">{userData.firstName} {userData.lastName}</h1>
        <p className="text-gray-400">{userData.membership || 'Bronze Member'}</p>  {/* Mostrar el tipo de membresía */}
      </div>

      <div className="space-y-4">
        <div className="bg-gray-900 p-4 rounded-lg flex items-center space-x-4">
          <Mail className="w-5 h-5 text-amber-500" />
          <span className="text-gray-300">{userData.email}</span>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg flex items-center space-x-4">
          <Phone className="w-5 h-5 text-amber-500" />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            className="bg-transparent text-gray-300 border-none focus:outline-none w-full"
          />
        </div>
        <div className="bg-gray-900 p-4 rounded-lg flex items-center space-x-4">
          <MapPin className="w-5 h-5 text-amber-500" />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            className="bg-transparent text-gray-300 border-none focus:outline-none w-full"
          />
        </div>
      </div>
      <div className="pt-6 flex flex-col items-center space-y-6 w-full max-w-xs mx-auto">
      <button 
        onClick={handleSaveChanges}
        className="w-full bg-green-500/10 text-green-500 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-500/20 transition-colors"
      >
        <Save size={20} />
        <span>Save Changes</span>
      </button>
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

