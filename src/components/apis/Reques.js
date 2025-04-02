import axios from 'axios';
import Tool from '../../util';

const Reques = {
    list: (user) => {
        return axios.get(Tool.baseURL+'request/'+user);
    },
    getReques:(user,month,year) =>{
        if(year){
            return axios.get(Tool.baseURL+'Grequest/'+ user +'/'+ month + '/' + year);
            }else{
            return axios.get(Tool.baseURL+'Grequest/'+ user +'/'+ month);
            }
    },
    add: (payload) => {
        return axios.post(Tool.baseURL+'request/create', payload, {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.api_token"),Id: localStorage.getItem("user.id")}});
    },
    showOne: (id) => {
        return axios.get(Tool.baseURL+'request/show/' + id);
    },
    edit: (payload, id) => {
        return axios.put(Tool.baseURL+'request/update/' + id, payload, {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.api_token"),Id: localStorage.getItem("user.id")}});
    },
    remove: (id) => {
        return axios.delete(Tool.baseURL+'request/delete/' + id, {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.api_token"),Id: localStorage.getItem("user.id")}});
    },
    listAll: () => {
        return axios.get(Tool.baseURL+'request?all=1');
    }
};

export default Reques;