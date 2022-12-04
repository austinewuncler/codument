import { Resizable } from 're-resizable';
import React from 'react';

import { useTypedDispatch } from '~common/hooks';
import { BundlePreview } from '~features/bundles';
import { CodeEditor } from '~features/editors';

import { Cell, updateCell } from '../state';

interface Props extends Pick<Cell, 'content' | 'id'> {}

const CodeCell = ({ content, id }: Props): JSX.Element => {
  const dispatch = useTypedDispatch();

  return (
    <Resizable
      className="flex"
      defaultSize={{ width: 'auto', height: 300 }}
      handleStyles={{ bottom: { cursor: 'ns-resize' } }}
      enable={{ bottom: true }}
      minHeight={64}
    >
      <Resizable
        defaultSize={{ width: '50%', height: 'auto' }}
        handleStyles={{ right: { cursor: 'ew-resize' } }}
        enable={{ right: true }}
        minWidth="25%"
        maxWidth="75%"
      >
        <CodeEditor
          content={content}
          onChange={(value) =>
            dispatch(updateCell({ cellId: id, content: value ?? '' }))
          }
        />
      </Resizable>
      <BundlePreview />
    </Resizable>
  );
};

export default CodeCell;
