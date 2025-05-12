import { render, screen } from '@testing-library/react';
import LoadingFallback from '../components/common/LoadingFallback';

describe('LoadingFallback', () => {
  test('renders the loading spinner', () => {
    render(<LoadingFallback />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders the loading message', () => {
    render(<LoadingFallback />);
    expect(screen.getByText(/Loading, please wait/i)).toBeInTheDocument();
  });
});