import React, { Component } from 'react';
import { Movie } from '../../types/type';
import { motion } from 'framer-motion';
import { Skeleton } from '@mui/material';

type Props = {
  movie: Movie;
};

export class MainCarouselMovieCard extends Component<Props, any> {
  state = {
    coverUrl: this.props.movie.poster_url,
    bannerUrl: this.props.movie.banner_url,
    bannerLoaded: false,
    posterLoaded: false,
    hasError: false
  };

  componentDidMount(): void {
    // Preload images with proper error handling
    this.preloadImages();
  }

  preloadImages = () => {
    // Banner image
    const bannerImage = new Image();
    bannerImage.onload = () => this.setState({ bannerLoaded: true });
    bannerImage.onerror = () => this.setState({ hasError: true });
    bannerImage.src = this.state.bannerUrl;

    // Poster image
    const posterImage = new Image();
    posterImage.onload = () => this.setState({ posterLoaded: true });
    posterImage.onerror = () => this.setState({ hasError: true });
    posterImage.src = this.state.coverUrl;
  };

  render() {
    const { coverUrl, bannerUrl, bannerLoaded, posterLoaded } = this.state;
    const { title, genre, release_year, rating, director, id, description } = this.props.movie;

    return (
      <div className="relative group w-full h-[400px] md:h-[500px] lg:h-[600px] xl:h-[650px] 2xl:h-[700px] overflow-hidden bg-[#121218]">
        {!bannerLoaded ? (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black to-[#121218] animate-pulse">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-gray-700 border-t-red-500 rounded-full animate-spin"></div>
            </div>
          </div>
        ) : (
          <img
            src={bannerUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 group-hover:scale-105"
            loading="eager"
            style={{ opacity: bannerLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in' }}
          />
        )}

        <div
          className="absolute"
          style={{
            top: '-4%',
            left: '-4%',
            width: '108%',
            height: '108%',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <div className="w-full h-full bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-500 group-hover:via-black/70" />
        </div>

        <div
          className="absolute bottom-20 left-6 md:left-16 z-20 flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
          
          <div className="hidden md:block w-[160px] h-[230px] rounded-lg overflow-hidden shadow-md bg-gray-900">
            {!posterLoaded ? (
              <Skeleton 
                variant="rectangular"
                width="100%"
                height="100%"
                animation="wave"
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
              />
            ) : (
              <img
                src={coverUrl}
                alt={title}
                className="w-full h-full object-cover"
                style={{ opacity: posterLoaded ? 1 : 0, transition: 'opacity 0.3s ease-in' }}
              />
            )}
          </div>

          <div className="text-white hidden md:block max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight opacity-65 leading-tight transition-transform duration-300 group-hover:translate-x-1">
              {title}
            </h2>

            <p className="text-gray-300 text-sm italic mb-4">
              {description.split(' ').slice(0, 20).join(' ')}...
            </p>
            <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-300 mb-4">
              {genre && (
                <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full">
                  {genre}
                </span>
              )}
              {release_year && (
                <span className="text-gray-400">{release_year}</span>
              )}
              {rating && (
                <span className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09L5.6 12.18.727 7.91l6.412-.59L10 2l2.86 5.32 6.413.59-4.874 4.27 1.478 5.91z" />
                  </svg>
                  <span>{rating.toFixed(1)}</span>
                </span>
              )}
            </div>

            <p className="text-gray-300 text-sm mb-4">
              Directed by: <span className="font-medium text-gray-100">{director}</span>
            </p>

            <button
              onClick={() => window.location.href = `/movie?id=${id}`}
              className="mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#e23145] to-[#c41f33] text-white text-sm font-semibold hover:opacity-90 hover:scale-105 transition-all flex items-center space-x-2"
            >
              <span>Explore Movie</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MainCarouselMovieCard;
