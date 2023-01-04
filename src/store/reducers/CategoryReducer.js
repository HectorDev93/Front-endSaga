import * as CategoryTypes from '../actiontypes/CategoryTypes';

const initialState = {
    categories: [],            // used in listing page
    all_categories: [],        // used in fill dropdowns
    category: {
        id: "",
        name: ""
    },
    success_message: "",
    error_message: "",
    validation_errors: null,
    list_spinner: false,
    create_update_spinner: false
};

const categoryReducer = function (state = initialState, action) {
    switch (action.type) {
        case CategoryTypes.SET_CATEGORY_DEFAULTS:
            return {
                ...state,
                category: {...state.category},
                validation_errors: null,
                list_spinner: false,
                create_update_spinner: false
            };
        case CategoryTypes.HANDLE_CATEGORY_CHANGE:
            
                return handleChange(state, action);
            
        case CategoryTypes.LIST_CATEGORIES:
            return {
                ...state,
                list_spinner: true
            };
        case CategoryTypes.LIST_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.data,
                list_spinner: false
            };
        case CategoryTypes.LIST_CATEGORIES_FAILURE:
            return {
                ...state,
                list_spinner: false
            };
        case CategoryTypes.LIST_ALL_CATEGORIES:
            return {
                ...state,
                all_categories: action.data
            };
        case CategoryTypes.CREATE_CATEGORIES:
            return {
                ...state,
                create_update_spinner: true
            };
        case CategoryTypes.CREATE_CATEGORIES_SUCCESS:
            
            return {
                ...state,
                create_update_spinner: false,
                validation_errors: null
            };
        case CategoryTypes.CREATE_CATEGORIES_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                error_message: action.error.message,
                validation_errors: action.error.errors,
            };
        case CategoryTypes.SHOW_CATEGORY:
            return {
                ...state,
                list_spinner: true
            };
        case CategoryTypes.SHOW_CATEGORY_SUCCESS:
            return {
                ...state,
                list_spinner: false,
                category: action.data.data
            };
        case CategoryTypes.SHOW_CATEGORY_FAILURE:
            return {
                ...state,
                list_spinner: false,
            };

        case CategoryTypes.EDIT_CATEGORIES:
            return {
                ...state,
                list_spinner: true
            };
        case CategoryTypes.EDIT_CATEGORIES_SUCCESS:
            return {
                ...state,
                list_spinner: false,
                validation_errors: null,
            };
        case CategoryTypes.EDIT_CATEGORIES_FAILURE:
            return {
                ...state,
                list_spinner: false,
                validation_errors: action.error.errors,
            };
        case CategoryTypes.DELETE_CATEGORIES:
            return {
                ...state,
                list_spinner: true
            };
        case CategoryTypes.DELETE_CATEGORIES_SUCCESS:
            state.categories = state.categories.filter(item => item.id !== action.id);

            return {
                ...state,
                list_spinner: false,
                categories: state.categories
            };
        case CategoryTypes.DELETE_CATEGORIES_FAILURE:
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
             category: {...state.category, [action.field]: action.data}
         };
      
 }
 
export default categoryReducer;