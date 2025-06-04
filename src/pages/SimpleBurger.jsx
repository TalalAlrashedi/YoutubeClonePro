import React, { useState } from "react";

export default function SimpleBurger() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center relative">
      <div className="text-lg font-bold">شعاري</div>

      {/* القوائم للشاشات المتوسطة وفوق */}
      <ul className="hidden md:flex space-x-6">
        <li className="hover:text-gray-300 cursor-pointer">الرئيسية</li>
        <li className="hover:text-gray-300 cursor-pointer">الخدمات</li>
        <li className="hover:text-gray-300 cursor-pointer">عنّا</li>
        <li className="hover:text-gray-300 cursor-pointer">تواصل</li>
      </ul>

      {/* زر القائمة للهاتف */}
      <div className="md:hidden">
        <button onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? (
            // أيقونة إغلاق (X)
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // أيقونة الهامبرجر (☰)
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* القائمة المنسدلة تظهر فقط إذا open=true */}
        {open && (
          <ul className="absolute right-4 top-full mt-2 bg-blue-600 rounded shadow-md w-40 flex flex-col space-y-2 p-3">
            <li className="hover:text-gray-300 cursor-pointer">الرئيسية</li>
            <li className="hover:text-gray-300 cursor-pointer">الخدمات</li>
            <li className="hover:text-gray-300 cursor-pointer">عنّا</li>
            <li className="hover:text-gray-300 cursor-pointer">تواصل</li>
          </ul>
        )}
      </div>
    </nav>
  );
}