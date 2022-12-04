import MDEditor from '@uiw/react-md-editor';
import { Resizable } from 're-resizable';
import React, { useEffect, useRef, useState } from 'react';

import { useTypedDispatch } from '~common/hooks';
import { Cell, updateCell } from '~features/cells';
import { MarkdownEditor } from '~features/editors';

interface Props extends Pick<Cell, 'content' | 'id'> {}

const MarkdownCell = ({ content, id }: Props): JSX.Element => {
  const [editing, setEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const dispatch = useTypedDispatch();

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
        <MarkdownEditor
          content={content}
          onChange={(value) =>
            dispatch(updateCell({ cellId: id, content: value ?? '' }))
          }
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

export default MarkdownCell;
