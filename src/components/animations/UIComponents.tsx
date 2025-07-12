import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  index?: number;
}

export const FloatingCard = ({ children, className = "", delay = 0 }: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
      transition={{ 
        duration: 0.8, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      className={`${className} cursor-pointer`}
    >
      {children}
    </motion.div>
  );
};

export const StaggeredContainer = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const SlideInCard = ({ children, className = "", index = 0 }: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 80
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const RotateCard = ({ children, className = "", delay = 0 }: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      whileHover={{ 
        rotateY: 5,
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      transition={{ 
        duration: 0.8, 
        delay,
        type: "spring"
      }}
      className={className}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
};

export const PulseCard = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      animate={{
        scale: [1, 1.02, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const MorphingButton = ({ 
  children, 
  className = "", 
  onClick,
  type = "button",
  ...props
}: { 
  children: ReactNode; 
  className?: string; 
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  [key: string]: any;
}) => {
  return (
    <motion.button
      type={type}
      whileHover={{ 
        scale: 1.05,
        borderRadius: "2rem",
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      className={`transition-all duration-300 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const DrawBorder = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <motion.div
        className="absolute inset-0 border-2 border-white"
        variants={{
          rest: {
            pathLength: 0,
            opacity: 0
          },
          hover: {
            pathLength: 1,
            opacity: 1,
            transition: {
              duration: 0.6,
              ease: "easeInOut"
            }
          }
        }}
      />
      {children}
    </motion.div>
  );
};
