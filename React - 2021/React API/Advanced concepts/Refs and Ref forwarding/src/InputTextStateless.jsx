import React from 'react';

const InputTextStateless = React.forwardRef((props, ref) => (
  <input type="text" className="text_input" ref={ref} />
));

InputTextStateless.displayName = 'InputTextStateless';

export default InputTextStateless;
