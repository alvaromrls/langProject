import axios from "axios";

// const URL_BASE = process.env.FLASK_URL
//   ? `process.env.FLASK_URL${/api/vocabulary}`
//   : "http://127.0.0.1:30000/api/vocabulary";

const URL_BASE = `http://127.0.0.1:30000/api/vocabulary`;

const get_groups = () => {
  return axios.get(`${URL_BASE}/group`).then((res) => {
    const grupo = res.data.map((dato) => dato.name);
    return grupo;
  });
};

const get_words = (group) => {
  return axios.get(`${URL_BASE}/word?group=${group}`).then((res) => {
    const vocabulario = res.data.map((dato) => dato);
    return vocabulario;
  });
};

export { get_groups, get_words };
