import axios from "axios";

const BASE_URL = "/api/scores";

interface ScoreAPI {
  score: number;
  user: {
    username: string;
  };
}

interface Score {
  username: string;
  score: number;
}

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const get = async (): Promise<Score[]> => {
  const res = await axios.get<ScoreAPI[]>(BASE_URL);

  return res.data.map((eachScore) => ({
    username: eachScore.user.username,
    score: eachScore.score,
  }));
};

const create = async (newObject): Promise<any> => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(BASE_URL, newObject, config);
  return res.data;
};

const Scores = {
  setToken,
  get,
  create,
};

export default Scores;
