import Cookies from 'js-cookie';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { USER_INFOS } from '@/constants/api';
import { UserInfos } from '@/models/auth';

export interface UserContext {
  userInfos: UserInfos | null;
  updateUserInfos: (info: UserInfos | null) => void;
}

const initialValue: UserContext = {
  userInfos: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateUserInfos: (infos: UserInfos | null) => { },
};

const userContext = createContext(initialValue);

const useUserInfos = () => useContext(userContext);

const UserInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfos, setUserInfo] = useState<UserInfos | null>(null);

  const updateUserInfos = useCallback((info: UserInfos | null): void => {
    setUserInfo(info);
  }, []);

  useEffect(() => {
    const userInfosCookies = Cookies.get(USER_INFOS);
    const userInfos = userInfosCookies && JSON.parse(userInfosCookies || '');
    setUserInfo(userInfos);
  }, []);

  return (
    <userContext.Provider
      value={{
        userInfos,
        updateUserInfos,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export { useUserInfos };

export default UserInfoProvider;
