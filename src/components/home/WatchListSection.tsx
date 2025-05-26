import React, { Component } from 'react'
import { deleteWatchList, getWatchList, removeFromWatchList } from '../../services/movieApi'
import Carousel from './CategorySection/Carousel'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { toast } from 'react-toastify'
import MovieDashboard from '../../layout/MovieDashboard'
import { waitForElementToBeRemoved } from '@testing-library/react'


export class WatchListSection extends Component {
    state = {
        watchList: []
    }

    componentDidMount(): void {
        this.fetchWatchList()
    }

    fetchWatchList = async () => {
        const data = await getWatchList()
        if (data) {
            this.setState({ watchList: data })
        }
    }


    individualMovieDelete = async (movieId: number) => {
        try {
            const data = await removeFromWatchList(movieId)
            if (data) {
                toast.success("Movie removed from watchlist")
                const remainingWatchList = this.state.watchList.filter((movie: any) => movie.id !== movieId)
                this.setState({ watchList: remainingWatchList })
            }
        } catch (err: any) {
            toast.error(err?.message || "Couldn't delete movie from watchlist")
        }
    }

    render() {
        return (
            <div>
                <div className="flex items-center justify-between">
                    <h2 className="font-anton tracking-wide text-gray-300  text-3xl lg:text-3xl">
                        Your Watchlist
                    </h2>
                    {this.state.watchList.length > 0 && (
                        <div className='p-4'>
                            <button
                                onClick={() => window.location.href = '/watchlist'}
                                className="text-sm font-medium text-gray-300 hover:underline hover:text-[#d01c38] transition-colors duration-200 bg-transparent border-none outline-none cursor-pointer"
                                style={{ padding: 0 }}
                            >
                                See All
                            </button>
                        </div>
                    )}
                </div>
                {
                    this.state.watchList.length > 0 ? (
                        <>
                            <Carousel movieList={this.state.watchList} type='watchlist' handleDeleteWatchlist={this.individualMovieDelete} />
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col items-center justify-center rounded-xl p-8 mt-2 shadow-lg transition-all duration-300 opacity-50">
                                <AddCircleOutlineIcon sx={{ fontSize: 48, color: '#f02c48', opacity: 0.6, mb: 2 }} />
                                <h1 className="text-2xl font-normal text-gray-200 mb-2">Your Watchlist is Empty</h1>
                                <p className="text-gray-400">Add movies to your watchlist to see them here.</p>
                            </div>
                        </>
                    )
                }
            </div>
        )
    }
}

export default WatchListSection
