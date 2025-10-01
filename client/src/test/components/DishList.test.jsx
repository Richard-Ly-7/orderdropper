import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DishList from '../../components/DishList';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

describe('DishList component', () => {
    const DATA = [
        { id: '1', _id: '1', name: 'Pepperoni', price: 12, restaurant: 'Pizzeria', image: '' },
        { id: '2', _id: '2', name: 'Margherita', price: 10, restaurant: 'Pizzeria', image: '' }
    ];

    const mockSetDishes = vi.fn();
    const mockDeleteDish = vi.fn();
    const mockUpdateDish = vi.fn();
    const mockUpdateCart = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders dishes with update/delete buttons', async () => {
        render(
            <BrowserRouter>
                <DishList
                    dishes={DATA}
                    setDishes={mockSetDishes}
                    updateCart={mockUpdateCart}
                    deleteDish={mockDeleteDish}
                    updateDish={mockUpdateDish}
                    user={{ role: 'restaurant' }}
                    modifiable={true}
                />
            </BrowserRouter>
        );

        const user = userEvent.setup();

        expect(screen.getByText('Pepperoni')).toBeInTheDocument();
        expect(screen.getByText('Margherita')).toBeInTheDocument();

        const editButtons = screen.getAllByRole('button', { name: /Edit/i });
        await user.click(editButtons[0]);

        expect(screen.getByLabelText(/New Dish Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/New Price/i)).toBeInTheDocument();

        const cancelButton = screen.getByRole('button', { name: /Cancel/i });
        await user.click(cancelButton);

        expect(screen.queryByLabelText(/New Dish Name/i)).not.toBeInTheDocument();
        expect(screen.queryByLabelText(/New Price/i)).not.toBeInTheDocument();

        const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
        await user.click(deleteButtons[0]);

        expect(mockDeleteDish).toHaveBeenCalledWith('1', DATA, mockSetDishes);
    });

});
