import { useMemo } from 'react';
import { useQuery } from 'react-query';

import httpRequest from '@/configs/api';
import { CUSTOMER_ORDER_API } from '@/constants/api';
import { CustomerOrder } from '@/models/customerOrder.model';

const getCustomerOrders = async (customerOrderId: string) => {
  const result = await httpRequest.get(CUSTOMER_ORDER_API.getCustomerOrderDetails.api(customerOrderId));
  return result?.data?.data;
};

const useGetCustomerOrderDetails = (customerOrderId: string) => {
  const { data, isLoading, refetch } = useQuery(CUSTOMER_ORDER_API.getCustomerOrderDetails.name(customerOrderId), () => getCustomerOrders(customerOrderId), { staleTime: 0, cacheTime: 0, });

  const customerOrder = useMemo(() => {
    return data;
  }, [data]);

  return {
    data: customerOrder as CustomerOrder,
    isLoading,
    refetch,
  };
};

export default useGetCustomerOrderDetails;
