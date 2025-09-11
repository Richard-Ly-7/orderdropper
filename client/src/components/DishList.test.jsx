import { render, screen } from '@testing-library/react';
import DishList from './DishList';
import { expect, test } from 'vitest';

const DATA = [
    { id: '1', name: 'Pizza', price: 10.5, base64: '', restaurant: 'Pizza Hut' },
    { id: '2', name: 'Ravioli', price: 12.99, base64: '', restaurant: 'Olive Garden' },
];

test('renders initial dishes as customer', () => {
    render(
        <DishList
            dishes={DATA}
            setDishes={undefined}
            updateCart={undefined}
            deleteDish={undefined}
            updateDish={undefined}
            user={undefined}
            modifiable={false}
        />
    );

    const pizzaElements = screen.getAllByText('Pizza');
    expect(pizzaElements.length).toBeGreaterThan(0);
    const ravioliElements = screen.getAllByText('Ravioli');
    expect(ravioliElements.length).toBeGreaterThan(0);
});

test('check add to cart button visibility', () => {
    render(
        <DishList
            dishes={DATA}
            setDishes={undefined}
            updateCart={undefined}
            deleteDish={undefined}
            updateDish={undefined}
            user={{ role: 'customer' }}
            modifiable={false}
        />
    );

    const addBtns = screen
        .getAllByRole('button')
        .filter(btn => btn.textContent.includes('Add to Cart'));
            
    expect(addBtns.length).toBe(2);
    
});

test('check add and delete button visibility', () => {
    render(
        <DishList
            dishes={DATA}
            setDishes={undefined}
            updateCart={undefined}
            deleteDish={undefined}
            updateDish={undefined}
            user={{ role: 'restaurant' }}
            modifiable={true}
        />
    );

    const editBtns = screen
        .getAllByRole('button')
        .filter(btn => btn.textContent.includes('Edit'));
            
    expect(editBtns.length).toBe(2);

    const deleteBtns = screen
        .getAllByRole('button')
        .filter(btn => btn.textContent.includes('Delete'));
            
    expect(deleteBtns.length).toBe(2);

});