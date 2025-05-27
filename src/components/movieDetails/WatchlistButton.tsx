import { Button, CircularProgress, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { addToWatchList, getWatchList, removeFromWatchList } from '../../services/movieApi'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { toast } from 'react-toastify'

function WatchlistButton({ movieId, togglePopover }: { movieId: number, togglePopover?: () => void }) {
    
    const [isAdded, setIsAdded] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (movieId) {
            moviePresentInWatchList(movieId)
        }
    }, [])

    const getAllWatchList = async () => {
        const data = await getWatchList()
        return data
    }
    const moviePresentInWatchList = (movieId: number) => {
        setLoading(true)
        getAllWatchList().then((data) => {
            const isPresent = data.some((movie: any) => movie.id === movieId)
            setIsAdded(isPresent)
        }).catch((err) => {
            toast.error(err.message ?? "Failed to fetch watchlist. Please try again later.")
        }).finally(() => {
            setLoading(false)
        })
    }
    const handleToggle = async () => {
        if (isAdded) {
            await removeMovieFromWatchlist(movieId)
        } else {
            await addMovieToWatchlist(movieId)
            togglePopover && togglePopover()
        }
        moviePresentInWatchList(movieId)
    }

    const addMovieToWatchlist = async (movieId: number) => {
        try {
            setLoading(true)
            const response = await addToWatchList(movieId)
            if (response?.status === 200) {
                setIsAdded(true)
            }

        } catch (err: any) {
            toast.error(err.message ?? "Failed to add movie to watchlist. Please try again later.")
        } finally {
            setLoading(false)
        }
    }

    const removeMovieFromWatchlist = async (movieId: number) => {
        try {
            setLoading(true)
            const response = await removeFromWatchList(movieId)
            if (response?.status === 200) {
                setIsAdded(false)
                toast.success("Removed from Watchlist",{
                    autoClose: 1000,
                })
            }
        } catch (err: any) {
            toast.error(err.message ?? "Failed to remove movie from watchlist. Please try again later.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Tooltip title={isAdded ? "Remove from Watchlist" : "Add to Watchlist"}>
            <span>
                <Button
                    onClick={handleToggle}
                    disabled={loading}
                    startIcon={loading ?
                        <CircularProgress size={16} color="inherit" /> :
                        isAdded ? <FaHeart size={16} /> : <FaRegHeart size={16} />
                    }
                    sx={{
                        minWidth: 'auto',
                        height: 36,
                        padding: '0 12px',
                        borderRadius: '18px',
                        background: isAdded
                            ? 'rgba(255,122,122,0.13)'
                            : 'rgba(122,183,255,0.09)',
                        color: isAdded ? '#ff7a7a' : '#7ab7ff',
                        border: isAdded ? '1.5px solid #ff7a7a' : '1.5px solid #7ab7ff',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '13px',
                        fontWeight: 500,
                        transition: 'all 0.18s cubic-bezier(.4,0,.2,1)',
                        position: 'relative',
                        '&:hover': {
                            background: isAdded
                                ? 'rgba(255,122,122,0.22)'
                                : 'rgba(122,183,255,0.16)',
                            color: isAdded ? '#ffb3b3' : '#a3d8ff',
                            borderColor: isAdded ? '#ffb3b3' : '#7ab7ff',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                        },
                    }}
                >
                    {isAdded ? 'Remove' : 'Watchlist'}
                </Button>
            </span>
        </Tooltip>
    )
}

export default WatchlistButton
