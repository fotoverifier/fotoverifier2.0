import { useEffect, useState } from 'react';
import { TbReportSearch } from 'react-icons/tb';
import { TiExport } from 'react-icons/ti';
import { FiHelpCircle } from 'react-icons/fi';
import {
  FaSortUp,
  FaSortDown,
  FaTools,
  FaSearch,
  FaStar,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Modal_PReport from '../modal/PReport_modal';
import styles from '@/styles/head/head_result.module.css';

import '@/components/head/test.css';
import { useTabContext } from '@/context/tabContext';
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
  jpegResult?: string[] | null;
  elaResult: string | null;
  tagResult: any | null;
  loadingJpegGhost: boolean;
  loadingEla: boolean;
  loadingTagResult: boolean;
}

const steps = [
  {
    id: 'img',
    description:
      "This section displays the image you uploaded. Make sure it's the correct file before proceeding.",

    tab: 'Tampering Detection',
  },
  {
    id: 'jpeg_ghost',
    description:
      'JPEG Ghost detection analyzes compression artifacts, helping identify potential edits in the image.',
    tab: 'Tampering Detection',
  },
  {
    id: 'ela',
    description:
      'Error Level Analysis (ELA) highlights inconsistencies in image compression, revealing possible alterations.',
    tab: 'Tampering Detection',
  },
  {
    id: 'jpeg-specific',
    description: 'Click here to run JPEG Ghost',
    tab: 'Tampering Detection',
  },
  {
    id: 'CameraArea',
    description: 'Camera technical details from EXIF metadata',
    tab: 'Originality',
  },
  {
    id: 'AuthorArea',
    description: 'Photographer information and attribution',
    tab: 'Originality',
  },
  {
    id: 'ImgTagging',
    description: 'Image categorization and metadata tags using AI',
    tab: 'Originality',
  },
];

const HeaderReport: React.FC<HeaderReportProps> = ({
  jpegResult,
  elaResult,
  tagResult,
  loadingJpegGhost,
  loadingEla,
  loadingTagResult,
}) => {
  const [selectedMethod, setSelectedMethod] = useState('Basic Method');
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentStep, setCurrentStep] = useState(0);
  const [helpBox, setHelpBox] = useState<{
    text: string;
    position: { top: number; left: number };
    description: string;
  } | null>(null);

  const { activeTab } = useTabContext();

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
    <div className={`${styles.res_header_container}`}>
      <div className={styles.text_container}>
        <div className={styles.icon_text_container}>
          <div className={styles.icon_container}>
            <TbReportSearch size={28} />
          </div>
          <div className={styles.title_text}>General Report</div>
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

          <span className={styles.tooltip}>Generate a portable report</span>
        </div>

        <div className={styles.tooltip_container}>
          <button
            className={styles.action_button}
            onClick={() => highlightSection(currentStep)}
          >
            <FiHelpCircle size={20} />
          </button>
          <span className={styles.tooltip}>Need Help?</span>
        </div>

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
    </div>
  );
};

export default HeaderReport;
