import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import AuthTemplate from '../components/common/AuthTemplate';
import { render, screen } from '@testing-library/react';

describe("AuthTemplate tests", () => {
    test("AuthTemplate renders correctly for login page", () => {
        render(
            <MemoryRouter>
                <AuthTemplate type='login'/>
            </MemoryRouter>
        )

        expect(screen.getByText(/sign in/i)).toBeInTheDocument()
    })
})

