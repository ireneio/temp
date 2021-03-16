// typescript import
import { PropsType } from './index';

// import
import React from 'react';

// definition
export default class TableContainer<T> extends React.PureComponent<
  PropsType<T>
> {}
