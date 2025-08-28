
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  FileText,
} from "lucide-react";
import { useAppSelector } from "../../hooks/redux";
import { selectCartItemCount } from "../../store/selectors";

const Navigation = ({ isMobile = false }) => {
  const location = useLocation();
  const cartCount = useAppSelector(selectCartItemCount);

  const navItems = [
    // { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
    {
      to: "/products",
      label: "Products",
      icon: Package,
      activePaths: ["/products"],
    },
    { to: "/cart", label: "Cart", icon: ShoppingCart, showCount: true },
    { to: "/customers", label: "Customers", icon: Users },
    { to: "/invoices", label: "Invoices", icon: FileText },
    // 👉 You can add more items here later, still works.
  ];

  return (
    <nav
      className={
        isMobile
          ? "flex flex-col space-y-3 px-4 py-4"
          : "flex overflow-x-auto no-scrollbar space-x-6 px-2 py-3 bg-white border-b shadow-sm sticky top-16 z-40"
      }
    >
      {navItems.map(({ to, label, icon: Icon, showCount }) => {
        const isActive = location.pathname === to;
        return (
          <Link
            key={to}
            to={to}
            className={`
              flex items-center flex-shrink-0 px-6 py-3 rounded-full text-base font-semibold
              transition-all duration-500 ease-in-out sticky
              ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md scale-105"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-100"
              }
            `}
            style={{
              transitionProperty:
                "background-color, color, transform, box-shadow",
            }}
          >
            <Icon
              className={`w-6 h-6 mr-3 transition-colors duration-500 ${
                isActive ? "text-white" : "text-gray-400"
              }`}
            />
            {showCount && cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
            {label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
