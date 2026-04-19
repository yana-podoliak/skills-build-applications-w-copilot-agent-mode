import ResourcePage from './ResourcePage';

function Leaderboard() {
  return (
    <ResourcePage
      title="Leaderboard"
      description="Competitive rankings and scores from the backend leaderboard endpoint."
      resourcePath="leaderboard"
      emptyMessage="No leaderboard entries are available yet."
      fields={[
        { key: 'rank', label: 'Rank' },
        { key: 'user', label: 'User' },
        { key: 'team', label: 'Team' },
        { key: 'score', label: 'Score' },
      ]}
    />
  );
}

export default Leaderboard;