import axios from 'axios';
import Tool from '../../util';

const CategoryType = {
    list: () => {
        return axios.get(Tool.baseURL+'categoryType');
    },
    add: (payload) => {
        return axios.post(Tool.baseURL+'categoryType', payload, {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.api_token"),Id: localStorage.getItem("user.id")}});
    },
    showOne: (id) => {
        return axios.get(Tool.baseURL+'categoryType/' + id);
    },
    getByCategory:(id) => {
        return axios.get(Tool.baseURL+'categoryType/cat/'+ id);
    },
    edit: (payload, id) => {
        return axios.put(Tool.baseURL+'categoryType/' + id, payload, {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.api_token"),Id: localStorage.getItem("user.id")}});
    },
    remove: (id) => {
        return axios.delete(Tool.baseURL+'categoryType/' + id, {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.api_token"),Id: localStorage.getItem("user.id")}});
    },
    listAll: () => {
        return axios.get(Tool.baseURL+'categoryType?all=1');
    }
};

export default CategoryType;