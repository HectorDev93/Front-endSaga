import * as CategoryTypes from "../actiontypes/CategoryTypes";

import Category from "../../components/apis/Category";
import { toast } from "react-toastify";

function handleCategoryChange(field, value, checked) {
  return function (dispatch, getState) {
    dispatch({
      type: CategoryTypes.HANDLE_CATEGORY_CHANGE,
      data: value,
      field,
      checked,
    });
  };
}

function setCategoryDefaults() {
  return function (dispatch, getState) {
    dispatch({
      type: CategoryTypes.SET_CATEGORY_DEFAULTS,
    });
  };
}

/**
 * list Societies action
 */
function listCategories() {
  return function (dispatch, getState) {
    // start sending request (first dispatch)
    dispatch({
      type: CategoryTypes.LIST_CATEGORIES
    });

    // async call must dispatch action whether on success or failure
    Category.list()
      .then((response) => {
        dispatch({
          type: CategoryTypes.LIST_CATEGORIES_SUCCESS,
          data: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: CategoryTypes.LIST_CATEGORIES_FAILURE,
          error: error.response.data,
        });
      });
  };
}

/**
 * list all action
 * this function used as a helper action for example to populate dropdowns
 * in other forms
 */
function listAllCategories() {
  return function (dispatch, getState) {
    // async call
    Category.listAll().then((response) => {
      dispatch({
        type: CategoryTypes.LIST_ALL_CATEGORIES,
        data: response.data.data,
      });
    });
  };
}

/**
 * add Society action
 */
function addCategory(name, cb) {
  return function (dispatch, getState) {
    // start creation show spinner
    dispatch({
      type: CategoryTypes.CREATE_CATEGORIES,
    });

    // async call must dispatch action whether on success or failure
    Category.add(name)
      .then((response) => {
        dispatch({
          type: CategoryTypes.CREATE_CATEGORIES_SUCCESS,
          data: response.data,
        });
        toast.success("Categoria creada correctamente");

        cb();
      })
      .catch((error) => {
        dispatch({
          type: CategoryTypes.CREATE_CATEGORIES_FAILURE,
          error: error.response.data,
        });
        toast.error("Oops hubo error al crear categoria");
      });
  };
}

/**
 * show Society action
 */
function showCategory(id) {
  return function (dispatch, getState) {
    // start creation show spinner
    dispatch({
      type: CategoryTypes.SHOW_CATEGORY,
    });

    // async call must dispatch action whether on success or failure
    Category.showOne(id)
      .then((response) => {
        dispatch({
          type: CategoryTypes.SHOW_CATEGORY_SUCCESS,
          data: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: CategoryTypes.SHOW_CATEGORY_FAILURE,
          error: error.response.data,
        });
      });
  };
}

/**
 * edit Society action
 */
function editCategory(name, id, cb) {
  return function (dispatch, getState) {
    // start creation show spinner
    dispatch({
      type: CategoryTypes.EDIT_CATEGORIES,
    });

    // async call must dispatch action whether on success or failure
    Category.edit(name, id)
      .then((response) => {
          dispatch({
            type: CategoryTypes.EDIT_CATEGORIES_SUCCESS,
            data: response.data,
          });

          toast.success("Categoria actualizada correctamente");
     
      cb();
        })
      .catch((error) => {
        dispatch({
          type: CategoryTypes.EDIT_CATEGORIES_FAILURE,
          error: error.response.data,
        });

        toast.error("La categoria no se pudo actualizar");
      });
  };
}

/**
 * delete Society action
 */
function deleteCategory(id) {
  return function (dispatch, getState) {
    // start creation show spinner
    dispatch({
      type: CategoryTypes.DELETE_CATEGORIES,
    });

    // async call must dispatch action whether on success or failure
    Category.remove(id)
      .then((response) => {
          dispatch({
            type: CategoryTypes.DELETE_CATEGORIES_SUCCESS,
            message: response.data.message,
            id: id,
          });

          toast.success("Categoria eliminada correctamente");
       
      })
      .catch((error) => {
        dispatch({
          type: CategoryTypes.DELETE_CATEGORIES_FAILURE,
          error: error.response.data,
        });

        toast.error("Oops hubo un error al eliminar la categoria");
      });
  };
}

export {
  listCategories,
  handleCategoryChange,
  addCategory,
  showCategory,
  editCategory,
  deleteCategory,
  setCategoryDefaults,
  listAllCategories,
};
