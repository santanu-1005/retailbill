import React from "react";
import Header from "./Header";
import Navigation from "./Navigation";

const AppLayout = ({ currentView, children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} />

      {/* Desktop nav bar - keep original wrapper for centering */}
      <div className="hidden sm:block bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <Navigation />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
