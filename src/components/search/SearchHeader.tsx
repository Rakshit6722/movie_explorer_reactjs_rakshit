import React, { Component } from 'react'
import WithReduxState from '../hoc/WithReduxState';
import { Movie } from '../../types/type';
import SearchBar from './SearchBar';
import GenreToolbar from '../genre/GenreToolbar';

type SearchHeaderProps = {
  searchTerm: string;
  onSearchChange: (event: React.SyntheticEvent<Element, Event>, value: string | null) => void;
  movieList?: Movie[];
  selectedGenre?: string;
  setSelectedGenre?: (genre: string) => void;
}

export class SearchHeader extends Component<SearchHeaderProps> {
  render() {
    const { searchTerm, onSearchChange, selectedGenre, setSelectedGenre } = this.props;

    return (
      <div className="w-full md:px-4 mb-6">
        <div className="bg-black/40 backdrop-blur-md rounded-xl border border-gray-800/50 shadow-xl">
          <div className="px-6 pt-5 pb-3">
            <p className="text-gray-400 text-sm italic">Search and filter your favorite films</p>
          </div>
          
          <div className="px-6 pb-3">
            <div className="bg-gray-900/80 rounded-lg border border-gray-800">
              <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} removeMargins={true} hideTitle={true} />
            </div>
          </div>
          
          <div className="px-6 pb-5">
            <GenreToolbar 
              selectedGenre={selectedGenre || 'All'} 
              setSelectedGenre={setSelectedGenre || (() => {})} 
              type='search'
              removeMargins={true}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default WithReduxState(SearchHeader)
