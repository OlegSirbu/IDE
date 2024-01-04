import { useState, useCallback, useEffect } from 'react';
import { getLanguageFromExtension, findFileNode, debounce } from '../utils';

export function useFileEditor(initialFiles) {
  const [selectedFile, setSelectedFile] = useState({
    path: '',
    contents: '',
    language: 'plaintext'
  });

  const handleFileSelect = useCallback(
    fullPath => {
      const fileNode = findFileNode(initialFiles, fullPath);

      setSelectedFile({
        path: fullPath,
        contents: loadFileContents(fullPath, fileNode.contents),
        language: getLanguageFromExtension(fullPath)
      });
    },
    [initialFiles]
  );

  const loadFileContents = useCallback((fullPath, defaultContents) => {
    const savedContents = localStorage.getItem(fullPath);
    return savedContents !== null ? savedContents : defaultContents;
  }, []);

  const debouncedSave = useCallback(
    debounce((path: string, contents: string) => {
      localStorage.setItem(path, contents);
    }, 500),
    [selectedFile.path]
  );

  useEffect(() => {
    if (selectedFile.path && selectedFile.contents) {
      debouncedSave(selectedFile.path, selectedFile.contents);
    }
  }, [selectedFile.contents, debouncedSave]);

  const handleEditorChange = (newContents:string) => {
    setSelectedFile(prev => ({ ...prev, contents: newContents || '' }));
  }

  return {
    selectedFile,
    handleFileSelect,
    handleEditorChange
  };
}
