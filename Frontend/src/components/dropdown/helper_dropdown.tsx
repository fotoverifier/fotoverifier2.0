import React, { useState, useRef, useEffect } from 'react';
import { FaQuestionCircle, FaBook, FaCommentDots } from 'react-icons/fa';
import styles from '@/styles/head/head_result.module.css';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export function HelpMenuDropDown({
  onFeedbackClick,
  onGuidanceClick,
}: {
  onFeedbackClick: () => void;
  onGuidanceClick: () => void;
}) {
  const [open, setOpen] = useState(false);
  const {t} = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`
          flex items-center gap-2
          bg-white text-[#03564a] font-semibold
          px-4 py-2 rounded-full shadow-md hover:shadow-lg
          transition-all duration-200
          ${styles.nav_link || ''}
        `}
      >
        <FaQuestionCircle className="h-5 w-5" />
      </button>

      {open && (
        <ul
          className="
            absolute right-0 mt-2 w-48 bg-white border border-gray-200
            rounded-lg shadow-lg overflow-hidden z-10
          "
        >
          <li>
            <button
              onClick={() => {
                setOpen(false);
                onFeedbackClick();
              }}
              className="
                flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100
                text-[#03564a]
              "
            >
              <FaCommentDots className="h-4 w-4" />
              {t('feedback')}
            </button>
          </li>
          <li>
            <Link href="/guidance">
            <button
              onClick={() => {
                setOpen(false);
                onGuidanceClick();
              }}
              className="
                flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100
                text-[#03564a]
              "
            >
           
              <FaBook className="h-4 w-4" />
              {t('Tutorial')}
            </button>
            </Link>

          </li>
        </ul>
      )}
    </div>
  );
}
