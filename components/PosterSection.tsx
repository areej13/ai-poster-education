
import React from 'react';

interface PosterSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const PosterSection: React.FC<PosterSectionProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-blue-50/50 p-4 rounded-md border border-blue-200 ${className}`}>
      <h3 className="text-lg font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-3">
        {title}
      </h3>
      <div className="text-sm text-gray-700 space-y-2 whitespace-pre-wrap">
        {children}
      </div>
    </div>
  );
};

export default PosterSection;
