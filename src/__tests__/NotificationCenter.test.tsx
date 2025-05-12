import { render, screen, fireEvent, act } from '@testing-library/react';
import NotificationCenter from '../components/notification/NotificationCenter';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

jest.mock('react-toastify', () => ({
  toast: { error: jest.fn() }
}));

jest.mock('date-fns/formatDistanceToNow', () => ({
  formatDistanceToNow: () => '2 minutes ago'
}));

const mockStore = configureStore([]);

const getStore = (overrides: any = {}) =>
  mockStore({
    notification: {
      items: [
        {
          id: '1',
          title: 'Test Notification',
          body: 'This is a test',
          timestamp: Date.now(),
          read: false,
          imageUrl: ''
        }
      ],
      unreadCount: 1,
      ...overrides.notification
    },
    user: {
      isLoggedIn: true,
      ...overrides.user
    }
  });

describe('NotificationCenter', () => {
  test('renders notification button with badge', () => {
    const store = getStore();
    render(
      <Provider store={store}>
        <NotificationCenter />
      </Provider>
    );
    expect(screen.getByRole('button', { name: /1 notifications/i })).toBeInTheDocument();
  });

  test('opens notification panel and displays notifications', () => {
    const store = getStore();
    render(
      <Provider store={store}>
        <NotificationCenter />
      </Provider>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Test Notification')).toBeInTheDocument();
    expect(screen.getByText('This is a test')).toBeInTheDocument();
    expect(screen.getByText('2 minutes ago')).toBeInTheDocument();
  });

  test('shows empty state when no notifications', () => {
    const store = getStore({ notification: { items: [], unreadCount: 0 } });
    render(
      <Provider store={store}>
        <NotificationCenter />
      </Provider>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('No notifications yet')).toBeInTheDocument();
  });

  test('shows login toast if not logged in', () => {
    const store = getStore({ user: { isLoggedIn: false } });
    render(
      <Provider store={store}>
        <NotificationCenter />
      </Provider>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(require('react-toastify').toast.error).toHaveBeenCalledWith('Please log in to view notifications.');
  });

  test('calls markAllAsRead when mark all as read button is clicked', () => {
    const store = getStore();
    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <NotificationCenter />
      </Provider>
    );
    fireEvent.click(screen.getByRole('button'));
    const markAllBtn = screen.getByTitle('Mark all as read');
    fireEvent.click(markAllBtn);
    expect(store.dispatch).toHaveBeenCalled();
  });

  test('calls clearNotifications when clear button is clicked', () => {
    const store = getStore();
    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <NotificationCenter />
      </Provider>
    );
    fireEvent.click(screen.getByRole('button'));
    const clearBtn = screen.getByTitle('Clear all notifications');
    fireEvent.click(clearBtn);
    expect(store.dispatch).toHaveBeenCalled();
  });

  test('calls markAsRead when notification is clicked', () => {
    const store = getStore();
    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <NotificationCenter />
      </Provider>
    );
    fireEvent.click(screen.getByRole('button'));
    const notif = screen.getByText('Test Notification');
    fireEvent.click(notif);
    expect(store.dispatch).toHaveBeenCalled();
  });

  test('closes panel when close button is clicked', () => {
    const store = getStore();
    render(
      <Provider store={store}>
        <NotificationCenter />
      </Provider>
    );
    fireEvent.click(screen.getByRole('button'));
    const closeBtn = screen.getByTitle('Close');
    fireEvent.click(closeBtn);
    expect(screen.queryByText('Notifications')).not.toBeInTheDocument();
  });

  test('closes panel when backdrop is clicked', () => {
    const store = getStore();
    render(
      <Provider store={store}>
        <NotificationCenter />
      </Provider>
    );
    fireEvent.click(screen.getByRole('button'));
    const backdrop = screen.getByTestId('backdrop');
    fireEvent.click(backdrop);
    expect(screen.queryByText('Notifications')).not.toBeInTheDocument();
  });
});