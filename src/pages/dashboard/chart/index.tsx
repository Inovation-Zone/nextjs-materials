import withRoleAuth from "@/hoc/withRoleAuth";

function Chart() {
  return (
    <h1>Chart</h1>
  );
}

export default withRoleAuth(Chart);
