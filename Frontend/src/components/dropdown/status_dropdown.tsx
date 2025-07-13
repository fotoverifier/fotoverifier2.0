import React, { useState } from 'react';

interface DropdownOption {
  value: string;
  label: string;
}

interface StatusDropdownProps {
  label: string;
  options: DropdownOption[];
  selected: string;
  onChange: (value: string) => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  label,
  options,
  selected,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find((opt) => opt.value === selected)?.label || 'Select...';


  return (
    <div className="relative inline-block text-left w-60">
      <label className="block text-sm font-medium text-white mb-1">{label}</label>
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => setOpen(!open)}
        >
          {selectedLabel || 'Select...'}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 01.894.553l5 9A1 1 0 0115 14H5a1 1 0 01-.894-1.447l5-9A1 1 0 0110 3zm0 2.618L6.618 12h6.764L10 5.618z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {open && (
          <div className="origin-top-right absolute z-10 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                    selected === opt.value ? 'bg-gray-100 font-semibold' : ''
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusDropdown;
