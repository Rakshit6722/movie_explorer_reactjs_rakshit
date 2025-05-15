import { render, screen, fireEvent } from '@testing-library/react';
import MoviesGrid from '../components/common/MoviesGrid/MoviesGrid';

jest.mock('../components/common/MoviesCard', () => (props: any) => (
  <div data-testid="movie-card">{props.movie.title}</div>
));

describe('MoviesGrid', () => {
  const mockMovies = [
    { id: 1, title: 'Movie 1', genre: 'Action', duration: 120, release_year: 2020, rating: 8, plan: "basic" as const, poster_url: '', director: '', description: '', banner_url: '' },
    { id: 2, title: 'Movie 2', genre: 'Drama', duration: 90, release_year: 2021, rating: 7, plan: "basic" as const, poster_url: '', director: '', description: '', banner_url: ''  },
    { id: 2, title: 'Movie 2', genre: 'Drama', duration: 90, release_year: 2021, rating: 7, plan: "basic" as const, poster_url: '', director: '', description: '', banner_url: ''  },
    { id: 2, title: 'Movie 2', genre: 'Drama', duration: 90, release_year: 2021, rating: 7, plan: "basic" as const, poster_url: '', director: '', description: '', banner_url: ''  },
    { id: 2, title: 'Movie 2', genre: 'Drama', duration: 90, release_year: 2021, rating: 7, plan: "basic" as const, poster_url: '', director: '', description: '', banner_url: ''  },
    { id: 2, title: 'Movie 2', genre: 'Drama', duration: 90, release_year: 2021, rating: 7, plan: "basic" as const, poster_url: '', director: '', description: '', banner_url: ''  },
    { id: 2, title: 'Movie 2', genre: 'Drama', duration: 90, release_year: 2021, rating: 7, plan: "basic" as const, poster_url: '', director: '', description: '', banner_url: ''  },
    { id: 2, title: 'Movie 2', genre: 'Drama', duration: 90, release_year: 2021, rating: 7, plan: "basic" as const, poster_url: '', director: '', description: '', banner_url: ''  },
    { id: 2, title: 'Movie 2', genre: 'Drama', duration: 90, release_year: 2021, rating: 7, plan: "basic" as const, poster_url: '', director: '', description: '', banner_url: ''  },
    { id: 2, title: 'Movie 2', genre: 'Drama', duration: 90, release_year: 2021, rating: 7, plan: "basic" as const, poster_url: '', director: '', description: '', banner_url: ''  },
    { id: 2, title: 'Movie 2', genre: 'Drama', duration: 90, release_year: 2021, rating: 7, plan: "basic" as const, poster_url: '', director: '', description: '', banner_url: ''  },
    { id: 2, title: 'Movie 2', genre: 'Drama', duration: 90, release_year: 2021, rating: 7, plan: "basic" as const, poster_url: '', director: '', description: '', banner_url: ''  },
    { id: 2, title: 'Movie 2', genre: 'Drama', duration: 90, release_year: 2021, rating: 7, plan: "basic" as const, poster_url: '', director: '', description: '', banner_url: ''  },
  ];

  test('renders loading state', () => {
    render(<MoviesGrid movieList={[]} isLoading={true} />);
    expect(screen.getByText(/Loading movies/i)).toBeInTheDocument();
  });

  test('renders movies when movieList is not empty', () => {
    render(<MoviesGrid movieList={mockMovies} />);
    expect(screen.getByTestId('movie-card')).toBeInTheDocument();
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
  });

  test('renders no movies found when movieList is empty and not loading', () => {
    render(<MoviesGrid movieList={[]} isLoading={false} />);
    expect(screen.getByText(/No movies found/i)).toBeInTheDocument();
  });

  test('renders pagination when type is genre and pageCount > 1', () => {
    render(
      <MoviesGrid
        movieList={mockMovies}
        type="genre"
        totalPages={3}
        currentPage={1}
      />
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /page/i }).length).toBeGreaterThan(0);
  });

  test('renders pagination when type is search and pageCount > 1', () => {
    render(
      <MoviesGrid
        movieList={mockMovies}
        type="search"
        totalPages={2}
        currentPage={1}
      />
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('does not render pagination when type is null', () => {
    render(
      <MoviesGrid
        movieList={mockMovies}
        type={null}
        totalPages={1}
        currentPage={1}
      />
    );
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  test('calls onChange when pagination is clicked', () => {
    const handleChange = jest.fn();
    render(
      <MoviesGrid
        movieList={mockMovies}
        type="genre"
        totalPages={3}
        currentPage={1}
        onChange={handleChange}
      />
    );
    const page2 = screen.getByRole('button', { name: /2/ });
    fireEvent.click(page2);
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  test('does not call onChange if same page is clicked', () => {
    const handleChange = jest.fn();
    render(
      <MoviesGrid
        movieList={mockMovies}
        type="genre"
        totalPages={3}
        currentPage={2}
        onChange={handleChange}
      />
    );
    const page2 = screen.getByRole('button', { name: '2' });
    fireEvent.click(page2);
    expect(handleChange).not.toHaveBeenCalled();
  });
});