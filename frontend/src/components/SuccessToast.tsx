import React, { useEffect, useState } from 'react';

// Define the component props for type safety (optional, but good practice)
interface ToastProps {
  message: string;
  duration?: number; // Time in ms before it disappears
}

export const SuccessToast: React.FC<ToastProps> = ({ message, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-hide the toast after the specified duration
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer); // Cleanup
    }
  }, [duration, isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    // Fixed position, centered at the bottom, high z-index
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[100] transition-opacity duration-500 ease-in-out">
      <div className="bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-full shadow-lg flex items-center gap-2">
        {/* Checkmark Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        
        <span>{message}</span>
      </div>
    </div>
  );
};