import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthTemplate from '../components/common/AuthTemplate';
import { loginApi, registerApi, userNotificationApi } from '../services/api';
import { setUser, setToken, setCurrentPlan } from '../redux/slices/userSlice';
import { requestForToken } from '../utils/fcm';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';


jest.mock('../redux/slices/userSlice', () => ({
    setUser: jest.fn(),
    setToken: jest.fn(),
    setCurrentPlan: jest.fn(),
}))


jest.mock("react-toastify", () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    }
}))

jest.mock('../services/api', () => ({
    loginApi: jest.fn(),
    registerApi: jest.fn(),
    userNotificationApi: jest.fn(),
})
)

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}))

const store = configureStore([])
const mockStore = store({
    user: {
        userInfo: null,
        isLoggedIn: false,
        currentPlan: null
    },
    movie:{
        loading: false
    }
})

jest.mock('../utils/fcm', () => ({
    requestForToken: jest.fn(),
}));


const mockNavigate = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));


beforeEach(() => {
    jest.clearAllMocks();
});

const renderWithRouter = (props: { type: 'login' | 'register' }) => {
    return render(
        <Provider store={mockStore}>        ``
            <BrowserRouter>
                <AuthTemplate type={props.type} navigate={mockNavigate} dispatch={mockDispatch} />
            </BrowserRouter>
        </Provider>
    );
};

describe('AuthTemplate Component', () => {
    test('renders login form with correct fields', () => {
        renderWithRouter({ type: 'login' });

        expect(screen.getByText('Sign In')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Create an account' })).toBeInTheDocument();
        expect(screen.getByAltText('Movie Explorer')).toBeInTheDocument();
    });

    test('renders register form with correct fields', () => {
        renderWithRouter({ type: 'register' });

        expect(screen.getByTestId(/mainHeading/i)).toBeInTheDocument();
        expect(screen.getByLabelText('First Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Already have an account?' })).toBeInTheDocument();
    });

    test('updates form inputs on change', () => {
        renderWithRouter({ type: 'login' });

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'Password123' } });

        expect(emailInput).toHaveValue('test@example.com');
        expect(passwordInput).toHaveValue('Password123');
    });

    test('shows validation errors on invalid login submission', async () => {
        renderWithRouter({ type: 'login' });

        const loginButton = screen.getByRole('button', { name: 'Login' });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(screen.getByText('Password is required')).toBeInTheDocument();
        });
    });

    test('shows validation errors on invalid register submission', async () => {
        renderWithRouter({ type: 'register' });

        const createButton = screen.getByRole('button', { name: 'Create Account' });
        fireEvent.click(createButton);

        await waitFor(() => {
            expect(screen.getByText('First name is required')).toBeInTheDocument();
            expect(screen.getByText('Last name is required')).toBeInTheDocument();
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(screen.getByText('Phone number is required')).toBeInTheDocument();
            expect(screen.getByText('Password is required')).toBeInTheDocument();
            expect(screen.getByText('Confirm password is required')).toBeInTheDocument();
        });
    });

    test('toggles password visibility in login form', () => {
        renderWithRouter({ type: 'login' });

        const passwordInput = screen.getByLabelText('Password');
        const visibilityIcon = screen.getAllByTestId('visibility-icon')[0]; 

        expect(passwordInput).toHaveAttribute('type', 'password');
        fireEvent.click(visibilityIcon);
        expect(passwordInput).toHaveAttribute('type', 'text');
        fireEvent.click(screen.getAllByTestId('visibility-icon')[0]);
        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('handles successful login submission', async () => {
        (loginApi as jest.Mock).mockResolvedValue({
            status: 200,
            data: {
                user: { id: 1, email: 'test@example.com', active_plan: 'basic' },
                token: 'mockToken',
            },
        });
        (requestForToken as jest.Mock).mockResolvedValue('mockFcmToken');
        (userNotificationApi as jest.Mock).mockResolvedValue({});

        renderWithRouter({ type: 'login' });

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'Password123' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(loginApi).toHaveBeenCalledWith({ email: 'test@example.com', password: 'Password123' });
            expect(mockDispatch).toHaveBeenCalled();
            expect(mockDispatch).toHaveBeenCalledWith(setToken('mockToken'));
            expect(mockDispatch).toHaveBeenCalledWith(setCurrentPlan('basic'));
            expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mockToken');
            expect(mockNavigate).toHaveBeenCalledWith('/');
            expect(toast.success).toHaveBeenCalledWith('Login Successfull');
            expect(requestForToken).toHaveBeenCalled();
            expect(userNotificationApi).toHaveBeenCalledWith({
                device_token: 'mockFcmToken',
                notifications_enabled: true,
            });
        });
    });

    test('handles failed login submission', async () => {
        (loginApi as jest.Mock).mockRejectedValue({ message: 'Invalid credentials' });

        renderWithRouter({ type: 'login' });

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'Password123' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(loginApi).toHaveBeenCalledWith({ email: 'test@example.com', password: 'Password123' });
            expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
        });
    });

    test('handles successful register submission', async () => {
        (registerApi as jest.Mock).mockResolvedValue({ status: 201 });

        renderWithRouter({ type: 'register' });

        const firstNameInput = screen.getByLabelText('First Name');
        const lastNameInput = screen.getByLabelText('Last Name');
        const emailInput = screen.getByLabelText('Email');
        const phoneInput = screen.getByLabelText('Phone Number');
        const passwordInput = screen.getByLabelText('Password');
        const confirmPasswordInput = screen.getByLabelText('Confirm Password');
        const createButton = screen.getByRole('button', { name: 'Create Account' });

        fireEvent.change(firstNameInput, { target: { value: 'John' } });
        fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(phoneInput, { target: { value: '1234567890' } });
        fireEvent.change(passwordInput, { target: { value: 'Password123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'Password123' } });
        fireEvent.click(createButton);

        await waitFor(() => {
            expect(registerApi).toHaveBeenCalled();
            expect(mockNavigate).toHaveBeenCalledWith('/login');
            expect(toast.success).toHaveBeenCalledWith('User Created Successfully');
        });
    });

    test('navigates to home when logo is clicked', () => {
        renderWithRouter({ type: 'login' });

        const logoLink = screen.getByAltText('Movie Explorer').closest('a');
        expect(logoLink).toHaveAttribute('href', '/');
    });
});