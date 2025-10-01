import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import CartList from '../../components/CartList';

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

    const pizzaPriceElements = screen.getAllByText('$10.50');
    expect(pizzaPriceElements.length).toBeGreaterThan(0);

    const pizzaHutElements = screen.getAllByText('Pizza Hut');
    expect(pizzaHutElements.length).toBeGreaterThan(0);

    const ravioliElements = screen.getAllByText('Ravioli');
    expect(ravioliElements.length).toBeGreaterThan(0);

    const ravioliPriceElements = screen.getAllByText('$12.99');
    expect(ravioliPriceElements.length).toBeGreaterThan(0);

    const oliveGardenElements = screen.getAllByText('Olive Garden');
    expect(oliveGardenElements.length).toBeGreaterThan(0);
});

test('calls updateCart when incrementing or decrementing', async () => {
    const mockUpdateCart = vi.fn();
    const user = userEvent.setup();

    render(<CartList cartItems={DATA} updateCart={mockUpdateCart} />);

    const incrementButtons = screen.getAllByText('+');
    const decrementButtons = screen.getAllByText('-');

    await user.click(incrementButtons[0]);
    expect(mockUpdateCart).toHaveBeenCalledWith(DATA[0], true);

    await user.click(decrementButtons[0]);
    expect(mockUpdateCart).toHaveBeenCalledWith(DATA[0], false);
});