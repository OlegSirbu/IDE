import React, { useState } from 'react';
import FileNode from './FileNode';
import { sortFiles } from '../utils/fileUtils';

const FolderNode: React.FC<FolderNodeProps> = ({
  name,
  children,
  selectedFilePath,
  onSelectFile
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div onClick={toggleFolder} className="pointer">
        {isOpen ? '📂' : '📁'} {name}
      </div>
      {isOpen && (
        <div className="folder-children">
          {Object.entries(children)
            .sort(sortFiles)
            .map(([key, value]: [string, FileNodeStructure]) => {
              if (value.type === 'file') {
                return (
                  <FileNode
                    key={key}
                    isSelected={selectedFilePath === value.fullPath}
                    onSelect={onSelectFile}
                    name={key}
                    fullPath={value.fullPath}
                  />
                );
              } else {
                return (
                  <FolderNode
                    onSelectFile={onSelectFile}
                    selectedFilePath={selectedFilePath}
                    key={key}
                    name={key}
                    children={value.children}
                  />
                );
              }
            })}
        </div>
      )}
    </div>
  );
};

export default FolderNode;
