import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './VerificationStepsAnimation.module.css';

const stepIcons = [
  <svg
    key="upload"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 19V20H3V19M17 10L12 15M12 15L7 10M12 15V3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  <svg
    key="analyze"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 21C14.9706 21 19 16.9706 19 12C19 7.02944 14.9706 3 10 3C5.02944 3 1 7.02944 1 12C1 16.9706 5.02944 21 10 21Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23 23L16 16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  <svg
    key="authenticate"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  <svg
    key="detect"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 3H4C3.44772 3 3 3.44772 3 4V9M9 21H4C3.44772 21 3 20.5523 3 20V15M21 9V4C21 3.44772 20.5523 3 20 3H15M15 21H20C20.5523 21 21 20.5523 21 20V15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  <svg
    key="verify"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 6L9 17L4 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
];

const stepLabels = ['Upload', 'Analyze', 'Authenticate', 'Detect', 'Verify'];

interface VerificationStepsAnimationProps {
  className?: string;
}

const VerificationStepsAnimation: React.FC<VerificationStepsAnimationProps> = ({
  className,
}) => {
  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % stepIcons.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const calculateProgress = () => {
    if (activeStep === 0) return '0%';

    const totalSteps = stepIcons.length;
    const segments = totalSteps - 1;

    return `${(activeStep / segments) * 100}%`;
  };

  return (
    <motion.div
      className={`${styles.stepsContainer} ${className || ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <div className={styles.stepsProgressLine}>
        <motion.div
          className={styles.progressFill}
          initial={{ width: '0%' }}
          animate={{ width: calculateProgress() }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      </div>

      <div className={styles.steps}>
        {stepIcons.map((icon, index) => (
          <div key={index} className={styles.stepWrapper}>
            <motion.div
              className={`${styles.stepIcon} ${activeStep === index ? styles.active : ''} ${activeStep > index ? styles.completed : ''}`}
              animate={{
                scale: activeStep === index ? 1.2 : 1,
                backgroundColor: activeStep >= index ? '#006064' : '#b2dfdb',
                color: activeStep >= index ? '#ffffff' : '#006064',
              }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.div>
            <motion.div
              className={styles.stepLabel}
              animate={{
                opacity: activeStep === index ? 1 : 0.6,
                scale: activeStep === index ? 1 : 0.9,
              }}
              transition={{ duration: 0.2 }}
            >
              {stepLabels[index]}
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default VerificationStepsAnimation;
