import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Login({ onAuth, displayMessage }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const api = import.meta.env.VITE_API_URL;
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`${api}/api/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            onAuth(data);
            displayMessage("Login successful!");
            navigate('/');
        } else {
            displayMessage(data.error);
        }
    };

    return (
        <Container fluid="md" className="wrapper shadow-sm">
            <p className="h2 text-center mb-5">Welcome Back!</p>

            <Row className="justify-content-center">
                <Col xs={7} sm={7}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-4">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <div className="d-flex justify-content-center">
                            <Button variant="outline-primary" type="submit" size="lg" className="outline-btn">Login</Button>
                        </div>
                    </Form>
                </Col>
            </Row>

        </Container>
    )
}