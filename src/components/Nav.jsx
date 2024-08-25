import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../libs/services/slices/authSlice";

export default function NavBar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    setDropdownOpen(false);
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className="w-full bg-gray-800 p-2 shadow-md fixed top-0 left-0 right-0 z-10">
      <div dir="ltr" className="w-full  flex justify-between items-center">
        <div className="text-white text-sm md:text-lg font-bold">
          <Link
            to="/"
            className="text-white hover:text-gray-300 transition-colors duration-300 ease-in-out"
          >
            موسوعة الكتب
          </Link>
        </div>
        <div className="flex w-[70%] justify-end items-center gap-4">
          <Link
            to="/"
            className="text-white hover:text-gray-300 transition-colors duration-300 ease-in-out font-bold"
          >
            الكتب
          </Link>
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="text-white hover:text-gray-300 transition-colors duration-300 ease-in-out font-bold"
            >
              لوحة التحكم
            </Link>
          )}
          {user ? (
            <div className="relative dropdown">
              <button
                onClick={toggleDropdown}
                className="text-white hover:text-gray-300 transition-colors duration-300 ease-in-out flex items-center"
              >
                <p className="text-center rounded-full w-6 h-6 font-bold text-black bg-white">
                  <img
                    src={
                      "https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png"
                    }
                    alt="user"
                    className="w-6 h-6 rounded-full"
                  />
                </p>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-md">
                  <button
                    onClick={handleLogout}
                    className="text-center block px-4 py-2 w-full hover:bg-gray-100 font-bold"
                  >
                    تسجيل الخروج
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white hover:text-gray-300 transition-colors duration-300 ease-in-out font-bold"
            >
              تسجيل الدخول
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
