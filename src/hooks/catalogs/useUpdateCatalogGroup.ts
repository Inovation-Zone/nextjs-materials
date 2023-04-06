import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { CATALOGS_API, REQUEST_METHOD } from '@/constants/api';
import { Group } from '@/models/catalogs.model';

const useUpdateCatalogGroup = () => {
  const group = async (data: Group) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.PUT,
      data,
      url: CATALOGS_API.createCatalogGroup.api,
    });
    return result;
  };

  return useMutation(group);
};

export default useUpdateCatalogGroup;

