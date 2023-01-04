import * as AuthTypes from '../actiontypes/AuthTypes';

const initialState = {     
    user: {
        id: "",
        name: "",
        username: "",
        token:""
    },
    userForm: {
        username: "",
        password:""
    },
    success_message: "",
    error_message: "",
    validation_errors: null,
    list_spinner: false,
    create_update_spinner: false
};


const authReducer = function (state = initialState, action) {
    switch (action.type) {
        case AuthTypes.SET_LOGIN_DEFAULTS:
            return {
                ...state,
                userForm: {...state.userForm},
                error_message: "",
                validation_errors: null,
                list_spinner: false
            };
        case AuthTypes.HANDLE_LOGIN_CHANGE:
            
            return handleChange(state, action);
        case AuthTypes.LOGIN:
            return {
                ...state,
                list_spinner: true
            };
        case AuthTypes.LOGIN_SUCCESS:
            return {
                ...state,
                list_spinner:false,
                user: action.data
            };
        case AuthTypes.LOGIN_FAILURE:
            return{
                ...state,
                list_spinner:false
            }
        default:
            return state;
    }
};

/**
 * handle field change
 */
 function handleChange(state, action)
 {
     
         return {
             ...state,
             userForm: {...state.userForm, [action.field]: action.data}
         };
      
 } 

export default authReducer;