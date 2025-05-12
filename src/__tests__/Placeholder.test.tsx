import { render, screen } from '@testing-library/react';
import Placeholder from '../components/common/Placeholder';

describe('Placeholder', () => {
  test('renders search icon', () => {
    render(<Placeholder />);
    expect(screen.getByTestId(/placeholderIcon/i)).toBeInTheDocument();
  });

  test('renders search prompt text', () => {
    render(<Placeholder />);
    expect(screen.getByText(/Search for movies/i)).toBeInTheDocument();
    expect(screen.getByText(/Enter a title or keyword/i)).toBeInTheDocument();
  });
});