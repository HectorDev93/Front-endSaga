import axios from 'axios';
import Tool from '../../util';

const User = {
    getRole: (user) => {
        return axios.get(Tool.baseURL+'userRole/'+ user);
    },
    getUserByType: (type) => {
        return axios.get(Tool.baseURL+'userType/' + type);
    },
    getUserMenu: (user) => {
        return axios.get(Tool.baseURL+'userMenu/' + user);
    },
    getUserPermissionAction: (user, modulePermission) => {
        return axios.get(Tool.baseURL+'modulePermissionAction/' + user + '/' + modulePermission);
    }
};

export default User;