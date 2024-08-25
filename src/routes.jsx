import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminBookForm from "./pages/AdminBookForm.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
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
