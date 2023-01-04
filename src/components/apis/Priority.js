import axios from 'axios';
import Tool from '../../util';

const Priority = {
    listAll: () => {
        return axios.get(Tool.baseURL+'priority?all=1');
    }
};

export default Priority;