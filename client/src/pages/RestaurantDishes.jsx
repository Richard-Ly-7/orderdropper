import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Restaurant from '../components/Restaurant';
import DishList from '../components/DishList';
import SearchBar from '../components/SearchBar';
import PageButtons from '../components/PageButtons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner'; 

export default function RestaurantDishes({ updateCart, deleteDish, updateDish, user }){
    const api = import.meta.env.VITE_API_URL;
    
    const [searchParams] = useSearchParams();
    const restaurantId = searchParams.get('restaurant');

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const [restaurantDishes, setRestaurantDishes] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`${api}/restaurants/${restaurantId}?page=${currentPage}&limit=${9}&searchQuery=${searchQuery}`)
            .then((res) => res.json())
            .then((data) => {
                setRestaurantDishes(data); 
                setLastPage(Math.ceil(data.totalDishes / 9));
                setIsLoading(false);
            });
    }, [restaurantId, currentPage, searchQuery]);

    if (isLoading){
        return (
            <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                <Spinner animation='border' role='status' variant='primary'>
                    <span className='visually-hidden'>Loading dishes...</span>
                </Spinner>
            </div>
        );
    }

    const decrementPage = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);  
        }
    }

    const incrementPage = () => {
        setCurrentPage(currentPage + 1);
    }

    return (
        <Container fluid="md" className="wrapper shadow-sm">


            <Row className="justify-content-evenly pb-5">
                <Restaurant restaurant={restaurantDishes.restaurant} />
            </Row>

            <p className="h2 text-center mb-5">{restaurantDishes?.restaurant?.name}'s Menu</p>

            <SearchBar setSearchQuery={setSearchQuery}/>
            
            { restaurantDishes.length === 0 ? 
                <div>No dishes found.</div> :
                <DishList dishes={restaurantDishes.dishes} setDishes={setRestaurantDishes} updateCart={updateCart} deleteDish={deleteDish} updateDish={updateDish} user={user} modifiable={user?.restaurantId === restaurantId}/>
            }

            <PageButtons currentPage={currentPage} lastPage={lastPage} decrementPage={decrementPage} incrementPage={incrementPage} />
            
        </Container>
    )
}