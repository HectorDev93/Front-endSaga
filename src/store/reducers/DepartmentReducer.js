import * as DepartmentTypes from '../actiontypes/DepartmentTypes';

const initialState = {
    departments: [],            // used in listing page
    all_departments: [],        // used in fill dropdowns
    department: {
        id: "",
        name: "",
        society: ""
    },
    success_message: "",
    error_message: "",
    validation_errors: null,
    list_spinner: false,
    create_update_spinner: false
};

const departmentReducer = function (state = initialState, action) {
    switch (action.type) {
        case DepartmentTypes.SET_DEPARTMENT_DEFAULTS:
            return {
                ...state,
                department: {...state.department},
                validation_errors: null,
                list_spinner: false,
                create_update_spinner: false
            };
        case DepartmentTypes.HANDLE_DEPARTMENT_CHANGE:
            
                return handleChange(state, action);
            
        case DepartmentTypes.LIST_DEPARTMENTS:
            return {
                ...state,
                list_spinner: true
            };
        case DepartmentTypes.LIST_DEPARTMENTS_SUCCESS:
            return {
                ...state,
                departments: action.data,
                list_spinner: false
            };
        case DepartmentTypes.LIST_DEPARTMENTS_FAILURE:
            return {
                ...state,
                list_spinner: false
            };
        case DepartmentTypes.LIST_ALL_DEPARTMENTS:
            return {
                ...state,
                all_departments: action.data
            };
        case DepartmentTypes.LIST_DEPARTMENTS_SOCIETY:
            return {
                ...state,
                all_departments: action.data
            };
        case DepartmentTypes.CREATE_DEPARTMENTS:
            return {
                ...state,
                create_update_spinner: true
            };
        case DepartmentTypes.CREATE_DEPARTMENTS_SUCCESS:
            
            return {
                ...state,
                create_update_spinner: false,
                validation_errors: null
            };
        case DepartmentTypes.CREATE_DEPARTMENTS_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                /* error_message: action.error.message,
                validation_errors: action.error.errors, */
            };
        case DepartmentTypes.SHOW_DEPARTMENT:
            return {
                ...state,
                list_spinner: true
            };
        case DepartmentTypes.SHOW_DEPARTMENT_SUCCESS:
            return {
                ...state,
                list_spinner: false,
                department: action.data.data
            };
        case DepartmentTypes.SHOW_DEPARTMENT_FAILURE:
            return {
                ...state,
                list_spinner: false,
            };

        case DepartmentTypes.EDIT_DEPARTMENTS:
            return {
                ...state,
                create_update_spinner: true
            };
        case DepartmentTypes.EDIT_DEPARTMENTS_SUCCESS:
            return {
                ...state,
                create_update_spinner: false,
                validation_errors: null,
            };
        case DepartmentTypes.EDIT_DEPARTMENTS_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                validation_errors: action.error.errors,
            };
        case DepartmentTypes.DELETE_DEPARTMENTS:
            return {
                ...state,
                list_spinner: true
            };
        case DepartmentTypes.DELETE_DEPARTMENTS_SUCCESS:
            state.departments = state.departments.filter(item => item.id !== action.id);

            return {
                ...state,
                list_spinner: false,
                departments: state.departments
            };
        case DepartmentTypes.DELETE_DEPARTMENTS_FAILURE:
            return {
                ...state,
                list_spinner: false,
            };
        
            case DepartmentTypes.RESET_FIELDS:
                return {
                    ...state,
                    department: {
                        id: "",
                        name: "",
                        society: ""
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
             department: {...state.department, [action.field]: action.data}
         };
      
 }
 
export default departmentReducer;