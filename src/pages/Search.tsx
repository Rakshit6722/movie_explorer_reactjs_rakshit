import React, { useState, useRef, useEffect, useCallback } from 'react';
import SearchHeader from '../components/search/SearchHeader';
import { getMovieByPageApi } from '../services/movieApi';
import { useNavigate, useLocation } from 'react-router-dom';
import MoviesGrid from '../components/common/MoviesGrid/MoviesGrid';
import { Movie } from '../types/type';
import { motion } from 'framer-motion';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import SearchIcon from '@mui/icons-material/Search';
import VideocamIcon from '@mui/icons-material/Videocam';
import { toast } from 'react-toastify';

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
      toast.error('Error fetching movies. Please try again later.');
      setMovies([]);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeFromPageMovies = (id: number) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  }

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      ref={mainRef}
      className="min-h-screen flex flex-col bg-gradient-to-b from-black via-[#0a0a0a] to-[#050505]"
    >

      <div className="relative">

        <div className="absolute inset-0 overflow-hidden">
          <div className="film-strip-top"></div>
          <div className="film-strip-bottom"></div>
        </div>


        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40vw] h-[30vh] bg-[#e23145]/10 blur-[120px] rounded-[100%] opacity-50"></div>

        <div className="pt-8 px-6 pb-12 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex items-center justify-center"
            >
              <SearchIcon sx={{ fontSize: 28, color: '#e23145', marginRight: '12px' }} />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Explore Movies
              </h1>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <SearchHeader
                setSelectedGenre={handleGenreChange}
                selectedGenre={selectedGenre}
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="flex-grow px-6 pb-12">
        {searchTerm.trim() === '' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-[60vh] text-center"
          >
            <div className="mb-8 p-6 bg-[#e23145]/5 rounded-full">
              <VideocamIcon sx={{ fontSize: 64, color: '#e23145' }} />
            </div>
            <h2 className="text-2xl font-medium mb-3">Discover Your Next Favorite Movie</h2>
            <p className="text-gray-400 max-w-lg">
              Enter a title or any keyword to begin your cinematic journey
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="flex items-center">
              <LocalMoviesIcon sx={{ color: '#e23145', marginRight: '12px' }} />
              <h2 className="text-2xl font-semibold text-white">
                Results for <span className="text-white">"{searchTerm}"</span>
                {selectedGenre !== 'All' && (
                  <span className="ml-2 text-gray-400">
                    in <span className="text-white font-medium border-b border-[#e23145]/50">{selectedGenre}</span>
                  </span>
                )}
              </h2>
            </div>


            {!isLoading && (
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="mr-2 px-2 py-0.5 bg-gray-800/50 rounded-md font-medium">
                  {totalPages > 0 ? `${Math.min(20, movies.length)} of ${totalPages * 20}+ results` : 'No results found'}
                </span>
              </div>
            )}

            <MoviesGrid
              movieList={movies}
              onChange={handlePageChange}
              totalPages={totalPages}
              currentPage={currentPage}
              type={'search'}
              isLoading={isLoading}
              removeFromPageMovies={removeFromPageMovies}
              genreCard={true}
            />
          </motion.div>
        )}
      </div>

    </motion.div>
  );
}

export default Search;
