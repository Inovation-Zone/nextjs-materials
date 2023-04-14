import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { REQUEST_METHOD, SETTINGS_API } from '@/constants/api';
import { Setting } from '@/models/settings.model';

const useUpdateSettings = () => {
  const updateSettings = async (data: Setting[]) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.PUT,
      data,
      url: SETTINGS_API.createSettings.api,
    });
    return result;
  };

  return useMutation(updateSettings);
};

export default useUpdateSettings;
