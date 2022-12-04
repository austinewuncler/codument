import { Resizable } from 're-resizable';
import React, { useEffect } from 'react';

import { useTypedDispatch, useTypedSelector } from '~common/hooks';
import { BundlePreview, createBundle, selectBundle } from '~features/bundles';
import { CodeEditor } from '~features/editors';

import { useCumulativeCode } from '../hooks';
import { updateCell } from '../state';

interface Props {
  cellId: string;
  content: string;
}

const CodeCell = ({ content, cellId }: Props): JSX.Element => {
  const dispatch = useTypedDispatch();
  const bundle = useTypedSelector(selectBundle(cellId));
  const cumulativeCode = useCumulativeCode(cellId);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(createBundle({ cellId, code: cumulativeCode }));
    }, 1000);
    return () => clearTimeout(timer);
  }, [cellId, cumulativeCode, dispatch]);

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
            dispatch(updateCell({ cellId, content: value ?? '' }))
          }
        />
      </Resizable>
      <BundlePreview bundle={bundle} />
    </Resizable>
  );
};

export default CodeCell;
