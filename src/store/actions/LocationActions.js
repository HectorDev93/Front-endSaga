import * as LocationTypes from '../actiontypes/LocationTypes';
import * as UtilTypes from '../actiontypes/UtilTypes';

import Location from '../../components/apis/Location';
import { toast } from "react-toastify";

function handleLocationChange(field, value, checked)
{
    return function (dispatch, getState) {

        dispatch({
            type: LocationTypes.HANDLE_LOCATION_CHANGE,
            data: value,
            field,
            checked
        });
    }
}

function setLocationDefaults() {

    return function (dispatch, getState) {

        dispatch({
            type: LocationTypes.SET_LOCATION_DEFAULTS
        });
    }
}

/**
 * list Locations action
 */
function listLocations(page = 1) {

    return function (dispatch, getState) {

        // start sending request (first dispatch)
        dispatch({
            type: LocationTypes.LIST_LOCATIONS
        });


        // async call must dispatch action whether on success or failure
        Location.list(page).then(response => {
            dispatch({
                type: LocationTypes.LIST_LOCATIONS_SUCCESS,
                data: response.data.data
            });
        }).catch(error => {
            dispatch({
                type: LocationTypes.LIST_LOCATIONS_FAILURE,
                error: error.response.data
            });
        });
    }
}

/**
 * list all action
 * this function used as a helper action for example to populate dropdowns
 * in other forms
 */
function listAllLocations() {

    return function (dispatch, getState) {

        // async call
        Location.listAll().then(response => {
            dispatch({
                type: LocationTypes.LIST_ALL_LOCATIONS,
                data: response.data.data
            });
        });
        
    }
}

/**
 * add Location action
 */
function addLocation (name, cb) {

    return function(dispatch, getState) {

        // start creation show spinner
        dispatch({
            type: LocationTypes.CREATE_LOCATIONS
        });

        // async call must dispatch action whether on success or failure
        Location.add(name).then(response => {
            dispatch({
                type: LocationTypes.CREATE_LOCATIONS_SUCCESS,
                data: response.data
            });
            toast.success("Localidad creada correctamente");

            cb();
        }).catch(error => {
            dispatch({
                type: LocationTypes.CREATE_LOCATIONS_FAILURE,
                error: error.response.data
            })
            toast.error("Hubo un error al crear localidad");
        });
    }
}

/**
 * show location action
 */
function showLocation(id)
{
    return function (dispatch, getState) {
        // start creation show spinner
        dispatch({
            type: LocationTypes.SHOW_LOCATION
        });


        // async call must dispatch action whether on success or failure
        Location.showOne(id).then(response => {
            dispatch({
                type: LocationTypes.SHOW_LOCATION_SUCCESS,
                data: response.data
            });

        }).catch(error => {
            dispatch({
                type: LocationTypes.SHOW_LOCATION_FAILURE,
                error: error.response.data
            });
        });
    }
}

/**
 * edit Location action
 */
function editLocation(name, id, cb)
{
    return function (dispatch, getState) {
        // start creation show spinner
        dispatch({
            type: LocationTypes.EDIT_LOCATIONS
        });
 

        // async call must dispatch action whether on success or failure
        Location.edit(name, id).then(response => {
            setTimeout(() => {
            dispatch({
                type: LocationTypes.EDIT_LOCATIONS_SUCCESS,
                data: response.data
            });
            
            toast.success("Localidad actualizada correctamente");
            setTimeout(() => {
                dispatch({
                    type: LocationTypes.LIST_LOCATIONS
                });
                Location.list().then(response => {
                    dispatch({
                        type: LocationTypes.LIST_LOCATIONS_SUCCESS,
                        data: response.data.data
                    });
                }).catch(error => {
                    dispatch({
                        type: LocationTypes.LIST_LOCATIONS_FAILURE,
                        error: error.response.data
                    });
                });
                setTimeout(() => {
                    dispatch({
                        type: UtilTypes.HIDE_MESSAGE
                    }); 
                  }, 2000)
              }, 500)
            }, 10)
        }).catch(error => {
            dispatch({
                type: LocationTypes.EDIT_LOCATIONS_FAILURE,
                error: error.response.data
            })
            
            toast.error("Hubo un eeror al actualizar localidad");
        });
    }
}

/**
 * delete location action
 */
function deleteLocation(id)
{
    return function (dispatch, getState) {

        // start creation show spinner
        dispatch({
            type: LocationTypes.DELETE_LOCATIONS
        });


        // async call must dispatch action whether on success or failure
        Location.remove(id).then(response => {
            setTimeout(() => {
                dispatch({
                    type: LocationTypes.DELETE_LOCATIONS_SUCCESS,
                    message: response.data.message,
                    id: id
                });
                
            toast.success("Localidad eliminada correctamente");
                setTimeout(() => {
                    dispatch({
                        type: UtilTypes.HIDE_MESSAGE
                    });
                  }, 3000)
              }, 10)
              
            
        }).catch(error => {
            dispatch({
                type: LocationTypes.DELETE_LOCATIONS_FAILURE,
                error: error.response.data
            })
            
            toast.error("Hubo un error al eliminar localidad");
        });
    }
}

export {
    listLocations,
    handleLocationChange,
    addLocation,
    showLocation,
    editLocation,
    deleteLocation,
    setLocationDefaults,
    listAllLocations
};