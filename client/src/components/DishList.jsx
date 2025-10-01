import Dish from './Dish';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function DishList({ dishes, setDishes, updateCart, deleteDish, updateDish, user, modifiable }) {
    const dishList = [];

    for (let i = 0; i < dishes?.length; i += 2) {
        dishList.push(
            <Row key={i} className="justify-content-evenly">
                {dishes.slice(i, i + 2).map((dish) => (
                    <Dish
                        key={dish._id}
                        dish={dish}
                        dishes={dishes}
                        setDishes={setDishes}
                        updateCart={updateCart} 
                        user={user}
                        modifiable={modifiable}
                        deleteDish={deleteDish} 
                        updateDish={updateDish} 
                    />
                ))}
            </Row>
        );
    }

    return (
        <Container>
            {dishList}
        </Container>
    );
}