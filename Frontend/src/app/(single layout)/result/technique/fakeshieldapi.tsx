import React, { useEffect, useRef, useState } from 'react';
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
import styles_feedback from '@/components/modal/feedback_modal/feedback_modal.module.css';
import CircleRating from '@/components/rating/rating_circle';
import NoImagePlaceholder from '@/components/exception_component/NoImagePlaceholder';
import {
  AnalysisResult,
  InvestigatorResult,
  SharedJudgment,
  UserQuestionResponse,
} from '@/interface/interface';
import { CollapsibleDefinitionBox } from '@/components/box/CollapsibleDefinitionBox';
import LoadingOverlay from '@/components/loading/loadinganimation';
import { submitRating } from '@/hook/useSubmitRating';
import { FaMapLocation, FaPerson, FaTimeline } from 'react-icons/fa6';
import { FaQuestion, FaTimes } from 'react-icons/fa';
import { Inter, Poppins } from 'next/font/google';
import { toast, ToastContainer } from 'react-toastify';
import { NotchedCard } from '@/components/card/notchedcard';
const inter = Inter({ subsets: ['latin'] });
interface AI_Validation {
  img: string | null;
  img2: string | null;
  img3: string | null;
  img4: string | null;
  submitted: boolean;
  analysisResult: AnalysisResult | null;
  loading: boolean | true;
  handleSubmit: (
    insight: string,
    suggestion: 'professional' | 'casual' | null,
    language: 'EN' | 'VN' | 'NO' | 'JP' | null
  ) => void;
}

