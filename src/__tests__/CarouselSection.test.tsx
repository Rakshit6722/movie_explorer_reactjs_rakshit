import { render, screen } from '@testing-library/react';
import CarouselSection from '../components/home/CategorySection/CarouselSection';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../components/home/CategorySection/Carousel', () => (props: any) => (
    <div data-testid="carousel">{props.type}</div>
));
jest.mock('../components/home/MoodSection/MoodCarousel', () => () => (
    <div data-testid="mood-carousel" />
));

const mockStore = configureStore([]);

const mockMovies = [
    { id: 1, title: 'Movie 1', genre: 'Action', rating: 8, release_year: 2022 },
    { id: 2, title: 'Movie 2', genre: 'Horror', rating: 7, release_year: 2018 },
    { id: 3, title: 'Movie 3', genre: 'Drama', rating: 9, release_year: 2020 },
];

describe('CarouselSection', () => {
    function renderWithStore(type: string, heading?: string) {
        const store = mockStore({ movie: { movies: mockMovies } });
        return render(
            <Provider store={store}>
                <MemoryRouter>
                    <CarouselSection type={type} heading={heading} />
                </MemoryRouter>
            </Provider>
        );
    }

    test('renders heading and See All link', () => {
        renderWithStore('Trending', 'Trending Now');
        expect(screen.getByText('Trending Now')).toBeInTheDocument();
        expect(screen.getByText('See All')).toBeInTheDocument();
    });

    test('renders MoodCarousel when type is Mood', () => {
        renderWithStore('Mood', 'Mood');
        expect(screen.getByTestId('mood-carousel')).toBeInTheDocument();
    });

    test('renders Carousel when type is not Mood', () => {
        renderWithStore('Action', 'Action Movies');
        expect(screen.getByTestId('carousel')).toBeInTheDocument();
        expect(screen.getByTestId('carousel')).toHaveTextContent('Action');
    });

    test('filters movies for Trending type', () => {
        renderWithStore('Trending', 'Trending');
        expect(screen.getByTestId('carousel')).toBeInTheDocument();
    });

    test('filters movies for Horror type', () => {
        renderWithStore('Horror', 'Horror');
        expect(screen.getByTestId('carousel')).toBeInTheDocument();
    });
});