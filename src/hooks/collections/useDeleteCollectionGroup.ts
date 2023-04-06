import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { COLLECTIONS_API, REQUEST_METHOD } from '@/constants/api';

const useDeleteCollectionGroup = () => {
  const collectionGroup = async (id: string) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.DELETE,
      url: COLLECTIONS_API.deleteCollectionGroup.api(id),
    });
    return result;
  };

  return useMutation(collectionGroup);
};

export default useDeleteCollectionGroup;
