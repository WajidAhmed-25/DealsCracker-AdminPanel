import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import ContactQueries from './Components/ContactQueries';
import FoodBrands from './Components/FoodBrands';
import ClothingBrands from './Components/ClothingBrands';
import Navbar from './Components/Navbar';
import LoginPage from './Components/Login/Login';
import Cookies from "js-cookie";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const ProtectedRoute = ({ children }) => {
    const token = Cookies.get("dealscrackerAdmin-token");
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };
  // Layout wrapper component
  const Layout = ({ children }) => (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
          {children}
        </main>
      </div>
    </div>
  );

  const handleLogin = () => {
    Cookies.set("dealscrackerAdmin-token", "your-token-value", { expires: 1 }); // Set token with expiry
  };

  return (
    <Router>
      <Routes>
      <Route
          path="/login"
          element={
            Cookies.get("dealscrackerAdmin-token") ? (
              <Navigate to="/contacts" replace />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        
        <Route path="/" element={<Navigate to="/contacts" replace />} />

        <Route
          path="/contacts"
          element={
            <ProtectedRoute>
              <Layout>
                <ContactQueries />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/food"
          element={
            <ProtectedRoute>
              <Layout>
                <FoodBrands />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/clothing"
          element={
            <ProtectedRoute>
              <Layout>
                <ClothingBrands />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;