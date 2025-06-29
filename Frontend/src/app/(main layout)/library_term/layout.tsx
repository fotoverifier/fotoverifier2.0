// ManualGuide.tsx
'use client';
import { useState, useEffect, Children } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Markdown from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });
interface Section {
  id: string;
  label: string;
  file: string;
  children?: { id: string; label: string }[];
}



const sections: Section[] = [
  {
    id: 'revision-history',
    label: 'Revision History',
    file: '/manual/revision.md',
    children: [
        { id: 'landing-page', label: '2.1 Landing Page' },
        { id: 'dashboard-page', label: '2.2 Dashboard Page' },
        { id: 'upload-page', label: '2.3 Upload Page' },
      ],
  },
  {
    id: 'introduction',
    label: 'Introduction',
    file: '/manual/Introduction.md',
  },
  {
    id: 'interface',
    label: 'Interface',
    file: '/manual/Interface.md',
    children: [
      { id: 'landing-page', label: '2.1 Landing Page' },
      { id: 'dashboard-page', label: '2.2 Dashboard Page' },
      { id: 'upload-page', label: '2.3 Upload Page' },
    ],
  },
  { id: 'UseCase', label: 'Use Case', file: '/manual/UseCase.md' },
];


interface Folder {
    id: string;
    label: string;
    children: { id: string; label: string, file: string,}[];
}
 
const Folders: Folder[] = [
    {
      id: 'metafolder',
      label: 'Metadata analysis',
      children: [
          { id: 'metadata', label: 'Metadata', file: '/manual/metadata_analysis/metadata.md'},
        ],
    },
    {
        id: 'revision-history',
        label: 'Tampering Detection',
        children: [
            { id: 'ELA', label: 'Error Level Analysis', file: '/manual/tampering/ela.md'},
            { id: 'JPEGG', label: 'JPEG Ghost', file: '/manual/tampering/jpeg_ghost.md'},  
          ],
      },
      {
        id: 'revision-history2',
        label: 'Computional',
        children: [
            { id: 'CFA', label: 'CFA', file: '/manual/computational/CFA.md'},
            { id: 'Denoise', label: 'Denoise', file: '/manual/computational/Denoise.md'},
            { id: 'Edge Detection', label: 'Edge Detection', file: '/manual/computational/EdgeDetection.md'},    
          ],
      },
      {
        id: 'img_transform',
        label: 'Img transformation',
        children: [
          { id: 'Bird Eye', label: 'Bird Eye', file: '/manual/img_transform/bird_eye.md' },
          { id: 'Panorama', label: 'Panorama', file: '/manual/img_transform/panorama.md' },
          { id: 'Rectify', label: 'Rectify', file: '/manual/img_transform/rectify.md' }, 
          ],
      },
  ];
const customSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    div: [...(defaultSchema.attributes?.div || []), ['className']],
  },
};

export default function Lib_Term_Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {  

  const [activeId, setActiveId] = useState('');


  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [markdown, setMarkdown] = useState<string>('');
  
  useEffect(() => {
    if (activeFile) {
      fetch(activeFile)
        .then((res) => res.text())
        .then((text) => setMarkdown(text));
    }
  }, [activeFile]);
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
  const toggleFolder = (id: string) => {
    setOpenFolders((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  useEffect(() => {
    if (Folders.length > 0) {
      setOpenFolders({ [Folders[0].id]: true });
    }
  }, []);
  
  

  return (
    <div
      className={`flex h-screen overflow-hidden w-full scrollbar-hide ${montserrat.className}`}
    >
<aside className="w-fit max-w-[20rem] h-full sticky top-0 overflow-y-auto border-r p-4 bg-white shrink-0">
<h2 className="text-xl font-bold my-4 p-2 border-2 rounded-full flex items-center justify-center text-center">
    Table of Contents
  </h2>
  <ul className="space-y-2 border border-gray-300 p-4 rounded-xl bg-white shadow-sm">
    {Folders.map((folder) => (
      <li key={folder.id}>
        <button
          onClick={() => toggleFolder(folder.id)}
          className="flex items-center justify-between w-full px-3 py-2 rounded-md font-semibold text-gray-800 hover:bg-teal-100 transition"
        >
          <span>{folder.label}</span>
          <span className="ml-2">{openFolders[folder.id] ? <FaChevronUp/> : <FaChevronDown/>}</span>
        </button>

        {openFolders[folder.id] && (
          <ul className="ml-4 mt-2 space-y-1 border-l border-gray-200 pl-4">
            {folder.children.map((child) => (
              <li key={child.id}>
                <button
                  onClick={() => setActiveFile(child.file)}
                  className="w-full text-left block px-2 py-1 text-sm text-gray-600 rounded-md hover:text-teal-800 hover:bg-teal-50 transition"
                >
                  {child.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-300 rounded-xl text-sm text-yellow-800 shadow-sm">
    <div className="flex items-center space-x-2">
      <svg
        className="w-5 h-5 text-yellow-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M8.257 3.099c.366-.446.981-.541 1.475-.256l.093.07 6 5A1 1 0 0115 9h-1v5a1 1 0 01-.883.993L13 15H7a1 1 0 01-.993-.883L6 14V9H5a1 1 0 01-.707-1.707l6-5zM7 9v5h6V9H7z" />
      </svg>
      <span className="font-medium">Notice:</span>
    </div>
    <p className="mt-1 ml-7">Translation for this page will be implemented in the future.</p>
  </div>

</aside>


<main className="flex-1 overflow-y-auto overflow-x-hidden h-full p-6 bg-white items-center ">
  <h1 className="text-3xl font-bold mb-6 border-l-4 bg-[linear-gradient(to_right,_#01584b,_#02bea2)] p-6 rounded text-white border">
    Library
  </h1>

  {activeFile ? (
    <div className="prose max-w-full">
     <Markdown
                       remarkPlugins={[remarkGfm]}
                       rehypePlugins={[rehypeRaw, [rehypeSanitize, customSchema]]}
                     >
                       {markdown}
                     </Markdown>
    </div>
  ) : (
    <p className="text-gray-500 flex justify-center items-center">Select a section from the sidebar to view its content.</p>
  )}
</main>

    </div>
  );
};

