import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Post from '../../pages/Post';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest'; 

describe('Post component', () => {
    const mockDisplayMessage = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        global.fetch = vi.fn();
    });

    test('posts a dish', async () => {
        fetch
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ name: 'Restaurant', id: '1' }),
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ error: 'Post failed' }),
            });

        render(
          <BrowserRouter>
              <Post user={{ email: 'test@gmail.com' }} displayMessage={mockDisplayMessage} />
          </BrowserRouter>
        );

        const user = userEvent.setup();

        await user.type(screen.getByLabelText(/Dish Name/i), 'Pizza');
        await user.type(screen.getByLabelText(/Price/i), '10'); 

        await user.click(screen.getByRole('button', { name: /Post/i }));

        await waitFor(() => {
            expect(mockDisplayMessage).toHaveBeenCalledWith('Dish posted!');
        });

        expect(fetch).toHaveBeenCalledTimes(2);

        expect(fetch).toHaveBeenNthCalledWith(
            1,
            expect.stringMatching(/\/restaurants\/findRestaurant\/test@gmail\.com$/)
        );

        expect(fetch).toHaveBeenNthCalledWith(
            2,
            expect.stringMatching(/\/dishes$/),
            expect.objectContaining({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    name: 'Pizza',
                    price: '10', 
                    base64: '',
                    restaurant: 'Restaurant',
                    restaurantId: '1',
                }),
            })
        );
    });
});