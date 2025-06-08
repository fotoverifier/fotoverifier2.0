import React, { useEffect, useState } from 'react';
import {
  FiShield,
  FiAlertTriangle,
  FiMap,
  FiNavigation2,
} from 'react-icons/fi';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import styles from '@/app/(single layout)/result/res.module.css';
import { BiSolidCategory } from 'react-icons/bi';
import TestData from '@/terminologies/test_AI.json';

import {
  InvestigatorResult,
  AnalysisResult,
  SharedJudgment,
} from '@/interface/interface';
import CircleRating from '@/components/rating/rating_circle';
import NoImagePlaceholder from '@/components/exception_component/NoImagePlaceholder';
interface AI_Validation {
  img: string | null;
  img2: string | null;
  submitted: boolean;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModelToggleComponent: React.FC<AI_Validation> = ({
  img,
  img2,
  submitted,
  setSubmitted,
}) => {
  const { t } = useLanguage();

  const [insight, setInsight] = useState('');

  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );

  useEffect(() => {
    setAnalysisResult(TestData);
  }, []);

  const [selectedSuggestion, setSelectedSuggestion] = useState<
    'professional' | 'casual' | null
  >(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSuggestion(e.target.value as 'professional' | 'casual');
  };

  const [selectedLanguage, setselectedLanguage] = useState<
    'EN' | 'VN' | 'NO' | 'JP' | null
  >(null);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setselectedLanguage(e.target.value as 'EN' | 'VN' | 'NO' | 'JP');
  };
  const [rating, setRating] = useState<number | null>(null);

  const handleSubmit = () => {
    setSubmitted(true);
    const payload = {
      img,
      img2,
      insight,
      suggestion: selectedSuggestion,
      language: selectedLanguage,
    };

    console.log('Sending payload:', payload);
  };

  return (
    <>
      {!submitted ? (
        <div className="w-full h-full p-4 rounded-xl">
          <div className={styles.header}>
            <div className={`${styles.circleWrapper} border-black`}>
              <div className="p-2 rounded-full border-2">
                <BiSolidCategory />
              </div>
              <div className="w-full flex justify-center">
                <div className={`${styles.title}`}>AI Investigators</div>
              </div>
            </div>
            <div className={`${styles.description} flex items-center`}>
              From the inputs, two AI Investigators will validate the images, and share the final summary afterward.
            </div>
          </div>

          <div className="flex flex-col md:flex-row h-[90%] gap-4 mt-5">
            <div className="w-full md:w-2/3 h-[100%] bg-white rounded-lg border-2 shadow-md overflow-hidden">
              <div className="h-full w-full flex">
                <div className="w-1/2 h-full bg-white p-4 flex flex-col justify-center">
                  <h2 className="text-lg w-1/3 font-bold text-teal-800 mb-auto p-2 border-2  rounded-full border-black flex justify-center items-center">
                    Details
                  </h2>

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
                   <NoImagePlaceholder/>
                  )}
                </div>

                <div className="w-1/2 h-full  bg-white p-4 flex flex-col justify-center">
                  <h2 className="text-lg w-1/3 font-bold text-teal-800 mb-auto p-2 border-2 rounded-full border-black flex justify-center items-center">
                    ELA
                  </h2>
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
                    <NoImagePlaceholder/>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full h-[100%] md:w-1/3 bg-white border-2 rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-teal-800 mb-3 flex items-center">
                <FiNavigation2 className={`mr-2 text-blue-500`} size={18} />
                AI Investigator
              </h3>

              <div
                className={`mt-4 p-2 bg-gradient-to-r from-blue-50 to-blue-50 border-blue-200 rounded-lg text-sm border`}
              >
                <label className="font-semibold block mb-1">
                  Add extra insight:
                </label>
                <textarea
                  placeholder="Write your insight here..."
                  className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                  rows={4}
                  value={insight}
                  onChange={(e) => setInsight(e.target.value)}
                />
              </div>

              <div
                className={`mt-4 p-2 bg-gradient-to-r from-blue-50 to-blue-50 border-blue-200 rounded-lg text-sm border`}
              >
                <div className="font-semibold block mb-1">
                  Model Suggestion:
                </div>
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

              <div
                className={`mt-4 p-2 bg-gradient-to-r from-blue-50 to-blue-50 border-blue-200 rounded-lg text-sm border`}
              >
                <div className="font-semibold block mb-1">
                  Language Output (Run-time constraint)
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="LangType"
                      value="EN"
                      onChange={handleLanguageChange}
                      checked={selectedLanguage === 'EN'}
                      className="accent-blue-500"
                    />
                    English
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="LangType"
                      value="VN"
                      onChange={handleLanguageChange}
                      checked={selectedLanguage === 'VN'}
                      className="accent-blue-500"
                    />
                    VietNam
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="LangType"
                      value="NO"
                      onChange={handleLanguageChange}
                      checked={selectedLanguage === 'NO'}
                      className="accent-blue-500"
                    />
                    Norway
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="LangType"
                      value="JP"
                      onChange={handleLanguageChange}
                      checked={selectedLanguage === 'JP'}
                      className="accent-blue-500"
                    />
                    Japan
                  </label>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                type="button"
                className={`mt-4 inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200`}
              >
                <IoPaperPlaneOutline className="w-4 h-4" />
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 auto-rows-max">
          {analysisResult && (
            <>
              <div>
                <SharedJudgmentCard
                  data={analysisResult.shared_judgment}
                ></SharedJudgmentCard>
              </div>
              <InvestigatorCard
                title="👤 Investigator A"
                data={analysisResult.investigator_A}
                color="blue"
              />

              <div>
                <div className="row-span-2 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col max-h-[820px]">
                  <div className="p-4 border-b border-gray-100">
                    <h2  className="text-lg font-bold text-gray-700">
                      🧩 Shared Judgment
                    </h2>
                  </div>
                  <div className="p-4 overflow-y-auto flex flex-col flex-1 space-y-2 justify-center items-center">
                    <div className='mr-auto text-base text-black flex'>
                       How good is the result? </div>
                    <CircleRating onSelect={setRating} />
                    Return
                  </div>
                </div>
              </div>
              <InvestigatorCard
                title="👤 Investigator B"
                data={analysisResult.investigator_B}
                color="purple"
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

interface InvestigatorCardProps {
  title: string;
  data: InvestigatorResult;
  color: string;
}

const InvestigatorCard: React.FC<InvestigatorCardProps> = ({
  title,
  data,
  color,
}) => (
  <div
    className={`col-span-3 bg-white border border-gray-400 rounded-lg shadow-sm flex flex-col mb-4`}
  >
    <div className={`p-4 border-b border-gray-400`}>
      <h2 className={`text-lg font-bold text-black`}>{title}</h2>
    </div>
    <div className="p-4 overflow-y-auto flex-1">
      <div className="grid grid-cols-2 gap-4 items-stretch">
        <div className="space-y-2">
          <Section title="(1.) Summary" color={color}>
            {data.Summary}
          </Section>
          <Section title="(2.) Lighting inconsistencies" color={color}>
            {data['Lighting inconsistencies']}
          </Section>
          <Section title="(3.) Edge artifacts" color={color}>
            {data['Edge artifacts']}
          </Section>
        </div>
        <div className="space-y-2 self-stretch flex flex-col justify-between">
          <Section title="(4.) Semantic anomalies" color={color}>
            {data['Semantic anomalies']}
          </Section>
          <Section title="(5.) Political Relevancy" color={color}>
            {data['Political Relevancy']}
          </Section>
          <ConfidenceLevel selected={data['Confidence level']} color={color} />
        </div>
      </div>
    </div>
  </div>
);

interface SharedJudgmentCardProps {
  data: SharedJudgment;
}

const SharedJudgmentCard: React.FC<SharedJudgmentCardProps> = ({ data }) => (
  <div className="row-span-2 bg-white border  border-green-800 rounded-lg shadow-sm flex flex-col max-h-[820px]">
    <div className="p-4 border-b border-green-800">
      <h2 className="text-lg font-bold text-green-700">🧩 Shared Judgment</h2>
    </div>
    <div className="p-4 overflow-y-auto flex-1 space-y-2">
      <Section title="Consensus Summary" color="green">
        {data['Consensus Summary']}
      </Section>
      <Section title="Political Relevancy (agreed)" color="green">
        {data['Political Relevancy (agreed)']}
      </Section>
      <ConfidenceLevel
        selected={data['Overall Confidence']}
        color="green"
        label="Overall Confidence"
      />
    </div>
  </div>
);

const Section = ({
  title,
  children,
  color,
}: {
  title: string;
  children: React.ReactNode;
  color: string;
}) => (
  <div className="mb-2">
    <p className="text-large text-gray-700 font-semibold my-2">{title}</p>
    <div className={`bg-gray-50 p-2 rounded text-base text-gray-800 border`}>
      {children}
    </div>
  </div>
);

const ConfidenceLevel = ({
  selected,
  color,
  label = 'Confidence level',
}: {
  selected: string;
  color: string;
  label?: string;
}) => {
  const levels = ['Low', 'Medium', 'High'];
  return (
    <div className="mt-2">
      <p className="text-large text-gray-700 font-semibold mb-1">{label}</p>
      <div className="flex gap-2 text-base font-medium">
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
