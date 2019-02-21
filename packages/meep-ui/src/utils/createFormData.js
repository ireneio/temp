import React from 'react';

export default formData =>
  (formData || []).map(({ name, value, ...props }) =>
    !value || name === '__typename' ? null : (
      <input
        {...props}
        key={name}
        name={name}
        value={value}
        type="hidden"
        readOnly
      />
    ),
  );
