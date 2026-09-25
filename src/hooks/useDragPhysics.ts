// src/hooks/useDragPhysics.ts
// Physics constants and drag constraints for tactile UI elements.

export interface DragPhysicsConfig {
  elasticity?: number;
  damping?: number;
  mass?: number;
  dragConstraints?: { top?: number; left?: number; right?: number; bottom?: number } | false;
}

export function useDragPhysics(config: DragPhysicsConfig = {}) {
  const {
    elasticity = 0.25,
    damping = 25,
    mass = 0.8
  } = config;

  return {
    drag: true as const,
    dragElastic: elasticity,
    dragTransition: {
      power: 0.2,
      timeConstant: 200,
      modifyTarget: (target: number) => Math.round(target)
    },
    dragMomentum: true,
    whileDrag: {
      scale: 1.04,
      cursor: 'grabbing',
      boxShadow: '10px 10px 0px 0px #000000',
      zIndex: 50
    },
    transition: {
      type: 'spring',
      damping,
      mass,
      stiffness: 400
    }
  };
}
