import { useTypedSelector } from '~common/hooks';

import { selectCumulativeCells } from '../state';

const showFunc = `
    import _React from 'react';
    import {createRoot} from 'react-dom/client';
    const rootEl = document.getElementById('root');
    var show = (value) => {
      if (typeof value === 'object') {
        if (value.$$typeof && value.props) {
          const root = createRoot(rootEl);
          root.render(value);
        }
        else{
          rootEl.innerHTML = JSON.stringify(value);
        }
      } else {
        rootEl.innerHTML = value;
      }
    };
  `;
const showFuncNoop = 'var show = () => {}';

const useCumulativeCode = (cellId: string): string => {
  const cumulativeCells = useTypedSelector(selectCumulativeCells(cellId));
  const cumulativeCode = cumulativeCells
    .filter(({ type }) => type === 'code')
    .reduce((prev, { id, content }) => {
      const acc = [...prev];
      if (id === cellId) acc.push(showFunc);
      else acc.push(showFuncNoop);
      return [...acc, content];
    }, [] as string[])
    .join('\n');
  return cumulativeCode;
};
export default useCumulativeCode;
