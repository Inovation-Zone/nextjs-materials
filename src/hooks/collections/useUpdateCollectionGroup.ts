import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { COLLECTIONS_API, REQUEST_METHOD } from '@/constants/api';
import { CollectionGroup } from '@/models/collections.model';

const useUpdateCollectionGroup = () => {
  const collectionGroup = async (data: CollectionGroup) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.PUT,
      data,
      url: COLLECTIONS_API.createCollectionGroup.api,
    });
    return result;
  };

  return useMutation(collectionGroup);
};

export default useUpdateCollectionGroup;

