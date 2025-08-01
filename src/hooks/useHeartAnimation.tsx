import React, { createContext, useContext, useState, ReactNode } from 'react';
import HeartAnimation from '@/components/HeartAnimation';

interface HeartAnimationContextType {
  showHearts: () => void;
}

const HeartAnimationContext = createContext<HeartAnimationContextType | undefined>(undefined);

export function HeartAnimationProvider({ children }: { children: ReactNode }) {
  const [showAnimation, setShowAnimation] = useState(false);

  const showHearts = () => {
    setShowAnimation(true);
  };

  const handleComplete = () => {
    setShowAnimation(false);
  };

  return (
    <HeartAnimationContext.Provider value={{ showHearts }}>
      {children}
      <HeartAnimation
        visible={showAnimation}
        onComplete={handleComplete}
      />
    </HeartAnimationContext.Provider>
  );
}

export function useHeartAnimation() {
  const context = useContext(HeartAnimationContext);
  if (context === undefined) {
    throw new Error('useHeartAnimation must be used within a HeartAnimationProvider');
  }
  return context;
}