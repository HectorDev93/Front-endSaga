import * as ConditionTypes from '../actiontypes/ConditionTypes';

import Condition from '../../components/apis/Condition';

/**
 * list all action
 * this function used as a helper action for example to populate dropdowns
 * in other forms
 */
function listAllConditions() {

    return function (dispatch, getState) {

        // async call
        Condition.listAll().then(response => {
            dispatch({
                type: ConditionTypes.LIST_ALL_CONDITIONS,
                data: response.data.data
            });
        });
        
    }
}


export {
    listAllConditions
};