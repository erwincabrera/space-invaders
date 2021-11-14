import axios from 'axios';

const BASE_URL = "/api/login";

const login = async <T>(credentials): Promise<T> => {
    const res = await axios.post(BASE_URL, credentials);
    return res.data;
}

const Login = {
    login
}

export default Login;