import { useState } from 'react';

type ModelColor = 'primary' | 'secondary';

interface ModelInfo {
  title: string;
  description: string;
  color: ModelColor;
}

type ModelName = 'FakeShield' | 'Forgery GPT';

const FakeShieldApp = () => {
  const [activeModel, setActiveModel] = useState<ModelName>('FakeShield');

  const themeColors = {
    primary: '#ffcc00',
    secondary: '#03564a',
  };

  const modelInfo = {
    FakeShield: {
      title: 'FakeShield Assessment',
      description:
        'FakeShield is a multi-modal framework for explainable image forgery detection that integrates large language models to analyze manipulated images, generate tampered region masks, and provide human-readable explanations of detected inconsistencies.',
      color: 'primary',
    },
    'Forgery GPT': {
      title: 'Forgery GPT Analysis',
      description:
        'Forgery GPT leverages generative pre-trained transformers to identify and analyze potentially manipulated images. This model specializes in detecting AI-generated content and sophisticated deepfakes by examining visual inconsistencies, metadata anomalies, and pattern recognition that human eyes might miss.',
      color: 'secondary',
    },
  };

  const switchModel = (model: ModelName): void => {
    setActiveModel(model);
  };

  const currentModel = modelInfo[activeModel];

  return (
    <div className="flex flex-col md:flex-row w-full h-full bg-gradient-to-br from-teal-50 to-yellow-50 p-4 rounded-xl shadow-lg border">
      <div className="w-full md:w-1/2 bg-white p-6 flex items-center justify-between flex-col">
        <div className="w-full flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Model:</span>
            <div className="flex rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              {Object.keys(modelInfo).map((model) => (
                <button
                  key={model}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeModel === model
                      ? `text-white ${modelInfo[model].color === 'primary' ? 'bg-yellow-500' : 'bg-teal-800'}`
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => switchModel(model as ModelName)}
                >
                  {model}
                </button>
              ))}
            </div>
          </div>

          <button
            className={`px-4 py-2 text-white rounded-lg font-medium shadow-sm flex items-center gap-2 ${
              currentModel.color === 'primary'
                ? 'bg-yellow-500 hover:bg-yellow-600'
                : 'bg-teal-800 hover:bg-teal-900'
            }`}
          >
            <span>Run</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>

        <div className="w-full max-w-lg h-full aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-lg relative">
          <img
            src="/api/placeholder/800/800"
            alt="Featured content"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white bg-opacity-80 rounded-full p-2 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${activeModel === 'FakeShield' ? 'text-yellow-500' : 'text-teal-800'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 1v4m0 0h-4m4 0l-5-5"
              />
            </svg>
          </div>
        </div>
      </div>

      <div
        className={`w-full h-full md:w-1/2 flex flex-col justify-center transition-colors duration-300 ${
          currentModel.color === 'primary' ? 'bg-yellow-50' : 'bg-teal-50'
        }`}
      >
        <div className="max-w-lg h-full mx-auto p-5">
          <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-4">
            {currentModel.title}
          </h2>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <p className="text-gray-600 leading-relaxed mb-4">
              {currentModel.description}
            </p>

            {activeModel === 'FakeShield' && (
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 text-sm text-yellow-700 font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Superior detection for composite images and AI-generated
                  content
                </div>
              </div>
            )}

            {activeModel === 'Forgery GPT' && (
              <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                <div className="flex items-center gap-2 text-sm text-teal-700 font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Specialized in detecting latest deepfake technologies
                </div>
              </div>
            )}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex -space-x-2">
              <div
                className={`w-8 h-8 rounded-full border-2 border-white ${
                  activeModel === 'FakeShield' ? 'bg-yellow-400' : 'bg-teal-500'
                }`}
              ></div>
              <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
              <div
                className={`w-8 h-8 rounded-full border-2 border-white ${
                  activeModel === 'FakeShield' ? 'bg-gray-500' : 'bg-yellow-400'
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FakeShieldApp;
