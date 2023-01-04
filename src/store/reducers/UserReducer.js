import * as UserTypes from '../actiontypes/UserTypes';

const initialState = {      
    role: localStorage.getItem("user.role_id"),
    allUserType: [], 
    allUserMenu: [],
    userPermission: [],
    spinner: false
};

const userReducer = function (state = initialState, action) {
    switch (action.type) {
        case UserTypes.SET_USER_DEFAULTS:
            return {
                ...state,
                allUserMenu: {...state.allUserMenu},
                spinner: false
            };
        case UserTypes.LOAD_SPINNER:
            return {
                ...state,
                spinner: true
            };
        case UserTypes.USER_ROLE:
            return {
                ...state,
                role: action.data
            };
        case UserTypes.USER_BY_TYPE:
            return{
                ...state,
                allUserType:  action.data
            };
        case UserTypes.USER_MENU:
            return{
                ...state,
                spinner:false,
                allUserMenu: action.data
            };
        case UserTypes.USER_PERMISSION_ACTION:
            return{
                ...state,
                userPermission: action.data
            }    
        default:
            return state;
    }
};

 
export default userReducer;