import * as UserTypes from '../actiontypes/UserTypes';

const initialState = {      
    userPermission: [],
};

const userPermissionReducer = function (state = initialState, action) {
    switch (action.type) {
        
        case UserTypes.USER_PERMISSION_ACTION:
            return{
                ...state,
                userPermission: action.data
            }    
        default:
            return state;
    }
};

 
export default userPermissionReducer;