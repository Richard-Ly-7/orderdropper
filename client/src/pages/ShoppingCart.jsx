import { useNavigate } from 'react-router-dom';
import CartList from '../components/CartList';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ShoppingCart({user, updateCart, cartTotal, displayMessage}){

    const navigate = useNavigate();

    return (
        <Container fluid="md" className="wrapper shadow-sm">

            <p className="h2 text-center mb-5">Shopping Cart</p>

            <Row className="justify-content-evenly">
                <Col xs={6} sm={6} className="mt-5">
                    { user.shoppingCart.length === 0 ? <div>Cart is empty.</div> : <CartList cartItems={user.shoppingCart} updateCart={updateCart} /> }
                </Col>
                <Col xs={4} xl={2} className="d-flex align-items-end">
                    <Container className="text-start border border-primary p-4">
                        <p className="h5">Order Total:</p>
                        <p className="h2">${cartTotal}</p>
                        <Button variant="outline-warning" type="submit" size="lg" className="mt-2" onClick={() => user.shoppingCart.length === 0 ? displayMessage("Please add an item to your cart.") : navigate(`/purchase`) }>Proceed To Purchase</Button>
                    </Container>
                </Col>
            </Row>

        </Container>
    )
}