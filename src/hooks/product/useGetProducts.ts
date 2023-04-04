import { useMemo } from 'react';
import { useQuery } from 'react-query';

import httpRequest from '@/configs/api';
import { PRODUCT_API } from '@/constants/api';
import { Params } from '@/models/response.model';

const getProducts = async (params: Params | undefined) => {
  const result = await httpRequest.get(PRODUCT_API.getProducts.api, {
    params
  });
  return result?.data?.items;
};

const useGetProducts = (params: Params | undefined) => {
  const { data, isLoading, refetch } = useQuery(PRODUCT_API.getProducts.name, () => getProducts(params), { staleTime: 0, cacheTime: 0, });

  const products = useMemo(() => {
    return data;
  }, [data]);

  return {
    data: products || [],
    isLoading,
    refetch,
  };
};

export default useGetProducts;
