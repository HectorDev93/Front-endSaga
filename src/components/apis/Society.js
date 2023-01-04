import axios from 'axios';
import Tool from '../../util';

const Society = {
    list: () => {
        return axios.get(Tool.baseURL+'society');
    },
    add: (payload) => {
        return axios.post(Tool.baseURL+'society', payload, {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.api_token"),Id: localStorage.getItem("user.id")}});
    },
    showOne: (id) => {
        return axios.get(Tool.baseURL+'society/' + id);
    },
    edit: (payload, id) => {
        return axios.put(Tool.baseURL+'society/' + id, payload, {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.api_token"),Id: localStorage.getItem("user.id")}});
    },
    remove: (id) => {
        return axios.delete(Tool.baseURL+'society/' + id, {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.api_token"),Id: localStorage.getItem("user.id")}});
    },
    listAll: () => {
        return axios.get(Tool.baseURL+'society?all=1');
    }
};

export default Society;