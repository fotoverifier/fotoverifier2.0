import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';

type CollapsibleDefinitionBoxProps = {
  definitions: string; // "TP (True Positive): Description\n..."
};

export const CollapsibleDefinitionBox = ({
  definitions,
}: CollapsibleDefinitionBoxProps) => {
  const {t} = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const toggle = () => setIsExpanded(!isExpanded);

  const lines = definitions.split('\n');

  return (
    <div className="border-l-4 border-teal-500 bg-gray-50 p-4 rounded text-base text-gray-800 border w-full">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggle}
      >
        <span className="text-sm text-gray-600 font-medium">{t('Techniques')}</span>
        <span className="text-gray-600 hover:text-teal-600">
          {isExpanded ? <GoChevronUp size={20} /> : <GoChevronDown size={20} />}
        </span>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 mt-2' : 'max-h-0 overflow-hidden'}`}
      >
        <ul className="space-y-1">
          {lines.map((line, idx) => {
            const [term, desc] = line.split(':');
            return (
              <li key={idx} className="text-sm text-gray-700">
                <span className="font-semibold">{term?.trim()}:</span>{' '}
                <span>{desc?.trim()}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
