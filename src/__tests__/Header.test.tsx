import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Header from '../components/common/Header/Header';
import NavItem from '../components/common/Header/NavItem';

const mockStore = configureStore([]);

const initialState = {
    user: {
        userInfo: { first_name: 'Test' },
        isLoggedIn: true,
    },
    movie: {
        movies: [],
    },
    subscription: {
        currentPlan: 'basic',
    },
};


const mockProps = {
    icon: {
        outline: <span data-testid="outline-icon">O</span>,
        filled: <span data-testid="filled-icon">F</span>,
    },
    label: 'Test',
    href: '/test',
    location: { pathname: '/test' },
    userInfo: { first_name: 'User' },
    isLoggedIn: true,
};


describe('Header', () => {
    test('renders logo image', () => {
        const store = mockStore(initialState);
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getByAltText('Logo')).toBeInTheDocument();
    });

    test('renders navigation items', () => {
        const store = mockStore(initialState);
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
        expect(screen.getByText('Genres')).toBeInTheDocument();
        expect(screen.getByText('Moods')).toBeInTheDocument();
    });

    test('shows user greeting when logged in', () => {
        const store = mockStore(initialState);
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getByText(/Hi, Test/i)).toBeInTheDocument();
    });
});

test('renders NavItem with filled icon when active', () => {
    const store = mockStore(initialState);
    render(
        <Provider store={store}>
            <MemoryRouter>
                <NavItem {...mockProps} location={{ pathname: '/test' }} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByTestId(/filled-icon/i)).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
});

test('renders NavItem with outline icon when not active', () => {
    const store = mockStore(initialState);
    render(
        <Provider store={store}>
            <MemoryRouter>
                <NavItem {...mockProps} location={{ pathname: '/test' }} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByTestId('outline-icon')).toBeInTheDocument();
});

test('calls onClick if provided',  () => {
    const handleClick = jest.fn();
    const store = mockStore(initialState);
    render(
        <Provider store={store}>
            <MemoryRouter>
                <NavItem {...mockProps} location={{ pathname: '/test' }} />
            </MemoryRouter>
        </Provider>
    )
    fireEvent.click(getByTestId(/nav-link/i));
    expect(handleClick).toHaveBeenCalled();
});