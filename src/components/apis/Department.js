import axios from 'axios';
import Tool from '../../util';

const Department = {
    list: () => {
        return axios.get(Tool.baseURL+'department');
    },
    add: (payload) => {
        return axios.post(Tool.baseURL+'department', payload, {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.api_token"),Id: localStorage.getItem("user.id")}});
    },
    showOne: (id) => {
        return axios.get(Tool.baseURL+'department/' + id);
    },
    getBySociety:(id) => {
        return axios.get(Tool.baseURL+'department/soc/'+ id);
    },
    edit: (payload, id) => {
        return axios.put(Tool.baseURL+'department/' + id, payload, {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.api_token"),Id: localStorage.getItem("user.id")}});
    },
    remove: (id) => {
        return axios.delete(Tool.baseURL+'department/' + id, {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.api_token"),Id: localStorage.getItem("user.id")}});
    },
    listAll: () => {
        return axios.get(Tool.baseURL+'department?all=1');
    }
};

export default Department;