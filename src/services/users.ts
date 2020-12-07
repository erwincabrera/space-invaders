import axios from 'axios';

const BASE_URL = "https://space-invaders-edc.herokuapp.com/api/users";

const newUser = async (newObject) => {
    const res = await axios.post(BASE_URL, newObject);
    return res.data;
}

export default {
    newUser
}
