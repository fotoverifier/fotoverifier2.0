import React from 'react';
import "@/app/(single layout)/result/result.css";

interface OriginalDate {
  original_date: string | undefined;
  create_date: string | undefined;
}

interface AuthorCopyright {
  author?: string | null;
  copyright_tag?: string | null;
  profile_copyright?: string | null;
}

interface ModificationProps {
  software_modify?: string;
  modify_date?: string;
  original_date?: OriginalDate;
  author_copyright?: AuthorCopyright; // Add this line
}

const Modification: React.FC<ModificationProps> = ({ 
  software_modify, 
  modify_date, 
  original_date,
  author_copyright // Add this line
}) => {
  return (
    <div className='w-full h-full p-5'>
    <div className='flex'>
       <div className='circle_2'> 3. </div>
    <div className='font-bold text-lg ml-2 mb-5'>Software Information</div>
    </div>
    <div>
    <p><strong>Software Modified:</strong> {software_modify || 'N/A'}</p>
    <p><strong>Modification Date:</strong> {modify_date || 'N/A'}</p>
    <p><strong>Original Date:</strong> {original_date?.original_date || 'N/A'}</p>
    <p><strong>Create Date:</strong> {original_date?.create_date || 'N/A'}</p>
    
    {/* Author Copyright Information */}
    <p><strong>Author:</strong> {author_copyright?.author || 'N/A'}</p>
    <p><strong>Copyright Tag:</strong> {author_copyright?.copyright_tag || 'N/A'}</p>
    <p><strong>Profile Copyright:</strong> {author_copyright?.profile_copyright || 'N/A'}</p>
  </div>
    </div>
  );
}

export default Modification;
