import { render, screen } from '@testing-library/react';
import MainCarouselMovieCard from '../components/home/MainCarouselMovieCard';

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  genre: 'Action',
  release_year: 2022,
  rating: 8.5,
  director: 'Jane Doe',
  duration: 120,
  plan: 'gold' as 'gold',
  description: 'This is a test movie description for the carousel card.',
  poster_url: 'https://example.com/poster.jpg',
  banner_url: 'https://example.com/banner.jpg',
};

test('renders MainCarouselMovieCard with movie details', () => {
  render(<MainCarouselMovieCard movie={mockMovie} />);
  expect(screen.getAllByAltText('Test Movie')[0]).toBeInTheDocument();
  expect(screen.getByText('Test Movie')).toBeInTheDocument();
  expect(screen.getByText(/This is a test movie description/i)).toBeInTheDocument();
  expect(screen.getByText('Action')).toBeInTheDocument();
  expect(screen.getByText('2022')).toBeInTheDocument();
  expect(screen.getByText('8.5')).toBeInTheDocument();
  expect(screen.getByText(/Jane Doe/)).toBeInTheDocument();
  expect(screen.getByText('Explore Movie')).toBeInTheDocument();
});