import { TypedUseSelectorHook, useSelector } from 'react-redux';

import type { RootState } from '~common/store';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
