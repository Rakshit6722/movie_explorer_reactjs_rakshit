import React, { Component } from 'react';
import CarouselSection from './CarouselSection';
import MainCarousel from '../MainCarousel';
import { getMovieByPageApi, getMoviesForHomePage } from '../../../services/movieApi';
import WithRouter from '../../hoc/WithRouter';
import { setLoading, setMovies } from '../../../redux/slices/movieSlice';
import { LinearProgress } from '@mui/material';

export class Index extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasScrolled: false,
      isFading: false,
    };
  }

  componentDidMount() {
    this.fetchHomeMovies();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  fetchHomeMovies = async () => {
    this.props.dispatch(setLoading(true));
    try {
      const data = await getMoviesForHomePage(10);
      if (data) {
        this.props.dispatch(setMovies(data));
      }
    } catch (err: any) {
      console.log(err.message);
    } finally {
      this.props.dispatch(setLoading(false));
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

  render() {
    const { hasScrolled, isFading } = this.state;

    return (
      <>
        <div className='flex relative flex-col gap-4'>

          <div className={`w-full h-[500px] 2xl:h-[515px] transition-all duration-700 ease-in-out ${hasScrolled ? 'bg-black' : ''}`}>

            {!hasScrolled && (
              <div className={`transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                <MainCarousel />
              </div>
            )}
          </div>

          <CarouselSection type={'Trending'} heading={'Top Trending'} />
          <CarouselSection type={'NewRelease'} heading={'New Release'} />
          <CarouselSection type={'FanFavourite'} heading={'Fan Favourite'} />
          <CarouselSection type={'Mood'} heading='Find By Mood' />
        </div>
      </>
    );
  }
}

export default WithRouter(Index);
