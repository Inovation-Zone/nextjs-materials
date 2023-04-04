import { useMemo } from 'react';
import { useQuery } from 'react-query';

import httpRequest from '@/configs/api';
import { CATALOGS_API } from '@/constants/api';

const getCatalogs = async () => {
  const result = await httpRequest.get(CATALOGS_API.getCatalogsGroupByGroupId.api);
  return result?.data?.items;
};

const useGetCatalogGroupByCatalogGroup = () => {
  const { data, isLoading, refetch } = useQuery(CATALOGS_API.getCatalogsGroupByGroupId.name, getCatalogs, { staleTime: 0, cacheTime: 0, });

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
