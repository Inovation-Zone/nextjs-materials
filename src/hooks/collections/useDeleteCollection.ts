import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { COLLECTIONS_API, REQUEST_METHOD } from '@/constants/api';

const useDeleteCollection = () => {
  const collection = async (id: string) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.DELETE,
      url: COLLECTIONS_API.deleteCollection.api(id),
    });
    return result;
  };

  return useMutation(collection);
};

export default useDeleteCollection;
