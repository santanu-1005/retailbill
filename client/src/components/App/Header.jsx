
import React, { useState, useRef, useEffect } from "react";
import { ShoppingCart, Search, Menu, X, Settings, LogOut } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setSearchTerm,
  setCategoryFilter,
} from "../../store/slices/productsSlice";
import Navigation from "./Navigation";
import { clearCredentials } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { selectProductCategories, selectUser } from "../../store/selectors";

const Header = ({ currentView }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const categories = useAppSelector(selectProductCategories);
  const searchTerm = useAppSelector((s) => s.products?.searchTerm ?? "");
  const categoryFilter = useAppSelector(
    (s) => s.products?.categoryFilter ?? ""
  );
  const user = useAppSelector(selectUser);

  const handleSignOut = () => {
    // TODO: Add logout logic
    dispatch(clearCredentials());
    navigate("/");
    console.log("User signed out");
  };

  // 👇 Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between relative">
          {/* LEFT: Hamburger (mobile only) */}
          <div className="absolute left-0 flex items-center md:hidden">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* CENTER (mobile) / LEFT (desktop): Brand */}
          <div className="flex items-center gap-3 mx-auto md:mx-0">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div
              className="text-center md:text-left cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              <h1 className="text-lg md:text-xl font-bold text-gray-900">
                RetailPOS
              </h1>
              <p className="text-xs text-gray-500 hidden md:block">
                Retail Billing System
              </p>
            </div>
          </div>

          {/* RIGHT: Desktop (search + category + user menu) */}
          <div className="hidden md:flex items-center gap-6 relative">
            {currentView === "products" && (
              <div className="flex items-center gap-2">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                  />
                </div>

                {/* Category filter */}
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={categoryFilter}
                  onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* User with dropdown (desktop) */}
            {user && (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.name || "User"
                    )}`}
                    alt="User avatar"
                    className="w-8 h-8 rounded-full border"
                  />
                  <span className="text-gray-700 font-medium">{user.name}</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-50">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      <Settings className="w-4 h-4" /> Settings
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop (for mobile menu) */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Side Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-72 bg-white shadow-xl z-50 flex flex-col transform transition-transform duration-300 ease-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <span className="font-semibold text-gray-800">RetailPOS</span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4">
          <Navigation isMobile onNavigate={() => setMobileOpen(false)} />
        </div>

        {/* Drawer Footer (User + Settings/SignOut at bottom) */}
        {user && (
          <div className="p-4 border-t">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name || "User"
                )}`}
                alt="User avatar"
                className="w-10 h-10 rounded-full border"
              />
              <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="space-y-1">
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full rounded-md">
                <Settings className="w-4 h-4" /> Settings
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 w-full rounded-md"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
