import axios from 'axios';
import Tool from '../../util';

const Collaborator = {
    list: () => {
        return axios.get(Tool.baseURL+'collaborator');
    },
    add: (payload) => {
        return axios.post(Tool.baseURL+'collaborator', payload, {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.api_token"),Id: localStorage.getItem("user.id")}});
    },
    showOne: (id) => {
        return axios.get(Tool.baseURL+'collaborator/' + id);
    },
    edit: (payload, id) => {
        return axios.put(Tool.baseURL+'collaborator/' + id, payload, {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.api_token"),Id: localStorage.getItem("user.id")}});
    },
    remove: (id) => {
        return axios.delete(Tool.baseURL+'collaborator/' + id, {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.api_token"),Id: localStorage.getItem("user.id")}});
    },
    listAll: () => {
        return axios.get(Tool.baseURL+'collaborator?all=1');
    }
};

export default Collaborator;