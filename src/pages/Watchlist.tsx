import React, { Component } from 'react'
import { deleteWatchList, getWatchList, removeFromWatchList } from '../services/movieApi'
import MoviesCard from '../components/common/MoviesCard'
import { Container, Typography, Box, Fade, Select, MenuItem, FormControl, InputLabel, InputAdornment, TextField, Chip, Divider, Grid, CircularProgress } from '@mui/material'
import Footer from '../components/common/Footer'
import SearchIcon from '@mui/icons-material/Search'
import SortIcon from '@mui/icons-material/Sort'
import FilterListIcon from '@mui/icons-material/FilterList'
import MovieFilterIcon from '@mui/icons-material/MovieFilter'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { Movie } from '../types/type'
import { Delete } from 'lucide-react'
import { MdDeleteForever } from 'react-icons/md'

export class Watchlist extends Component<any, any> {
    state = {
        watchList: [],
        filteredList: [],
        loading: true,
        sortBy: 'recently_added',
        filterGenre: 'all',
        searchTerm: '',
        genres: ['all'],
    }

    async componentDidMount() {
        window.scrollTo(0, 0)
        await this.fetchWatchList()
    }

    fetchWatchList = async () => {
        try {
            this.setState({ loading: true })
            const data = await getWatchList()
            if (data) {
                const genres = ['all', ...new Set(data.map((movie: Movie) => movie.genre))]

                this.setState({
                    watchList: data,
                    filteredList: data,
                    genres,
                    loading: false
                })
            }
        } catch (err: any) {
            console.error("Error fetching watchlist:", err.message || "An error occurred while fetching the watchlist.")
            this.setState({ loading: false })
        }
    }

    handleRemoveFromWatchlist = async (movieId: number) => {
        try {
            await removeFromWatchList(movieId)
            this.setState((prevState: any) => ({
                watchList: prevState.watchList.filter((movie: Movie) => movie.id !== movieId),
                filteredList: prevState.filteredList.filter((movie: Movie) => movie.id !== movieId)
            }))
            toast.success("Movie removed from watchlist")
        } catch (err) {
            toast.error("Failed to remove movie from watchlist")
        }
    }

    clearWatchlist = async () => {
        try {
            const response = await deleteWatchList()
            if (response) {
                this.setState({ watchList: [], filteredList: [] })
                toast.success("Watchlist cleared successfully")
            }
        } catch (err: any) {
            toast.error("Failed to clear watchlist")
        }
    }

    handleSort = (event: any) => {
        const sortBy = event.target.value
        this.setState({ sortBy }, this.applyFilters)
    }

    handleFilterChange = (event: any) => {
        const filterGenre = event.target.value
        this.setState({ filterGenre }, this.applyFilters)
    }

    handleSearchChange = (event: any) => {
        const searchTerm = event.target.value
        this.setState({ searchTerm }, this.applyFilters)
    }

