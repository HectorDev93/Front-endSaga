import axios from 'axios';
import Tool from '../../util';

const Location = {
    list: (page = 1) => {
        return axios.get(Tool.baseURL+'location');
    },
    add: (payload) => {
        return axios.post(Tool.baseURL+'location', payload, {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.api_token"),Id: localStorage.getItem("user.id")}});
    },
    showOne: (id) => {
        return axios.get(Tool.baseURL+'location/' + id);
    },
    edit: (payload, id) => {
        return axios.put(Tool.baseURL+'location/' + id, payload, {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.api_token"),Id: localStorage.getItem("user.id")}});
    },
    remove: (id) => {
        return axios.delete(Tool.baseURL+'location/' + id, {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.api_token"),Id: localStorage.getItem("user.id")}});
    },
    listAll: () => {
        return axios.get(Tool.baseURL+'location?all=1');
    }
};

export default Location;