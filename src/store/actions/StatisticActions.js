import * as StatisticTypes from "../actiontypes/StatisticTypes";

import Statistic from "../../components/apis/Statistic";


function handleStatisticChange(field, value, selected)
{
    return function (dispatch, getState) {

        dispatch({
            type: StatisticTypes.HANDLE_STATISTIC_CHANGE,
            data: value,
            field,
            selected
        });
    }
}

function setStatisticDefaults() {
  return function (dispatch, getState) {
    dispatch({
      type: StatisticTypes.SET_STATISTIC_DEFAULT,
    });
  };
}

function listCountStatistic(id, user, year){
    //alert(id);
    return function async(dispatch, getState){

        dispatch({
            type: StatisticTypes.LIST_GRAPH
          });
        setTimeout(() => {  
      //async call
      Statistic.getCountReques(id, user, year).then((response) =>{
         dispatch({
          type: StatisticTypes.LIST_COUNT_MONTH,
          data: response.data.data
        });
      });
    }, 0.5)

    }
  }

  function listCountGraph(id, user, year){
    //alert(id);
    return function async(dispatch, getState){
        
        dispatch({
            type: StatisticTypes.LIST_GRAPH
          });
        setTimeout(() => {  
      //async call
      Statistic.getCountForGraph(id, user, year).then((response) =>{
        dispatch({
          type: StatisticTypes.LIST_COUNT_GRAPH,
          data: response.data.data,
          data2: response.data.data2,
          data3: response.data.data3,
          data4: response.data.data4
        });
      });
      
    }, 0.5)
    }
  }
  
function userByType(type) {
  return function (dispatch, getState) {
    // async call
    Statistic.getUserByType().then((response) => {
      dispatch({
        type: StatisticTypes.USER_BY_TYPE,
        data: response.data.data,
      });
    });
  };
}
  
export {
    userByType,
    listCountStatistic,
    listCountGraph,
    setStatisticDefaults,
    handleStatisticChange
  };