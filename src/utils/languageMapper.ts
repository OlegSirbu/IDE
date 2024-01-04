const extensionToLanguageMap = {
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  json: 'json',
  html: 'html',
  css: 'css'
};

export const getLanguageFromExtension = (filename: string): string => {
  const extension = filename.split('.').pop();
  return extensionToLanguageMap[extension] || 'plaintext';
};
