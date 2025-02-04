"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const [screenSize, setScreenSize] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    setScreenSize({ width: window.outerWidth, height: window.outerHeight });

    const handleResize = () => {
      setScreenSize({ width: window.outerWidth, height: window.outerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const textY = useTransform(scrollYProgress, [0,0.7, 1], ["0%", "0%","-50%"]);

  return (
    <div ref={ref} className="relative w-full min-h-screen overflow-hidden">
      <motion.div 
        style={{ y: backgroundY }} 
        className="fixed top-0 left-0 w-full"
      >
        <Image
          src="/images/homeBackground.png"
          alt="Background"
          width={screenSize.width}
          height={screenSize.height}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          priority
          className="transition-opacity duration-300 opacity-100"
        />
      </motion.div>

      <motion.div 
        style={{ y: textY }} 
        className="fixed left-[38%] z-10 flex flex-col items-center justify-center min-h-screen"
      >
        <h1 className="text-9xl text-white font-toragon text-center">
          Kaisei
        </h1>
        <h1 className="text-4xl text-white font-jansina text-center">
          Japanese Restaurant
        </h1>
      </motion.div>

      <div className="h-[160vh] bg-trasparent z-10"></div>
          <div className="bg-slate-500 flex flex-col z-10">
            <h1 className="text-9xl z-10">Text</h1>
            <p className="text-3xl z-10">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <p className="text-3xl z-10">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
    </div>
  );
}
