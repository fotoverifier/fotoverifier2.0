import { NotchedCard } from '@/components/card/notchedcard';
import React from 'react';

interface CaseDetailsPanelProps {
  data: {
    id: string;
    eventDate: string;
    publishedDate: string;
    publishedToMediabankDate: string;
    mediabankLink: string;
    jobStatus: string;
    status: string;
    verifiedBy: string;
    controlledBy: string;
    coordinates: string;
    place: string;
    category: string;
    violenceLevel: string;
    sender: string;
    description: string;
    contentLink: string;
    mediaLink: string;
    mapLink: string;
    comments: string;
  };
  onClose: () => void;
}

const CaseDetailsPanel: React.FC<CaseDetailsPanelProps> = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 w-full">
  <div className="bg-white rounded-xl w-11/12 p-6 shadow-xl relative">

    <h2 className="text-xl font-semibold text-center mb-6 text-black">Case Information</h2>

    <button
      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      onClick={onClose}
      aria-label="Close"
    >
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-800 max-h-[70vh] overflow-y-auto pr-1">

{/* Basic Info */}
<div className="space-y-2">
<NotchedCard title='Basic Info'>
  <Detail label="ID" value={data.id} />
  <Detail label="Description" value={data.description} />
  <Detail label="Category" value={data.category} />
  <Detail label="Sender" value={data.sender} />
  </NotchedCard>
</div>

{/* Dates */}
<div className="space-y-2">
<NotchedCard title="Dates">
    <Detail label="Date of the Event" value={data.eventDate} />
    <Detail label="Date Published" value={data.publishedDate} />
    <Detail label="Published to Mediabank" value={data.publishedToMediabankDate} />
  </NotchedCard>
</div>

{/* Verification */}
<div className="space-y-2">
<NotchedCard title="Verification">
    <Detail label="Job Status" value={data.jobStatus} />
    <Detail label="Status" value={data.status} />
    <Detail label="Verified By" value={data.verifiedBy} />
    <Detail label="Controlled By" value={data.controlledBy} />
  </NotchedCard>
</div>

{/* Location */}
<div className="space-y-2">
<NotchedCard title="Location">
    <Detail label="Coordinates" value={data.coordinates} />
    <Detail label="Place" value={data.place} />
    <Detail label="Level of Violence" value={data.violenceLevel} />
  </NotchedCard>
</div>

{/* Links */}
<div className="space-y-2">
<NotchedCard title="Links">
    <Detail label="Mediabank Link" value={data.mediabankLink} isLink />
    <Detail label="Content Link" value={data.contentLink} isLink />
    <Detail label="Video or Photo Link" value={data.mediaLink} isLink />
    <Detail label="Map Link" value={data.mapLink} isLink />
  </NotchedCard>
</div>

{/* Comments */}
<div className="space-y-2">
<NotchedCard title="Comments">
    <Detail label="Comments" value={data.comments} />
  </NotchedCard>
</div>

</div>


  </div>
</div>
  );
};

const Detail: React.FC<{ label: string; value: string; isLink?: boolean }> = ({ label, value, isLink }) => (
  <div>
    <span className="font-medium text-black">{label}:</span>{' '}
    {isLink ? (
      <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
        {value}
      </a>
    ) : (
      <span className='text-black'>{value}</span>
    )}
  </div>
);

export default CaseDetailsPanel;
