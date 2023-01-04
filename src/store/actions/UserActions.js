import * as UserTypes from "../actiontypes/UserTypes";

import User from "../../components/apis/User";


export function setUserDefaults() {
  return function (dispatch, getState) {
    dispatch({
      type: UserTypes.SET_USER_DEFAULTS,
    });
  };
}

export function getRole(user){
    //alert(id);
    return function (dispatch, getState){
        setTimeout(() => {  
      //async call
      User.getRole(user).then((response) =>{
        dispatch({
          type: UserTypes.USER_ROLE,
          data: response.data.data
        });
      });
    }, 100)
    }
}
export function userByType(type) {
  return function (dispatch, getState) {
    // async call
    User.getUserByType(type).then((response) => {
      dispatch({
        type: UserTypes.USER_BY_TYPE,
        data: response.data.data,
      });
    });
  };
}
export function userMenu(user){
  return function(dispatch, getState){
   /*  dispatch({
      type: UserTypes.LOAD_SPINNER
    }); */
    User.getUserMenu(user).then((response) => {
        dispatch({
          type: UserTypes.USER_MENU,
          data: response.data.data
        });
    });
  };
}

export function userPermissionAction(user, permissionAction){
  //console.log(user + " " + permissionAction);
  return function(dispatch, getState){
    User.getUserPermissionAction(user ,permissionAction).then((response) => {
        dispatch({
          type: UserTypes.USER_PERMISSION_ACTION,
          data: response.data.data
        });
        //console.log(response);
    });
  };
}