import MonacoEditor, { OnChange } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import prettier from 'prettier';
import babelParser from 'prettier/parser-babel';
import React, { useRef } from 'react';
import { ClipLoader } from 'react-spinners';

import { useTheme } from '~common/hooks';

import nightOwlDark from '../themes/night-owl-dark.json';
import nightOwlLight from '../themes/night-owl-light.json';

const NIGHT_OWL_DARK = 'night-owl-dark';
const NIGHT_OWL_LIGHT = 'night-owl-light';

interface Props {
  content: string;
  onChange: OnChange;
}

const CodeEditor = ({ content, onChange }: Props): JSX.Element => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const { theme } = useTheme();

  return (
    <div className="relative h-full group">
      <MonacoEditor
        value={content}
        language="javascript"
        theme={theme === 'dark' ? NIGHT_OWL_DARK : NIGHT_OWL_LIGHT}
        loading={<ClipLoader />}
        options={{
          automaticLayout: true,
          fontFamily: 'Ubuntu Mono',
          fontSize: 16,
          folding: false,
          lineNumbersMinChars: 3,
          minimap: { enabled: false },
          padding: { top: 22, bottom: 22 },
          scrollBeyondLastLine: false,
          scrollbar: { verticalScrollbarSize: 0 },
          smoothScrolling: true,
          tabSize: 2,
          wordWrap: 'on',
        }}
        beforeMount={(mon) => {
          mon.editor.defineTheme(
            NIGHT_OWL_DARK,
            nightOwlDark as editor.IStandaloneThemeData
          );
          mon.editor.defineTheme(
            NIGHT_OWL_LIGHT,
            nightOwlLight as editor.IStandaloneThemeData
          );
        }}
        onMount={(ed) => {
          editorRef.current = ed;
        }}
        onChange={onChange}
      />
      <button
        onClick={() => {
          const unformatted = editorRef.current?.getValue();
          const formatted = prettier.format(unformatted ?? '', {
            parser: 'babel',
            plugins: [babelParser],
            singleQuote: true,
          });
          editorRef.current?.setValue(formatted.replace(/\n$/, ''));
        }}
        className="absolute p-1 text-xs font-bold text-white transition-all duration-300 rounded opacity-0 dark:text-black top-1 right-1 bg-primary group-hover:opacity-100"
      >
        Format
      </button>
    </div>
  );
};

export default CodeEditor;
