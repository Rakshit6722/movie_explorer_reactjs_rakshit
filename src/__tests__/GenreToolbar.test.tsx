import { render, screen, fireEvent } from '@testing-library/react';
import GenreToolbar from '../components/genre/GenreToolbar';

jest.mock('../constants/genre', () => ({
  genres: [
    { id: 1, name: 'All' },
    { id: 2, name: 'Action' },
    { id: 3, name: 'Adventure' },
    { id: 4, name: 'Comedy' },
    { id: 5, name: 'Drama' },
    { id: 6, name: 'Horror' },
    { id: 7, name: 'Romance' },
    { id: 8, name: 'Sci-Fi' },
    { id: 9, name: 'Thriller' },
    { id: 10, name: 'Fantasy' },
  ],
  genreGradients: {
    All: 'from-gray-700 to-gray-900',
    Action: 'from-red-500 to-yellow-500',
    Adventure: 'from-green-400 to-blue-500',
    Comedy: 'from-yellow-300 to-pink-400',
    Drama: 'from-purple-500 to-pink-500',
    Horror: 'from-gray-800 to-red-900',
    Romance: 'from-pink-400 to-red-400',
    'Sci-Fi': 'from-blue-400 to-indigo-600',
    Thriller: 'from-gray-700 to-gray-900',
    Fantasy: 'from-green-300 to-blue-300',
  }
}));

describe('GenreToolbar', () => {
  const setSelectedGenre = jest.fn();

  test('renders all genre buttons', () => {
    render(<GenreToolbar selectedGenre="All" setSelectedGenre={setSelectedGenre} />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Adventure')).toBeInTheDocument();
    expect(screen.getByText('Comedy')).toBeInTheDocument();
    expect(screen.getByText('Drama')).toBeInTheDocument();
    expect(screen.getByText('Horror')).toBeInTheDocument();
    expect(screen.getByText('Romance')).toBeInTheDocument();
    expect(screen.getByText('Sci-Fi')).toBeInTheDocument();
    expect(screen.getByText('Thriller')).toBeInTheDocument();
    expect(screen.getByText('Fantasy')).toBeInTheDocument();
  });

  test('calls setSelectedGenre when a genre is clicked', () => {
    render(<GenreToolbar selectedGenre="All" setSelectedGenre={setSelectedGenre} />);
    fireEvent.click(screen.getByText('Action'));
    expect(setSelectedGenre).toHaveBeenCalledWith('Action');
  });

  test('shows selected genre with special styling', () => {
    render(<GenreToolbar selectedGenre="Drama" setSelectedGenre={setSelectedGenre} />);
    expect(screen.getByText('Drama').parentElement).toHaveClass('text-white');
  });

  test('renders search mode without headings', () => {
    render(<GenreToolbar selectedGenre="All" setSelectedGenre={setSelectedGenre} type="search" />);
    expect(screen.queryByText('Discover Films')).not.toBeInTheDocument();
    expect(screen.queryByText(/Find movies/i)).not.toBeInTheDocument();
  });

  test('renders with removeMargins prop', () => {
    render(<GenreToolbar selectedGenre="All" setSelectedGenre={setSelectedGenre} type="search" removeMargins />);
    expect(screen.getByText('All')).toBeInTheDocument();
  });
});