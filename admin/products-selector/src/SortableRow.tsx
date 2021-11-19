// import
import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

// definition
export default SortableElement(
  (
    props: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLTableRowElement>,
      HTMLTableRowElement
    >,
  ) => <tr {...props} />,
);
