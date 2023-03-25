import { HttpStatusCode } from 'axios';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { AUTH_API, REQUEST_METHOD, TOKEN, USER_INFOS } from '@/constants/api';

const useLogout = () => {
  const auth = async (isLogout: boolean) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.POST,
      url: AUTH_API.logout.api,
    });

    if (result.status === HttpStatusCode.Ok) {
      Cookies.remove(USER_INFOS);
      Cookies.remove(TOKEN);
    }

    return result;
  };

  return useMutation(auth);
};

export default useLogout;
