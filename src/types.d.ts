interface SelectedFile {
  path: string;
  contents: string;
  language: string;
}

interface FileNode {
  name: string;
  fullPath: string;
  isSelected: boolean;
  onSelect: (name: string) => void;
}

interface FileNodeStructure {
  type: 'file' | 'folder';
  fullPath?: string;
  children?: Record<string, FileNodeStructure>;
}

interface FolderNode {
  name: string;
  children: Record<string, FileNodeStructure>;
  selectedFilePath: string;
  onSelectFile: (fullPath: string) => void;
}

interface MonacoEditor {
  language: string;
  value: string;
  onChange: (newContents: string | undefined) => void;
}
