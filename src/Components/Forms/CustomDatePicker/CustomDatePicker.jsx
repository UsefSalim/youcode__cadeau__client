/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import { DatePicker, FormFeedback, FormGroup } from '@laazyry/sobrus-design-system';
import React from 'react';
import PropTypes from 'prop-types';

const CustomDatePicker = ({ formik, name, placeholder, validations, ...attributes }) => (
  <FormGroup>
    <DatePicker
      autoComplete='off'
      name={name}
      placeholder={placeholder}
      showYearDropdown
      calendarMainColor='primary'
      selected={formik.values[name] ? new Date(formik.values[name]) : new Date()}
      onChange={(date) => formik?.setFieldValue(name, date)}
      {...attributes}
    />
    {validations && formik.touched[name] && formik.errors[name] ? (
      <FormFeedback invalid>{formik.errors[name]}</FormFeedback>
    ) : null}
  </FormGroup>
);

CustomDatePicker.propTypes = {
  disabled: PropTypes.bool,
  selected: PropTypes.string,
  onChange: PropTypes.func,
  showTimeSelect: PropTypes.bool,
  timeFormat: PropTypes.string,
  timeIntervals: PropTypes.number,
  timeCaption: PropTypes.string,
  dateFormat: PropTypes.string,
  todayButton: PropTypes.string,
  popperPlacement: PropTypes.string,
  customInput: PropTypes.elementType,
  locale: PropTypes.string,
  useWeekdaysShort: PropTypes.bool,
  isClearable: PropTypes.bool,
  showYearDropdown: PropTypes.bool,
  placeholder: PropTypes.string,
  isValid: PropTypes.bool,
  id: PropTypes.string,
};

CustomDatePicker.defaultProps = {
  timeFormat: 'HH:mm',
  timeIntervals: 15,
  timeCaption: 'Heure',
  dateFormat: 'yyyy-MM-dd HH:mm',
  todayButton: "Aujourd'hui",
  popperPlacement: 'auto',
  locale: 'fr',
  showYearDropdown: false,
  placeholder: '',
  isValid: false,
  disabled: false,
  id: 'sob_date_picker_id',
};

export default CustomDatePicker;
