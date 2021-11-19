// import
import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

// definition
export default SortableContainer(
  (
    props: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLTableSectionElement>,
      HTMLTableSectionElement
    >,
  ) => <tbody {...props} />,
);
