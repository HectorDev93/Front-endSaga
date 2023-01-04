import React from 'react';
import { Flip, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

class ToastrNotify extends React.Component {

  render() {
      return  (
        <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        //rtl
        pauseOnFocusLoss
        draggable={false}
        transition={Flip}
        pauseOnHover/>
           )
}
}

export default ToastrNotify;