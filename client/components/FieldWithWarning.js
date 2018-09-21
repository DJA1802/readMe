import React from 'react';
import { Input } from 'semantic-ui-react';

const FieldWithWarning = ({
  input,
  placeholder,
  type,
  meta: { touched, error, warning }
}) => (
  <React.Fragment>
    <Input {...input} placeholder={placeholder} type={type} />
    {touched && ((error && <p>{error}</p>) || (warning && <p>{warning}</p>))}
  </React.Fragment>
);

export default FieldWithWarning;
