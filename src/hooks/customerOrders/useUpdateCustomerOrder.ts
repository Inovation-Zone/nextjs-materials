import { useMutation } from 'react-query';

import httpRequest from '@/configs/api';
import { CUSTOMER_ORDER_API, REQUEST_METHOD } from '@/constants/api';
import { CustomerOrderBody } from '@/models/customerOrder.model';

const useUpdateCustomerOrder = () => {
  const customerOrder = async (data: CustomerOrderBody) => {
    const result = await httpRequest({
      method: REQUEST_METHOD.PUT,
      data,
      url: CUSTOMER_ORDER_API.createCustomerOrder.api,
    });
    return result;
  };

  return useMutation(customerOrder);
};

export default useUpdateCustomerOrder;

