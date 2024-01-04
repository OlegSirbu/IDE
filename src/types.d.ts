interface SelectedFile {
  path: string;
  contents: string;
  language: string;
}

interface FileNodeProps {
  name: string;
  fullPath: string;
  isSelected: boolean;
  onSelect: (name: string) => void;
}

enum TypeFiles {
  file = 'file',
  folder = 'folder'
}

interface FileNodeStructure {
  type: TypeFiles;
  fullPath?: string;
  contents: string;
  children?: Record<string, FileNodeStructure>;
}

interface FolderNodeProps {
  name: string;
  selectedFilePath: string;
  children: Record<FileNodeProps | FileNodeStructure>;
  onSelectFile: (fullPath: string) => void;
}

interface MonacoEditor {
  language: string;
  value: string;
  onChange: (newContents: string | undefined) => void;
}

type Structure = Record<string, FolderNodeProps | FileNodeStructure>;

interface UseFileEditorHook {
  selectedFile: SelectedFile;
  handleFileSelect: (fullPath: string) => void;
  handleEditorChange: (newContents: string) => void;
}