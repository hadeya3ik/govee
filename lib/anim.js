export const itemVariants = {
    initial: { 
      opacity: 0,
      y: 50,
      transition: { 
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        y: { 
          type: "spring",
          stiffness: 200,
          damping: 20,
          velocity: 2,
        },
      },
    },
    exit: { 
      opacity: 0,
      y: 50,
      transition: { 
        duration: 0.02,
      }
    }
  };
  
export const containerVariants = {
    animate: { 
      transition: { 
        staggerChildren: 0.08 
      } 
    }
  };