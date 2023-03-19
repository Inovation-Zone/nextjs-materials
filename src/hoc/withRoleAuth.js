import AuthRoleWrapper from '@/components/AuthRoleWrapper';

function withRoleAuth(Component) {
  return (props) => (
    <AuthRoleWrapper>
      <Component {...props} />
    </AuthRoleWrapper>
  );
}

export default withRoleAuth;
