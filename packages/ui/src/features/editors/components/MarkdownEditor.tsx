import MDEditor from '@uiw/react-md-editor';
import { Resizable } from 're-resizable';
import React, { useEffect, useRef, useState } from 'react';

import type { Cell } from '~features/cells';

interface Props extends Pick<Cell, 'content'> {
  onChange: (value?: string) => void;
}

const MarkdownEditor = ({ content, onChange }: Props): JSX.Element => {
  const [editing, setEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (event: MouseEvent): void => {
      if (previewRef.current?.contains(event.target as Node) === true)
        setEditing(true);
      if (editorRef.current?.contains(event.target as Node) === false)
        setEditing(false);
    };
    document.addEventListener('click', listener);
    return () => document.removeEventListener('click', listener);
  }, []);

  return editing ? (
    <div ref={editorRef}>
      <Resizable
        defaultSize={{ width: 'auto', height: 300 }}
        handleStyles={{ bottom: { cursor: 'ns-resize' } }}
        enable={{ bottom: true }}
        minHeight={64}
      >
        <MDEditor
          value={content}
          onChange={onChange}
          visibleDragbar={false}
          height="100%"
        />
      </Resizable>
    </div>
  ) : (
    <div ref={previewRef}>
      <MDEditor.Markdown
        className="p-4"
        source={content.length === 0 ? 'Click here to edit...' : content}
      />
    </div>
  );
};

export default MarkdownEditor;
