import React, { Component } from 'react';
import CarouselSection from './CarouselSection';
import MainCarousel from '../MainCarousel';
import { getMovieByPageApi, getMoviesForHomePage } from '../../../services/movieApi';
import WithRouter from '../../hoc/WithRouter';
import { setLoading, setMovies } from '../../../redux/slices/movieSlice';
import { Skeleton, Box } from '@mui/material';
import { connect } from 'react-redux';

export class Index extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasScrolled: false,
      isFading: false,
      loading: true, // Track loading state
    };
  }

  componentDidMount() {
    this.fetchHomeMovies();
    window.addEventListener('scroll', this.handleScroll);
    
    // Add the keyframe animation to the document
    const style = document.createElement('style');
    style.textContent = `
      @keyframes flicker {
        0% { opacity: 1 }
        50% { opacity: 0.55 }
        60% { opacity: 0.85 }
        70% { opacity: 0.55 }
        80% { opacity: 0.85 }
        100% { opacity: 1 }
      }
      
      .flicker-effect {
        animation: flicker 2s infinite ease-in-out;
      }
    `;
    document.head.appendChild(style);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  fetchHomeMovies = async () => {
    this.props.dispatch(setLoading(true));
    this.setState({ loading: true });
    try {
      const data = await getMoviesForHomePage(10);
      if (data) {
        this.props.dispatch(setMovies(data));
      }
    } catch (err: any) {
      console.log(err.message);
    } finally {
      this.props.dispatch(setLoading(false));
      this.setState({ loading: false });
    }
  }

  handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 320 && !this.state.hasScrolled) {
      this.setState({ isFading: true });
      setTimeout(() => {
        this.setState({ hasScrolled: true, isFading: false });
      }, 500);
    } else if (scrollTop <= 300 && this.state.hasScrolled) {
      this.setState({ hasScrolled: false });
    }
  };

  // Carousel skeleton loading component with flickering effect
  renderCarouselSkeleton = () => (
    <Box className="w-full flicker-effect">
      <Skeleton 
        variant="rectangular" 
        animation="wave" 
        width="100%" 
        height={500} 
        sx={{ 
          bgcolor: 'rgba(255, 255, 255, 0.06)', // Very subtle brightness increase
          borderRadius: '8px',
        }} 
      />
    </Box>
  );

  // Movie card skeleton loading component with flickering effect
  renderMovieCardsSkeleton = () => (
    <Box className="w-full px-4 py-6">
      <Skeleton
        variant="text"
        width={200}
        height={32}
        animation="wave"
        sx={{ 
          bgcolor: 'rgba(255, 255, 255, 0.06)', // Very subtle brightness increase
          mb: 3,
        }}
        className="flicker-effect"
      />

      <Box className="flex gap-3 overflow-x-hidden">
        {[...Array(6)].map((_, index) => (
          <Box 
            key={index} 
            sx={{ minWidth: '180px' }}
            className="flicker-effect"
            style={{ animationDelay: `${index * 0.1}s` }} // Staggered effect
          >
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={180}
              height={270}
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.08)', // Very subtle brightness increase
                borderRadius: '8px', 
                mb: 1,
              }}
            />
            <Skeleton
              variant="text"
              width={140}
              height={20}
              animation="wave"
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.06)' }}
            />
            <Skeleton
              variant="text"
              width={100}
              height={16}
              animation="wave"
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.04)' }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );

  render() {
    const { hasScrolled, isFading, loading } = this.state;

    return (
      <>
        <div className='flex relative flex-col gap-4'>
          <div className={`w-full lg:h-[500px] 2xl:h-[515px] transition-all duration-700 ease-in-out ${hasScrolled ? 'bg-black' : ''}`}>
            {loading ? (
              // Show flickering shimmer effect for the main carousel
              this.renderCarouselSkeleton()
            ) : (
              !hasScrolled && (
                <div className={`transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                  <MainCarousel />
                </div>
              )
            )}
          </div>

          {loading ? (
            // Show flickering shimmer effect for all carousel sections
            <>
              {this.renderMovieCardsSkeleton()}
              {this.renderMovieCardsSkeleton()}
              {this.renderMovieCardsSkeleton()}
              {this.renderMovieCardsSkeleton()}
            </>
          ) : (
            // Show actual content when loaded
            <>
              <CarouselSection type={'Trending'} heading={'Top Trending'} />
              <CarouselSection type={'NewRelease'} heading={'New Release'} />
              <CarouselSection type={'FanFavourite'} heading={'Fan Favourite'} />
              <CarouselSection type={'Mood'} heading='Find By Mood' />
            </>
          )}
        </div>
      </>
    );
  }
}

export default WithRouter(Index);
