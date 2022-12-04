import MDEditor from '@uiw/react-md-editor';
import React from 'react';

import type { Cell } from '~features/cells';

interface Props extends Pick<Cell, 'content'> {
  onChange: (value?: string) => void;
}

const MarkdownEditor = ({ content, onChange }: Props): JSX.Element => {
  return (
    <MDEditor
      value={content}
      onChange={onChange}
      visibleDragbar={false}
      height="100%"
    />
  );
};

export default MarkdownEditor;
