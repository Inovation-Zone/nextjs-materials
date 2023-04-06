import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { COLLECTIONS_API, REQUEST_METHOD } from '@/constants/api';
import { Collection } from '@/models/collections.model';

const useCreateCollection = () => {
  const collection = async (data: Collection) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.POST,
      data,
      url: COLLECTIONS_API.createCollection.api,
    });
    return result;
  };

  return useMutation(collection);
};

export default useCreateCollection;

