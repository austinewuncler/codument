import { useDispatch } from 'react-redux';

import type { TypedDispatch } from '~common/store';

const useTypedDispatch: () => TypedDispatch = useDispatch;

export default useTypedDispatch;
