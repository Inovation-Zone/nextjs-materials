import { HttpStatusCode } from 'axios';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { AUTH_API, REQUEST_METHOD, TOKEN, USER_INFOS } from '@/constants/api';
import { Auth } from '@/models/auth';

const useAuth = () => {
  const auth = async (data: Auth) => {

    const result = await httpRequest({
      method: REQUEST_METHOD.POST,
      data,
      url: AUTH_API.auth.api,
    });

    if (result.status === HttpStatusCode.Ok) {
      Cookies.set(USER_INFOS, JSON.stringify(result?.data?.data));
      Cookies.set(TOKEN, result?.data?.data?.token);
    }

    return result;
  };

  return useMutation(auth);
};

export default useAuth;
