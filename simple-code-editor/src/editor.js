import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-jsx';

const CodeEditor = () => {
  const [code, setCode] = useState('');

  const highlight = (code) => {
    return Prism.highlight(code, Prism.languages.jsx, 'jsx');
  };

  const handleChange = (newCode) => {
    setCode(newCode);
  };

  const handleKeyDown = (e) => {
    if (e.key === '>') {
      const cursorPosition = e.target.selectionStart;
      const textBeforeCursor = code.slice(0, cursorPosition);
      const textAfterCursor = code.slice(cursorPosition);

      // Match an opening tag that has just been typed
      const match = textBeforeCursor.match(/<([a-zA-Z0-9]+)(?=\s|>|$)/);
      if (match) {
        const tagName = match[1];
        const closingTag = `</${tagName}>`;

        // Insert the closing tag after the cursor
        const newCode = textBeforeCursor + '>' + closingTag + textAfterCursor;
        setCode(newCode);

        // Move the cursor back to the position after the opening tag
        setTimeout(() => {
          e.target.selectionStart = cursorPosition + 1;
          e.target.selectionEnd = cursorPosition + 1;
        }, 0);

        // Prevent the default '>' character from being added
        e.preventDefault();
      }
    }
  };

  return (
    <div className="code-editor" style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
      <Editor
        value={code}
        onValueChange={handleChange}
        highlight={highlight}
        padding={10}
        onKeyDown={handleKeyDown}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
          minHeight: '200px'
        }}
      />
    </div>
  );
};

export default CodeEditor;
