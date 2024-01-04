export const findFileNode = (
  structure: FileNodeStructure,
  fullPath: string
): FileNodeStructure => {
  const parts = fullPath.split('/');
  let current = structure;

  for (const part of parts) {
    if (!current[part]) {
      return null;
    }
    current =
      current[part].type === 'file' ? current[part] : current[part].children;
  }

  return current;
};

export const sortFiles = (
  a: [string, FileNodeStructure],
  b: [string, FileNodeStructure]
): number => {
  const typeA = a[1].type;
  const typeB = b[1].type;
  const nameA = a[0].toLowerCase();
  const nameB = b[0].toLowerCase();

  if (typeA === 'folder' && typeB !== 'folder') return -1;
  if (typeA !== 'folder' && typeB === 'folder') return 1;

  return nameA.localeCompare(nameB);
};

export const parseFileStructure = (
  files: SelectedFile[],
  basePath: string = ''
): FileNodeStructure => {
  const structure = <FileNodeStructure>{};

  files.forEach(file => {
    const parts = file.path.split('/');
    let current = structure;

    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1;
      const fullPath =
        basePath + (basePath ? '/' : '') + parts.slice(0, index + 1).join('/');

      if (isFile) {
        current[part] = { type: 'file', contents: file.contents, fullPath };
      } else {
        current[part] = current[part] || {
          type: 'folder',
          children: {},
          fullPath
        };
        current = current[part].children;
      }
    });
  });
  sortStructure(structure);

  return structure;
};

const sortStructure = (node: FileNodeStructure) => {
  if (node.type === 'folder') {
    const sortedChildren = Object.entries(node.children).reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        sortStructure(value);
        return acc;
      },
      {}
    );

    node.children = sortedChildren;
  }
};
