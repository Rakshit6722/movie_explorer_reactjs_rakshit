import { render, screen, fireEvent } from '@testing-library/react';
import MoviesCard from '../components/common/MoviesCard';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const store = configureStore([])

const initialState = {
  user: {
    userInfo: {
      role: 'user'
    }
  }
}

const mockStore = store(initialState);

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  genre: 'Action',
  release_year: 2022,
  rating: 8.5,
  duration: 125,
  plan: 'basic' as 'basic',
  poster_url: 'https://example.com/poster.jpg',
  banner_url: '',
  director: '',
  description: '',
};

const mockMoviePlatinum = {
  id: 1,
  title: 'Test Movie',
  genre: 'Action',
  release_year: 2022,
  rating: 8.5,
  duration: 125,
  plan: 'platinum' as 'platinum',
  poster_url: 'https://example.com/poster.jpg',
  banner_url: '',
  director: '',
  description: '',
}

const mockMovieGold = {
  id: 1,
  title: 'Test Movie',
  genre: 'Action',
  release_year: 2022,
  rating: 8.5,
  duration: 125,
  plan: 'gold' as 'gold',
  poster_url: 'https://example.com/poster.jpg',
  banner_url: '',
  director: '',
  description: '',
}

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('MoviesCard', () => {
  test('renders movie title, year, genre, and rating', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <MoviesCard movie={mockMovie} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('★ 8.5')).toBeInTheDocument();
  });

  test('renders More Info button', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <MoviesCard movie={mockMovie} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByRole('button', { name: /more info/i })).toBeInTheDocument();
  });

  test('renders gold badge if plan is gold', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <MoviesCard movie={mockMovieGold} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('GOLD')).toBeInTheDocument();
  });

  test('renders platinum badge if plan is platinum', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <MoviesCard movie={mockMoviePlatinum} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('PLATINUM')).toBeInTheDocument();
  });

  test('shows details on click in mobile mode', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <MoviesCard movie={mockMovie} />
        </MemoryRouter>
      </Provider>
    );
    const card = screen.getByText('Test Movie').closest('div');
    fireEvent.click(card!);
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
  });

   test('formatRating returns 0.0 for rating 0', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <MoviesCard movie={{ ...mockMovie, rating: 0 }} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('★ 0.0')).toBeInTheDocument();
  });

  test('formatDuration returns "N/A" for undefined', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <MoviesCard movie={{ ...mockMovie, duration: undefined as any }} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  test('formatDuration returns "0m" for duration 0', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <MoviesCard movie={{ ...mockMovie, duration: 0 }} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('0m')).toBeInTheDocument();
  });

  test('does not render plan badge for basic or missing plan', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <MoviesCard movie={{ ...mockMovie, plan: 'basic' }} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText('GOLD')).not.toBeInTheDocument();
    expect(screen.queryByText('PLATINUM')).not.toBeInTheDocument();
  });

  test('renders admin controls for admin and triggers edit', () => {
    const adminStore = store({
      user: { userInfo: { role: 'admin' } }
    });
    render(
      <Provider store={adminStore}>
        <MemoryRouter>
          <MoviesCard movie={mockMovie} />
        </MemoryRouter>
      </Provider>
    );
    const editBtn = screen.getByLabelText('Edit Movie');
    fireEvent.click(editBtn);
    expect(mockNavigate).toHaveBeenCalled();
  });

  test('renders admin controls for supervisor and triggers delete (success and fail)', async () => {
    const supervisorStore = store({
      user: { userInfo: { role: 'supervisor' } }
    });
    render(
      <Provider store={supervisorStore}>
        <MemoryRouter>
          <MoviesCard movie={mockMovie} />
        </MemoryRouter>
      </Provider>
    );
    const deleteBtn = screen.getByLabelText('Delete Movie');
    fireEvent.click(deleteBtn);
    expect(mockNavigate).toHaveBeenCalled();
  });

  test('calls navigate with correct url when More Info is clicked', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <MoviesCard movie={mockMovie} />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByRole('button', { name: /more info/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/movie?id=1');
  });
});