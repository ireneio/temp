import React from 'react';

export default formData =>
  (formData || []).map(
    ({ name, value, ...props }) =>
      !value ? null : (
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
