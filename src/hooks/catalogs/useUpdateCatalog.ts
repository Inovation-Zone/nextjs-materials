import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { CATALOGS_API, REQUEST_METHOD } from '@/constants/api';
import { Catalog } from '@/models/catalogs.model';

const useUpdateCatalog = () => {
  const catalog = async (data: Catalog) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.PUT,
      data,
      url: CATALOGS_API.createCatalog.api,
    });
    return result;
  };

  return useMutation(catalog);
};

export default useUpdateCatalog;

