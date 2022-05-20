import axios from "axios";

// const URL_BASE = process.env.FLASK_URL
//   ? `process.env.FLASK_URL${/api/vocabulary}`
//   : "http://127.0.0.1:30000/api/vocabulary";

const URL_BASE = `http://192.168.18.13:5000/api/vocabulary`;

const prepare_headers = (token) => {
  // const confing = { headers: { Authorization: `Bearer ${token}` } };
  return { headers: { Authorization: `Bearer ${token}` } };
};

const get_groups = (token) => {
  const config = prepare_headers(token);
  return axios.get(`${URL_BASE}/group/`, config).then((res) => {
    // console.log(res.data);
    const grupo = res.data.map((dato) => ({
      name: dato.name,
      id: dato._id.$oid,
    }));
    console.log(grupo);
    return grupo;
  });
};

const get_words = (group, token) => {
  const config = prepare_headers(token);
  return axios
    .get(`${URL_BASE}/word?group=${group}`, { config })
    .then((res) => {
      const vocabulario = res.data.map((dato) => dato);
      return vocabulario;
    });
};

export { get_groups, get_words };
