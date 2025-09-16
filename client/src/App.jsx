import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import Navbar from './components/Navbar';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import RestaurantDishes from './pages/RestaurantDishes';
import Login from './pages/Login';
import Register from './pages/Register';
import Post from './pages/Post';
import ShoppingCart from './pages/ShoppingCart';
import Purchase from './pages/Purchase';
import Profile from './pages/Profile';
import Message from './components/Message';

function App() {
    const [user, setUser] = useState(null);
    const [cartTotal, setCartTotal] = useState(0);
    const [message, setMessage] = useState("");
    const [messageVisible, setMessageVisible] = useState(false);
    const api = import.meta.env.VITE_API_URL;

    const displayMessage = (messageText) => {
        setMessageVisible(true);
        setMessage(messageText);
        setTimeout(() => {
            setMessageVisible(false);
        }, 3000);
    }

    const handleLogin = (user) => {
        setUser(user);
    };

    const handleLogout = async () => {
        await fetch(`${api}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });

        setUser(null);
    };

    const updateCart = async (dish, addToCart) => {
        let updatedCart = [];

        if(addToCart){
            const cartItem = {...dish, id: nanoid()};
            updatedCart = [...(user.shoppingCart || []), cartItem];
            displayMessage("Dish added to cart!");
        }else{
            updatedCart = user.shoppingCart ? user.shoppingCart.filter(d => d.id !== dish.id) : [];
        }
        
        setUser({...user, shoppingCart: updatedCart})

        await fetch(`${api}/shoppingcart/${user.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ shoppingCart: updatedCart }),
            credentials: 'include'
        });

    };

    const emptyCart = async () => {
        setUser({...user, shoppingCart: []})

        await fetch(`${api}/shoppingcart/${user.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ shoppingCart: [] }),
            credentials: 'include'
        });
    }

    const deleteDish = async (id, dishes, setDishes) => {
        const res = await fetch(`${api}/dishes/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        const data = await res.json();

        if(res.ok){
            setDishes(prev => ({...prev, dishes: dishes.filter((dish) => dish.id !== id)}));
            displayMessage(data.message);
        }else{
            displayMessage(data.error);
        }
    };

    const updateDish = async (id, updatedDish, dishes, setDishes, base64) => {
        const res = await fetch(`${api}/dishes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({updatedDish: updatedDish, image: base64}),
            credentials: 'include'
        });

        const data = await res.json();

        if(res.ok){
            const updatedDishes = dishes.map((dish) => dish.id === id ? updatedDish : dish);
            setDishes(prev => ({...prev, dishes: updatedDishes}));
            displayMessage(data.message);
        }else{
            displayMessage(data.error);
        }
    };

    useEffect(() => {
        fetch(`${api}/api/auth/me`, {
          credentials: 'include'
        })
          .then(res => res.ok ? res.json() : null)
          .then(data => setUser(data))
    }, [])

    useEffect(() => {
        let total = 0;
        if(user?.shoppingCart){
            user.shoppingCart.forEach(cartItem => total += cartItem.price);
        }
        setCartTotal(total.toFixed(2));
    }, [user?.shoppingCart]);

return (
    <>
        <Navbar user={user} onLogout={handleLogout} displayMessage={displayMessage} />

        <Message message={message} messageVisible={messageVisible} setMessageVisible={setMessageVisible} />

        <Routes>
            <Route path="/" element={<Home updateCart={updateCart} user={user} />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurantdishes" element={<RestaurantDishes updateCart={updateCart} deleteDish={deleteDish} updateDish={updateDish} user={user} />} />
            <Route path="/login" element={<Login onAuth={handleLogin} displayMessage={displayMessage} />} />
            <Route path="/register" element={<Register onAuth={handleLogin} displayMessage={displayMessage} />} />
            <Route path="/post" element={user ? (user.role === "restaurant" ? <Post user={user} displayMessage={displayMessage} /> : <Navigate to="/" />) : <Navigate to="/login" /> } />
            <Route path="/shoppingcart" element={user ? (user.role === "customer" ? <ShoppingCart user={user} updateCart={updateCart} cartTotal={cartTotal} displayMessage={displayMessage} /> : <Navigate to="/" />) : <Navigate to="/login" /> } />
            <Route path="/purchase" element={user ? (user.role === "customer" && user?.shoppingCart?.length > 0 ? <Purchase cartTotal={cartTotal} displayMessage={displayMessage} emptyCart={emptyCart} /> : <Navigate to="/" />) : <Navigate to="/login" /> } />
            <Route path="/profile" element={user ? (user.role === "customer" ? <Profile user={user} /> : <Navigate to={`/restaurantDishes?restaurant=${user.restaurantId}`} />) : <Navigate to="/login" /> } />
        </Routes>
    </>
)
}

export default App
