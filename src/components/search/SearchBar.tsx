import React from 'react'; 
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { IoSearch } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { top100Films } from '../../constants/search';

type AutocompleteProps = {
  searchTerm: string;
  onSearchChange: (event: React.SyntheticEvent<Element, Event>, value: string | null) => void;
  removeMargins?: boolean;
  hideTitle?: boolean;
};

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
    border: '1px solid #1f2937',
    borderRadius: '0.5rem',
    color: '#d1d5db',
    padding: '0.25rem 0',
    paddingRight: '2.5rem', 
    transition: 'all 0.3s',
    '&:hover': {
      borderColor: '#374151',
    },
    '&.Mui-focused': {
      borderColor: '#f02c49',
      boxShadow: 'none',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '& .MuiInputBase-input': {
    paddingLeft: '2.75rem !important',
    color: '#d1d5db',
    paddingRight: '0.5rem !important',
  },
  '& .MuiAutocomplete-listbox': {
    backgroundColor: '#0f172a',
    border: '1px solid #1f2937',
    '& li': {
      color: '#d1d5db',
    },
  },
  '& .MuiAutocomplete-option': {
    '&[aria-selected="true"]': {
      backgroundColor: 'rgba(240, 44, 73, 0.15)',
    },
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
  },
}));

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f02c49',
    },
    background: {
      default: '#0f172a',
      paper: '#0f172a',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#0f172a',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
          borderRadius: '0.5rem',
          border: '1px solid #1f2937',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
        },
      },
    },
  },
});

export default function SearchBar({ searchTerm, onSearchChange, removeMargins = false, hideTitle = false }: AutocompleteProps) {
  const handleClear = () => {
    onSearchChange({} as React.SyntheticEvent, "");
  };

  return (
    <div className={`w-full ${removeMargins ? '' : 'px-4 py-6 mb-6'}`}>
      {!hideTitle && (
        <div className="flex flex-col mb-4">
          <p className='font-anton text-gray-300 tracking-wide text-3xl lg:text-4xl'>Explore Movies</p>
          <p className="text-gray-400 italic text-sm font-light">Find your favorite films with instant search</p>
        </div>
      )}

      <div className="relative w-full">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 pointer-events-none">
          <IoSearch size={20} />
        </div>

        <ThemeProvider theme={darkTheme}>
          <StyledAutocomplete
            freeSolo
            id="movie-search"
            value={searchTerm}
            disableClearable={true}
            forcePopupIcon={false}
            onChange={(event, value, reason, details) => onSearchChange(event, value as string | null)}
            onInputChange={onSearchChange}
            options={top100Films.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search for title of movie..."
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                  endAdornment: (
                    <React.Fragment>
                      {searchTerm ? (
                        <button
                          type="button"
                          onClick={handleClear}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-[#f02c49] z-20 p-1"
                          tabIndex={-1}
                          aria-label="Clear"
                          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          <MdClear size={20} />
                        </button>
                      ) : null}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </ThemeProvider>
      </div>
    </div>
  );
}




