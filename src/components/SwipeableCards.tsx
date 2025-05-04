
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SwipeableCardsProps {
  children: React.ReactNode[];
  onChangeIndex?: (index: number) => void;
  initialIndex?: number;
}

const SwipeableCards: React.FC<SwipeableCardsProps> = ({
  children,
  onChangeIndex,
  initialIndex = 0
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  useEffect(() => {
    if (onChangeIndex) {
      onChangeIndex(currentIndex);
    }
  }, [currentIndex, onChangeIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX !== null) {
      const currentX = e.touches[0].clientX;
      const diff = currentX - startX;
      
      // Limit the swipe based on current index
      if ((currentIndex === 0 && diff > 0) || 
          (currentIndex === children.length - 1 && diff < 0)) {
        setOffset(diff / 3); // Resistance when trying to swipe beyond bounds
      } else {
        setOffset(diff);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (startX !== null && isSwiping) {
      const currentX = e.clientX;
      const diff = currentX - startX;
      
      if ((currentIndex === 0 && diff > 0) || 
          (currentIndex === children.length - 1 && diff < 0)) {
        setOffset(diff / 3);
      } else {
        setOffset(diff);
      }
    }
  };

  const handleTouchEnd = () => {
    handleSwipeEnd();
  };

  const handleMouseUp = () => {
    handleSwipeEnd();
  };

  const handleMouseLeave = () => {
    if (isSwiping) {
      handleSwipeEnd();
    }
  };

  const handleSwipeEnd = () => {
    if (startX !== null) {
      // Determine whether to change index based on swipe distance
      const threshold = 100; // px
      
      if (offset > threshold && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (offset < -threshold && currentIndex < children.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
      
      setStartX(null);
      setOffset(0);
      setIsSwiping(false);
    }
  };

  const goToIndex = (index: number) => {
    if (index >= 0 && index < children.length) {
      setCurrentIndex(index);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div
        ref={containerRef}
        className="flex transition-transform"
        style={{
          transform: isSwiping
            ? `translateX(calc(-${currentIndex * 100}% + ${offset}px))`
            : `translateX(-${currentIndex * 100}%)`,
          transition: isSwiping ? 'none' : 'transform 0.3s ease-out'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {children.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>
      
      {/* Pagination dots */}
      {children.length > 1 && (
        <div className="flex justify-center mt-4">
          {children.map((_, index) => (
            <button
              key={index}
              className={`h-2 mx-1 rounded-full transition-all ${
                currentIndex === index ? "w-6 bg-finance-navy" : "w-2 bg-gray-300"
              }`}
              onClick={() => goToIndex(index)}
            />
          ))}
        </div>
      )}
      
      {/* Navigation buttons (can be shown optionally) */}
      {currentIndex > 0 && (
        <button 
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center z-10"
          onClick={() => goToIndex(currentIndex - 1)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      
      {currentIndex < children.length - 1 && (
        <button 
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center z-10"
          onClick={() => goToIndex(currentIndex + 1)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SwipeableCards;
