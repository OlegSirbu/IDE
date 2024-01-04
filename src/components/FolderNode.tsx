import React, { useState } from 'react';
import FileNode from './FileNode';
import { sortFiles } from '../utils/fileUtils';

const FolderNode: React.FC<FolderNode> = ({
  name,
  children,
  selectedFilePath,
  onSelectFile
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const renderChildren = (onSelectFile: (fullPath: string) => void) =>
    Object.entries(children)
      .sort(sortFiles)
      .map(([key, value]) => {
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
      });

  return (
    <>
      <div onClick={() => setIsOpen(!isOpen)} className="pointer">
        {isOpen ? '📂' : '📁'} {name}
      </div>
      {isOpen && (
        <div className="folder-children">{renderChildren(onSelectFile)}</div>
      )}
    </>
  );
};

export default FolderNode;
