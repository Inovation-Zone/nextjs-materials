import { useQuery, UseQueryResult } from 'react-query';

import httpRequest from '@/configs/api';
import { COLLECTIONS_API } from '@/constants/api';
import { Collection } from '@/models/collections.model';

interface UseGetCollectionDetailsResult {
  data: Collection | undefined;
  isLoading: boolean;
  refetch: UseQueryResult<Collection, unknown>['refetch'];
}

const getCollectionDetails = async (collectionId: string) => {
  const result = collectionId && await httpRequest.get(COLLECTIONS_API.getCollectionDetails.api(collectionId));
  return result?.data?.data;
};

const useGetCollectionDetails = (collectionId: string): UseGetCollectionDetailsResult => {
  const { data, isLoading, refetch } = useQuery(COLLECTIONS_API.getCollectionDetails.name(collectionId), () => getCollectionDetails(collectionId), { staleTime: 0, cacheTime: 0, });

  return {
    data,
    isLoading,
    refetch,
  };
};

export default useGetCollectionDetails;
