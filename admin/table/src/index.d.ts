// import
import React from 'react';

// typescript import
import { PropsType } from './index';

// definition
export default class TableContainer<T> extends React.PureComponent<
  PropsType<T>
> {}
