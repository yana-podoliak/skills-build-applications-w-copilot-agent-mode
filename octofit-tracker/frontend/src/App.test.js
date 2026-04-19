import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders navigation menu', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );

  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </MemoryRouter>
  );

  const navigation = screen.getByRole('navigation', { name: /main navigation/i });

  expect(navigation).toBeInTheDocument();
  expect(within(navigation).getByRole('link', { name: /^users$/i })).toBeInTheDocument();
  expect(await screen.findByText(/no users are available yet/i)).toBeInTheDocument();
});
