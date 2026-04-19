import ResourcePage from './ResourcePage';

function Workouts() {
  return (
    <ResourcePage
      title="Workouts"
      description="Workout recommendations and planned sessions served by the REST backend. Codespaces endpoint: https://your-codespace-name-8000.app.github.dev/api/workouts/."
      resourcePath="workouts"
      emptyMessage="No workouts are available yet."
      fields={[
        { key: 'name', label: 'Workout' },
        { key: 'user', label: 'User ID' },
        { key: 'description', label: 'Description' },
        { key: 'date', label: 'Date' },
        { key: 'personalized', label: 'Personalized' },
      ]}
    />
  );
}

export default Workouts;