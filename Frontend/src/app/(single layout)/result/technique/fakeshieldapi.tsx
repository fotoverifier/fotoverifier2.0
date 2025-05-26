import React, { useState } from 'react';
import {
  FiShield,
  FiAlertTriangle,
  FiMap,
  FiNavigation2,
} from 'react-icons/fi';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { IoPaperPlaneOutline } from 'react-icons/io5';

interface AI_Validation {
  img: string | null;
  img2: string | null;
}



const ModelToggleComponent: React.FC<AI_Validation> = ({ img, img2 }) => {
  const {t} = useLanguage();
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

  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSuggestion(e.target.value);
  };



  return (

    <>
      {!isSubmitted ? (
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
          <div className="h-full w-full flex">
          <div className="w-1/2 h-full bg-gray-50 p-4 flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Details</h2>

         {img ? (
              
                 <Image
                   src={img}
                   alt="Result"
                   className="image-preview"
                   width={0}
                   height={0}
                   sizes="100vw"
                   style={{
                     width: 'auto',
                     maxWidth: '100%',
                     height: '100%',
                     objectFit: 'contain',
                     position: 'relative',
                   }}
                   ></Image>
             ) : (
               <div>{t('No_Image_Available')}</div>
             )}
             
             </div>


       <div className="w-1/2 h-full bg-gray-50 p-4 flex flex-col justify-center">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">ELA</h2>
              {img2 ? (
              
              <Image
                src={img2}
                alt="Result"
                className="image-preview"
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: 'auto',
                  maxWidth: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  position: 'relative',
                }}
                ></Image>
          ) : (
            <div>{t('No_Image_Available')}</div>
          )}
        
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
          <label className="font-semibold block mb-1">Add extra insight:</label>
          <textarea
            placeholder="Write your insight here..."
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
            rows={4}
          />
        </div> 

          <div
      className={`mt-4 p-2 bg-gradient-to-r from-${currentModel?.color}-50 to-${
        currentModel?.color === 'red' ? 'orange' : 'cyan'
      }-50 border-${currentModel?.color}-200 rounded-lg text-sm border`}
    >
      <div className="font-semibold block mb-1">Model Suggestion:</div>
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="userType"
            value="professional"
            onChange={handleChange}
            checked={selectedSuggestion === 'professional'}
            className="accent-blue-500"
          />
          Professional
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="userType"
            value="casual"
            onChange={handleChange}
            checked={selectedSuggestion === 'casual'}
            className="accent-blue-500"
          />
          Casual user
        </label>
      </div>

          </div>
          <button
          onClick={() => setIsSubmitted(true)}
  type="button"
  className={`mt-4 inline-flex items-center gap-2 px-5 py-2 bg-${currentModel?.color ?? 'blue'}-600 hover:bg-${currentModel?.color ?? 'blue'}-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200`}
>
  <IoPaperPlaneOutline className="w-4 h-4" />
  Send
</button>
        </div>
      </div>

    </div>
      ):(
<div className="mt-6 grid grid-cols-4 gap-4 auto-rows-max">
<div className="col-span-3 bg-white border border-blue-200 rounded-lg shadow-sm flex flex-col max-h-[400px]">
  <div className="p-4 border-b border-blue-100">
    <h2 className="text-lg font-bold text-blue-700">👤 Investigator A</h2>
  </div>

  <div className="p-4 overflow-y-auto flex-1">
    <div className="grid grid-cols-2 gap-4 items-stretch">
      <div className="space-y-2">
        <Section title="Summary" color="blue">
          The original photograph appears to be a natural, unaltered image of a bird in mid-flight against a backdrop of a landscape. The ELA image shows signs of potential manipulation, particularly around the bird.
        </Section>
        <Section title="Lighting inconsistencies" color="blue">
          There are noticeable discrepancies in lighting on the bird compared to the background, suggesting it may have been inserted or altered.
        </Section>
        <Section title="Edge artifacts" color="blue">
          The edges of the bird appear sharper than those in the background, indicating different compression levels.
        </Section>
      </div>

      <div className="space-y-2 self-stretch flex flex-col justify-between">
        <Section title="Semantic anomalies" color="blue">
          Nothing suggests a direct political meaning; however, it could symbolize nature or environmental themes.
        </Section>
        <Section title="Political Relevancy" color="blue">Low</Section>
        <ConfidenceLevel selected="Medium" color="blue" />
      </div>
    </div>
  </div>
</div>

  <div className="row-span-2 bg-white border border-green-200 rounded-lg shadow-sm flex flex-col max-h-[820px]">
    <div className="p-4 border-b border-green-100">
      <h2 className="text-lg font-bold text-green-700">🧩 Shared Judgment</h2>
    </div>
    <div className="p-4 overflow-y-auto flex-1 space-y-2">
      <Section title="Consensus Summary" color="green">
        Both agree that the bird may have been manipulated, despite the photo’s natural appearance.
      </Section>
      <Section title="Political Relevancy (agreed)" color="green">Low</Section>
      <ConfidenceLevel selected="Medium" color="green" label="Overall Confidence" />
    </div>
  </div>

  <div className="col-span-3 bg-white border border-purple-200 rounded-lg shadow-sm flex flex-col max-h-[400px]">
  <div className="p-4 border-b border-purple-100">
    <h2 className="text-lg font-bold text-purple-700">👤 Investigator B</h2>
  </div>

  <div className="p-4 overflow-y-auto flex-1">
  <div className="grid grid-cols-2 gap-4 items-stretch">
    <div className="space-y-2">
      <Section title="Summary" color="purple">
        The original image seems plausible, but the ELA reveals unusual compression near the bird. These regions raise suspicion about potential editing in the image composition.
      </Section>
      <Section title="Lighting inconsistencies" color="purple">
        Lighting on the bird doesn’t match the surrounding environment.
      </Section>
      <Section title="Edge artifacts" color="purple">
        Irregular transitions between bird and background suggest tampering.
      </Section>
    </div>

    <div className="space-y-2 self-stretch flex flex-col justify-between">
      <Section title="Semantic anomalies" color="purple">
        Nature-focused with no clear political implications.
      </Section>
      <Section title="Political Relevancy" color="purple">Low</Section>
      <ConfidenceLevel selected="Medium" color="purple" />
    </div>
  </div>
</div>
</div>
</div>

      )}
       </>
  );
};

const Section = ({ title, children, color }: { title: string; children: React.ReactNode; color: string }) => (
  <div className="mb-2">
    <p className="text-sm text-gray-700 font-semibold">{title}</p>
    <div className={`bg-${color}-50 p-2 rounded text-sm text-gray-800`}>{children}</div>
  </div>
);

const ConfidenceLevel = ({ selected, color, label = 'Confidence level' }: { selected: 'Low' | 'Medium' | 'High'; color: string; label?: string }) => {
  const levels = ['Low', 'Medium', 'High'];
  return (
    <div className="mt-2">
      <p className="text-sm text-gray-700 font-semibold mb-1">{label}</p>
      <div className="flex gap-2 text-xs font-medium">
        {levels.map((level) => (
          <span
            key={level}
            className={`px-2 py-1 rounded border ${
              level === selected
                ? `border-${color}-600 bg-${color}-100 text-${color}-700`
                : 'border-gray-300 bg-gray-100'
            }`}
          >
            {level}
          </span>
        ))}
      </div>
    </div>
  );
};


export default ModelToggleComponent;
