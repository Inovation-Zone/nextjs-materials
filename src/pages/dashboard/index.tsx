import withRoleAuth from "@/hoc/withRoleAuth";

function Dashboard() {
  return (
    <h1>Dashboard</h1>
  );
}

export default withRoleAuth(Dashboard);
