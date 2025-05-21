if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

import { render, screen } from '@testing-library/react';
import MainCarousel from '../components/home/MainCarousel';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

jest.mock('../components/home/MainCarouselMovieCard', () => (props: any) => (
  <div data-testid="carousel-movie-card">{props.movie.title}</div>
));
jest.mock('../components/home/MoodSection/MoodFeaturePromo', () => () => (
  <div data-testid="mood-feature-promo" />
));

const mockStore = configureStore([]);


describe('MainCarousel', () => {
  test('renders loading state when no movies', () => {
    const store = mockStore({
      movie: { movies: [] },
      user: { userInfo: {}, token: '' }
    });
    render(
      <Provider store={store}>
        <MainCarousel />
      </Provider>
    );
    expect(screen.getByText(/Loading featured movies/i)).toBeInTheDocument();
  });

  test('renders carousel with movies', () => {
    const store = mockStore({
      movie: {
        movies: [
          { id: 1, title: 'Movie 1', rating: 8 },
          { id: 2, title: 'Movie 2', rating: 9 }
        ]
      },
      user: { userInfo: {}, token: '' }
    });
    render(
      <Provider store={store}>
        <MainCarousel />
      </Provider>
    );
    expect(screen.getAllByTestId('carousel-movie-card')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Movie 1')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Movie 2')[0]).toBeInTheDocument();
    expect(screen.getByTestId('mood-feature-promo')).toBeInTheDocument();
  });
});