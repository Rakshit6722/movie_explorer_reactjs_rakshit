import { render, screen, fireEvent } from '@testing-library/react';
import GenreToolbar from '../components/genre/GenreToolbar';

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