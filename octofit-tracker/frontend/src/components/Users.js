import ResourcePage from './ResourcePage';

function Users() {
  return (
    <ResourcePage
      title="Users"
      description="User profiles fetched from the Django backend users endpoint. Codespaces endpoint: https://your-codespace-name-8000.app.github.dev/api/users/."
      resourcePath="users"
      emptyMessage="No users are available yet."
      fields={[
        { key: 'username', label: 'Username' },
        { key: 'email', label: 'Email' },
        { key: 'first_name', label: 'First name' },
        { key: 'last_name', label: 'Last name' },
      ]}
    />
  );
}

export default Users;