import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Post({ user, displayMessage }){
    const navigate = useNavigate();
    const api = import.meta.env.VITE_API_URL;

    const [fields, setFields] = useState({
        dishName: "",
        price: 0,
        base64: ""
    });

    const convertToBase64 = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setFields({...fields, base64: reader.result});
        };
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`${api}/restaurants/findRestaurant/${user.email}`);
        const restaurant = await res.json();

        if(res.ok) {
            const dishRes = await fetch(`${api}/dishes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name: fields.dishName, price: fields.price, base64: fields.base64, restaurant: restaurant.name, restaurantId: restaurant.id}),
                credentials: 'include'
            });

            const postData = await dishRes.json();

            dishRes.ok ? displayMessage("Dish posted!") : displayMessage(postData.error);
        }else{
            displayMessage(restaurant.error)
        }

        navigate('/');
    };

    return (
        <Container fluid="md" className="wrapper shadow-sm">

            <p className="h2 text-center mb-5">Post a Dish!</p>

            <Row className="justify-content-center">
                <Col xs={7} sm={7}>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-4">
                        <Form.Label>Dish Name</Form.Label>
                        <Form.Control type="text" value={fields.dishName} onChange={(e) => setFields({...fields, dishName: e.target.value})} required />
                        </Form.Group>

                        <Form.Group className="mb-4">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" value={fields.price} onChange={(e) => setFields({...fields, price: e.target.value})} required />
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Label>Upload An Image</Form.Label>
                            <Form.Control type="file" accept="image/jpg, image/jpeg, image/png, image/webp" onChange={convertToBase64} />
                        </Form.Group>
                        
                        <div className="d-flex justify-content-center">
                            <Button variant="outline-primary" type="submit" size="lg" className="outline-btn">Post</Button>
                        </div>

                    </Form>
                </Col>
            </Row>

        </Container>
    )
}