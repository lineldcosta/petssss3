"use strict";
import React from 'react';
import { Field } from 'redux-form';
import Select from 'react-select';

const SelectInputAsync = (props) => {
  return (
    <div>
    <Select.Async
      {...props}
      value={props.input.value}
      onChange={(value) => {
          props.input.onChange(value);
        }
      }
      ref={props.ref}
      onBlur={() => props.input.onBlur(props.input.value)}
      loadOptions={props.loadMethod}
      options={props.options}
    />
    {props.meta.touched &&
     props.meta.error &&
     <span className="error">{props.meta.error}</span>}
    </div>
  )
}
export default SelectInputAsync;
