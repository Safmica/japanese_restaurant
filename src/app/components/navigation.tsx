"use client";

import "../globals.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [cartCount] = useState(5);
  const [showLeftButton, setShowLeftButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setShowLeftButton(true);
      } else {
        setShowLeftButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <div className="bg-transparent z-[21] absolute w-full">
        <nav className="bg-transparent flex items-center justify-between px-10 py-4">
          <div className="flex items-center relative">
            {/* Animasi Transisi Pergantian Logo dan Tombol */}
            <div className="relative w-[100px] h-[50px]">
              <Image
                src="/logo.png"
                alt="Logo"
                width={80}
                height={80}
                priority
                className={`absolute transition-opacity duration-300 ${
                  showLeftButton ? "opacity-0" : "opacity-100"
                }`}
              />
              <div
                className={`absolute w-full h-full flex items-center justify-center transition-opacity duration-300 ${
                  showLeftButton ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="fixed top-8 left-8 bg-gray-800 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700">
                  Fitur Baru
                </div>
              </div>
            </div>
          </div>

          <div>
            <ul className="flex space-x-8 text-sm font-medium text-white border-b-2 py-4">
              {["/", "/about", "/menu", "/offers", "/reservation"].map(
                (route) => (
                  <li key={route}>
                    <Link
                      href={route}
                      className={`${
                        pathname === route
                          ? "py-4 border-b-4 border-white text-gray-300 font-bold"
                          : "border-transparent hover:text-gray-300"
                      }`}
                    >
                      {route === "/"
                        ? "Home"
                        : route.replace("/", "").charAt(0).toUpperCase() +
                          route.slice(2)}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="pl-10"></div>
        </nav>
      </div>

      <div className="fixed top-8 right-8 flex space-x-4 items-center z-30 text-white">
        <Link href="/cart" className="relative">
          <ShoppingCart className="w-8 h-8 hover:text-gray-300" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
        <Link href="/login" className="hover:text-gray-300 text-lg">Login</Link>
      </div>
    </>
  );
}
