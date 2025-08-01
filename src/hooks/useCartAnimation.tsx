import React, { createContext, useContext, useState, ReactNode } from 'react';
import CartAnimation from '@/components/CartAnimation';

interface CartAnimationContextType {
  showCartAnimation: () => void;
}

const CartAnimationContext = createContext<CartAnimationContextType | undefined>(undefined);

export function CartAnimationProvider({ children }: { children: ReactNode }) {
  const [showAnimation, setShowAnimation] = useState(false);

  const showCartAnimation = () => {
    setShowAnimation(true);
  };

  const handleComplete = () => {
    setShowAnimation(false);
  };

  return (
    <CartAnimationContext.Provider value={{ showCartAnimation }}>
      {children}
      <CartAnimation
        visible={showAnimation}
        onComplete={handleComplete}
      />
    </CartAnimationContext.Provider>
  );
}

export function useCartAnimation() {
  const context = useContext(CartAnimationContext);
  if (context === undefined) {
    throw new Error('useCartAnimation must be used within a CartAnimationProvider');
  }
  return context;
}