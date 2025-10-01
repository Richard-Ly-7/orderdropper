import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, beforeEach, afterEach, test, expect } from 'vitest';
import Login from '../../pages/Login';

describe('Login component', () => {
    const mockOnAuth = vi.fn();
    const mockDisplayMessage = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('renders form inputs', () => {
        render(
            <MemoryRouter>
                <Login onAuth={mockOnAuth} displayMessage={mockDisplayMessage} />
            </MemoryRouter>
        );

        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    });

    test('login successfully', async () => {
        const testUser = { id: '1', email: 'test@gmail.com' };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => testUser,
        });

        render(
            <MemoryRouter>
                <Login onAuth={mockOnAuth} displayMessage={mockDisplayMessage} />
            </MemoryRouter>
        );

        const user = userEvent.setup();

        await user.type(screen.getByLabelText(/Email/i), 'test@gmail.com');
        await user.type(screen.getByLabelText(/Password/i), 'password123');
        await user.click(screen.getByRole('button', { name: /Login/i }));

        await waitFor(() => {
            expect(mockOnAuth).toHaveBeenCalledWith(testUser);
            expect(mockDisplayMessage).toHaveBeenCalledWith('Login successful!');
        });

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            expect.stringMatching(/\/api\/auth\/login$/),
            expect.objectContaining({
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: 'test@gmail.com', password: 'password123' }),
            })
        );
    });

    test('login unsuccessfully', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: 'Invalid credentials' }),
        });

        render(
            <MemoryRouter>
                <Login onAuth={mockOnAuth} displayMessage={mockDisplayMessage} />
            </MemoryRouter>
        );

        const user = userEvent.setup();

        await user.type(screen.getByLabelText(/Email/i), 'test@gmail.com');
        await user.type(screen.getByLabelText(/Password/i), 'password123');
        await user.click(screen.getByRole('button', { name: /Login/i }));

        await waitFor(() => {
            expect(mockDisplayMessage).toHaveBeenCalledWith('Invalid credentials');
        });

        expect(mockOnAuth).not.toHaveBeenCalled();
    });
});