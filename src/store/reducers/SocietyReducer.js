import * as SocietyTypes from '../actiontypes/SocietyTypes';

const initialState = {
    societies: [],            // used in listing page
    all_societies: [],        // used in fill dropdowns
    society: {
        id: "",
        name: "",
        description: ""
    },
    success_message: "",
    error_message: "",
    validation_errors: null,
    list_spinner: false,
    create_update_spinner: false
};

const societyReducer = function (state = initialState, action) {
    switch (action.type) {
        case SocietyTypes.SET_SOCIETY_DEFAULTS:
            return {
                ...state,
                society: {...state.society},
                validation_errors: null,
                list_spinner: false,
                create_update_spinner: false
            };
        case SocietyTypes.HANDLE_SOCIETY_CHANGE:
            
                return handleChange(state, action);
            
        case SocietyTypes.LIST_SOCIETIES:
            return {
                ...state,
                list_spinner: true
            };
        case SocietyTypes.LIST_SOCIETIES_SUCCESS:
            return {
                ...state,
                societies: action.data,
                list_spinner: false
            };
        case SocietyTypes.LIST_SOCIETIES_FAILURE:
            return {
                ...state,
                list_spinner: false
            };
        case SocietyTypes.LIST_ALL_SOCIETIES:
            return {
                ...state,
                all_societies: action.data
            };
        case SocietyTypes.CREATE_SOCIETIES:
            return {
                ...state,
                create_update_spinner: true
            };
        case SocietyTypes.CREATE_SOCIETIES_SUCCESS:
            
            return {
                ...state,
                create_update_spinner: false,
                validation_errors: null
            };
        case SocietyTypes.CREATE_SOCIETIES_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                /* error_message: action.error.message,
                validation_errors: action.error.errors, */
            };
        case SocietyTypes.SHOW_SOCIETY:
            return {
                ...state,
                list_spinner: true
            };
        case SocietyTypes.SHOW_SOCIETY_SUCCESS:
            return {
                ...state,
                list_spinner: false,
                society: action.data.data
            };
        case SocietyTypes.SHOW_SOCIETY_FAILURE:
            return {
                ...state,
                list_spinner: false,
            };

        case SocietyTypes.EDIT_SOCIETIES:
            return {
                ...state,
                list_spinner: true
            };
        case SocietyTypes.EDIT_SOCIETIES_SUCCESS:
            return {
                ...state,
                list_spinner: false,
                validation_errors: null,
            };
        case SocietyTypes.EDIT_SOCIETIES_FAILURE:
            return {
                ...state,
                list_spinner: false,
                validation_errors: action.error.errors,
            };
        case SocietyTypes.DELETE_SOCIETIES:
            return {
                ...state,
                list_spinner: true
            };
        case SocietyTypes.DELETE_SOCIETIES_SUCCESS:
            state.societies = state.societies.filter(item => item.id !== action.id);

            return {
                ...state,
                list_spinner: false,
                societies: state.societies
            };
        case SocietyTypes.DELETE_SOCIETIES_FAILURE:
            return {
                ...state,
                list_spinner: false,
            };
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
             society: {...state.society, [action.field]: action.data}
         };
      
 }
 
export default societyReducer;