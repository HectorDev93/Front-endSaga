import * as CollaboratorTypes from "../actiontypes/CollaboratorTypes";

const initialState = {
  collaborators: [], // used in listing page
  all_collaborators: [], // used in fill dropdowns
  collaborator: {
    id: "",
    legajo: "",
    name: "",
    last_name: "",
    society: "",
    department: "",
    location: "",
  },
  success_message: "",
  error_message: "",
  validation_errors: null,
  list_spinner: false,
  create_update_spinner: false,
};

const collaboratorReducer = function (state = initialState, action) {
  switch (action.type) {
    case CollaboratorTypes.SET_COLLABORATOR_DEFAULTS:
      return {
        ...state,
        collaborator: { ...state.collaborator },
        validation_errors: null,
        list_spinner: false,
        create_update_spinner: false,
      };
    case CollaboratorTypes.HANDLE_COLLABORATOR_CHANGE:
      return handleChange(state, action);

    case CollaboratorTypes.LIST_COLLABORATORS:
      return {
        ...state,
        list_spinner: true,
      };
    case CollaboratorTypes.LIST_COLLABORATORS_SUCCESS:
      return {
        ...state,
        collaborators: action.data,
        list_spinner: false,
      };
    case CollaboratorTypes.LIST_COLLABORATORS_FAILURE:
      return {
        ...state,
        list_spinner: false,
      };
    case CollaboratorTypes.LIST_ALL_COLLABORATORS:
      return {
        ...state,
        all_collaborators: action.data,
      };
    case CollaboratorTypes.CREATE_COLLABORATORS:
      return {
        ...state,
        create_update_spinner: true,
      };
    case CollaboratorTypes.CREATE_COLLABORATORS_SUCCESS:
      return {
        ...state,
        create_update_spinner: false,
        validation_errors: null,
      };
    case CollaboratorTypes.CREATE_COLLABORATORS_FAILURE:
      return {
        ...state,
        create_update_spinner: false,
        /* error_message: action.error.message,
        validation_errors: action.error.errors, */
      };
    case CollaboratorTypes.SHOW_COLLABORATOR:
      return {
        ...state,
        list_spinner: true,
      };
    case CollaboratorTypes.SHOW_COLLABORATOR_SUCCESS:
      return {
        ...state,
        list_spinner: false,
        collaborator: action.data.data,
      };
    case CollaboratorTypes.SHOW_COLLABORATOR_FAILURE:
      return {
        ...state,
        list_spinner: false,
      };

    case CollaboratorTypes.EDIT_COLLABORATORS:
      return {
        ...state,
        create_update_spinner: true,
      };
    case CollaboratorTypes.EDIT_COLLABORATORS_SUCCESS:
      return {
        ...state,
        create_update_spinner: false,
        validation_errors: null,
      };
    case CollaboratorTypes.EDIT_COLLABORATORS_FAILURE:
      return {
        ...state,
        create_update_spinner: false,
        validation_errors: action.error.errors,
      };
    case CollaboratorTypes.DELETE_COLLABORATORS:
      return {
        ...state,
        list_spinner: true,
      };
    case CollaboratorTypes.DELETE_COLLABORATORS_SUCCESS:
      state.collaborators = state.collaborators.filter(
        (item) => item.id !== action.id
      );

      return {
        ...state,
        list_spinner: false,
        collaborators: state.collaborators,
      };
    case CollaboratorTypes.DELETE_COLLABORATORS_FAILURE:
      return {
        ...state,
        list_spinner: false,
      };

    case CollaboratorTypes.RESET_FIELDS:
      return {
        ...state,
        collaborator: {
          id: "",
          legajo: "",
          name: "",
          last_name: "",
          society: "",
          department: "",
          location: "",
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
    collaborator: { ...state.collaborator, [action.field]: action.data },
  };
}

export default collaboratorReducer;
