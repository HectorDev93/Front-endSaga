import * as LocationTypes from '../actiontypes/LocationTypes';
import * as UtilTypes from '../actiontypes/UtilTypes';

const initialState = {
    locations: [],            // used in listing page
    all_locations: [],        // used in fill dropdowns
    location: {
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

const locationReducer = function (state = initialState, action) {
    //let locations = state.locations;
    switch (action.type) {
        case LocationTypes.SET_LOCATION_DEFAULTS:
            return {
                ...state,
                location: {...state.location},
                success_message: "",
                error_message: "",
                validation_errors: null,
                list_spinner: false,
                create_update_spinner: false
            };
        case LocationTypes.HANDLE_LOCATION_CHANGE:
            
                return handleChange(state, action);
            
        case LocationTypes.LIST_LOCATIONS:
            return {
                ...state,
                list_spinner: true
            };
        case LocationTypes.LIST_LOCATIONS_SUCCESS:
            return {
                ...state,
                locations: action.data,
                list_spinner: false
            };
        case LocationTypes.LIST_LOCATIONS_FAILURE:
            return {
                ...state,
                error_message: action.error,
                list_spinner: false
            };
        case LocationTypes.LIST_ALL_LOCATIONS:
            return {
                ...state,
                all_locations: action.data
            };
        case LocationTypes.CREATE_LOCATIONS:
            return {
                ...state,
                create_update_spinner: true
            };
        case LocationTypes.CREATE_LOCATIONS_SUCCESS:
            
           // state.locations.data = state.locations.filter(item => item.id !== action.id);
            return {
                ...state,
                create_update_spinner: false,
            //    location: action.data.data,
                //success_message: action.data.message,
                error_message: "",
                validation_errors: null
            };
        case LocationTypes.CREATE_LOCATIONS_FAILURE:
            return {
                ...state,
                create_update_spinner: false,
                //error_message: action.error.message,
                //validation_errors: action.error.errors,
                success_message: ""
            };
        case LocationTypes.SHOW_LOCATION:
            return {
                ...state,
                list_spinner: true
            };
        case LocationTypes.SHOW_LOCATION_SUCCESS:
            return {
                ...state,
                list_spinner: false,
                location: action.data.data
            };
        case LocationTypes.SHOW_LOCATION_FAILURE:
            return {
                ...state,
                list_spinner: false,
                error_message: action.error.message
            };

        case LocationTypes.EDIT_LOCATIONS:
            return {
                ...state,
                list_spinner: true
            };
        case LocationTypes.EDIT_LOCATIONS_SUCCESS:
            //state.locations.data = state.locations.filter(item => item.id !== action.id);
            return {
                ...state,
                list_spinner: false,
                //location: action.data.data,
                //success_message: action.data.message,
                error_message: "",
                validation_errors: null,
                after_update:true
            };
        case LocationTypes.EDIT_LOCATIONS_FAILURE:
            return {
                ...state,
                list_spinner: false,
                //error_message: action.error.message,
                validation_errors: action.error.errors,
                success_message: ""
            };
        case LocationTypes.DELETE_LOCATIONS:
            return {
                ...state,
                list_spinner: true
            };
        case LocationTypes.DELETE_LOCATIONS_SUCCESS:
            //locations.data = state.locations.data.filter(item => item.id !== action.id);
            state.locations = state.locations.filter(item => item.id !== action.id);

            return {
                ...state,
                list_spinner: false,
                //success_message: action.message,
                locations: state.locations
            };
        case LocationTypes.DELETE_LOCATIONS_FAILURE:
            return {
                ...state,
                list_spinner: false,
                //error_message: action.error.message,
                success_message: ''
            };
            case UtilTypes.HIDE_MESSAGE:
            return {
                ...state,
                success_message: ''
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
             location: {...state.location, [action.field]: action.data}
         };
      
 }
 
export default locationReducer;