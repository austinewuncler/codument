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
  const resizableRef = useRef<Resizable>(null);
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
        ref={resizableRef}
        defaultSize={{ width: 'auto', height: 'auto' }}
        handleStyles={{ bottom: { cursor: 'ns-resize' } }}
        enable={{ bottom: true }}
        maxHeight={window.innerHeight * 0.7}
      >
        <MarkdownEditor
          content={content.trim().length > 0 ? content : ' '}
          onChange={(value) => {
            const newLines: number = value?.match(/\n/g)?.length ?? 0;
            const lines = newLines + 1;
            const height = lines * 22 + 44;
            resizableRef.current?.updateSize({ width: 'auto', height });
            dispatch(updateCell({ cellId: id, content: value ?? '' }));
          }}
        />
      </Resizable>
    </div>
  ) : (
    <div ref={previewRef}>
      <MDEditor.Markdown
        className="p-4"
        source={content.trim().length === 0 ? 'Click here to edit...' : content}
      />
    </div>
  );
};

export default MarkdownCell;
