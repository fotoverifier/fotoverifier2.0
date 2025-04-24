import React, { useState } from 'react';
import {
  FiShield,
  FiAlertTriangle,
  FiMap,
  FiNavigation2,
} from 'react-icons/fi';

const ModelToggleComponent = () => {
  const colorMap = {
    red: {
      bg: 'bg-red-600',
      text: 'text-red-600',
      hover: 'hover:bg-red-50',
      gradientFrom: 'from-red-50',
      gradientTo: 'to-orange-50',
      border: 'border-red-200',
      icon: 'text-red-500',
    },
    blue: {
      bg: 'bg-blue-600',
      text: 'text-blue-600',
      hover: 'hover:bg-blue-50',
      gradientFrom: 'from-blue-50',
      gradientTo: 'to-cyan-50',
      border: 'border-blue-200',
      icon: 'text-blue-500',
    },
  };

  const [activeModel, setActiveModel] = useState('fakeShield');

  const modelData = [
    {
      id: 'fakeShield',
      name: 'FakeShield',
      icon: FiShield,
      color: 'blue',
      insight:
        'FakeShield provides reliable protection against misinformation by combining multiple verification techniques.',
      suggestion: 'Comment of FakeShield.',
      image: 'FakeShield Analysis Preview',
    },
  ];

  const currentModel = modelData.find((model) => model.id === activeModel);

  return (
    <div className="w-full h-full bg-gradient-to-br from-teal-50 to-yellow-50 p-4 rounded-xl border">
      <div className="flex space-x-2 mb-4 h-[10%]">
        {modelData.map((model) => (
          <div
            key={model.id}
            onClick={() => setActiveModel(model.id)}
            className={`px-4 py-2 rounded-lg text-base font-medium flex items-center ${
              activeModel === model.id
                ? `bg-${model.color}-600 text-white shadow-md`
                : `bg-white text-${model.color}-600 hover:bg-${model.color}-50`
            }`}
          >
            <model.icon className="mr-2" size={16} />
            {model.name}
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row h-[90%] gap-4">
        <div className="w-full md:w-2/3 h-[90%] bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-full w-full relative">
            <div className="h-full w-full bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">{currentModel?.image}</p>
            </div>
          </div>
        </div>

        <div className="w-full h-[90%] md:w-1/3 bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold text-teal-800 mb-3 flex items-center">
            <FiNavigation2
              className={`mr-2 text-${currentModel?.color}-500`}
              size={18}
            />
            {currentModel?.name}{' '}
            {activeModel === 'forgeryGPT' ? 'Detection' : 'Protection'}
          </h3>

          <div
            className={`mt-4 p-2 bg-gradient-to-r from-${currentModel?.color}-50 to-${
              currentModel?.color === 'red' ? 'orange' : 'cyan'
            }-50 border-${currentModel?.color}-200 rounded-lg text-sm border`}
          >
            <div className="font-semibold block mb-1">Model Insight:</div>
            {currentModel?.insight}
          </div>

          <div
            className={`mt-4 p-2 bg-gradient-to-r from-${currentModel?.color}-50 to-${
              currentModel?.color === 'red' ? 'orange' : 'cyan'
            }-50 border-${currentModel?.color}-200 rounded-lg text-sm border`}
          >
            <div className="font-semibold block mb-1">Model Suggestion:</div>
            {currentModel?.suggestion}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelToggleComponent;
