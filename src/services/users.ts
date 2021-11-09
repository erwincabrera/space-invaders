import axios from 'axios';

const BASE_URL = "/api/users";

const newUser = async (newObject) => {
    const res = await axios.post(BASE_URL, newObject);
    return res.data;
}

export default {
    newUser
}
