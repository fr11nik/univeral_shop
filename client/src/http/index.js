import axios from "axios";
const $fias = axios.create({ baseURL: process.env.FIAS_URL });
const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};
const fiasInterceptor = (config) => {
  config.headers.authorization = `Token ${process.env.FIAS_TOKEN}`;
  config.headers["Content-Type"] = "application/json";
  config.headers["X-Secret"] = `${process.env.FIAS_SECRET}`;
};
$authHost.interceptors.request.use(authInterceptor);
$fias.interceptors.request.use(fiasInterceptor);

export { $host, $authHost, $fias };
