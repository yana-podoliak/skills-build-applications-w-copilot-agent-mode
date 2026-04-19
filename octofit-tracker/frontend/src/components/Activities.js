import ResourcePage from './ResourcePage';

function Activities() {
  return (
    <ResourcePage
      title="Activities"
      description="Recent activity records synced from the Django REST Framework backend. Codespaces endpoint: https://your-codespace-name-8000.app.github.dev/api/activities/."
      resourcePath="activities"
      emptyMessage="No activities are available yet."
      fields={[
        { key: 'activity_type', label: 'Activity type' },
        { key: 'user', label: 'User ID' },
        { key: 'duration', label: 'Duration (minutes)' },
        { key: 'distance', label: 'Distance (km)' },
        { key: 'calories', label: 'Calories' },
        { key: 'date', label: 'Date' },
      ]}
    />
  );
}

export default Activities;