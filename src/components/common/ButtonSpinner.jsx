import React from 'react';
const ButtonSpinner = (props) => {
  return(
    <button id='btn-generic' type="submit" className="btn btn-primary btn-block">
    {props.isLoading ?<i className="fa fa-circle-o-notch fa-spin"></i> : props.text} 
     </button>
  );
};

export default ButtonSpinner;