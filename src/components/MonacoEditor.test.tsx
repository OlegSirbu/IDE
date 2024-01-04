import React from 'react';
import { render } from '@testing-library/react';
import MonacoEditor from './MonacoEditor';
import Editor from '@monaco-editor/react';

jest.mock('@monaco-editor/react', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(({ language, value, onChange }) => {
      return <div data-testid="mock-editor">{`${language}-${value}`}</div>;
    })
  };
});

describe('MonacoEditor', () => {
  it('renders correctly with given props', () => {
    const mockOnChange = jest.fn();
    render(
      <MonacoEditor
        language="javascript"
        value="console.log('Hello');"
        onChange={mockOnChange}
      />
    );

    expect(Editor).toHaveBeenCalledWith(
      expect.objectContaining({
        language: 'javascript',
        value: "console.log('Hello');",
        onChange: mockOnChange
      }),
      expect.anything()
    );
  });
});
