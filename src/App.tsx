import React, { useState, useEffect, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import files from './defaultFiles';
import FolderNode from './components/FolderNode';
import MonacoEditor from './components/MonacoEditor';
import {
  getLanguageFromExtension,
  parseFileStructure,
  findFileNode,
  debounce
} from './utils';

const App = () => {
  const fileStructure = parseFileStructure(files);

  const [selectedFile, setSelectedFile] = useState<SelectedFile>({
    path: '',
    contents: '',
    language: 'plaintext'
  });

  const debouncedSave = useCallback(
    debounce((path: string, contents: string) => {
      localStorage.setItem(path, contents);
    }, 1000),
    [selectedFile.path]
  );

  useEffect(() => {
    if (selectedFile.path && selectedFile.contents) {
      debouncedSave(selectedFile.path, selectedFile.contents);
    }
  }, [selectedFile.contents, debouncedSave]);

  const handleFileSelect = (fullPath: string) => {
    const fileNode = findFileNode(fileStructure, fullPath);

    setSelectedFile({
      path: fullPath,
      contents: loadFileContents(fullPath, fileNode.contents),
      language: getLanguageFromExtension(fullPath)
    });
  };

  const loadFileContents = (
    fullPath: string,
    defaultContents: string
  ): string => {
    const savedContents = localStorage.getItem(fullPath);
    return savedContents !== null ? savedContents : defaultContents;
  };

  const handleEditorChange = (newContents: string | undefined) => {
    setSelectedFile(prev => ({ ...prev, contents: newContents || '' }));
  };

  return (
    <Box height="100vh" display="flex">
      <Grid container spacing={2}>
        <Grid item xs={4} md={3}>
          <div data-testid="file-list">
            <FolderNode
              name="root"
              children={fileStructure}
              selectedFilePath={selectedFile.path}
              onSelectFile={handleFileSelect}
            />
          </div>
        </Grid>
        <Grid item xs={8} md={9} data-testid="editor">
          <MonacoEditor
            language={selectedFile.language}
            value={selectedFile.contents}
            onChange={handleEditorChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
