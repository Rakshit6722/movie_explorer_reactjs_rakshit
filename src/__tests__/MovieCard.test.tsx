import { render, screen, fireEvent } from '@testing-library/react';
import MoviesCard from '../components/home/CategorySection/MoviesCard';
import { MemoryRouter } from 'react-router-dom';

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

describe('MoviesCard', () => {
  test('renders movie title, year, genre, and rating', () => {
    render(
      <MemoryRouter>
        <MoviesCard movie={mockMovie} />
      </MemoryRouter>
    );
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('★ 8.5')).toBeInTheDocument();
  });

  test('renders More Info button', () => {
    render(
      <MemoryRouter>
        <MoviesCard movie={mockMovie} />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /more info/i })).toBeInTheDocument();
  });

  test('renders gold badge if plan is gold', () => {
    render(
      <MemoryRouter>
        <MoviesCard movie={{ ...mockMovie, plan: 'gold' }} />
      </MemoryRouter>
    );
    expect(screen.getByText('GOLD')).toBeInTheDocument();
  });

  test('renders platinum badge if plan is platinum', () => {
    render(
      <MemoryRouter>
        <MoviesCard movie={{ ...mockMovie, plan: 'platinum' }} />
      </MemoryRouter>
    );
    expect(screen.getByText('PLATINUM')).toBeInTheDocument();
  });

  test('shows details on click in mobile mode', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });
    render(
      <MemoryRouter>
        <MoviesCard movie={mockMovie} />
      </MemoryRouter>
    );
    const card = screen.getByText('Test Movie').closest('div');
    fireEvent.click(card!);
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
  });
});