import axios from "axios";

export default axios({
  baseURL: "http://127.0.0.1:30000/api/vocabulary/word",
  responseType: "json",
});
