import React from 'react';
import { render } from '@testing-library/react';
import FileNode from './FileNode';

describe('FileNode', () => {
  it('renders correctly and matches snapshot', () => {
    const { asFragment } = render(
      <FileNode
        name="exampleFile.txt"
        isSelected={false}
        fullPath="/path/to/exampleFile.txt"
        onSelect={() => {}}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly when selected and matches snapshot', () => {
    const { asFragment } = render(
      <FileNode
        name="exampleFile.txt"
        isSelected={true}
        fullPath="/path/to/exampleFile.txt"
        onSelect={() => {}}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
