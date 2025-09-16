import { useNavigate, useSearchParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';

export default function Restaurant({restaurant}){

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const restaurantClickable = searchParams.get('restaurant') === null;

    const navigateToDishes = () => {
        navigate(`/restaurantDishes?restaurant=${restaurant.id}`);
    }

    return (
        <Col xs={7} sm={7} className={`d-flex flex-row justify-content-between shadow-sm rounded p-0 restaurant-container mb-5 ${restaurantClickable ? "restaurant-container-clickable" : ""}`} onClick={restaurantClickable ? navigateToDishes : undefined} >
            {restaurant.image ? 
                <img src={restaurant.image} className="restaurant-image ms-2 my-auto rounded" /> : 
                <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" fill="slategray" viewBox="0 0 16 16"  className="restaurant-image ms-2 my-auto rounded" >
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z"/>
                </svg>
            }
            
            <div className="d-flex flex-column justify-content-center my-auto ms-3 me-5 text-end">
                <div>
                    <p className="h2 mb-0">{restaurant.name}</p>
                    <p className="h6">{restaurant.address}</p>
                </div>
                <p className="h6 fw-light fst-italic">{restaurant.description || ""}</p>
            </div>
        </Col>
    )
}