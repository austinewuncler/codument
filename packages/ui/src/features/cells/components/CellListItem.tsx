import { motion } from 'framer-motion';
import React from 'react';

import { useTypedDispatch } from '~common/hooks';
import { MarkdownEditor } from '~features/editors';

import { Cell, updateCell } from '../state';

interface Props {
  cell: Cell;
}

const CellListItem = ({ cell }: Props): JSX.Element => {
  const dispatch = useTypedDispatch();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className="overflow-hidden rounded-lg shadow"
    >
      {cell.type === 'markdown' ? (
        <MarkdownEditor
          content={cell.content}
          onChange={(value) =>
            dispatch(updateCell({ cellId: cell.id, content: value ?? '' }))
          }
        />
      ) : (
        <div>Code</div>
      )}
    </motion.article>
  );
};

export default CellListItem;
