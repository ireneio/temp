import dynamic from 'next/dynamic';

export { default as handleModuleData } from './utils/handleModuleData';

export default dynamic(() => import('./Menu'));
