/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import { FormFeedback, FormGroup, Input } from '@laazyry/sobrus-design-system';
import React from 'react';
import PropTypes from 'prop-types';

const CustomInput = ({ formik, name, placeholder, validations, type, ...attributes }) => (
  <FormGroup>
    <Input
      autoComplete='off'
      {...formik?.getFieldProps(name)}
      type={type}
      placeholder={placeholder}
      {...attributes}
    />
    {validations && formik.touched[name] && formik.errors[name] ? (
      <FormFeedback invalid>{formik.errors[name]}</FormFeedback>
    ) : null}
  </FormGroup>
);

const propTypes = {
  children: PropTypes.node,
  /** types like normal input */
  type: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  bsSize: PropTypes.string,
  valid: PropTypes.bool,
  validations: PropTypes.bool,
  invalid: PropTypes.bool,
  /** Pass in a Component to override default element */
  tag: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ $$typeof: PropTypes.symbol, render: PropTypes.func }),
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
        PropTypes.shape({ $$typeof: PropTypes.symbol, render: PropTypes.func }),
      ])
    ),
  ]),
  /** ref will only get you a reference to the NavLink component, use innerRef to get a reference to the DOM element (for things like focus management). */
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  plaintext: PropTypes.bool,
  addon: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object,
};

const defaultProps = {
  type: 'text',
};
CustomInput.propTypes = propTypes;
CustomInput.defaultProps = defaultProps;
export default CustomInput;
