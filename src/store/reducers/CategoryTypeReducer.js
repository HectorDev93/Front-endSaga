import * as CategoryTypeTypes from '../actiontypes/CategoryTypeTypes';

const initialState = {
    categoryTypes: [],            // used in listing page
    all_categoryTypes: [],        // used in fill dropdowns
    categoryType: {
        id: "",
        name: "",
        category: ""
    },
    success_message: "",
    error_message: "",
    validation_errors: null,
    list_spinner: false,
    create_update_spinner: false
};

const categoryTypeReducer = function (state = initialState, action) {
    switch (action.type) {
        case CategoryTypeTypes.SET_CATEGORY_TYPE_DEFAULTS:
            return {
                ...state,
                categoryType: {...state.categoryType},
                validation_errors: null,
                list_spinner: false,
                create_update_spinner: false
            };
        case CategoryTypeTypes.HANDLE_CATEGORY_TYPE_CHANGE:
            
                return handleChange(state, action);
            
        case CategoryTypeTypes.LIST_CATEGORY_TYPES:
            return {
                ...state,
                list_spinner: true
            };
        case CategoryTypeTypes.LIST_CATEGORY_TYPES_SUCCESS:
            return {
                ...state,
                categoryTypes: action.data,
                list_spinner: false
            };
        case CategoryTypeTypes.LIST_CATEGORY_TYPES_FAILURE:
            return {
                ...state,
                list_spinner: false
            };
        case CategoryTypeTypes.LIST_ALL_CATEGORY_TYPES:
            return {
                ...state,
                all_categoryTypes: action.data
            };
        case CategoryTypeTypes.LIST_CATEGORY_TYPES_CATEGORY:
            return {
                ...state,
                all_categoryTypes: action.data
            };
        case CategoryTypeTypes.CREATE_CATEGORY_TYPES:
            return {
                ...state,
                create_update_spinner: true
            };
        case CategoryTypeTypes.CREATE_CATEGORY_TYPES_SUCCESS:
            
            return {
                ...state,
                create_update_spinner: false,
                validation_errors: null
            };
        case CategoryTypeTypes.CREATE_CATEGORY_TYPES_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                error_message: action.error.message,
                validation_errors: action.error.errors,
            };
        case CategoryTypeTypes.SHOW_CATEGORY_TYPE:
            return {
                ...state,
                list_spinner: true
            };
        case CategoryTypeTypes.SHOW_CATEGORY_TYPE_SUCCESS:
            return {
                ...state,
                list_spinner: false,
                categoryType: action.data.data
            };
        case CategoryTypeTypes.SHOW_CATEGORY_TYPE_FAILURE:
            return {
                ...state,
                list_spinner: false,
            };

        case CategoryTypeTypes.EDIT_CATEGORY_TYPES:
            return {
                ...state,
                list_spinner: true
            };
        case CategoryTypeTypes.EDIT_CATEGORY_TYPES_SUCCESS:
            return {
                ...state,
                list_spinner: false,
                validation_errors: null,
            };
        case CategoryTypeTypes.EDIT_CATEGORY_TYPES_FAILURE:
            return {
                ...state,
                list_spinner: false,
                validation_errors: action.error.errors,
            };
        case CategoryTypeTypes.DELETE_CATEGORY_TYPES:
            return {
                ...state,
                list_spinner: true
            };
        case CategoryTypeTypes.DELETE_CATEGORY_TYPES_SUCCESS:
            state.categoryTypes = state.categoryTypes.filter(item => item.id !== action.id);

            return {
                ...state,
                list_spinner: false,
                categoryTypes: state.categoryTypes
            };
        case CategoryTypeTypes.DELETE_CATEGORY_TYPES_FAILURE:
            return {
                ...state,
                list_spinner: false,
            };
        
            case CategoryTypeTypes.RESET_FIELDS:
                return {
                    ...state,
                    categoryType: {
                        id: "",
                        name: "",
                        category: ""
                    }
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
             categoryType: {...state.categoryType, [action.field]: action.data}
         };
      
 }
 
export default categoryTypeReducer;