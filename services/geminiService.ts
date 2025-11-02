
import { GoogleGenAI, Type } from "@google/genai";
import { PosterFormData, PosterData } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const posterSchema = {
  type: Type.OBJECT,
  properties: {
    title: { 
      type: Type.STRING,
      description: "A compelling and concise title for the scientific poster." 
    },
    introduction: {
      type: Type.STRING,
      description: "Background information, research question, and hypothesis. Should be around 200-250 words."
    },
    methods: {
      type: Type.STRING,
      description: "Description of the methodology, experimental design, participants, and materials used. Should be around 150-200 words."
    },
    results: {
      type: Type.STRING,
      description: "Presentation of the key findings, supported by data (in text form). Avoid interpretation. Should be around 250-300 words."
    },
    discussion: {
      type: Type.STRING,
      description: "Interpretation of the results, their implications, limitations of the study, and suggestions for future research. Should be around 200-250 words."
    },
    conclusion: {
      type: Type.STRING,
      description: "A brief summary of the main findings and their significance. A take-home message. Should be around 50-100 words."
    },
    references: {
      type: Type.STRING,
      description: "A list of key citations in a standard format (e.g., APA). List 3-5 important references."
    },
    acknowledgements: {
      type: Type.STRING,
      description: "Brief acknowledgement of funding sources, collaborators, or institutions."
    }
  },
  required: ["title", "introduction", "methods", "results", "discussion", "conclusion", "references", "acknowledgements"]
};


export const generatePosterContent = async (formData: PosterFormData): Promise<PosterData> => {
  const prompt = `
    Act as an expert research assistant. Your task is to generate the complete text content for a scientific poster.
    The poster should be professional, clear, and follow the standard academic structure.

    Here are the details provided by the user:
    - **Proposed Title:** ${formData.title}
    - **Author(s):** ${formData.authors}
    - **Affiliation(s):** ${formData.affiliations}
    - **Core Research Idea / Abstract:** ${formData.mainIdea}

    Based on this information, generate content for each of the following sections. Ensure the language is academic and the content is plausible and relevant to the core idea. The title you generate can be an improved version of the proposed title.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: posterSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const parsedData: PosterData = JSON.parse(jsonText);
    return parsedData;

  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to generate poster content from the AI model.");
  }
};
