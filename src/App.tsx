import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import files from './defaultFiles';
import FolderNode from './components/FolderNode';
import MonacoEditor from './components/MonacoEditor';

import {
  parseFileStructure,
} from './utils';
import { useFileEditor } from './hooks/useFileEditor';

const App = () => {
  const fileStructure = parseFileStructure(files);
  const {
    selectedFile,
    handleFileSelect,
    handleEditorChange,
  } = useFileEditor(fileStructure);

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
