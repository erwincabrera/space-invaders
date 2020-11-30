import axios from "axios";

const BASE_URL = "https://space-invaders-edc.herokuapp.com/api/scores";

interface ScoreAPI {
  score: number;
  user: {
    username: string;
  };
};

interface Score {
  username: string;
  score: number;
}

const get = async (): Promise<Score[]> => {
  const res = await axios.get<ScoreAPI[]>(BASE_URL);
  
  return res.data.map(eachScore => ({
    username: eachScore.user.username,
    score: eachScore.score
  }));
};

export default {
  get
};
