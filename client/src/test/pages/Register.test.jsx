import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, beforeEach, afterEach, test, expect } from 'vitest';
import Register from '../../pages/Register';

describe('Register component', () => {
    const mockOnAuth = vi.fn();
    const mockDisplayMessage = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('renders customer fields', () => {
        render(
            <MemoryRouter>
                <Register onAuth={mockOnAuth} displayMessage={mockDisplayMessage} />
            </MemoryRouter>
        );

        expect(screen.getByLabelText(/Display Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Delivery Address/i)).toBeInTheDocument();
    });

    test('switches to restaurant fields', async () => {
        render(
            <MemoryRouter>
                <Register onAuth={mockOnAuth} displayMessage={mockDisplayMessage} />
            </MemoryRouter>
        );

        const user = userEvent.setup();
        await user.selectOptions(screen.getByRole('combobox'), 'Restaurant');

        expect(screen.getByLabelText(/Restaurant Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Address$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    });

    test('register as customer', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: '123', email: 'test@gmail.com' }),
        });

        render(
            <MemoryRouter>
                <Register onAuth={mockOnAuth} displayMessage={mockDisplayMessage} />
            </MemoryRouter>
        );

        const user = userEvent.setup();

        await user.type(screen.getByLabelText(/Display Name/i), 'John');
        await user.type(screen.getByLabelText(/Delivery Address/i), '123 Main St');
        await user.type(screen.getByLabelText(/Email/i), 'test@gmail.com');
        await user.type(screen.getByLabelText(/Password/i), 'password123');

        await user.click(screen.getByRole('button', { name: /Register/i }));

        await waitFor(() => {
            expect(mockOnAuth).toHaveBeenCalledWith({ id: '123', email: 'test@gmail.com' });
            expect(mockDisplayMessage).toHaveBeenCalledWith('Register successful!');
        });

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            expect.stringMatching(/\/api\/auth\/signup$/),
            expect.objectContaining({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    email: 'test@gmail.com',
                    username: 'John',
                    password: 'password123',
                    address: '123 Main St',
                    base64: undefined,
                    role: 'customer',
                }),
            })
        );
    });

    test('register as restaurant', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: '456', email: 'test@gmail.com' }),
        });

        render(
            <MemoryRouter>
                <Register onAuth={mockOnAuth} displayMessage={mockDisplayMessage} />
            </MemoryRouter>
        );

        const user = userEvent.setup();

        await user.selectOptions(screen.getByRole('combobox'), 'Restaurant');

        await user.type(screen.getByLabelText(/Restaurant Name/i), 'My Restaurant');
        await user.type(screen.getByLabelText(/^Address$/i), '456 Food St');
        await user.type(screen.getByLabelText(/Description/i), 'Best pasta in town');
        await user.type(screen.getByLabelText(/Email/i), 'test@gmail.com');
        await user.type(screen.getByLabelText(/Password/i), 'password123');

        await user.click(screen.getByRole('button', { name: /Register/i }));

        await waitFor(() => {
            expect(mockOnAuth).toHaveBeenCalledWith({ id: '456', email: 'test@gmail.com' });
            expect(mockDisplayMessage).toHaveBeenCalledWith('Register successful!');
        });

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            expect.stringMatching(/\/api\/auth\/signup$/),
            expect.objectContaining({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    email: 'test@gmail.com',
                    username: 'My Restaurant',
                    password: 'password123',
                    address: '456 Food St',
                    base64: undefined,
                    role: 'restaurant',
                    description: 'Best pasta in town',
                }),
            })
        );
    });

    test('submit existing email', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: 'Email already exists' }),
        });

        render(
            <MemoryRouter>
                <Register onAuth={mockOnAuth} displayMessage={mockDisplayMessage} />
            </MemoryRouter>
        );

        const user = userEvent.setup();

        await user.type(screen.getByLabelText(/Display Name/i), 'John');
        await user.type(screen.getByLabelText(/Delivery Address/i), '123 Main St');
        await user.type(screen.getByLabelText(/Email/i), 'test@gmail.com');
        await user.type(screen.getByLabelText(/Password/i), 'password123');

        await user.click(screen.getByRole('button', { name: /Register/i }));

        await waitFor(() => {
            expect(mockDisplayMessage).toHaveBeenCalledWith('Email already exists');
        });
        expect(mockOnAuth).not.toHaveBeenCalled();
    });
});
