/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import { FormFeedback, FormGroup, InputSelect } from '@laazyry/sobrus-design-system';
import React from 'react';
import PropTypes from 'prop-types';

const CustomInputSelect = ({
  formik,
  name,
  placeholder,
  validations,
  options,
  value,
  isClearable,
  ...attributes
}) => {
  return (
    <FormGroup>
      <InputSelect
        autoComplete='off'
        name={name}
        placeholder={placeholder}
        onChange={(e) => formik?.setFieldValue(name, e?.value)}
        value={
          value || formik?.values[name]
            ? {
                label: options?.find((x) => x.value === formik?.values[name])?.label,
                value: formik?.values[name],
              }
            : ''
        }
        isClearable={isClearable}
        options={options}
        {...attributes}
      />
      {validations && formik?.touched[name] && formik?.errors[name] ? (
        <FormFeedback invalid>{formik?.errors[name]}</FormFeedback>
      ) : null}
    </FormGroup>
  );
};

const propTypes = {
  children: PropTypes.node,
  inline: PropTypes.bool,
  color: PropTypes.string,
  /** apply a className to the control */
  className: PropTypes.string,
  cssModule: PropTypes.object,
  name: PropTypes.string,
  /** apply classNames to inner elements with the given prefix */
  classNamePrefix: PropTypes.string,
  /** specify the options the user can select from */
  options: PropTypes.array,

  defaultValue: PropTypes.object,
  /** control the current value */
  value: PropTypes.object,
  /** subscribe to change events */
  onChange: PropTypes.func,
  /** allow the user to search for matching options */
  isSearchable: PropTypes.bool,

  isClearable: PropTypes.bool,
  placeholder: PropTypes.string,
  invalid: PropTypes.bool,
  valid: PropTypes.bool,
  /**  allow the user to select multiple values */
  isMulti: PropTypes.bool,
  /** the message shown in cas no options  */
  noOptionsMessage: PropTypes.string,
};

const defaultProps = {
  validations: false,
  isClearable: true,
  name: 'searchSelect',
  className: 'basic-select',
  classNamePrefix: 'basic-select',
  placeholder: 'Sélectionner',
  noOptionsMessage: 'Non résultat',
  isMulti: false,
};
CustomInputSelect.propTypes = propTypes;
CustomInputSelect.defaultProps = defaultProps;
export default CustomInputSelect;
