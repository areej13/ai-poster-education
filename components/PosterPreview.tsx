
import React from 'react';
import { PosterData } from '../types';
import PosterSection from './PosterSection';

interface PosterPreviewProps {
  data: PosterData | null;
  isLoading: boolean;
  error: string | null;
}

const SkeletonLoader: React.FC = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    <div className="h-4 bg-gray-300 rounded"></div>
    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
  </div>
);

const PosterPreview: React.FC<PosterPreviewProps> = ({ data, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          <PosterSection title="Title Placeholder">
             <div className="h-8 bg-gray-300 rounded w-full animate-pulse mb-4"></div>
          </PosterSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PosterSection title="Introduction"><SkeletonLoader /></PosterSection>
            <PosterSection title="Methods"><SkeletonLoader /></PosterSection>
            <PosterSection title="Results"><SkeletonLoader /></PosterSection>
            <PosterSection title="Discussion"><SkeletonLoader /></PosterSection>
            <PosterSection title="Conclusion"><SkeletonLoader /></PosterSection>
            <PosterSection title="References"><SkeletonLoader /></PosterSection>
            <PosterSection title="Acknowledgements" className="md:col-span-2 lg:col-span-3"><SkeletonLoader /></PosterSection>
          </div>
        </>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-red-600 bg-red-50 p-8 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Generation Failed</h3>
          <p>{error}</p>
        </div>
      );
    }

    if (!data) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 bg-gray-50 p-8 rounded-lg">
          <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          <h3 className="text-xl font-semibold">Your Poster Awaits</h3>
          <p className="mt-1">Fill out the details on the left and click "Generate Poster" to see the magic happen.</p>
        </div>
      );
    }

    return (
      <>
        <header className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">{data.title}</h2>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PosterSection title="Introduction">{data.introduction}</PosterSection>
          <PosterSection title="Methods">{data.methods}</PosterSection>
          <PosterSection title="Results">{data.results}</PosterSection>
          <PosterSection title="Discussion">{data.discussion}</PosterSection>
          <PosterSection title="Conclusion">{data.conclusion}</PosterSection>
          <PosterSection title="References">{data.references}</PosterSection>
          <PosterSection title="Acknowledgements" className="md:col-span-2 lg:col-span-3">{data.acknowledgements}</PosterSection>
        </div>
      </>
    );
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg min-h-[calc(100vh-10rem)]">
      {renderContent()}
    </div>
  );
};

export default PosterPreview;
