import React from 'react';
import "@/components/card/card.css"
import { IconType } from 'react-icons';
interface CardProps {
  icon: IconType;
  description: string;
}
const Card: React.FC<CardProps> = ({ icon: Icon, description }) => {
  return (
    <div className="card">
      <div className="content">
        <Icon />
        <p className="para">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
