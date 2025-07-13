'use client';

import React, { useState } from 'react';

interface Project {
  id: string;
  title: string;
  description?: string;
}

const LayoutTabs = ({ children }: { children: React.ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const createProject = () => {
    const id = `project-${Date.now()}`;
    const newProject: Project = {
      id,
      title: newTitle,
      description: newDesc,
    };
    setProjects([...projects, newProject]);
    setActiveTab(id);
    setNewTitle('');
    setNewDesc('');
    setIsDialogOpen(false);
  };

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between border-b pb-2 mb-4">
        <div className="flex space-x-2 overflow-x-auto">
          {projects.map((proj) => (
            <button
              key={proj.id}
              onClick={() => setActiveTab(proj.id)}
              className={`px-4 py-2 rounded-t ${
                activeTab === proj.id
                  ? 'bg-white border-t border-l border-r text-black'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {proj.title}
            </button>
          ))}
        </div>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="ml-2 px-3 py-1 border rounded bg-white hover:bg-gray-100"
        >
          +
        </button>
      </div>

      {projects.map((proj) => (
        activeTab === proj.id && (
          <div key={proj.id} className="mt-2">
            <h2 className="text-xl font-bold mb-2">{proj.title}</h2>
            <p className="text-gray-600 mb-4">{proj.description || 'No description provided.'}</p>
            <div>{children}</div>
          </div>
        )
      ))}

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create New Project</h3>
            <input
              type="text"
              placeholder="Project Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />
            <textarea
              placeholder="Description (optional)"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 rounded border bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={createProject}
                disabled={!newTitle}
                className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LayoutTabs;
