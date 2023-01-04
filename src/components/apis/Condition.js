import axios from 'axios';
import Tool from '../../util';

const Condition = {
    listAll: () => {
        return axios.get(Tool.baseURL+'condition?all=1');
    }
};

export default Condition;