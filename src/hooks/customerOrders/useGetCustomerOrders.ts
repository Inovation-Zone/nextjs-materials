import { useMemo } from 'react';
import { useQuery } from 'react-query';

import httpRequest from '@/configs/api';
import { CUSTOMER_ORDER_API } from '@/constants/api';

const getCustomerOrders = async () => {
  const result = await httpRequest.get(CUSTOMER_ORDER_API.getCustomerOrders.api);
  return result?.data?.items;
};

const useGetCustomerOrders = () => {
  const { data, isLoading, refetch } = useQuery(CUSTOMER_ORDER_API.getCustomerOrders.name, getCustomerOrders, { staleTime: 0, cacheTime: 0, });

  const customerOrders = useMemo(() => {
    return data;
  }, [data]);

  return {
    data: customerOrders || [],
    isLoading,
    refetch,
  };
};

export default useGetCustomerOrders;
