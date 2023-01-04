import * as AuthTypes from "../actiontypes/AuthTypes";

import Auth from "../../components/apis/Auth";
import { toast } from "react-toastify";


function setAuthDefaults() {
  return function (dispatch, getState) {
    dispatch({
      type: AuthTypes.SET_LOGIN_DEFAULTS,
    });
  };
}
/**
 * show Society action
 */
 function login(data, successCb, failCb) {
    return function (dispatch, getState) {
      // start creation show spinner
      dispatch({
        type: AuthTypes.LOGIN,
      });
  
      // async call must dispatch action whether on success or failure
      Auth.login(data)
        .then((response) => {
          dispatch({
            type: AuthTypes.LOGIN_SUCCESS,
            data: response.data.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: AuthTypes.LOGIN_FAILURE,
            error: error.response.data,
          });
        });
    };
  }
  
function handleUserChange(field, value) {
  return function (dispatch, getState) {
    dispatch({
      type: AuthTypes.HANDLE_LOGIN_CHANGE,
      data: value,
      field
    });
  };
}

export {
    login,
    handleUserChange,
    setAuthDefaults
   // logout
  };