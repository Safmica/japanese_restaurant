"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

interface FullNavbarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Variants untuk animasi masuk & keluar
const navbarVariants = {
  hidden: { y: "-100%", opacity: 0 },
  visible: { y: "0%", opacity: 1 },
  exit: { y: "-100%", opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } },
};

export default function FullNavbar({ isOpen, onClose }: FullNavbarProps) {
  return (
    <motion.div 
      variants={navbarVariants}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full h-full bg-black text-white flex flex-col items-center justify-center z-50"
    >
      {/* Tombol Close */}
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 text-white text-3xl"
      >
        <X size={32} />
      </button>

      {/* Navbar Links */}
      <nav className="text-xl space-y-6">
        {["/", "/about", "/menu", "/offers", "/reservation"].map((route) => (
          <motion.div 
            key={route} 
            className="text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href={route} className="hover:text-gray-300 text-2xl">
              {route === "/" ? "Home" : route.replace("/", "").toUpperCase()}
            </Link>
          </motion.div>
        ))}
      </nav>
    </motion.div>
  );
}
