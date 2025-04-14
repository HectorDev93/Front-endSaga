import * as RequesTypes from "../actiontypes/RequesTypes";

const initialState = {
  requess: [], // used in listing page
  all_requess: [], // used in fill dropdowns
  reques: {
    id: "",
    numCase: "",
    society: "",
    department: "",
    location: "",
    condition: "",
    categoryType: "",
    category: "",
    c1Name: "",
    c1Lname: "",
    c2Name: "",
   // c2Lname: "",
    collaboratorAttended: "",
    description:"",
    priority:"",
    support:"",
    created_at:""
  },
  selection : {
    yearNow:new Date().getFullYear(),
    userNow:localStorage.getItem("user.id"),
    monthNow:0
  },
  search:{
     searchTerm: ""
  },
  success_message: "",
  error_message: "",
  validation_errors: null,
  list_spinner: false,
  create_update_spinner: false,
};

const requesReducer = function (state = initialState, action) {
  switch (action.type) {
    case RequesTypes.SET_REQUES_DEFAULTS:
      return {
        ...state,
        reques: { ...state.reques },
        validation_errors: null,
        list_spinner: false,
        create_update_spinner: false,
      };
    case RequesTypes.HANDLE_REQUES_CHANGE:
      return handleChange(state, action);
    case RequesTypes.HANDLE_GETREQUES_CHANGE:
      return handleChangeSupport(state, action);
    case RequesTypes.HANDLE_GET_DINAMIC:
      return handleChangeSearch(state, action);
    case RequesTypes.LIST_REQUESS:
      return {
        ...state,
        list_spinner: true,
      };
    case RequesTypes.LIST_REQUESS_SUCCESS:
      return {
        ...state,
        requess: action.data,
        list_spinner: false,
      };
    case RequesTypes.LIST_REQUESS_FAILURE:
      return {
        ...state,
        list_spinner: false,
      };
    case RequesTypes.LIST_ALL_REQUESS:
      return {
        ...state,
        all_requess: action.data,
      };
    case RequesTypes.CREATE_REQUESS:
      return {
        ...state,
        create_update_spinner: true,
      };
    case RequesTypes.CREATE_REQUESS_SUCCESS:
      return {
        ...state,
        create_update_spinner: false,
        validation_errors: null,
      };
    case RequesTypes.CREATE_REQUESS_FAILURE:
      return {
        ...state,
        create_update_spinner: false,
       /*  error_message: action.error.message,
        validation_errors: action.error.errors, */
      };
    case RequesTypes.SHOW_REQUES:
      return {
        ...state,
        list_spinner: true,
      };
    case RequesTypes.SHOW_REQUES_SUCCESS:
      return {
        ...state,
        list_spinner: false,
        reques: action.data.data,
      };
    case RequesTypes.SHOW_REQUES_FAILURE:
      return {
        ...state,
        list_spinner: false,
      };

    case RequesTypes.EDIT_REQUESS:
      return {
        ...state,
        create_update_spinner: true,
      };
    case RequesTypes.EDIT_REQUESS_SUCCESS:
      return {
        ...state,
        create_update_spinner: false,
        validation_errors: null,
      };
    case RequesTypes.EDIT_REQUESS_FAILURE:
      return {
        ...state,
        create_update_spinner: false,
        validation_errors: action.error.errors,
      };
    case RequesTypes.DELETE_REQUESS:
      return {
        ...state,
        list_spinner: true,
      };
    case RequesTypes.DELETE_REQUESS_SUCCESS:
      state.requess = state.requess.filter(
        (item) => item.id !== action.id
      );

      return {
        ...state,
        list_spinner: false,
        requess: state.requess,
      };
    case RequesTypes.DELETE_REQUESS_FAILURE:
      return {
        ...state,
        list_spinner: false,
      };

    case RequesTypes.RESET_FIELDS:
      return {
        ...state,
        reques: {
            id: "",
            numCase: "",
            society: "",
            department: "",
            location: "",
            condition: "",
            categoryType: "",
            category: "",
            c1Name: "",
            c1Lname: "",
            c2Name: "",
           // c2Lname: "",
            description:"",
            priority:"",
            collaboratorAttended:"",
            support:"",
            created_at:""
          },
      };
    default:
      return state;
  }
};

/**
 * handle field change
 */
function handleChange(state, action) {
  return {
    ...state,
    reques: { ...state.reques, [action.field]: action.data },
  };
}


/**
 * handle field change
 */
 function handleChangeSupport(state, action) {
  return {
    ...state,
    selection: {...state.selection, [action.field]: action.data}
};
}

/**
 * handle search field change
 */
 function handleChangeSearch(state, action) {
  return {
    ...state,
    search: {...state.search, [action.field]: action.data}
};
}


export default requesReducer;
