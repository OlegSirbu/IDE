import React from 'react';

const FileNode: React.FC<FileNode> = ({
  name,
  isSelected,
  fullPath,
  onSelect
}) => {
  return (
    <div
      onClick={() => onSelect(fullPath)}
      className={`pointer ${isSelected ? 'selected-file' : ''}`}>
      📄 {name}
    </div>
  );
};

export default FileNode;
