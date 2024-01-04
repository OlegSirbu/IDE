import React from 'react';
import { render } from '@testing-library/react';
import FolderNode from './FolderNode';

describe('FolderNode', () => {
  it('renders correctly and matches snapshot', () => {
    const mockChildren = {
      'file1.txt': { type: 'file', fullPath: 'path/to/file1.txt' }
    };

    const { asFragment } = render(
      <FolderNode
        name="root"
        children={mockChildren}
        selectedFilePath=""
        onSelectFile={() => {}}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
