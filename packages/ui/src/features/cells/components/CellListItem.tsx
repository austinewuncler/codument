import { motion } from 'framer-motion';
import React from 'react';

import type { Cell } from '../state';
import CodeCell from './CodeCell';
import MarkdownCell from './MarkdownCell';

interface Props {
  cell: Cell;
}

const CellListItem = ({ cell }: Props): JSX.Element => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className="overflow-hidden rounded-lg shadow"
    >
      {cell.type === 'markdown' ? (
        <MarkdownCell content={cell.content} id={cell.id} />
      ) : (
        <CodeCell id={cell.id} content={cell.content} />
      )}
    </motion.article>
  );
};

export default CellListItem;
