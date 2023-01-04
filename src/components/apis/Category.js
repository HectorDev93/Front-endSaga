import axios from 'axios';
import Tool from '../../util';

const Category = {
    list: () => {
        return axios.get(Tool.baseURL+'category');
    },
    add: (payload) => {
        return axios.post(Tool.baseURL+'category', payload, {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.api_token"),Id: localStorage.getItem("user.id")}});
    },
    showOne: (id) => {
        return axios.get(Tool.baseURL+'category/' + id);
    },
    edit: (payload, id) => {
        return axios.put(Tool.baseURL+'category/' + id, payload, {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.api_token"),Id: localStorage.getItem("user.id")}});
    },
    remove: (id) => {
        return axios.delete(Tool.baseURL+'category/' + id, {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.api_token"),Id: localStorage.getItem("user.id")}});
    },
    listAll: () => {
        return axios.get(Tool.baseURL+'category?all=1');
    }
};

export default Category;