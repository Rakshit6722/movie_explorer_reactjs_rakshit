import { render, screen, fireEvent } from '@testing-library/react';
import CompactCarousel from '../components/home/CategorySection/CompactCarousel';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-slick', () => (props: any) => <div data-testid="slider">{props.children}</div>);

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockMovies = [
  {
    id: 1,
    title: 'Movie 1',
    genre: 'Action',
    release_year: 2022,
    rating: 8,
    banner_url: 'https://example.com/banner1.jpg',
    description: 'An action-packed adventure.',
    director: 'Director 1',
    duration: 120,
    poster_url: 'https://example.com/poster1.jpg',
  },
  {
    id: 2,
    title: 'Movie 2',
    genre: 'Drama',
    release_year: 2016,
    rating: 7,
    banner_url: 'https://example.com/banner2.jpg',
    description: 'A dramatic story.',
    director: 'Director 2',
    duration: 110,
    poster_url: 'https://example.com/poster2.jpg',
  },
  {
    id: 3,
    title: 'Old Movie',
    genre: 'Drama',
    release_year: 2010,
    rating: 6,
    banner_url: 'https://example.com/banner3.jpg',
    description: 'An old drama movie.',
    director: 'Director 3',
    duration: 100,
    poster_url: 'https://example.com/poster3.jpg',
  },
];

describe('CompactCarousel', () => {

  test('renders carousel with valid movies', () => {
    render(
      <MemoryRouter>
        <CompactCarousel movieList={mockMovies} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('slider')).toBeInTheDocument();
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
    expect(screen.getAllByText('Featured').length).toBeGreaterThan(0);
  });

  test('does not render movies released before 2015', () => {
    render(
      <MemoryRouter>
        <CompactCarousel movieList={mockMovies} />
      </MemoryRouter>
    );
    expect(screen.queryByText('Old Movie')).not.toBeInTheDocument();
  });

  test('navigates to movie page on click', () => {


    render(
      <MemoryRouter>
        <CompactCarousel movieList={mockMovies} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Movie 1'));
    expect(mockNavigate).toHaveBeenCalledWith('/movie?id=1');
  });
});