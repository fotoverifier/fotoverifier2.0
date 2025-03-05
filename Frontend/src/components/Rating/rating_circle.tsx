import React, { useState } from 'react';

interface CircleRatingProps {
  onSelect: (rating: number) => void; // Callback when user selects a rating
}

const CircleRating: React.FC<CircleRatingProps> = ({ onSelect }) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleSelect = (rating: number) => {
    setSelectedRating(rating);
    onSelect(rating);
  };

  return (
    <div className="flex gap-3 p-2">
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-300
            ${
              selectedRating === num
                ? 'bg-[#03564a] text-white border-[#03564a] scale-110'
                : 'bg-transparent text-[#03564a] border-[#03564a] hover:bg-[#ffcc00] hover:text-white'
            }`}
          onClick={() => handleSelect(num)}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default CircleRating;
