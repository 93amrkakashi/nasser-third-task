import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../Downloads/vite-react/vite-react/src/pages/Home.jsx";
import Login from "../../Downloads/vite-react/vite-react/src/pages/Login.jsx";
import Register from "../../Downloads/vite-react/vite-react/src/pages/Register.jsx";
import AdminDashboard from "../../Downloads/vite-react/vite-react/src/pages/AdminDashboard.jsx";
import AdminBookForm from "../../Downloads/vite-react/vite-react/src/pages/AdminBookForm.jsx";
import ProtectedRoute from "../../Downloads/vite-react/vite-react/src/components/ProtectedRoute.jsx";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/new"
        element={
          <ProtectedRoute>
            <AdminBookForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/edit/:id"
        element={
          <ProtectedRoute>
            <AdminBookForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
