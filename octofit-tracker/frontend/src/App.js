import './App.css';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';

import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navigationItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

const brandLogoUrl = `${process.env.PUBLIC_URL}/octofitapp-small.png`;

function App() {
  return (
    <div className="app-shell">
      <div className="container py-4 py-lg-5">
        <header className="app-hero card border-0 shadow-lg overflow-hidden mb-4">
          <div className="card-body p-4 p-lg-5">
            <div className="app-brand mb-4">
              <div className="app-brand-mark shadow-sm">
                <img
                  className="app-brand-logo"
                  src={brandLogoUrl}
                  alt="OctoFit Tracker logo"
                />
              </div>
              <div>
                <p className="app-brand-title mb-1">OctoFit Tracker</p>
                <p className="app-brand-copy mb-0">Competitive fitness data in one place</p>
              </div>
            </div>
            <div className="row align-items-center g-4">
              <div className="col-lg-8">
                <p className="app-eyebrow text-uppercase fw-semibold mb-2">OctoFit Tracker</p>
                <h1 className="display-5 fw-bold mb-3">Fitness operations dashboard for the REST API</h1>
                <p className="app-subtitle lead mb-0">
                  Explore users, teams, activities, rankings, and workout plans with a consistent Bootstrap UI built for quick scanning.
                </p>
              </div>
              <div className="col-lg-4">
                <div className="hero-stat card border-0 shadow-sm ms-lg-auto">
                  <div className="card-body">
                    <h2 className="h5 mb-2">Dashboard focus</h2>
                    <p className="mb-0 text-secondary">
                      Shared navigation, shared table layouts, and reusable detail views across every resource page.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="app-nav card border-0 shadow-sm mb-4" aria-label="Main navigation">
          <div className="card-body p-2 p-md-3">
            <div className="nav nav-pills nav-fill flex-column flex-md-row gap-2">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.to}
                  className={({ isActive }) =>
                    `nav-link rounded-pill fw-semibold${isActive ? ' active' : ' text-body'}`
                  }
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
