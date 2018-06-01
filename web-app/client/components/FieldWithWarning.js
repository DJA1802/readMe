import React from 'react';
import { Input } from 'semantic-ui-react';

const FieldWithWarning = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <React.Fragment>
    <Input {...input} placeholder={label} type={type} />
    {touched && ((error && <p>{error}</p>) || (warning && <p>{warning}</p>))}
  </React.Fragment>
);

export default FieldWithWarning;
