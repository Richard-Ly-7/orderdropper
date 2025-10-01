import { useState, useEffect } from 'react';
import DishList from '../components/DishList';
import SearchBar from '../components/SearchBar';
import PageButtons from '../components/PageButtons';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner'; 

export default function Home({ updateCart, user }){
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const [dishes, setDishes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const api = import.meta.env.VITE_API_URL;

    const decrementPage = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);  
        }
    }

    const incrementPage = () => {
        setCurrentPage(currentPage + 1);
    }

    useEffect(() => {
        fetch(`${api}/dishes?page=${currentPage}&limit=${9}&searchQuery=${searchQuery}`)
            .then((res) => res.json())
            .then((data) => {
                setDishes(data.dishes); 
                setLastPage(Math.ceil(data.totalDishes / 9));
                setIsLoading(false);
            });
    }, [currentPage, searchQuery]);

    if (isLoading){
        return (
            <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                <Spinner animation='border' role='status' variant='primary'>
                    <span className='visually-hidden'>Loading dishes...</span>
                </Spinner>
            </div>
        );
    }

    if(dishes?.length === 0) {
        return <div>No dishes found.</div>;
    }

    return (
      <Container className="wrapper shadow-sm">
        
        <p className="h2 text-center">Welcome to OrderDropper!</p>
        <p className="h6 fw-light text-center mb-5">Find what you're craving.</p>
        <SearchBar setSearchQuery={setSearchQuery}/>

        <DishList dishes={dishes} updateCart={updateCart} user={user} />

        <PageButtons currentPage={currentPage} lastPage={lastPage} decrementPage={decrementPage} incrementPage={incrementPage} />
      </Container>
    )
}