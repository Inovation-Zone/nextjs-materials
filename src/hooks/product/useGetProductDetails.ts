import { useMemo } from 'react';
import { useQuery } from 'react-query';

import httpRequest from '@/configs/api';
import { PRODUCT_API } from '@/constants/api';

const getProductDetails = async (productId: string) => {
  if (productId) {
    const result = await httpRequest.get(PRODUCT_API.getProductDetails.api(productId));
    return result?.data?.data;
  }
};

const useGetProductDetails = (productId: string | any) => {
  const { data, isLoading, refetch } = useQuery(PRODUCT_API.getProductDetails.name(productId), () => getProductDetails(productId), { staleTime: 0, cacheTime: 0, });

  const productDetails = useMemo(() => {
    return data;
  }, [data]);

  return {
    data: productDetails || [],
    isLoading,
    refetch,
  };
};

export default useGetProductDetails;
