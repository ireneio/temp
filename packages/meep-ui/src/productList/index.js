import dynamic from 'next/dynamic';

export default {
  Default: dynamic(() => import('./ProductList')),
  Controlled: dynamic(() => import('./ProductListControlled')),
};
