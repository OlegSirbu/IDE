import React from 'react';
import Editor from '@monaco-editor/react';

const MonacoEditor: React.FC<MonacoEditor> = ({
  language,
  value,
  onChange
}) => {
  return (
    <Editor
      language={language}
      value={value}
      onChange={onChange}
      theme="light"
      options={{
        minimap: { enabled: true },
        automaticLayout: true
      }}
    />
  );
};

export default MonacoEditor;
