import React, { FC, ReactNode } from 'react';

interface IconButtonProps {
  icon: ReactNode;
  children: ReactNode;
  href?: string;
}

export const IconButton: FC<IconButtonProps> = ({ icon, children, href }) => {
  const content = (
    <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 px-4 py-2 rounded-full border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
      {icon}
      <span className="text-sm font-medium">{children}</span>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
};
