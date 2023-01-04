import { combineReducers } from 'redux';

import locationReducer  from './LocationReducer';
import societyReducer  from './SocietyReducer';
import conditionReducer from './ConditionReducer';
import priorityReducer from './PriorityReducer';
import departmentReducer from './DepartmentReducer';
import collaboratorReducer from './CollaboratorReducer';
import categoryReducer from './CategoryReducer';
import categoryTypeReducer from './CategoryTypeReducer';
import requesReducer from './RequesReducer';
import statisticReducer from './StatisticReducer';
import authReducer from './AuthReducer';
import userReducer from './UserReducer';
import userPermissionReducer from './UserPermissionReducer';


const rootReducer = combineReducers({
auth: authReducer,
   user: userReducer,
   userPermission: userPermissionReducer,
   location: locationReducer,
   society: societyReducer,
   condition: conditionReducer,
   priority: priorityReducer,
   department: departmentReducer,
   collaborator: collaboratorReducer,
   category: categoryReducer,
   categoryType: categoryTypeReducer,
   reques: requesReducer,
   statistic: statisticReducer
});

export default rootReducer;