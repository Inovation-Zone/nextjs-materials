import withRoleAuth from "@/hoc/withRoleAuth";

function Product() {
  return (
    <h1>Product</h1>
  );
}

export default withRoleAuth(Product);
