/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/prop-types */
import React from 'react';

const InputText = React.forwardRef(
  function InputText(props, ref) {
    const { value, handleChange } = props;

    return (
      <input
        ref={ref}
        type="text"
        className="input_text"
        value={value}
        onChange={handleChange}
      />
    );
  },
);

export default InputText;
