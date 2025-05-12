import { render, screen, fireEvent } from '@testing-library/react';
import { PersonalInformation } from '../components/profile/PersonalInformation';

const defaultProps = {
    userInfo: {
        email: 'test@example.com',
        role: 'user',
    },
    handleClickOpen: jest.fn(),
    currentUserPlan: 'basic',
    loading: false,
    subscriptionDetails: {
        status: 'active',
        created_at: '2024-01-01',
        expiry_date: '2024-12-31',
    },
    getStatusDisplay: () => 'Active',
    error: null,
    planInfo: {
        name: 'Basic',
        price: 0,
        features: [
            { text: 'Feature 1', available: true },
            { text: 'Feature 2', available: false },
            { text: 'Feature 3', available: true },
            { text: 'Feature 4', available: false },
        ],
    },
    formatDateForDisplay: (date: string) => date,
    getDaysRemaining: () => 10,
};

describe('PersonalInformation', () => {
    test('renders user info fields', () => {
        render(<PersonalInformation {...defaultProps} />);
        expect(screen.getByText('Account Info')).toBeInTheDocument();
        expect(screen.getByText('EMAIL')).toBeInTheDocument();
        expect(screen.getByText('ROLE')).toBeInTheDocument();
        expect(screen.getByText('MEMBER SINCE')).toBeInTheDocument();
        expect(screen.getByText('test@example.com')).toBeInTheDocument();
        expect(screen.getByText('user')).toBeInTheDocument();
    });

    test('renders plan info and features', () => {
        render(<PersonalInformation {...defaultProps} />);
        expect(screen.getByText('Your Subscription')).toBeInTheDocument();
        expect(screen.getByText('Basic Plan')).toBeInTheDocument();
        expect(screen.getByText('BASIC')).toBeInTheDocument();
        expect(screen.getByText('FREE')).toBeInTheDocument();
        expect(screen.getByText('Plan Features')).toBeInTheDocument();
        expect(screen.getByText('Feature 1')).toBeInTheDocument();
        expect(screen.getByText('Feature 2')).toBeInTheDocument();
    });

    test('renders loading spinner when loading', () => {
        render(<PersonalInformation {...defaultProps} loading={true} />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    test('renders error message and retry button', () => {
        render(<PersonalInformation {...defaultProps} error="Something went wrong" />);
        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
        expect(screen.getByText('Retry')).toBeInTheDocument();
    });

    test('renders supervisor admin controls', () => {
        render(<PersonalInformation {...defaultProps} userInfo={{ ...defaultProps.userInfo, role: 'supervisor' }} />);
        expect(screen.getByText('Admin Controls')).toBeInTheDocument();
        expect(screen.getByText('Add Movie')).toBeInTheDocument();
        expect(screen.getByText('Edit Movie')).toBeInTheDocument();
        expect(screen.getByText('Delete Movie')).toBeInTheDocument();
    });

    test('calls handleClickOpen when Add Movie is clicked', () => {
        const handleClickOpen = jest.fn();
        render(
            <PersonalInformation
                {...defaultProps}
                userInfo={{ ...defaultProps.userInfo, role: 'supervisor' }}
                handleClickOpen={handleClickOpen}
            />
        );
        fireEvent.click(screen.getByText('Add Movie'));
        expect(handleClickOpen).toHaveBeenCalled();
    });

    test('renders subscription details and days remaining', () => {
        render(<PersonalInformation {...defaultProps} currentUserPlan="gold" planInfo={{ ...defaultProps.planInfo, name: 'Gold', price: 100 }} />);
        expect(screen.getByText('Gold Plan')).toBeInTheDocument();
        expect(screen.getByText('GOLD')).toBeInTheDocument();
        expect(screen.getByText('₹100')).toBeInTheDocument();
        expect(screen.getByText('START DATE')).toBeInTheDocument();
        expect(screen.getByText('EXPIRES')).toBeInTheDocument();
        expect(screen.getByText('TIME REMAINING')).toBeInTheDocument();
        expect(screen.getByText(/days/)).toBeInTheDocument();
    });

    test('renders upgrade/renew/manage plan button', () => {
        render(<PersonalInformation {...defaultProps} currentUserPlan="basic" />);
        expect(screen.getByText('Upgrade Plan')).toBeInTheDocument();

        render(<PersonalInformation {...defaultProps} currentUserPlan="gold" subscriptionDetails={{ ...defaultProps.subscriptionDetails, status: 'active' }} />);
        expect(screen.getByText('Manage Plan')).toBeInTheDocument();

        render(<PersonalInformation {...defaultProps} currentUserPlan="gold" subscriptionDetails={{ ...defaultProps.subscriptionDetails, status: 'expired' }} />);
        expect(screen.getByText('Renew Plan')).toBeInTheDocument();
    });
});