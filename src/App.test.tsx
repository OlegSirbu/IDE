import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
jest.mock('./components/FolderNode', () => {
  return {
    __esModule: true,
    default: jest
      .fn()
      .mockImplementation(({ onSelectFile }) => (
        <div onClick={() => onSelectFile('path/to/selectedFile.txt')}>
          Mock FolderNode
        </div>
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
  it('should render correctly ', async () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
