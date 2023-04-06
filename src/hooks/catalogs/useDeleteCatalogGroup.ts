import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { CATALOGS_API, REQUEST_METHOD } from '@/constants/api';

const useDeleteCatalogGroup = () => {
  const group = async (id: string) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.DELETE,
      url: CATALOGS_API.deleteCatalogGroup.api(id),
    });
    return result;
  };

  return useMutation(group);
};

export default useDeleteCatalogGroup;