    applyFilters = () => {
        const { watchList, sortBy, filterGenre, searchTerm } = this.state

        let filtered = watchList

        if (filterGenre !== 'all') {
            filtered = filtered.filter((movie: Movie) => movie.genre === filterGenre)
        }

        if (searchTerm) {
            filtered = filtered.filter((movie: Movie) =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        let sorted = [...filtered]
        switch (sortBy) {
            case 'title_asc':
                sorted.sort((a: Movie, b: Movie) => a.title.localeCompare(b.title))
                break
            case 'title_desc':
                sorted.sort((a: Movie, b: Movie) => b.title.localeCompare(a.title))
                break
            case 'rating_desc':
                sorted.sort((a: Movie, b: Movie) => b.rating - a.rating)
                break
            case 'year_desc':
                sorted.sort((a: Movie, b: Movie) => b.release_year - a.release_year)
                break
            case 'year_asc':
                sorted.sort((a: Movie, b: Movie) => a.release_year - b.release_year)
                break
            default:
                break
        }

        this.setState({ filteredList: sorted })
    }

    render() {
        const { filteredList, loading, sortBy, filterGenre, searchTerm, genres } = this.state

        return (
            <div className="min-h-screen bg-black">

                <Container maxWidth="xl" sx={{ py: 4, mt: 2 }}>
                    <Box sx={{ mb: 4 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Typography variant="h4" component="h1" sx={{
                                color: 'white',
                                mb: 1,
                                fontFamily: 'Anton'
                            }}>
                                My Watchlist
                            </Typography>

                            <Typography variant="body1" sx={{
                                color: 'rgba(255,255,255,0.7)',
                                mb: 3
                            }}>
                                {filteredList.length} {filteredList.length === 1 ? 'movie' : 'movies'} saved to watch later
                            </Typography>
                        </motion.div>

                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <TextField
                                    fullWidth
                                    placeholder="Search in your watchlist"
                                    value={searchTerm}
                                    onChange={this.handleSearchChange}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
                                            </InputAdornment>
                                        ),
                                        sx: {
                                            borderRadius: '10px',
                                            bgcolor: 'rgba(255,255,255,0.05)',
                                            color: 'white',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'rgba(255,255,255,0.1)',
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'rgba(240,44,73,0.3)',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'rgba(240,44,73,0.6)',
                                            }
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item md={1} lg={2} sx={{ display: { xs: 'none', md: 'block' } }} />

                            <Grid item xs={12} sm={6} md={5} lg={4} container spacing={2}>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="sort-label" sx={{ color: 'rgba(255,255,255,0.7)' }}>Sort</InputLabel>
                                        <Select
                                            labelId="sort-label"
                                            value={sortBy}
                                            onChange={this.handleSort}
                                            label="Sort"
                                            MenuProps={{
                                                PaperProps: {
                                                    sx: {
                                                        bgcolor: '#1a1a1f',
                                                        borderRadius: '10px',
                                                        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                                                        border: '1px solid rgba(255,255,255,0.1)',
                                                        '& .MuiMenuItem-root': {
                                                            color: 'rgba(255,255,255,0.9)',
                                                            fontSize: '15px',
                                                            padding: '8px 16px',
                                                            '&:hover': {
                                                                bgcolor: 'rgba(240,44,73,0.1)',
                                                            },
                                                            '&.Mui-selected': {
                                                                bgcolor: 'rgba(240,44,73,0.2)',
                                                                '&:hover': {
                                                                    bgcolor: 'rgba(240,44,73,0.25)',
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }}
                                            sx={{
                                                borderRadius: '10px',
                                                bgcolor: 'rgba(255,255,255,0.05)',
                                                color: 'white',
                                                '.MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'rgba(255,255,255,0.1)',
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'rgba(240,44,73,0.3)',
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'rgba(240,44,73,0.6)',
                                                }
                                            }}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <SortIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
                                                </InputAdornment>
                                            }
                                        >
                                            <MenuItem value="recently_added">Recently Added</MenuItem>
                                            <MenuItem value="title_asc">Title (A-Z)</MenuItem>
                                            <MenuItem value="title_desc">Title (Z-A)</MenuItem>
                                            <MenuItem value="rating_desc">Highest Rated</MenuItem>
                                            <MenuItem value="year_desc">Newest First</MenuItem>
                                            <MenuItem value="year_asc">Oldest First</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="filter-label" sx={{ color: 'rgba(255,255,255,0.7)' }}>Genre</InputLabel>
                                        <Select
                                            labelId="filter-label"
                                            value={filterGenre}
                                            onChange={this.handleFilterChange}
                                            label="Genre"
                                            MenuProps={{
                                                PaperProps: {
                                                    sx: {
                                                        bgcolor: '#1a1a1f',
                                                        borderRadius: '10px',
                                                        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                                                        border: '1px solid rgba(255,255,255,0.1)',
                                                        '& .MuiMenuItem-root': {
                                                            color: 'rgba(255,255,255,0.9)',
                                                            fontSize: '15px',
                                                            padding: '8px 16px',
                                                            '&:hover': {
                                                                bgcolor: 'rgba(240,44,73,0.1)',
                                                            },
                                                            '&.Mui-selected': {
                                                                bgcolor: 'rgba(240,44,73,0.2)',
                                                                '&:hover': {
                                                                    bgcolor: 'rgba(240,44,73,0.25)',
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }}
                                            sx={{
                                                borderRadius: '10px',
                                                bgcolor: 'rgba(255,255,255,0.05)',
                                                color: 'white',
                                                '.MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'rgba(255,255,255,0.1)',
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'rgba(240,44,73,0.3)',
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'rgba(240,44,73,0.6)',
                                                }
                                            }}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <FilterListIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
                                                </InputAdornment>
                                            }
                                        >
                                            {genres.map(genre => (
                                                <MenuItem key={genre} value={genre}>
                                                    {genre === 'all' ? 'All Genres' : genre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            {
                                this.state.watchList.length > 0 && (

                                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                                        <Box
                                            onClick={this.clearWatchlist}
                                            sx={{
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                color: 'rgba(255,255,255,0.7)',
                                                fontSize: '14px',
                                                gap: '6px',
                                                padding: '8px 16px',
                                                borderRadius: '8px',
                                                transition: 'all 0.2s ease',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                bgcolor: 'rgba(255,255,255,0.03)',
                                                '&:hover': {
                                                    color: '#fff',
                                                    bgcolor: 'rgba(240,44,73,0.1)',
                                                    borderColor: 'rgba(240,44,73,0.3)',
                                                }
                                            }}
                                        >
                                            <MdDeleteForever size={18} style={{ color: '#f02c49' }} />
                                            <span>Clear Watchlist</span>
                                        </Box>
                                    </Grid>
                                )
                            }
                        </Grid>

                        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 3 }} />
                    </Box>

                    {loading ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: '50vh'
                            }}
                        >
                            <CircularProgress
                                size={60}
                                thickness={4}
                                sx={{
                                    color: '#f02c49',
                                    '& .MuiCircularProgress-circle': {
                                        strokeLinecap: 'round',
                                    },
                                    boxShadow: '0 0 15px rgba(240,44,73,0.3)'
                                }}
                            />
                        </Box>
                    ) : filteredList.length > 0 ? (
                        <Fade in={!loading}>
                            <Grid container spacing={3}>
                                {filteredList.map((movie, index) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                                        <MoviesCard
                                            movie={movie}
                                            type="watchlist"
                                            index={index}
                                            handleDeleteWatchlist={this.handleRemoveFromWatchlist}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Fade>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                py: 10,
                                textAlign: 'center'
                            }}
                        >
                            <MovieFilterIcon sx={{ fontSize: 60, color: 'rgba(255,255,255,0.2)', mb: 2 }} />

                            {searchTerm || filterGenre !== 'all' ? (
                                <>
                                    <Typography variant="h5" component="h2" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                                        No movies match your filters
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', mb: 3, maxWidth: 500 }}>
                                        Try adjusting your search or filter criteria to find movies in your watchlist.
                                    </Typography>
                                    <Chip
                                        label="Clear all filters"
                                        onClick={() => this.setState({ searchTerm: '', filterGenre: 'all' }, this.applyFilters)}
                                        sx={{
                                            bgcolor: 'rgba(240,44,73,0.1)',
                                            color: '#f02c49',
                                            borderRadius: '8px',
                                            '&:hover': {
                                                bgcolor: 'rgba(240,44,73,0.2)',
                                            }
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <Typography variant="h5" component="h2" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                                        Your watchlist is empty
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', mb: 3, maxWidth: 500 }}>
                                        Browse movies and click the "Add to Watchlist" button to save movies you want to watch later.
                                    </Typography>
                                    <Chip
                                        label="Browse movies"
                                        component="a"
                                        href="/home"
                                        clickable
                                        sx={{
                                            bgcolor: 'rgba(240,44,73,0.9)',
                                            color: 'white',
                                            borderRadius: '8px',
                                            '&:hover': {
                                                bgcolor: '#f02c49',
                                            },
                                            textDecoration: 'none',
                                            fontWeight: 500,
                                            fontSize: '14px',
                                        }}
                                    />
                                </>
                            )}
                        </Box>
                    )}
                </Container>

                <Footer />
            </div>
        )
    }
}

export default Watchlist
