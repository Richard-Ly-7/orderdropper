import { render, screen } from '@testing-library/react';
import RestaurantList from '../../components/RestaurantList';
import { MemoryRouter } from 'react-router-dom';

const DATA = [
    {
        id: '1',
        name: 'Pizza Hut',
        address: '1202 39 Ave, Langley, BC V2D D2L',
        description: 'Homemade pizzas',
        image: ''
    },
    {
        id: '2',
        name: 'Olive Garden',
        address: '2302 40 Ave, Langley, BC V3J 8K3',
        description: 'Italian-inspired dishes',
        image: ''
    }
];

test('renders initial restaurants', () => {
    render(
        <MemoryRouter>
            <RestaurantList restaurants={DATA} />
        </MemoryRouter>
    );

    const pizzaHutElements = screen.getAllByText('Pizza Hut');
    expect(pizzaHutElements.length).toBeGreaterThan(0);

    const pizzaHutAddress = screen.getAllByText('1202 39 Ave, Langley, BC V2D D2L');
    expect(pizzaHutAddress.length).toBeGreaterThan(0);

    const pizzaHutDescription = screen.getAllByText('Homemade pizzas');
    expect(pizzaHutDescription.length).toBeGreaterThan(0);

    const oliveGardenElements = screen.getAllByText('Olive Garden');
    expect(oliveGardenElements.length).toBeGreaterThan(0);

    const oliveGardenAddress = screen.getAllByText('2302 40 Ave, Langley, BC V3J 8K3');
    expect(oliveGardenAddress.length).toBeGreaterThan(0);

    const oliveGardenDescription = screen.getAllByText('Italian-inspired dishes');
    expect(oliveGardenDescription.length).toBeGreaterThan(0);
});

