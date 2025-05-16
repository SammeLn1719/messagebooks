'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';


export default function NotFound() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const blockVariants = {
    hidden: {
      x: isMobile ? 0 : -1000,
      y: isMobile ? -100 : 0,
      opacity: 0
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row w-full min-h-[calc(100vh-4rem)] gap-4 md:gap-[5%]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Левый блок */}
      <motion.div
        className="w-full md:w-[47.5%] rounded-xl shadow-xl p-8 flex flex-col items-center justify-center min-h-[400px] space-y-6"
        variants={blockVariants}
      >
        <div className="relative inline-block">
          <h2 className="text-9xl md:text-[200px] font-bold text-white bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text leading-none">
            404
          </h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-white absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 w-full text-center">
            Страница потерялась
          </h3>
        </div>

        {/* Текст и кнопка */}
        <div className="text-center space-y-4">
          <p className="text-gray-300 text-lg md:text-xl max-w-xs mx-auto leading-relaxed">
            Попробуйте начать с главной страницы
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full 
                      transition-all duration-300 transform hover:scale-105 border border-white/20"
          >
            Вернуться домой
          </a>
        </div>
      </motion.div>

      {/* Правый блок */}
      <motion.div
        className="w-full md:w-[47.5%] bg-green-100 rounded-xl shadow-xl"
        variants={blockVariants}
      >
        <div className="relative h-full w-full mb-4 rounded-lg overflow-hidden">
          <Image
            src="/img/404.jpg"
            alt="Описание изображения 2"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
