import axios from 'axios';

export const createAPI = (onLoginFail) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/wtw`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  function isLoginRequest(err) {
    return err.request.responseURL.split(`/`).pop() === `login`;
  }

  const onSuccess = (response) => response;
  const onFail = (err) => {
    try {
      if (
        err.response.status === 403
        && !isLoginRequest(err)
      ) {
        onLoginFail();
      } else if (err.response.status === 403
        && isLoginRequest(err)) {
        return false;
      }
      return err.response.data.error;
    } catch (error) {
      return err;
    }
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

