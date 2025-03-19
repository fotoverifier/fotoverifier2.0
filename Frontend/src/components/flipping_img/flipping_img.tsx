import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import placeholderImage from '@/assets/placeholder.png';

const FloatingFlippingImage = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex justify-center items-center h-96 p-8">
      {/* Background squares for layered effect */}
      <div className="relative">
        {/* Bottom square - largest and darkest */}
        <motion.div 
          className="absolute rounded-lg bg-white opacity-100"
          style={{ 
            width: "280px", 
            height: "280px", 
            top: "20px", 
            left: "-30px",
            zIndex: 1
          }}
          animate={{
            rotate: isFlipped ? 12 : 8,
            scale: isFlipped ? 1 : [1, 1.05, 1],
            x: isFlipped ? 0 : [0, 5, 0],
          }}
          transition={{
            rotate: {
              duration: 0.7,
              ease: "easeInOut",
            },
            scale: {
              duration: 3,
              repeat: isFlipped ? 0 : Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            x: {
              duration: 4,
              repeat: isFlipped ? 0 : Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
        />
        
        <motion.div 
          className="absolute rounded-lg bg-amber-500"
          style={{ 
            width: "270px", 
            height: "270px", 
            top: "10px", 
            left: "-20px",
            zIndex: 2
          }}
          animate={{
            rotate: isFlipped ? -15 : -10,
            scale: isFlipped ? 1 : [1, 1.03, 1],
            y: isFlipped ? 0 : [0, -3, 0],
          }}
          transition={{
            rotate: {
              duration: 0.7,
              ease: "easeInOut",
            },
            scale: {
              duration: 2.5,
              repeat: isFlipped ? 0 : Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            y: {
              duration: 3.5,
              repeat: isFlipped ? 0 : Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
        />

        <motion.div
          className="relative w-64 h-64 cursor-pointer z-10 bg-white"
          animate={{
            y: isFlipped ? 0 : [0, -20, 0],
            rotate: isFlipped ? 0 : -5,
          }}
          transition={{
            y: {
              duration: 2,
              repeat: isFlipped ? 0 : Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            rotate: {
              duration: 2,
              repeat: isFlipped ? 0 : Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
          onClick={handleClick}
          style={{ zIndex: 3 }}
        >
          <motion.div
            className="absolute w-full h-full backface-hidden p-2"
            animate={{
              rotateY: isFlipped ? 180 : 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
            style={{
              backfaceVisibility: "hidden"
            }}
          >
            <div className="relative w-full h-full">
              <Image 
                src={placeholderImage}
                alt="Front image"
                fill
                sizes="(max-width: 768px) 100vw, 256px"
                style={{
                  objectFit: 'cover',
                  borderRadius: '0.5rem'
                }}
                className="shadow-lg"
              />
            </div>
          </motion.div>

          <motion.div
            className="absolute w-full h-full backface-hidden"
            animate={{
              rotateY: isFlipped ? 0 : -180,
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
            style={{
              backfaceVisibility: "hidden"
            }}
          >
            <div className="relative w-full h-full bg-white rounded-lg">
              <Image 
                src={placeholderImage}
                alt="Back image"
                fill
                sizes="(max-width: 768px) 100vw, 256px"
                style={{
                  objectFit: 'cover',
                  borderRadius: '0.5rem'
                }}
                className="shadow-lg"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default FloatingFlippingImage;