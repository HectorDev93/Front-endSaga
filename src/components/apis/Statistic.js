import axios from 'axios';
import Tool from '../../util';

const Statistic = {
    getCountReques:(id,user, year) => {
        //alert(year);
        if(year){
        return axios.get(Tool.baseURL+'request/tot/'+ id +'/'+ user + '/' + year);
        }else{
        return axios.get(Tool.baseURL+'request/tot/'+ id +'/'+ user);
        }
    },
    getCountForGraph:(id,user,year) => {
        if(year){
            return axios.get(Tool.baseURL+'request/tot2/'+ id + '/' + user +'/' + year);
        }else{
            return axios.get(Tool.baseURL+'request/tot2/'+ id + '/' + user);    
        }
    },
    getUserByType: (type) => {
        return axios.get(Tool.baseURL+'userType/' + type);
    }
};

export default Statistic;