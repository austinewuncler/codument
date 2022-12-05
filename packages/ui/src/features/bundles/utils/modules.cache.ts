import { createInstance } from 'localforage';

const modulesCache = createInstance({ name: 'modules-cache' });
export default modulesCache;
