import * as CategoryTypeTypes from "../actiontypes/CategoryTypeTypes";

import CategoryType from "../../components/apis/CategoryType";
import { toast } from "react-toastify";

function handleCategoryTypeChange(field, value, checked) {
  return function (dispatch, getState) {
    dispatch({
      type: CategoryTypeTypes.HANDLE_CATEGORY_TYPE_CHANGE,
      data: value,
      field,
      checked,
    });
    
  };
}

function setCategoryTypeDefaults() {
  return function (dispatch, getState) {
    dispatch({
      type: CategoryTypeTypes.SET_CATEGORY_TYPE_DEFAULTS,
    });
  };
}

/**
 * list Societies action
 */
function listCategoryTypes() {
  return function (dispatch, getState) {
    // start sending request (first dispatch)
    dispatch({
      type: CategoryTypeTypes.LIST_CATEGORY_TYPES,
    });

    // async call must dispatch action whether on success or failure
    CategoryType.list()
      .then((response) => {
        dispatch({
          type: CategoryTypeTypes.LIST_CATEGORY_TYPES_SUCCESS,
          data: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: CategoryTypeTypes.LIST_CATEGORY_TYPES_FAILURE,
          error: error.response.data,
        });
      });
  };
}
function listCategoryTypeCategory(id){
  //alert(id);
  return function (dispatch, getState){
    //async call
    CategoryType.getByCategory(id).then((response) =>{
      dispatch({
        type: CategoryTypeTypes.LIST_CATEGORY_TYPES_CATEGORY,
        data: response.data.data
      });
    });
  }
}
/**
 * list all action
 * this function used as a helper action for example to populate dropdowns
 * in other forms
 */
function listAllCategoryTypes() {
  return function (dispatch, getState) {
    // async call
    CategoryType.listAll().then((response) => {
      dispatch({
        type: CategoryTypeTypes.LIST_ALL_CATEGORY_TYPES,
        data: response.data.data,
      });
    });
  };
}

/**
 * add Society action
 */
function addCategoryType(name, cb) {
  return function (dispatch, getState) {
    
    dispatch({
      type: CategoryTypeTypes.CREATE_CATEGORY_TYPES,
    });

    
    CategoryType.add(name)
      .then((response) => {
        dispatch({
          type: CategoryTypeTypes.CREATE_CATEGORY_TYPES_SUCCESS,
          data: response.data,
        });
        toast.success("Solicitud exitosa");

        cb();
      })
      .catch((error) => {
        if(error.response.status === 303){
          dispatch({
          type: CategoryTypeTypes.CREATE_CATEGORY_TYPES_FAILURE,
          error: error.response.data,
        });
          //toast.error("Esta categoria existe" + JSON.stringify(error.response.status));
          toast.error("Este elemento ya existe en el sistema");
        }else{
        dispatch({
          type: CategoryTypeTypes.CREATE_CATEGORY_TYPES_FAILURE,
          error: error.response.data,
        });
        toast.warning("Permiso denegado");
      }
      });
  };
}

/**
 * show Society action
 */
function showCategoryType(id) {
  return function (dispatch, getState) {
    // start creation show spinner
    dispatch({
      type: CategoryTypeTypes.SHOW_CATEGORY_TYPE,
    });

    // async call must dispatch action whether on success or failure
    CategoryType.showOne(id)
      .then((response) => {
        dispatch({
          type: CategoryTypeTypes.SHOW_CATEGORY_TYPE_SUCCESS,
          data: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: CategoryTypeTypes.SHOW_CATEGORY_TYPE_FAILURE,
          error: error.response.data,
        });
      });
  };
}

/**
 * edit Society action
 */
function editCategoryType(name, id, cb) {
  return function (dispatch, getState) {
    // start creation show spinner
    dispatch({
      type: CategoryTypeTypes.EDIT_CATEGORY_TYPES,
    });

    // async call must dispatch action whether on success or failure
    CategoryType.edit(name, id)
      .then((response) => {
          dispatch({
            type: CategoryTypeTypes.EDIT_CATEGORY_TYPES_SUCCESS,
            data: response.data,
          });

          toast.success("Registro actualizado correctamente");
     
          // eslint-disable-next-line no-unused-expressions
          cb();
      })

      .catch((error) => {
        if(error.response.status === 303){
          dispatch({
          type: CategoryTypeTypes.EDIT_CATEGORY_TYPES_FAILURE,
          error: error.response.data,
        });
          //toast.error("Esta categoria existe" + JSON.stringify(error.response.status));
          toast.error("Este registro existe en el sistema");
        }else{
        dispatch({
          type: CategoryTypeTypes.EDIT_CATEGORY_TYPES_FAILURE,
          error: error.response.data,
        });
        toast.warning("Permiso denegado");
        }
      });
  };
}

/**
 * delete Society action
 */
function deleteCategoryType(id) {
  return function (dispatch, getState) {
    // start creation show spinner
    dispatch({
      type: CategoryTypeTypes.DELETE_CATEGORY_TYPES,
    });

    // async call must dispatch action whether on success or failure
    CategoryType.remove(id)
      .then((response) => {
        
          dispatch({
            type: CategoryTypeTypes.DELETE_CATEGORY_TYPES_SUCCESS,
            message: response.data.message,
            id: id,
          });
          toast.success("Solicitud exitosa");
      })
      .catch((error) => {
        dispatch({
          type: CategoryTypeTypes.DELETE_CATEGORY_TYPES_FAILURE,
          error: error.response.data,
        });

        toast.warning("Permiso denegado");
      });
  };
}

function resetFields() {

  return function (dispatch, getState) {

      dispatch({
          type: CategoryTypeTypes.RESET_FIELDS
      });
  }
}
export {
  listCategoryTypes,
  listCategoryTypeCategory,
  handleCategoryTypeChange,
  addCategoryType,
  showCategoryType,
  editCategoryType,
  deleteCategoryType,
  setCategoryTypeDefaults,
  listAllCategoryTypes,
  resetFields
};
