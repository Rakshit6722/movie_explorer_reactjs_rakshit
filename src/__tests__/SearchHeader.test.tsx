import { render, screen } from '@testing-library/react';
import { SearchHeader } from '../components/search/SearchHeader';

jest.mock('../components/search/SearchBar', () => (props: any) => (
  <div data-testid="search-bar">{props.searchTerm}</div>
));
jest.mock('../components/genre/GenreToolbar', () => (props: any) => (
  <div data-testid="genre-toolbar">{props.selectedGenre}</div>
));

describe('SearchHeader', () => {
  const defaultProps = {
    searchTerm: 'Avengers',
    onSearchChange: jest.fn(),
    selectedGenre: 'Action',
    setSelectedGenre: jest.fn(),
  };

  test('renders header and description', () => {
    render(<SearchHeader {...defaultProps} />);
    expect(screen.getByText('Explore Movies')).toBeInTheDocument();
    expect(screen.getByText(/Search and filter your favorite films/i)).toBeInTheDocument();
  });

  test('renders SearchBar with correct props', () => {
    render(<SearchHeader {...defaultProps} />);
    expect(screen.getByTestId('search-bar')).toHaveTextContent('Avengers');
  });

  test('renders GenreToolbar with correct props', () => {
    render(<SearchHeader {...defaultProps} />);
    expect(screen.getByTestId('genre-toolbar')).toHaveTextContent('Action');
  });
});