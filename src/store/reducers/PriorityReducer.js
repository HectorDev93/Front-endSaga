import * as PriorityTypes from '../actiontypes/PriorityTypes';

const initialState = {         // used in listing page
    all_priorities: []
};

const priorityReducer = function (state = initialState, action) {
    //let locations = state.locations;
    switch (action.type) {
        
        case PriorityTypes.LIST_ALL_PRIORITIES:
            return {
                ...state,
                all_priorities: action.data
            };
        default:
            return state;
    }
};

 
export default priorityReducer;