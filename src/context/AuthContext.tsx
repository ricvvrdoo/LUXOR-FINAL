import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { firebase } from '../firebaseConfig';  

interface AuthContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Efecto para verificar el estado de autenticación al cargar la app
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe(); // Limpiar el suscriptor cuando el componente se desmonte
  }, []);

  // Función de login
  const login = async (email: string, password: string) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error logging in', (error as any).message);
    }
  };

  // Función de signup
  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      if (user) {
        await firebase.firestore().collection('users').doc(user.uid).set({
          firstName,
          lastName,
          email,
        });
      }
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error signing up', (error as any).message);
    }
  };

  // Función de logout
  const logout = () => {
    firebase.auth().signOut();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}