import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Purchase({cartTotal, displayMessage, emptyCart}){
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        displayMessage("Your order is on the way!");
        emptyCart();
        navigate(`/`);
    }

    return (
        <Container fluid="md" className="wrapper shadow-sm">
            <p className="h2 text-center mb-5">Complete Your Order</p>

            <Row className="justify-content-center">
                <Col xs={6} sm={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-5">
                            <Form.Label>Enter your credit card details here:</Form.Label>
                            <Form.Control type="text" placeholder="Name On Card" />
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Control type="text" placeholder="Credit Card Number" />
                        </Form.Group>

                        <Row>
                            <Col xs={8} lg={10}>
                                <Form.Group className="mb-5">
                                    <Form.Control type="text" placeholder="Expiry Date" />
                                </Form.Group>
                            </Col>

                            <Col xs={4} lg={2}>
                                <Form.Group className="mb-5">
                                    <Form.Control type="text" placeholder="CVV" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={6} md={5} className="ms-auto">
                                <Container className="d-flex flex-column align-items-center text-end border border-primary p-4">
                                    <p className="h5">Order Total:</p>
                                    <p className="h2">${cartTotal}</p>
                                    <Button variant="outline-warning" type="submit" size="lg" className="w-100 mt-2 outline-btn">Order</Button>
                                </Container>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>

        </Container>
    )
}