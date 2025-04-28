'use client';
import React, { useState } from 'react';
import './DevelopmentPlan.css';

interface Step {
  id: number;
  title: string;
  details: string;
}

const DevelopmentPlan: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps: Step[] = [
    {
      id: 1,
      title: "Research & Analysis",
      details: "Conduct market research, identify user needs, and analyze competitors to establish a solid foundation for development."
    },
    {
      id: 2,
      title: "Design",
      details: "Create wireframes, prototypes, and visual designs based on research findings and user requirements."
    },
    {
      id: 3,
      title: "Development",
      details: "Implement the core functionality, following best practices and writing clean, maintainable code."
    },
    {
      id: 4,
      title: "Testing",
      details: "Perform unit testing, integration testing, and user acceptance testing to ensure quality and reliability."
    },
    {
      id: 5,
      title: "Deployment",
      details: "Release the product to production environment and monitor for any issues or performance concerns."
    }
  ];

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId === activeStep ? null : stepId);
  };

  const handleStepHover = (stepId: number) => {
    setActiveStep(stepId);
  };

  const handleStepLeave = () => {
    // Uncomment the following line if you want the details to disappear on mouse leave
    // setActiveStep(null);
  };

  return (
    <div className="development-plan-container">
      <h1>Our Development Plan</h1>
      
      <div className="timeline">
        <div className="timeline-line"></div>
        
        {steps.map((step) => (
          <div 
            key={step.id}
            className={`timeline-step ${activeStep === step.id ? 'active' : ''}`}
            style={{ left: `${(step.id - 1) * 25}%` }}
            onClick={() => handleStepClick(step.id)}
            onMouseEnter={() => handleStepHover(step.id)}
            onMouseLeave={handleStepLeave}
            tabIndex={0}
          >
            <div className="step-marker">{step.id}</div>
            <div className="step-title">{step.title}</div>
            
            {activeStep === step.id && (
              <div className="step-details">
                {step.details}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevelopmentPlan;