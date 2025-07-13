import React, { ReactNode, FC } from 'react';

interface NotchedCardProps {
  title: string;
  rightNotch?: string;
  disabled?: boolean;
  children: ReactNode;
}

export const NotchedCard: FC<NotchedCardProps> = ({
  title,
  rightNotch,
  disabled = false,
  children,
}) => (
  <div
    className={`
      relative
      border border-gray-300 rounded-lg p-4 my-10
      ${disabled ? 'bg-gray-50' : 'bg-white'}
    `}
  >
    <div
      className="
        absolute left-4 top-0
        transform -translate-y-1/2
        bg-gradient-to-r from-blue-50 to-blue-50
        border border-blue-200 rounded-lg text-sm
        px-4 py-2 shadow-sm
        whitespace-nowrap
        font-bold
      "
    >
      {title}
    </div>

    {rightNotch && (
      <div
        className="
          absolute right-4 top-0
          transform -translate-y-1/2
          bg-gradient-to-r from-red-50 to-red-50
          border border-red-200 rounded-lg text-sm
          px-4 py-2 shadow-sm
          whitespace-nowrap
        "
      >
        {rightNotch}
      </div>
    )}

    <div className={`mt-6 ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}>
      {children}
    </div>
  </div>
);
