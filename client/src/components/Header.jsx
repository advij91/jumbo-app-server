import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../features/authSlice";
import {logout} from "../../services/authService";

const MENU_LINKS = [
  { label: "Outlets", href: "/outlets" },
  { label: "Categories", href: "/categories" },
  { label: "Items", href: "/items" },
  { label: "Charges", href: "/charges" },
  { label: "Coupons", href: "/coupons" },
  { label: "Addons", href: "/addons" },
  { label: "Orders", href: "/orders" },
];

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Check if user is logged in from Redux store
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = !!user;

  const toggleMenu = () => setShowMenu((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = () => {
    navigate("/auth/login");
  };

  const handleLogout = () => {
    dispatch(userLogout());
    logout().catch((error) => {
      console.error("Logout failed:", error);}); 
    navigate("/auth/login");
  };

  return (
    <header className="p-4 bg-light border-b border-gray-300 flex items-center justify-between">
      <div>
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          className="px-4 py-2 bg-primary text-white rounded-md shadow-md hover:bg-secondary focus:outline-none"
        >
          Settings
        </button>
        {showMenu && (
          <div
            ref={menuRef}
            className="mt-2 bg-white border border-gray-300 rounded-md shadow-lg p-4 absolute z-10"
          >
            <ul className="list-none p-0 m-0">
              {MENU_LINKS.map((link) => (
                <li key={link.href} className="mb-2 last:mb-0">
                  <a
                    href={link.href}
                    className="text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
            <div>
        {!isLoggedIn ? (
          <button
            onClick={handleLogin}
            className="px-5 py-2 bg-primary text-white rounded-md shadow-md border border-primary transition hover:bg-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Login
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-white text-primary rounded-md shadow-md border border-primary transition hover:bg-red-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;