import React, { Component } from 'react';
import SearchHeader from '../components/search/SearchHeader';
import { getMovieByPageApi } from '../services/movieApi';
import WithRouter from '../components/hoc/WithRouter';
import MoviesGrid from '../components/common/MoviesGrid/MoviesGrid';
import Placeholder from '../components/common/Placeholder';

export class Search extends Component<any, any> {
  state = {
    searchTerm: '',
    selectedGenre: 'All',
    movies: [],
    totalPages: 0,
  };

  searchParams = new URLSearchParams(window.location.search);
  initialPage = parseInt(this.searchParams.get('pageCount') || '1');

  componentDidMount(): void {
    if (this.state.searchTerm) {
      this.fetchSearchResults(this.initialPage, null, this.state.searchTerm);
    }
  }

  onSearchChange = (event: React.ChangeEvent<HTMLInputElement> | React.SyntheticEvent, value: string | null = null) => {
    const searchTerm = value ?? (event.target && 'value' in event.target ? event.target.value : '');
    this.setState({ searchTerm }, () => {
      if (searchTerm.trim() !== '') {
        this.debouncedFetchSearchResults(1, this.state.selectedGenre === 'All' ? null : this.state.selectedGenre, searchTerm);
        const newSearchParams = new URLSearchParams(window.location.search);
        newSearchParams.set('pageCount', '1');
        this.props.navigate(`${window.location.pathname}?${newSearchParams.toString()}`);
      } else {
        this.props.navigate(`${window.location.pathname}`);
      }
    });
  };

  setSelectedGenre = (genre: string) => {
    this.setState({ selectedGenre: genre }, () => {
      if (this.state.searchTerm.trim() !== '') {
        this.debouncedFetchSearchResults(1, genre === 'All' ? null : genre, this.state.searchTerm);
        const newSearchParams = new URLSearchParams(window.location.search);
        newSearchParams.set('pageCount', '1');
        this.props.navigate(`${window.location.pathname}?${newSearchParams.toString()}`);
      }
    });
  };

  fetchSearchResults = async (page: number, genre: string | null = null, searchTerm: string) => {
    const response = await getMovieByPageApi(page, genre, searchTerm);
    if (response) {
      this.setState({ movies: response?.data });
      this.setState({ totalPages: response?.totalPages });
    }
    console.log('Search results:', response);
  };

  handlePageChange = (page: number) => {
    if (this.state.searchTerm === '') return;
    if (this.state.selectedGenre === 'All') {
      this.debouncedFetchSearchResults(page, null, this.state.searchTerm);
    } else {
      this.debouncedFetchSearchResults(page, this.state.selectedGenre, this.state.searchTerm);
    }
  };

  debounce = (callback: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout | null = null;
    return (...args: any[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };

  debouncedFetchSearchResults = this.debounce((page: number, genre: string | null, searchTerm: string) => {
    this.fetchSearchResults(page, genre, searchTerm);
  }, 1000);

  render() {
    const { searchTerm, selectedGenre, movies } = this.state;

    return (
      <div className="min-h-screen flex flex-col">
        <div className="pt-4 px-6">
          <SearchHeader
            setSelectedGenre={this.setSelectedGenre}
            selectedGenre={selectedGenre}
            searchTerm={searchTerm}
            onSearchChange={this.onSearchChange}
          />
        </div>
        <div className="flex-grow px-6 pb-5">
          {searchTerm.trim() === '' ? (
            <div className="flex items-center justify-center h-[60vh]">
              <Placeholder />
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">
                Search Results for: <span className="font-bold">{searchTerm}</span>
              </h2>
              <MoviesGrid
                type={"genre"}
                onChange={this.handlePageChange}
                movieList={movies}
                totalPages={this.state.totalPages}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default WithRouter(Search);
