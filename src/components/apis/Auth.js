import axios from 'axios';
import Tool from '../../util';

const Auth = {
    login2: (payload) => {
        return axios.post(Tool.baseURL+'login',payload);
    },
    login: (data, successCb, failCb) => {
        axios.post(Tool.baseURL+'login', data).then(response => {
  //console.log(data);
            successCb(response);
  
        }).catch(err => {
  
            failCb(err);
        });
    },
    logout: (payload) => {
        return axios.post(Tool.baseURL+'logout', payload, {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.token")}});
    }
};

export default Auth;