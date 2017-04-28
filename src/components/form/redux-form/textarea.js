"use strict";
import React from 'react';
import { props } from 'redux-form';

const TextArea = (props) => {
  return (
    <div>
      <textarea {...props.input} className={props.className} rows="4" placeholder={props.placeholder} autoComplete={props.autoComplete}/>
      {props.meta.touched &&
       props.meta.error &&
       <span className="error">{props.meta.error}</span>}
    </div>
  )
}
export default TextArea;
