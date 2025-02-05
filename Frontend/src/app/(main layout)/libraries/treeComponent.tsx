import React, { useState } from 'react';

type TreeNode = {
  label: string;
  children?: TreeNode[];
};

const TreeView: React.FC<{ data: TreeNode[] }> = ({ data }) => {
  return (
    <ul className="space-y-2">
      {data.map((node, index) => (
        <TreeNode key={index} node={node} />
      ))}
    </ul>
  );
};

const TreeNode: React.FC<{ node: TreeNode }> = ({ node }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasChildren = node.children && node.children.length > 0;

  return (
    <li className="ml-4">
      <div
        className="flex items-center cursor-pointer select-none text-gray-800 hover:text-blue-600"
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        {hasChildren && (
          <span className="mr-2 text-blue-500 font-bold">
            {isExpanded ? '-' : '+'}
          </span>
        )}
        {node.label}
      </div>
      {hasChildren && isExpanded && (
        <ul className="mt-2 pl-4 border-l border-gray-300">
          {node.children!.map((child, index) => (
            <TreeNode key={index} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeView;
