import React, { useState, useRef, useEffect, useCallback } from 'react';
import SearchHeader from '../components/search/SearchHeader';
import { getMovieByPageApi } from '../services/movieApi';
import { useNavigate, useLocation } from 'react-router-dom';
import MoviesGrid from '../components/common/MoviesGrid/MoviesGrid';
import Placeholder from '../components/common/Placeholder';
import { Movie } from '../types/type';

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const mainRef = useRef<HTMLDivElement>(null);
  
  const searchParams = new URLSearchParams(location.search);
  const urlPage = parseInt(searchParams.get('pageCount') || '1');
  const urlSearch = searchParams.get('query') || '';
  const urlGenre = searchParams.get('genre') || 'All';

  const [searchTerm, setSearchTerm] = useState<string>(urlSearch);
  const [selectedGenre, setSelectedGenre] = useState<string>(urlGenre);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(urlPage);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const debounce = useCallback((func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }, []);
  
  
  const fetchSearchResults = useCallback(async (
    page: number, 
    genre: string | null = null, 
    searchTerm: string
  ) => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await getMovieByPageApi(
        page, 
        genre === 'All' ? null : genre, 
        searchTerm
      );
      
      if (response) {
        setMovies(response?.data || []);
        setTotalPages(response?.totalPages || 0);
      }
    } catch (error) {
      console.error('Search error:', error);
      setMovies([]);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  }, []);
  

  const debouncedSearch = useCallback(
    debounce((page: number, genre: string, term: string) => {
      fetchSearchResults(page, genre, term);
    }, 500),
    [fetchSearchResults, debounce]
  );
  
  const updateUrlParams = useCallback((
    term: string, 
    genre: string, 
    page: number
  ) => {
    const params = new URLSearchParams();
    if (term) params.set('query', term);
    if (genre !== 'All') params.set('genre', genre);
    params.set('pageCount', page.toString());
    
    navigate(`${window.location.pathname}?${params.toString()}`, { replace: true });
  }, [navigate]);
  
  const handleSearchChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement> | React.SyntheticEvent, 
    value: string | null = null
  ) => {
    const term = value ?? (event.target && 'value' in event.target ? event.target.value : '');
    setSearchTerm(term);
    
    if (term.trim()) {
      setCurrentPage(1);
      updateUrlParams(term, selectedGenre, 1);
      debouncedSearch(1, selectedGenre, term);
    } else {
      navigate(window.location.pathname);
      setMovies([]);
    }
  }, [navigate, selectedGenre, debouncedSearch, updateUrlParams]);
  
  const handleGenreChange = useCallback((genre: string) => {
    if (genre === selectedGenre) return;
    
    setSelectedGenre(genre);
    setCurrentPage(1);
    
    if (searchTerm.trim()) {
      updateUrlParams(searchTerm, genre, 1);
      debouncedSearch(1, genre, searchTerm);
    }
  }, [searchTerm, selectedGenre, debouncedSearch, updateUrlParams]);
  

  const handlePageChange = useCallback((page: number) => {
    if (page === currentPage || !searchTerm.trim()) return;
    
    setCurrentPage(page);
    updateUrlParams(searchTerm, selectedGenre, page);
    fetchSearchResults(page, selectedGenre === 'All' ? null : selectedGenre, searchTerm);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, searchTerm, selectedGenre, fetchSearchResults, updateUrlParams]);
  

  useEffect(() => {
    if (urlSearch) {
      fetchSearchResults(urlPage, urlGenre === 'All' ? null : urlGenre, urlSearch);
    }
    
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen flex flex-col">
      <div className="pt-4 px-6">
        <SearchHeader
          setSelectedGenre={handleGenreChange}
          selectedGenre={selectedGenre}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
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
              {selectedGenre !== 'All' && (
                <span className="ml-2 text-gray-400">
                  in <span className="text-white font-medium">{selectedGenre}</span>
                </span>
              )}
            </h2>
            
            <MoviesGrid
              movieList={movies}
              onChange={handlePageChange}
              totalPages={totalPages}
              currentPage={currentPage}
              type={'searcha'}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
