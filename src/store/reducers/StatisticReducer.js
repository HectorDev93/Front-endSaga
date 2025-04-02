import * as StatisticTypes from "../actiontypes/StatisticTypes";


const initialState = {
  // used in fill dropdowns
  obj: {
    allCollaboratorsMonth: "",
    allActivity: "",
    allActivityNull:"",
    societyMayor: "",
    allSocietyMonth: "",
    departmentMayor: "",
    allDepartmentMonth: "",
    categoryMayor: "",
    allCategoryMonth: "",
  },
  chartCategory: {
    labels: [],
    dataset: [],
    colours: [],
  },
  chartDepartment: {
    labels: [],
    dataset: [],
    colours: [],
  },
  chartLocation: {
    labels: [],
    dataset: [],
    colours: [],
  },
  chartSociety: {
    labels: [],
    dataset: [],
    colours: [],
  },
  selection : {
    yearNow:new Date().getFullYear(),
    userNow:localStorage.getItem("user.id"),
    monthNow:0
  },
  list_spinner: false,
};

const statisticReducer = function (state = initialState, action) {
  switch (action.type) {
    case StatisticTypes.SET_STATISTIC_DEFAULT:
      return {
        ...state,
        obj: { ...state.obj },
        chartCategory: { ...state.chartCategory },
        chartDepartment: { ...state.chartDepartment },
        chartLocation: { ...state.chartLocation },
        chartSociety: { ...state.chartSociety },
      };
    case StatisticTypes.HANDLE_STATISTIC_CHANGE:
      return handleChange(state, action);
    case StatisticTypes.LIST_GRAPH:
      return {
        ...state,
        list_spinner: true,
      };
    case StatisticTypes.LIST_COUNT_MONTH:
      return {
        ...state,
        list_spinner: false,
        obj: action.data,
      };
    case StatisticTypes.LIST_COUNT_GRAPH:
      return {
        ...state,
        list_spinner: false,
        chartCategory: action.data,
        chartDepartment: action.data2,
        chartLocation: action.data3,
        chartSociety: action.data4,
      };
    default:
      return state;
  }
};

/**
 * handle field change
 */
 function handleChange(state, action)
 {
     
         return {
             ...state,
             selection: {...state.selection, [action.field]: action.data}
         };
       
 }
export default statisticReducer;
