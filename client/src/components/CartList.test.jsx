import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartList from '../components/CartList';

const DATA = [
    { id: '1', name: 'Pizza', price: 10.5, image: '', restaurant: 'Pizza Hut' },
    { id: '2', name: 'Ravioli', price: 12.99, image: '', restaurant: 'Olive Garden' },
];

test('renders initial cart items', () => {
    render(
        <CartList cartItems={DATA} updateCart={undefined} />
    );

    const pizzaElements = screen.getAllByText('Pizza');
    expect(pizzaElements.length).toBeGreaterThan(0);
    const ravioliElements = screen.getAllByText('Ravioli');
    expect(ravioliElements.length).toBeGreaterThan(0);
});

test('check close button visibility', () => {
    render(
        <CartList cartItems={DATA} updateCart={undefined} />
    );

    const closeBtns = screen.getAllByRole('button')    
    expect(closeBtns.length).toBe(2);
});