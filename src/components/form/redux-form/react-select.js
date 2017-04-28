"use strict";
import React from 'react';
import { Field } from 'redux-form';
import Select from 'react-select';

const SelectInput = (props) => {
  return (
    <div>
    <Select
      {...props}
      value={props.input.value}
      onChange={(value) => {
          props.input.onChange(value);
        }
      }
      onBlur={() => props.input.onBlur(props.input.value)}
      options={props.options}
    />
    {props.meta.touched &&
     props.meta.error &&
     <span className="error">{props.meta.error}</span>}
    </div>
  )
}
export default SelectInput;
