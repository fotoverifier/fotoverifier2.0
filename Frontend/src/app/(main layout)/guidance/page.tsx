// ManualGuide.tsx
'use client';
import { useState, useEffect } from 'react';
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

const customSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    div: [...(defaultSchema.attributes?.div || []), ['className']],
  },
};

const ManualGuide = () => {
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];

  const [content, setContent] = useState<Record<string, string>>({});

  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(sections.map((sec) => [sec.id, true]))
  );
  const toggleSection = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    let completed = 0;
    const total = sections.length;

    sections.forEach((section) => {
      fetch(section.file)
        .then((res) => res.text())
        .then((text) => {
          setContent((prev) => {
            const updated = { ...prev, [section.id]: text };
            completed++;

            if (completed === total) {
              setTimeout(() => {
                const hash = decodeURIComponent(window.location.hash);
                if (hash) {
                  const target = document.querySelector(hash);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }, 100);
            }

            return updated;
          });
        });
    });
  }, []);

  return (
    <div
      className={`flex h-screen overflow-hidden w-full scrollbar-hide ${montserrat.className}`}
    >
      <aside className="w-64 h-full sticky top-0 overflow-y-auto border-r p-4 bg-white shrink-0">
        <h2 className="text-xl font-bold my-4 p-2 border-2 rounded-full flex items-center justify-center text-center">
          Table of Contents
        </h2>
        <ul className="space-y-2 border border-gray-300 p-4 rounded-xl bg-white shadow-sm">
          {sections.map((sec) => (
            <li key={sec.id}>
              <a
                href={`#${sec.id}`}
                className="block px-3 py-2 rounded-md font-semibold text-gray-800 hover:bg-teal-100 hover:text-teal-900 transition"
              >
                {sec.label}
              </a>

              {sec.children && (
                <ul className="ml-4 mt-2 space-y-1 border-l border-gray-200 pl-4">
                  {sec.children.map((child) => (
                    <li key={child.id}>
                      <a
                        href={`#${child.id}`}
                        className="block px-2 py-1 text-sm text-gray-600 rounded-md hover:text-teal-800 hover:bg-teal-50 transition"
                      >
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 overflow-y-auto overflow-x-hidden h-full p-6 bg-white items-center ">
        <h1 className="text-3xl font-bold mb-6 border-l-4 bg-[linear-gradient(to_right,_#01584b,_#02bea2)] p-6 rounded text-white border">
          Application Manual Guide – Welcome to Fotoverifier 2.0
        </h1>

        {sections.map((sec, index) => (
          <section key={sec.id} id={sec.id} className="scroll-mt-24">
            <div
              className="flex items-center justify-between gap-5 cursor-pointer border-2 p-2 rounded-full my-5 transition-transform duration-200 hover:shadow-lg hover:scale-[1.02]"
              onClick={() => toggleSection(sec.id)}
            >
              <h2 className="text-2xl font-semibold gap-5 flex">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-800 text-white text-sm font-bold">
                  {romanNumerals[index] || '?'}
                </div>
                {sec.label}
              </h2>
              {expanded[sec.id] ? (
                <FaChevronUp size={20} />
              ) : (
                <FaChevronDown size={20} />
              )}
            </div>

            {expanded[sec.id] && (
              <div className="prose max-w-full overflow-x-auto">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, [rehypeSanitize, customSchema]]}
                >
                  {content[sec.id] || 'Loading...'}
                </ReactMarkdown>
                <hr className="my-6 border-gray-300" />
              </div>
            )}
          </section>
        ))}
      </main>
    </div>
  );
};

export default ManualGuide;
