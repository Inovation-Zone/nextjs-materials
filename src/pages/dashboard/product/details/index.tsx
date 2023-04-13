import { useRouter } from "next/router";
import { useMemo } from "react";

import useGetProductDetails from "@/hooks/product/useGetProductDetails";

import AddProduct from "@/pages/dashboard/product/add";

const EditProduct: React.FC = () => {
  const router = useRouter();
  const { productId = '' } = useMemo(() => router.query, [router]);
  const { data: productDetails } = useGetProductDetails(productId as string);

  return (
    <AddProduct product={productDetails} />
  )
};

export default EditProduct;
