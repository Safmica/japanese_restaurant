"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import FullNavbar from "./fullNavigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Navigation() {
  const pathname = usePathname();
  const [cartCount] = useState(5);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [isFullNavOpen,setIsFullNavOpen] = useState<boolean>(false);

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
      <div className="bg-transparent z-[21] absolute w-full font-serif">
        <nav className="bg-transparent flex items-center justify-between px-10 py-4">
          <div className="flex items-center relative">
            <div className="relative w-[100px] h-[50px]">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={80}
                height={80}
                priority
                className={`absolute transition-opacity duration-300 ${
                  showLeftButton ? "opacity-0" : "opacity-100"
                }`}
              />
              <div
                className={`absolute w-full h-full flex items-center justify-center transition-opacity duration-500 ${
                  showLeftButton ? "opacity-100" : "opacity-0 -z-10"
                }`}
              >
                <button 
                  onClick={() => setIsFullNavOpen(true)}
                  className="fixed top-8 left-8 text-white px-4 py-2 cursor-pointer hover:text-gray-300 text-lg border-b-2"
                >
                  Navigation
                </button>
              </div>
            </div>
          </div>

          <div className="pr-[50px]">
            <ul className="flex space-x-8 text-sm text-white border-b-2 py-4">
              {["/", "/about", "/menu", "/offers", "/reservation"].map((route) => (
                <li key={route} className="relative">
                  <Link href={route} className="hover:text-gray-300 relative">
                    {route === "/"
                      ? "Home"
                      : route.replace("/", "").charAt(0).toUpperCase() +
                        route.slice(2)}
                    {pathname === route && (
                      <motion.div
                        key={pathname}
                        initial={{ scaleX: 0, originX: 0.5 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute -bottom-5 left-0 w-full h-[4px] bg-white"
                      />
                    )}
                  </Link>
                </li>
              ))}
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
        <Link href="/login" className="hover:text-gray-300 text-2xl border-b-2 pb-2 font-olivera">Login</Link>
      </div>
      <AnimatePresence>
        {isFullNavOpen && <FullNavbar isOpen={isFullNavOpen} onClose={() => setIsFullNavOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
