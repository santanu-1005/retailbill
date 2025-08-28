
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./components/App/AppLayout";
import ProtectedRoute from "./components/App/ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/DashBoard"
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import CustomerPage from "./pages/CustomerPage";
import InvoicesPage from "./pages/InvoicesPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import AddProductPage from "./pages/AddProductPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthenticationPage />} />

        {/* Private */}
        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout currentView="dashboard">
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <AppLayout currentView="products">
                <ProductsPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/addproduct"
          element={
            <ProtectedRoute>
              <AppLayout currentView="products">
                <AddProductPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <AppLayout currentView="cart">
                <CartPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <AppLayout currentView="customers">
                <CustomerPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/invoices"
          element={
            <ProtectedRoute>
              <AppLayout currentView="invoices">
                <InvoicesPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
