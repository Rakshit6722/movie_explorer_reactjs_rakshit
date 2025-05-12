import React, { Component, createRef } from 'react';
import MoviesCard from './MoviesCard';
import { HiArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import { NavLink } from 'react-router-dom';
import { Movie } from '../../../types/type';


type CarouselProps = {
  movieList: Array<Movie>;
  type: string;
};

type CarouselState = {
  isLeftVisible: boolean;
  isRightVisible: boolean;
  innerWidth: number;
};

class Carousel extends Component<CarouselProps, CarouselState> {
  carouselRef: any;

  constructor(props: CarouselProps) {
    super(props);
    this.state = {
      isLeftVisible: false,
      isRightVisible: true,
      innerWidth: window.innerWidth
    };
    this.carouselRef = createRef<HTMLDivElement>();
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);

    if (this.carouselRef.current) {
      this.carouselRef.current.addEventListener('scroll', this.checkScrollPosition);
    }

    this.checkScrollPosition();
  }

  componentDidUpdate(prevProps: CarouselProps) {
    if (prevProps.movieList !== this.props.movieList) {
      this.checkScrollPosition();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);

    if (this.carouselRef.current) {
      this.carouselRef.current.removeEventListener('scroll', this.checkScrollPosition);
    }
  }

  handleResize = () => {
    this.setState({ innerWidth: window.innerWidth });
  };

  checkScrollPosition = () => {
    if (this.carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = this.carouselRef.current;
      this.setState({
        isLeftVisible: scrollLeft > 0,
        isRightVisible: scrollLeft < scrollWidth - clientWidth
      });
    }
  };

  scrollLeft = () => {
    if (this.carouselRef.current) {
      this.carouselRef.current.scrollBy({
        left: -525,
        behavior: 'smooth'
      });
    }
  };

  scrollRight = () => {
    if (this.carouselRef.current) {
      this.carouselRef.current.scrollBy({
        left: 525,
        behavior: 'smooth'
      });
    }
  };

  render() {
    const { movieList, type } = this.props;
    const { isLeftVisible, isRightVisible, innerWidth } = this.state;

    return (
      <div className="relative">
        {((innerWidth >= 768) && isLeftVisible) && (
          <button
            onClick={this.scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-4 rounded-full border border-gray-700 hover:border-[#f02c49] hover:bg-black/60 transition-all duration-300 z-20"
          >
            <HiArrowSmLeft size={26} />
          </button>
        )}

        <div
          ref={this.carouselRef}
          className={`flex ${type === 'Trending' ? "space-x-7" : "space-x-2"} overflow-x-auto py-4 px-0 scrollbar-hide snap-x snap-mandatory`}
        >
          {movieList.map((movie, index) => (
            <div key={movie.id} className="flex-shrink-0">
              {
                type === 'Trending' ? (
                  <MoviesCard type='trending' movie={movie} index={index} />
                ) : (
                  <MoviesCard type='standard' movie={movie} index={index} />
                )
              }
            </div>
          ))}
        </div>

        {((innerWidth >= 768) && isRightVisible) && (
          <button
          data-testid="scroll-right-button"
            onClick={this.scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-4 rounded-full border border-gray-700 hover:border-[#f02c49] hover:bg-black/60 transition-all duration-300 z-10"
          >
            <HiOutlineArrowSmRight size={26} />
          </button>
        )}
      </div>
    );
  }
}

export default Carousel;