const ModelToggleComponent: React.FC<AI_Validation> = ({
  img,
  img2,
  img3,
  img4,
  submitted,
  analysisResult,
  handleSubmit,
  loading,
}) => {
  const { t } = useLanguage();
  const [accepted, setAccepted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [processedImg, setProcessedImg] = useState<string | null>(null);

  useEffect(() => {
    if (!img) return;

    const image = new window.Image(); 
    image.crossOrigin = 'anonymous';
    image.src = img;

    image.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0);

      for (let i = 1; i < 3; i++) {
        const x = (canvas.width / 3) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      for (let i = 1; i < 3; i++) {
        const y = (canvas.height / 3) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      const dataURL = canvas.toDataURL('image/png');
      setProcessedImg(dataURL);
    };
  }, [img]);

  

  const [thumbnail, setThumbnail] = useState('');

  const [selectedSuggestion, setSelectedSuggestion] = useState<
    'professional' | 'casual' | null
  >(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSuggestion(e.target.value as 'professional' | 'casual');
  };

  const [selectedModel, setSelectedModel] = useState<
    'GPT 4.o' | 'Claude 3.7' | null
  >(null);

  const handleChangeModel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedModel(e.target.value as 'GPT 4.o' | 'Claude 3.7');
  };

  const [selectedLanguage, setselectedLanguage] = useState<
    'EN' | 'VN' | 'NO' | 'JP' | null
  >(null);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setselectedLanguage(e.target.value as 'EN' | 'VN' | 'NO' | 'JP');
  };
  const [rating, setRating] = useState<number | null>(null);

  const [activeTab, setActiveTab] = useState<'forensic' | 'Verified Evidence'>(
    'Verified Evidence'
  );

  return (
    <>
      {!submitted ? (
        <div className="w-full max-h-fit h-full p-[10px] rounded-xl mb-5">
          <div className={styles.header}>
            <div className={`${styles.circleWrapper} border-black`}>
              <div className="p-2 rounded-full border-2">
                <BiSolidCategory />
              </div>
              <div className="w-full flex justify-center">
                <div className={`${styles.title}`}>{t('AI_Investigators')}</div>
              </div>
            </div>
            <div className={`${styles.description} flex items-center`}>
            {t('ai_investigators_summary_notice')}
            </div>
          </div>

          <div className="flex flex-col md:flex-row h-fit max-h-fit gap-4 mt-5">
            <div className="w-full md:w-2/3 h-[100%] max-h-fit bg-white rounded-lg border-2 shadow-md overflow-hidden">
              <div className="h-full w-full flex">
                <div className="w-1/2 h-full bg-white p-4 flex flex-col justify-center">
                  <h2 className="text-lg w-fit font-bold text-teal-800 mb-4 p-2 border-2  rounded-full border-black flex justify-center items-center">
                    {t('Image_Information')}
                  </h2>


                  {img ? (
                    <>    
                    <canvas ref={canvasRef} style={{ display: 'none' }} />

                   
                  {processedImg && (
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
                  )}
                    </>
                  ) : (
                    <NoImagePlaceholder />
                  )}
                </div>

                <div className="w-1/2 h-full  bg-white p-4 flex flex-col justify-center">
                  <h2 className="text-lg w-1/3 font-bold text-teal-800 mb-4 p-2 border-2 rounded-full border-black flex justify-center items-center">
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
                      loading="eager"
                      style={{
                        width: 'auto',
                        maxWidth: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        position: 'relative',
                      }}
                    ></Image>
                  ) : (
                    <NoImagePlaceholder />
                  )}
                </div>
              </div>

              <div className="h-full w-full flex">
                <div className="w-1/2 h-full bg-white p-4 flex flex-col justify-center">
                  <h2 className="text-lg w-fit font-bold text-teal-800 mb-4 p-2 border-2  rounded-full border-black flex justify-center items-center">
                    Edge
                  </h2>


                  {img3 ? (
                    <>     
                    <Image
                      src={img3}
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
                    <canvas ref={canvasRef} style={{ display: 'none' }} />

                  {/* 
                  {processedImg && (
                    <img
                      src={processedImg}
                      alt="With Grid"
                      style={{
                        width: 'auto',
                        maxWidth: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  )}*/}
                    </>
                  ) : (
                    <NoImagePlaceholder />
                  )}
                </div>

                <div className="w-1/2 h-full  bg-white p-4 flex flex-col justify-center">
                  <h2 className="text-lg w-1/3 font-bold text-teal-800 mb-4 p-2 border-2 rounded-full border-black flex justify-center items-center">
                    CFA
                  </h2>
                  {img4 ? (
                    <Image
                      src={img4}
                      alt="Result"
                      className="image-preview"
                      width={0}
                      height={0}
                      sizes="100vw"
                      loading="eager"
                      style={{
                        width: 'auto',
                        maxWidth: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        position: 'relative',
                      }}
                    ></Image>
                  ) : (
                    <NoImagePlaceholder />
                  )}
                </div>
              </div>
            </div>

            <div className="w-full h-fit md:w-1/3 bg-white border-2 rounded-lg shadow-md p-4 mb-5">
              <div className="flex items-center justify-between mb-3">
    <h3 className="font-semibold text-teal-800 flex items-center">
      <FiNavigation2 className="mr-2 text-blue-500" size={18} />
      {t('AI_Investigators')}
    </h3>

  </div>
              
              {/*
              <label className="font-semibold block my-3">
                  Choose a question to explore
                </label>

              <div className=" p-2 bg-gradient-to-r from-blue-50 to-blue-50 border-blue-200 rounded-lg text-sm border">
                
                <div className={styles_feedback.feedbackTags}>
                  {[
                    "Does this involve public figures or major events?",
                    "What is the geographic context of this content?",
                    "Are there inconsistencies in timestamps, weather, or location?",
                    "What might be the motivation behind sharing this?",
                  ].map((question, idx) => (
                    <div
  key={idx}
  className={`${styles_feedback.feedbackTag} ${insight === question ? styles_feedback.selected : ""}`}
  onClick={() => setInsight(question)}
>
  {question}
</div>
                  ))}
                </div>
              </div>
              */}
              {/* <div className="font-semibold block my-3">Model Suggestion</div>
              <div
                className={`p-2 bg-gradient-to-r from-blue-50 to-blue-50 border-blue-200 rounded-lg text-sm border`}
              >
                <div className="flex gap-4 font-normal">
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
              </div>*/}

              <NotchedCard title={'Thumbnail Analysis'} disabled rightNotch={t('not_available')}>
                <div className="flex flex-col gap-4 font-normal">
        <textarea
        disabled
          id="thumbnail"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Describe thumbnail artifacts, mismatches, or analysis results..."
        />
      </div>
              </NotchedCard>

              
              <NotchedCard title={t('model_suggestion')}>
                <div className="flex gap-4 font-normal">
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
              </NotchedCard>
              <NotchedCard title={t('language_output')}>
                <div className="flex gap-4 font-normal">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="LangType"
                      value="EN"
                      onChange={handleLanguageChange}
                      checked={selectedLanguage === 'EN'}
                      className="accent-blue-500"
                    />
                    EN
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
                    VN
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
                    NO
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
                    JP
                  </label>
                </div>
              </NotchedCard>
              <NotchedCard
                title={t('model_type')}
                rightNotch={t('not_available')}
                disabled
              >
                <div className="flex gap-6 font-normal">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="model"
                      value="0"
                      onChange={handleChangeModel}
                      checked={selectedModel === 'GPT 4.o'}
                      className="accent-blue-500 cursor-none"
                    />
                    GPT 4.o
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="model"
                      value="0"
                      onChange={handleChangeModel}
                      checked={selectedModel === 'Claude 3.7'}
                      className="accent-blue-500 cursor-not-allowed"
                    />
                    Claude 3.7
                  </label>
                </div>
              </NotchedCard>

              <label className="flex items-start gap-2 text-base text-gray-700  my-5">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-1"
        />
        <span>
          By uploading, you accept your image to be processed by a third-party application.
        </span>
      </label>

      <button
        onClick={() =>
          handleSubmit("Is this image tampered", selectedSuggestion, selectedLanguage)
        }
        type="button"
        disabled={!accepted}
        className={`inline-flex items-center gap-2 px-4 py-1.5 font-medium rounded-lg shadow-sm transition-colors duration-200 
          ${accepted ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
      >
        <IoPaperPlaneOutline className="w-4 h-4" />
        {t("Upload")}
      </button>
              {/*
              <div className="font-semibold block my-3">
                Language Output (Run-time constraint)
              </div>
              <div
                className={`p-2 bg-gradient-to-r from-blue-50 to-blue-50 border-blue-200 rounded-lg text-sm border`}
              >
                <div className="flex gap-6 font-normal">
                  <div className="flex flex-col gap-1">
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
                        value="NO"
                        onChange={handleLanguageChange}
                        checked={selectedLanguage === 'NO'}
                        className="accent-blue-500"
                      />
                      Norwegian
                    </label>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="LangType"
                        value="VN"
                        onChange={handleLanguageChange}
                        checked={selectedLanguage === 'VN'}
                        className="accent-blue-500"
                      />
                      Vietnamese
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
                      Japanese
                    </label>
                  </div>
                </div>
              </div>*/}
            </div>
          </div>
        </div>
      ) : (
        <>
          {loading ? (
            <LoadingOverlay message="Loading report data..." />
          ) : (
            analysisResult && (
              <>
                <div className="flex justify-between items-center mb-4 border-b border-gray-300">
                  <div className="flex space-x-4">
                    <button
                      className={`px-4 py-2 font-semibold rounded-t-xl ${
                        activeTab === 'Verified Evidence'
                          ? 'border-b-2 border-teal-800 text-white bg-teal-600'
                          : 'text-gray-500 bg-gray-100'
                      }`}
                      onClick={() => setActiveTab('Verified Evidence')}
                    >
                      {t('Verified_Evidence')}
                    </button>

                    <button
                      className={`px-4 py-2 font-semibold rounded-t-xl ${
                        activeTab === 'forensic'
                          ? 'border-b-2 border-teal-800 text-white bg-teal-600'
                          : 'text-gray-500 bg-gray-100'
                      }`}
                      onClick={() => setActiveTab('forensic')}
                    >
                      {t('Forensic_Analysis')}
                    </button>
                  </div>

                  <div className="bg-red-100 text-red-800 px-4 py-2 rounded-t-lg w-fit border-red-800 border-b-2 text-right">
                    {t('LLM_Disclaimer')}
                  </div>
                </div>

                {activeTab === 'forensic' && (
                  <div className="grid grid-cols-4 gap-4 auto-rows-max">
                    <div>
                      <SharedJudgmentCard
                        data={analysisResult.shared_judgment}
                      />
                    </div>
                    <InvestigatorCard
                      title={t('investigator_a')}
                      data={analysisResult.investigator_A}
                      color="blue"
                    />
                    <div>
                      <FeedbackSection
                      title= {t('feedback')}
                        onSubmit={async (data) => {
                          const success = await submitRating(
                            data.rating,
                            data.imageAssessment
                          );
                          if (success) {
                            toast.success('Rating submitted successfully!');
                          } else {
                            toast.error(
                              'Failed to submit rating. Please try again.'
                            );
                          }
                        }}
                      />
                      <ToastContainer />
                    </div>
                    <InvestigatorCard
                      title={t('investigator_b')}
                      data={analysisResult.investigator_B}
                      color="purple"
                    />
                  </div>
                )}

                {activeTab === 'Verified Evidence' && (
                  <>
                  <div className="grid grid-cols-2 gap-4">
                    <InvestigatorCard_5Wh
                      title={t('investigator_a')}
                      data={analysisResult.investigator_A}
                      color="blue"
                    />
                    <InvestigatorCard_5Wh
                      title={t('investigator_b')}
                      data={analysisResult.investigator_B}
                      color="purple"
                    />
                  </div>
                  <ThumbnailCard data={analysisResult.user_question_response}></ThumbnailCard>
                  </>
                )}
              </>
            )
          )}
        </>
      )}
    </>
  );
};
interface FeedbackSectionProps {
  title?: string;
  onSubmit: (data: { rating: number; imageAssessment: string }) => void;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  title,
  onSubmit,
}) => {
  const {t} = useLanguage();
  const [rating, setRating] = useState<number>(0);
  const [imageAssessment, setImageAssessment] = useState<string>('');

  const options = ['TP', 'FP', 'TN', 'FN'];

  const handleSubmit = () => {
    console.log('Submitting feedback:', { rating, imageAssessment });
    onSubmit({ rating, imageAssessment });
  };

  return (
    <div className="row-span-2 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col max-h-[820px]">
      <div className="relative p-4 border-b border-gray-100 flex justify-center items-center overflow-hidden">
        <h2 className="relative z-10 text-lg font-bold text-gray-700">
          {title}
        </h2>
      </div>

      <div className="p-4 overflow-y-auto flex flex-col flex-1 space-y-4 justify-center items-center">
        <div className="w-full text-base text-black">{t('overall_assessment')}</div>
        <CircleRating onSelect={setRating} />

        <div className="w-full text-base text-black">{t('image_suggestion')}</div>

        <div className="grid grid-cols-2 gap-2 w-full">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={`py-2 px-4 border rounded-lg text-sm font-medium shadow-sm transition-colors
                ${
                  imageAssessment === option
                    ? 'bg-green-800 text-white border-green-900'
                    : 'bg-gray-50 text-gray-800 border-gray-300 hover:bg-gray-100'
                }`}
              onClick={() => setImageAssessment(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <CollapsibleDefinitionBox
        definitions={
          `${t('tp')}\n${t('fp')}\n${t('tn')}\n${t('fn')}`
        }        />

        <button
          onClick={handleSubmit}
          disabled={rating === null || imageAssessment === ''}
          className={`mt-4 w-full py-2 px-4 rounded-lg text-white font-medium transition
            ${
              rating === null || imageAssessment === ''
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }
          `}
        >
          {t('Upload')}
        </button>
      </div>
    </div>
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
}) => {
  const { t } = useLanguage();

  return (
    <div
      className={`col-span-3 bg-white border border-gray-400 rounded-3xl shadow-sm flex flex-col mb-4`}
    >
      <div
        className={`p-4 border-b border-gray-400 flex items-center justify-center`}
      >
        <h2 className={`text-lg font-bold text-black`}>{title}</h2>
      </div>
      <div className="p-4 overflow-y-auto flex-1">
        <div className="grid grid-cols-2 gap-4 items-stretch">
          <div className="space-y-2">
            <Section title={t('Summary')} color={color} prefix={1}>
              {data['Summary']}
            </Section>
            <Section
              title={t('Lighting_Inconsistencies')}
              color={color}
              prefix={2}
            >
              {data['Lighting inconsistencies']}
            </Section>
            <Section title={t('Edge_Artifacts')} color={color} prefix={3}>
              {data['Edge artifacts']}
            </Section>
          </div>

          <div className="space-y-2 self-stretch flex flex-col justify-between">
            <Section title={t('Semantic_Anomalies')} color={color} prefix={4}>
              {data['Semantic anomalies']}
            </Section>
            <Section title={t('Political_Relevancy')} color={color} prefix={5}>
              {data['Political Relevancy']}
            </Section>

            <ConfidenceLevel
              selected={data['Confidence level']}
              label={t('Overall_Confidence')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface SharedJudgmentCardProps {
  data: SharedJudgment;
}

const SharedJudgmentCard: React.FC<SharedJudgmentCardProps> = ({ data }) => {
  const { t } = useLanguage();
  return (
  <div className="row-span-2 bg-white border-[2px] rounded-3xl  shadow-sm flex flex-col max-h-[820px]">
    <div className="p-4 border-b border-green-800">
      <h2 className="text-lg font-bold text-green-700"> {t('shared_judgment')}</h2>
    </div>
    <div className="p-4 overflow-y-auto flex-1 space-y-2">
      <Section title={t('consensus_summary')} color="green" prefix={1}>
        {data['Consensus Summary']}
      </Section>
      <Section title={t('political_relevancy_agreed')} color="green" prefix={2}>
        {data['Political Relevancy (agreed)']}
      </Section>
      <ConfidenceLevel
        selected={data['Overall Confidence']}
        label={t('Overall_Confidence')}
      />
    </div>
  </div>
)};

interface ThumbnailProps{
  data: UserQuestionResponse;
}
const ThumbnailCard: React.FC<ThumbnailProps> = ({ data }) => {
  const { t } = useLanguage();
  return (
  <div className="row-span-2 bg-white border-[2px] rounded-3xl  shadow-sm flex flex-col max-h-[820px]">
    <div className="p-4 border-b border-green-800">
      <h2 className="text-lg font-bold text-green-700"> {t('thumbnail_analysis')}</h2>
    </div>
    <div className="p-4 overflow-y-auto flex-1 space-y-2">
      <Section title={t('thumbnail_analysis')} color="green" prefix={1}>
        {t('not_available')}
      </Section>
      <Section title={t('relevance_to_question')} color="green" prefix={2}>
        {t('not_available')}
      </Section>
    </div>
  </div>
)};

const Section = ({
  title,
  children,
  color,
  prefix,
}: {
  title: string;
  children: React.ReactNode;
  color: string;
  prefix: number;
}) => (
  <div className="mb-2 flex items-start">
    <div className="flex-1">
      <div className="flex items-center">
        <div className="w-7 h-7 flex-shrink-0 rounded-full bg-teal-800 text-white flex items-center justify-center font-bold mr-2">
          {prefix}
        </div>
        <p className="text-large text-gray-700 font-semibold my-2">{title}</p>
      </div>
      <div className="border-l-4 border-teal-500 font-normal bg-gray-50 p-2 rounded text-base text-gray-800 border">
        {children}
      </div>
    </div>
  </div>
);

const ConfidenceLevel = ({
  selected,
  label = 'Confidence level',
}: {
  selected: string;
  label?: string;
}) => {
  const levels = ['Low', 'Medium', 'High'];

  const levelConfig: Record<
    (typeof levels)[number],
    { width: string; color: string }
  > = {
    Low: { width: '33%', color: 'bg-red-500' },
    Medium: { width: '66%', color: 'bg-yellow-500' },
    High: { width: '100%', color: 'bg-green-500' },
  };

  const isValidLevel = (val: string): val is (typeof levels)[number] =>
    levels.includes(val as (typeof levels)[number]);

  const { width, color } = isValidLevel(selected)
    ? levelConfig[selected]
    : levelConfig.Low;

  return (
    <div className="my-5">
      <p className="text-large text-gray-700 font-semibold mb-2">{label}</p>
      <div className="relative w-full h-4 bg-gray-200 rounded-full mt-10">
        <div
          className={`absolute top-0 left-0 h-4 rounded-full transition-all duration-300 ${color}`}
          style={{ width }}
        />
        <div className="absolute inset-0 flex justify-between text-sm text-gray-700 font-medium">
          {levels.map((level) => (
            <div key={level} className="relative -top-6 w-1/3 text-center">
              {level}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface InvestigatorCard_5Wh {
  title: string;
  data: InvestigatorResult;
  color: string;
}

const InvestigatorCard_5Wh: React.FC<InvestigatorCard_5Wh> = ({
  title,
  data,
}) => {
  const {t} = useLanguage();
  return (
  <div
    className={`col-span-1 bg-white border border-gray-400 rounded-3xl shadow-sm flex flex-col mb-4`}
  >
    <div
      className={`p-4 border-b border-gray-400 flex items-center justify-center`}
    >
      <h2 className={`text-lg font-bold text-black`}>{title}</h2>
    </div>
    <div className="p-4 overflow-y-auto flex-1">
      <div className="grid grid-cols-1 gap-4 items-stretch">
        <div className="space-y-2">
          <div className="relative pl-4 ">
            <TimeLine
              prefix={<FaPerson />}
              title={t('who')}
              Subtitle={t('who_description')
              }
            >
              {' '}
              {data['Who']}
            </TimeLine>

            <TimeLine
              prefix={<FaTimeline />}
              title={t('when')}
              Subtitle={t('when_description')}
            >
              {' '}
              {data['When']}
            </TimeLine>

            <TimeLine
              prefix={<FaMapLocation />}
              title={t('where')}
              Subtitle={t('where_description')}
            >
              {data['Where']}
            </TimeLine>

            <TimeLine
              prefix={<FaQuestion />}
              title={t('why')}
              Subtitle={t('why_description')}
            >
              {data['Why']}
            </TimeLine>
          </div>
        </div>
      </div>
    </div>
  </div>
)};

const TimeLine = ({
  title,
  children,
  prefix,
  Subtitle,
}: {
  title: string;
  children: React.ReactNode;
  prefix: React.ReactNode;
  Subtitle: string;
}) => (
  <div className="relative mb-10">
    <div className="flex items-center">
      <div className="absolute left-0 top-0 w-6 h-6 mt-2 rounded-full bg-white border-2 border-gray-500 flex items-center justify-center text-sm z-10">
        {prefix}
      </div>
      <div className="ml-8 flex items-center gap-2 border-2 p-2 rounded-xl">
        <div className="font-semibold text-black ">{title}</div>
        <div className="h-5 w-px bg-gray-400" />
        <div
          className={`${inter.className} font-normal  text-base text-gray-800`}
        >
          {Subtitle}
        </div>
      </div>
    </div>
    <div className="absolute left-2.5 top-6 h-full w-0.5 bg-gray-400 my-4"></div>

    <div className="ml-8">
      <div className=" my-2 border-l-4 border-teal-500 font-normal bg-gray-50 p-2 rounded text-base text-gray-800 border">
        {children}
      </div>
    </div>
  </div>
);
export default ModelToggleComponent;
