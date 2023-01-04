import React from 'react';

const SuccessAlert = (props) => {

    return props.msg!==""? (
        <div className={props.msg!==""?"alert alert-success fade-in-alert":"alert alert-success"}>
            {props.msg}
        </div>
    ) : null
};

export default SuccessAlert;