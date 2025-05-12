import { render, screen } from '@testing-library/react';
import Footer from '../components/common/Footer';

describe('Footer', () => {
  test('renders the logo text', () => {
    render(<Footer />);
    expect(screen.getByText('MOVIE EXPLORER')).toBeInTheDocument();
  });

  test('renders the description', () => {
    render(<Footer />);
    expect(screen.getByText(/Your ultimate destination for discovering/i)).toBeInTheDocument();
  });

  test('renders quick links section', () => {
    render(<Footer />);
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Movies')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  test('renders social media links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: '' })).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(4);
  });
});