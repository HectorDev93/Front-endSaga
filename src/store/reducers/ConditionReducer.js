import * as ConditionTypes from '../actiontypes/ConditionTypes';

const initialState = {         // used in listing page
    all_conditions: []
};

const conditionReducer = function (state = initialState, action) {
    //let locations = state.locations;
    switch (action.type) {
        
        case ConditionTypes.LIST_ALL_CONDITIONS:
            return {
                ...state,
                all_conditions: action.data
            };
        default:
            return state;
    }
};

 
export default conditionReducer;