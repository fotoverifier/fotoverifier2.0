import { useEffect, useState } from 'react';
import { TbReportSearch } from 'react-icons/tb';
import { TiExport } from 'react-icons/ti';
import { FiHelpCircle, FiInfo } from 'react-icons/fi';
import { FaTools, FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Modal_PReport from '../modal/PReport_modal';
import styles from '@/styles/head/head_result.module.css';

import '@/components/head/test.css';
import { useTabContext } from '@/context/tabContext';
import { Montserrat } from 'next/font/google';
import { GiArchiveResearch } from 'react-icons/gi';
import { useLanguage } from '@/context/LanguageContext';
import StatusDropdown from '../dropdown/status_dropdown';
import CaseDetailsPanel from '../modal/feedback_modal/CaseDetailModal';

const montserrat = Montserrat({ subsets: ['latin'] });

const jobStatusOptions = [
  { value: 'completed', label: 'Completed' },
  { value: 'in_process', label: 'Work in process' },
  { value: 'on_hold', label: 'On hold' },
  { value: 'for_control', label: 'For control' },
  { value: 'not_priority', label: 'Not a priority' },
];
const caseStatusOptions = [
  { value: 'verified', label: 'Verified' },
  { value: 'not_verifiable', label: 'Not verifiable' },
  { value: 'partial', label: 'Partially verified' },
  { value: 'false', label: 'False' },
  { value: 'misleading', label: 'Misleading' },
];
const methods = [
  {
    name: 'Basic Method',
    icon: <FaTools size={16} className="text-[#03564a]" />,
  },
  {
    name: 'Specialized Method',
    icon: <FaStar size={16} className="text-[#03564a]" />,
  },
];
interface HeaderReportProps {
  jpegResult: string[] | null;
  elaResult: string | null;
  tagResult: any | null;
  loadingJpegGhost: boolean;
  loadingEla: boolean;
  loadingTagResult: boolean;
}


const HeaderReport: React.FC<HeaderReportProps> = ({
  jpegResult,
  elaResult,
  tagResult,
  loadingJpegGhost,
  loadingEla,
  loadingTagResult,
}) => {
  const {t} = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobStatus, setJobStatus] = useState('');
  const [caseStatus, setCaseStatus] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const handleUpdate = (job: string, status: string) => {
    console.log('Updating with:', { job, status });
  };

  const caseData = {
    id: 'CASE-2025-001',
    eventDate: '2025-06-01',
    publishedDate: '2025-06-02',
    publishedToMediabankDate: '2025-06-05',
    mediabankLink: 'https://mediabank.example.com/case001',
    jobStatus: 'Work in process',
    status: 'Partially verified',
    verifiedBy: 'John Doe',
    controlledBy: 'Jane Smith',
    coordinates: '48.8566° N, 2.3522° E',
    place: 'Paris, Île-de-France, France',
    category: 'Damaged infrastructure',
    violenceLevel: 'Moderate',
    sender: 'Neutral',
    description: 'An explosion occurred near a residential area.',
    contentLink: 'https://twitter.com/someuser/status/123456789',
    mediaLink: 'https://drive.google.com/file/d/abc123/view',
    mapLink: 'https://drive.google.com/folders/folder123',
    comments: 'Double-check metadata before publishing.',
  };  


  const [currentStep, setCurrentStep] = useState(0);
  const [helpBox, setHelpBox] = useState<{
    text: string;
    position: { top: number; left: number };
    description: string;
  } | null>(null);

  const { activeTab } = useTabContext();

  const steps = [
    {
      id: 'img',
      description:
      t('desc_img'),
  
      tab: 'Tampering Detection',
    },
    {
      id: 'jpeg_ghost',
      description:
        t('desc_jpeg_ghost'),
      tab: 'Tampering Detection',
    },
    {
      id: 'ela',
      description:
      t('desc_ela'),
      tab: 'Tampering Detection',
    },
    //Superesolution
    {
      id: 'SS_CFA',
      description:
        t('desc_SS_CFA'),
      tab: 'Superesolution',
    },
    {
      id: 'SS_Denoise',
      description:
      t('desc_SS_Denoise'),
      tab: 'Superesolution',
    },
    {
      id: 'SS_Edge',
      description:
      t('desc_SS_Edge'),
      tab: 'Superesolution',
    },
    {
      id: 'SS_ChangeFactor',
      description: t('desc_SS_ChangeFactor'),
      tab: 'Superesolution',
    },
    {
      id: 'SS_Original',
      description:
      t('desc_SS_Original'),
      tab: 'Superesolution',
    },
    {
      id: 'SS_Enhance',
      description:
      t('desc_SS_Enhance'),
      tab: 'Superesolution',
    },
    // AI Fakeshield
    
  
  
    //CameraArea
    {
      id: 'CameraArea',
      description: t('desc_CameraArea'),
      tab: 'Originality',
    },
    {
      id: 'AuthorArea',
      description: t('desc_AuthorArea'),
      tab: 'Originality',
    },
    {
      id: 'ImgTagging',
      description: t('desc_ImgTagging'),
      tab: 'Originality',
    },
  ];


  const highlightSection = (stepIndex: number) => {
    const currentTabSteps = steps.filter((step) => step.tab === activeTab);

    if (stepIndex < 0 || stepIndex >= currentTabSteps.length) {
      removeHighlight();
      return;
    }

    const target = document.getElementById(currentTabSteps[stepIndex].id);
    if (target) {
      removeHighlight();
      target.classList.add('glow-effect');

      const rect = target.getBoundingClientRect();

      setHelpBox({
        text: `${stepIndex + 1}/${currentTabSteps.length}`,
        position: {
          top: rect.top - 200,
          left: rect.left + window.scrollX + rect.width / 2 - 150,
        },
        description: currentTabSteps[stepIndex].description,
      });
    }

    setCurrentStep(stepIndex);
  };

  const removeHighlight = () => {
    const currentTabSteps = steps.filter((step) => step.tab === activeTab);

    currentTabSteps.forEach((step) => {
      const element = document.getElementById(step.id);
      if (element) {
        element.classList.remove('glow-effect');
      }
    });
    setHelpBox(null);
  };

  useEffect(() => {
    removeHighlight();
    setCurrentStep(0);
  }, [activeTab]);

  return (
    <div className={`${styles.res_header_container} ${montserrat.className}`}>
      <div className={styles.text_container}>
        <div className={styles.icon_text_container}>
          <div className={styles.icon_container}>
            <TbReportSearch size={28} />
          </div>
          <div className={styles.title_text}>{t('general_report')}</div>
        </div>

        <div className={styles.divider}></div>
      </div>

      <div className={styles.action_buttons_container}>
        <div className={styles.tooltip_container}>
          <button
            onClick={() => setIsModalOpen(true)}
            className={styles.action_button}
          >
            <TiExport size={20} />
          </button>

          <Modal_PReport
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            jpegResult={jpegResult}
            elaResult={elaResult}
            tagResult={tagResult}
            loadingJpegGhost={loadingJpegGhost}
            loadingEla={loadingEla}
            loadingTagResult={loadingTagResult}
          />

          <span className={styles.tooltip}>{t('generate_portable_report')}</span>
        </div>
        

        <div className={styles.tooltip_container}>
          <button
            className={styles.action_button}
            onClick={() => highlightSection(currentStep)}
          >
            <FiHelpCircle size={20} />
          </button>
          <span className={styles.tooltip}>{t('need_help')}</span>
        </div>

        {/*
        <div className={styles.tooltip_container}>
          <button
            className={styles.action_button}
            onClick={() => setShowDetails(true)}
          >
            <FiInfo size={20} />
          </button>
          <span className={styles.tooltip}>{t('Image_Information')}</span>
        </div>*/}
        {/*{showDetails && <CaseDetailsPanel data={caseData} onClose={() => setShowDetails(false)} />}*/}

        {helpBox && (
          <>
            <div className={styles.overlay} onClick={removeHighlight} />

            <div
              className={styles.help_box}
              style={{
                top: `${helpBox.position.top}px`,
                left: `${helpBox.position.left}px`,
                position: 'absolute',
                width: '300px',
                zIndex: 300,
              }}
              id="help-box"
            >
              <div className={styles.help_description}>
                {helpBox.description}
              </div>

              <div className={styles.help_navigation}>
                <button
                  className={styles.nav_button}
                  onClick={() => highlightSection(currentStep - 1)}
                  disabled={currentStep === 0}
                >
                  {'<'}
                </button>

                <button
                  className={styles.help_button}
                  onClick={removeHighlight}
                >
                  {helpBox.text}
                </button>

                <button
                  className={styles.nav_button}
                  onClick={() => highlightSection(currentStep + 1)}
                  disabled={currentStep === steps.length - 1}
                >
                  {'>'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/*<div className={`${styles.manual_container} ml-auto`}>
        <div className={styles.icon_text_container}>
          <div className={styles.icon_container}>
            <GiArchiveResearch size={20} />
          </div>  
          <div className={`${styles.title_manual_text} text-base`}>
            Manual Guidance
          </div>
        </div>
      </div> */}

      {/*{
        <div className="flex items-end gap-4">
  <StatusDropdown
    label="Job Status"
    options={jobStatusOptions}
    selected={jobStatus}
    onChange={setJobStatus}
  />
  <StatusDropdown
    label="Case Status"
    options={caseStatusOptions}
    selected={caseStatus}
    onChange={setCaseStatus}
  />
  <button
    onClick={() => handleUpdate(jobStatus, caseStatus)}
    className="h-10 px-4 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 shadow"
  >
    Update
  </button>
</div>
*/}
    </div>
  );
};

export default HeaderReport;
