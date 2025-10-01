import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../pages/Home';
import { expect, test, beforeEach, afterEach, vi } from 'vitest';

const DATA = [
    { _id: '1', name: 'Pizza', price: 10.5, image: '', restaurant: 'Pizza Hut' },
    { _id: '2', name: 'Ravioli', price: 12.99, image: '', restaurant: 'Olive Garden' },
];

beforeEach(() => {
    global.fetch = vi.fn();
});

afterEach(() => {
    vi.restoreAllMocks();
});

test('displays dishes after fetch', async () => {
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ dishes: DATA, totalDishes: 2 }),
    });

    render(
        <MemoryRouter>
            <Home updateCart={vi.fn()} user={{ role: 'customer' }} />
        </MemoryRouter>
    );

    await waitFor(() => {
        expect(screen.getByText('Pizza')).toBeInTheDocument();
        expect(screen.getByText('Ravioli')).toBeInTheDocument();
    });

    const addBtns = screen
        .getAllByRole('button')
        .filter(btn => btn.textContent.includes('Add to Cart'));
    expect(addBtns.length).toBe(2);
});