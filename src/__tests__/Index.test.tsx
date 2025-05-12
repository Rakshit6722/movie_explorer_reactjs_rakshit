window.HTMLElement.prototype.scrollIntoView = jest.fn();

import { render, screen } from '@testing-library/react';
import Index from '../components/home/CategorySection/Index';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../components/home/CategorySection/CarouselSection', () => (props: any) => (
    <div data-testid={`carousel-section-${props.type}`}>{props.heading}</div>
));
jest.mock('../components/home/MainCarousel', () => () => <div data-testid="main-carousel" />);
jest.mock('../components/home/MoodSection/MoodFeaturePromo', () => () => <div data-testid="mood-feature-promo" />);
jest.mock('../components/home/CategorySection/CompactCarouselSection', () => () => <div data-testid="mid-carousel" />);
jest.mock('../components/home/CategorySection/SubscribeButton', () => () => <div data-testid="subscribe-button" />);
jest.mock('../components/notification/NotificationCenter', () => () => <div data-testid="notification-center" />);

jest.mock('../services/movieApi', () => ({
    getMoviesForHomePage: jest.fn(() => Promise.resolve({ data: [] })),
}));
const mockStore = configureStore([]);

describe('Index', () => {
    test('renders loading skeletons when loading is true', () => {
        const store = mockStore({ movie: { loading: true } });
        render(
            <Provider store={store}>
                <Index />
            </Provider>
        );
        expect(screen.queryByTestId('main-carousel')).not.toBeInTheDocument();
        expect(document.querySelectorAll('.MuiSkeleton-root').length).toBeGreaterThan(0);
    });

    test('renders main content when loading is false', () => {
        const store = mockStore({ movie: { loading: false, movies: []  } });
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Index />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getByTestId('main-carousel')).toBeInTheDocument();
        expect(screen.getByTestId('mood-feature-promo')).toBeInTheDocument();
        expect(screen.getByTestId('subscribe-button')).toBeInTheDocument();
        expect(screen.getByTestId('notification-center')).toBeInTheDocument();
        expect(screen.getByTestId('carousel-section-Trending')).toBeInTheDocument();
        expect(screen.getByTestId('carousel-section-NewRelease')).toBeInTheDocument();
        expect(screen.getByTestId('carousel-section-FanFavourite')).toBeInTheDocument();
        expect(screen.getByTestId('mid-carousel')).toBeInTheDocument();
        expect(screen.getByTestId('carousel-section-Mood')).toBeInTheDocument();
        expect(screen.getByTestId('carousel-section-Action')).toBeInTheDocument();
        expect(screen.getByTestId('carousel-section-Horror')).toBeInTheDocument();
    });
});