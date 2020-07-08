// import
import dynamic from 'next/dynamic';

// definition
export default dynamic(() => import('./Editor'), { ssr: false });
