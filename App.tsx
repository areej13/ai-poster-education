
import React, { useState } from 'react';
import { PosterFormData, PosterData } from './types';
import PosterForm from './components/PosterForm';
import PosterPreview from './components/PosterPreview';
import { generatePosterContent } from './services/geminiService';

function App() {
  const [posterData, setPosterData] = useState<PosterData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePoster = async (formData: PosterFormData) => {
    setIsLoading(true);
    setError(null);
    setPosterData(null);

    try {
      const generatedData = await generatePosterContent(formData);
      setPosterData(generatedData);
    } catch (err) {
      console.error('Error generating poster:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check the console.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              AI Scientific Poster Generator
            </h1>
            <p className="text-gray-500 hidden md:block">Leveraging Gemini for Academic Excellence</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 xl:col-span-3">
            <PosterForm onSubmit={handleGeneratePoster} isLoading={isLoading} />
          </div>
          <div className="lg:col-span-8 xl:col-span-9">
            <PosterPreview
              data={posterData}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
