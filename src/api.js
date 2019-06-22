import axios from 'axios';

export const createAPI = (onLoginFail) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/wtw`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    try {
      if (
        err.response.status === 403
        && err.request.responseURL.split(`/`).pop() !== `login`
      ) {
        onLoginFail();
      }
      return err.response.data.error;
    } catch (error) {
      return err;
    }
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

