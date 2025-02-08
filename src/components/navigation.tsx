"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import FullNavbar from "./fullNavigation";
import { AnimatePresence, motion } from "framer-motion";

const getContrastYIQ = (bgColor: string) => {
  const rgb = bgColor.match(/\d+/g);
  if (!rgb) return 'white';
  
  const [r, g, b] = rgb.map(Number);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return yiq >= 128 ? 'black' : 'white';
};

export default function Navigation() {
  const pathname = usePathname();
  const [cartCount] = useState(5);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [isFullNavOpen, setIsFullNavOpen] = useState<boolean>(false);
  
  const [navButtonColor, setNavButtonColor] = useState('white');
  const [rightSectionColor, setRightSectionColor] = useState('white');
  
  const navButtonRef = useRef<HTMLButtonElement>(null);
  const rightSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateColors = () => {
      if (navButtonRef.current) {
        const rect = navButtonRef.current.getBoundingClientRect();
        const elements = document.elementsFromPoint(rect.left + 10, rect.top + 10);
        const section = elements.find(el => el.hasAttribute('data-nav-section'));
        if (section) {
          const bgColor = getComputedStyle(section).backgroundColor;
          setNavButtonColor(getContrastYIQ(bgColor));
        }
      }

      if (rightSectionRef.current) {
        const rect = rightSectionRef.current.getBoundingClientRect();
        const elements = document.elementsFromPoint(rect.left + 10, rect.top + 10);
        const section = elements.find(el => el.hasAttribute('data-nav-section'));
        if (section) {
          const bgColor = getComputedStyle(section).backgroundColor;
          setRightSectionColor(getContrastYIQ(bgColor));
        }
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setShowLeftButton(true);
      } else {
        setShowLeftButton(false);
      }
      updateColors();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateColors);
    updateColors();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateColors);
    };
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
                  ref={navButtonRef}
                  onClick={() => setIsFullNavOpen(true)}
                  className={`fixed top-8 left-8 px-4 py-2 cursor-pointer text-lg border-b-2 ${
                    navButtonColor === 'black' ? 'text-black hover:text-gray-700 border-black' : 'text-white hover:text-gray-300 border-white'
                  }`}
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

      <div 
        ref={rightSectionRef}
        className={`fixed top-8 right-8 flex space-x-4 items-center z-30 ${
          rightSectionColor === 'black' ? 'text-black hover:text-gray-700 border-black' : 'text-white hover:text-gray-300 border-white'
        }`}
      >
        <Link href="/cart" className="relative">
          <ShoppingCart className={`w-8 h-8 hover:text-gray-300
            ${rightSectionColor === 'black' ? 'border-black hover:text-gray-700' : 'border-white hover:text-gray-300'}`}/>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
        <Link href="/login" className={`text-2xl border-b-2 pb-2 font-olivera
          ${rightSectionColor === 'black' ? 'border-black hover:text-gray-700' : 'border-white hover:text-gray-300'}`}>
          Login
        </Link>
      </div>
      
      <AnimatePresence>
        {isFullNavOpen && <FullNavbar isOpen={isFullNavOpen} onClose={() => setIsFullNavOpen(false)} />}
      </AnimatePresence>
    </>
  );
}