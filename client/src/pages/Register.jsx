import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Register({ onAuth, displayMessage }){
    const api = import.meta.env.VITE_API_URL;

    const [fields, setFields] = useState({
        selectValue: "Customer",
        displayName: "",
        restaurantName: "",
        address: "",
        description: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const changeField = (e) => {
        setFields({
            selectValue: e.target.value,
            displayName: "",
            restaurantName: "",
            address: "",
            description: "",
            email: "",
            password: ""
        });
    }

    const convertToBase64 = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setFields({...fields, base64: reader.result});
        };
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`${api}/api/auth/signup`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fields.selectValue === "Customer" ? 
                {email: fields.email, username: fields.displayName, password: fields.password, address: fields.address, base64: fields.base64, role: "customer"} :
                {email: fields.email, username: fields.restaurantName, password: fields.password, address: fields.address, base64: fields.base64, role: "restaurant", description: fields.description}
            ),
        });

        const data = await res.json();

        if (res.ok) {
            onAuth(data);
            displayMessage('Register successful!');
            navigate('/');
        } else {
            displayMessage(data.error);
        }
        
    };
    
    return (
        <Container fluid="md" className="wrapper shadow-sm">
            <p className="h2 text-center mb-5">Register</p>

            <Row className="justify-content-center">
                <Col xs={7} sm={7}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-5">
                            <Form.Label>I am a:</Form.Label>
                            <Form.Select onChange={changeField}>
                                <option>Customer</option>
                                <option>Restaurant</option>
                            </Form.Select>
                        </Form.Group>

                        {
                            fields.selectValue === "Customer" ?

                            <>
                                <Form.Group className="mb-4">
                                    <Form.Label>Display Name</Form.Label>
                                    <Form.Control type="text" value={fields.displayName} onChange={(e) => setFields({...fields, displayName: e.target.value})} required  />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Delivery Address</Form.Label>
                                    <Form.Control type="text" value={fields.address} onChange={(e) => setFields({...fields, address: e.target.value})} required />
                                </Form.Group>

                            </>
                            :
                            
                            <>
                                <Form.Group className="mb-4">
                                    <Form.Label>Restaurant Name</Form.Label>
                                    <Form.Control type="text" value={fields.restaurantName} onChange={(e) => setFields({...fields, restaurantName: e.target.value})} required />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" value={fields.address} onChange={(e) => setFields({...fields, address: e.target.value})} required />
                                </Form.Group>
                                
                                <Form.Group className="mb-4">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" value={fields.description} onChange={(e) => setFields({...fields, description: e.target.value})} required />
                                </Form.Group>
                            </>
                        }
                        <Form.Group className="mb-4">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={fields.email} onChange={(e) => setFields({...fields, email: e.target.value})} required />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={fields.password} onChange={(e) => setFields({...fields, password: e.target.value})} required />
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control type="file" accept="image/jpg, image/jpeg, image/png, image/webp" onChange={convertToBase64} />
                        </Form.Group>

                        <div className="d-flex justify-content-center">
                            <Button variant="outline-primary" type="submit" size="lg">Register</Button>
                        </div>
                    </Form>
                </Col>
            </Row>

        </Container>
    )
}

