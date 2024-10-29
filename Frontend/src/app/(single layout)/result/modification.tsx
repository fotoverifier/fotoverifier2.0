import React from 'react';
import "@/app/(single layout)/result/categories.css";

interface OriginalDate {
  original_date?: string;
  create_date?: string;
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
    <div className='w-full h-full items-center flex-col flex'>
      <p><strong>Software Modified:</strong> {software_modify}</p>
      <p><strong>Modification Date:</strong> {modify_date}</p>
      <p><strong>Original Date:</strong> {original_date?.original_date}</p>
      <p><strong>Create Date:</strong> {original_date?.create_date}</p>
      
      {/* Author Copyright Information */}
      <p><strong>Author:</strong> {author_copyright?.author}</p>
      <p><strong>Copyright Tag:</strong> {author_copyright?.copyright_tag}</p>
      <p><strong>Profile Copyright:</strong> {author_copyright?.profile_copyright}</p>
    </div>
  );
}

export default Modification;
