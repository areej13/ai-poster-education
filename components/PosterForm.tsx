
import React, { useState } from 'react';
import { PosterFormData } from '../types';
import { SparklesIcon, SpinnerIcon } from './icons';

interface PosterFormProps {
  onSubmit: (data: PosterFormData) => void;
  isLoading: boolean;
}

const PosterForm: React.FC<PosterFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<PosterFormData>({
    title: '',
    authors: '',
    affiliations: '',
    mainIdea: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormIncomplete = !formData.title || !formData.authors || !formData.affiliations || !formData.mainIdea;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Poster Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., The Impact of AI on Climate Change"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="authors" className="block text-sm font-medium text-gray-700">Author(s)</label>
          <input
            type="text"
            id="authors"
            name="authors"
            value={formData.authors}
            onChange={handleChange}
            placeholder="e.g., Dr. Jane Doe, John Smith"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="affiliations" className="block text-sm font-medium text-gray-700">Affiliation(s)</label>
          <input
            type="text"
            id="affiliations"
            name="affiliations"
            value={formData.affiliations}
            onChange={handleChange}
            placeholder="e.g., Institute for Advanced Study"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="mainIdea" className="block text-sm font-medium text-gray-700">Core Idea / Abstract</label>
          <textarea
            id="mainIdea"
            name="mainIdea"
            value={formData.mainIdea}
            onChange={handleChange}
            rows={6}
            placeholder="Describe the main research question, methods, and expected outcomes of your study. The more detail, the better the result."
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isLoading || isFormIncomplete}
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <SpinnerIcon />
              Generating...
            </>
          ) : (
            <>
              <SparklesIcon />
              Generate Poster
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PosterForm;
