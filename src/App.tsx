import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/Auth/LoginForm';
import { RegisterForm } from './components/Auth/RegisterForm';
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { ServicesPage } from './pages/ServicesPage';
import { LoyaltyPage } from './pages/LoyaltyPage';
import { ProfilePage } from './pages/ProfilePage';
import { BottomNav } from './components/layout/BottomNav';
import { AuthProvider, useAuth } from './context/AuthContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
}

function AppContent() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="bg-black min-h-screen text-white pb-16">
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/rooms" element={<ProtectedRoute><RoomsPage /></ProtectedRoute>} />
            <Route path="/services" element={<ProtectedRoute><ServicesPage /></ProtectedRoute>} />
            <Route path="/loyalty" element={<ProtectedRoute><LoyaltyPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
      {isLoggedIn && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
