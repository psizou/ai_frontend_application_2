import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gray-100"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center">
        <div 
          className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"
          aria-hidden="true"
        />
        <p className="mt-4 text-lg text-gray-600">Loading users...</p>
      </div>
    </div>
  );
}; 