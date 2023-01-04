import * as PriorityTypes from '../actiontypes/PriorityTypes';

import Priority from '../../components/apis/Priority';

/**
 * list all action
 * this function used as a helper action for example to populate dropdowns
 * in other forms
 */
function listAllPriorities() {

    return function (dispatch, getState) {

        // async call
        Priority.listAll().then(response => {
            dispatch({
                type: PriorityTypes.LIST_ALL_PRIORITIES,
                data: response.data.data
            });
        });
        
    }
}


export {
    listAllPriorities
};