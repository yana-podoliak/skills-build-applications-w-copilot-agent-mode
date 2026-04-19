import ResourcePage from './ResourcePage';

function Teams() {
  return (
    <ResourcePage
      title="Teams"
      description="Team records and memberships loaded from the Django REST API."
      resourcePath="teams"
      emptyMessage="No teams are available yet."
      fields={[
        { key: 'name', label: 'Team name' },
        { key: 'members', label: 'Members' },
        { key: 'created_at', label: 'Created at' },
      ]}
    />
  );
}

export default Teams;