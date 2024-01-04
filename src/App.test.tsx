import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';

import App from './App';

jest.mock('./utils/fileUtils', () => ({
  ...jest.requireActual('./utils/fileUtils'),
  findFileNode: jest.fn().mockImplementation((structure, fullPath) => {
    return { type: 'file', contents: 'mock content', fullPath };
  })
}));

jest.mock('./components/FileNode', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(({ onSelectFile }) => (
      <div onClick={() => onSelectFile('style.css')}>
        <div>style.css</div>
      </div>
    ))
  };
});

jest.mock('./components/FolderNode', () => {
  return {
    __esModule: true,
    default: jest
      .fn()
      .mockImplementation(({ onSelectFile }) => (
        <div onClick={() => onSelectFile('style.css')}>Mock FolderNode</div>
      ))
  };
});

jest.mock('./components/MonacoEditor', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => <div>Mock MonacoEditor</div>)
  };
});

describe('App', () => {
  it('loads and allows selection of a file', async () => {
    const screen = render(<App />);

    fireEvent.click(screen.getByText('Mock FolderNode'));
    await waitFor(() => {
      expect(screen.getByText('Mock MonacoEditor')).toBeInTheDocument();
    });
  });

  it('should render correctly', async () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders file list and editor', () => {
    const screen = render(<App />);
    expect(screen.getByTestId('file-list')).toBeInTheDocument();
    expect(screen.getByTestId('editor')).toBeInTheDocument();
  });
});
