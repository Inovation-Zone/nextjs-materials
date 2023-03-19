import withRoleAuth from "@/hoc/withRoleAuth";

function About() {
  return (
    <h1>About</h1>
  );
}

export default withRoleAuth(About);
