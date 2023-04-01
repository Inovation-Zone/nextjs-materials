import { useMemo } from 'react';
import { useQuery } from 'react-query';

import httpRequest from '@/configs/api';
import { CATALOG_API } from '@/constants/api';

const getAdhesives = async () => {
  const result = await httpRequest.get(CATALOG_API.getCatalogsGroupByGroupId.api);
  return result?.data?.items;
};

const useGetCatalogGroupByCatalogGroup = () => {
  const { data, isLoading, refetch } = useQuery(CATALOG_API.getCatalogsGroupByGroupId.name, getAdhesives, { staleTime: 0, cacheTime: 0, });

  const catalogsGroupByGroupId = useMemo(() => {
    return data;
  }, [data]);

  return {
    data: catalogsGroupByGroupId || [],
    isLoading,
    refetch,
  };
};

export default useGetCatalogGroupByCatalogGroup;
