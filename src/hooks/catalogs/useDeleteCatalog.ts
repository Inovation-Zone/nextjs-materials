import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { CATALOGS_API, REQUEST_METHOD } from '@/constants/api';

const useDeleteCatalog = () => {
  const catalog = async (id: string) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.DELETE,
      url: CATALOGS_API.deleteCatalog.api(id),
    });
    return result;
  };

  return useMutation(catalog);
};

export default useDeleteCatalog;
