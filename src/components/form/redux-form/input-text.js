"use strict";
import React from 'react';
import { Field } from 'redux-form';

const InputText = (props) => {
  return (
    <div>
      <input {...props.input} type={props.type} placeholder={props.placeholder} autoComplete={props.autoComplete}/>
      {props.meta.touched &&
       props.meta.error &&
       <span className="error">{props.meta.error}</span>}
    </div>

  );
}
export default InputText;
