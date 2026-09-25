// src/components/ui/InteractiveButton.tsx
// Tactile button component strictly following brutalist physics (spring hover lift, hard offset shadows, zero glow).

import React, { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';
import { motionConfig } from '../../lib/animations';

type Variant = 'red' | 'blue' | 'black' | 'white' | 'pill-blue' | 'pill-red';

interface InteractiveButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  shadowColor?: 'black' | 'white';
}

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  variant = 'blue',
  children,
  className = '',
  shadowColor = 'black',
  ...props
}) => {
  const getVariantStyles = (v: Variant) => {
    switch (v) {
      case 'red':
        return 'bg-[#FF3333] text-white border-2 border-black hover:bg-black hover:text-white';
      case 'blue':
        return 'bg-[#3366FF] text-white border-2 border-black hover:bg-white hover:text-black';
      case 'black':
        return 'bg-black text-white border-2 border-black hover:bg-white hover:text-black';
      case 'white':
        return 'bg-white text-black border-2 border-black hover:bg-black hover:text-white';
      case 'pill-blue':
        return 'bg-[#3366FF] text-white border-2 border-black rounded-full hover:bg-black hover:text-white';
      case 'pill-red':
        return 'bg-[#FF3333] text-white border-2 border-black rounded-full hover:bg-white hover:text-black';
      default:
        return 'bg-[#3366FF] text-white border-2 border-black';
    }
  };

  const shadow = shadowColor === 'white' ? motionConfig.shadows.whiteMd : motionConfig.shadows.blackMd;
  const hoverShadow = shadowColor === 'white' ? motionConfig.shadows.whiteLg : motionConfig.shadows.blackLg;

  return (
    <motion.button
      whileHover={{
        x: -3,
        y: -3,
        boxShadow: hoverShadow
      }}
      whileTap={{
        x: 0,
        y: 0,
        boxShadow: shadowColor === 'white' ? motionConfig.shadows.whiteSm : motionConfig.shadows.blackSm
      }}
      transition={motionConfig.spring.tactile}
      style={{ boxShadow: shadow }}
      className={cn(
        'font-mono font-black uppercase text-xs sm:text-sm px-6 py-3.5 flex items-center justify-center gap-2 cursor-pointer select-none transition-colors duration-150',
        getVariantStyles(variant),
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
