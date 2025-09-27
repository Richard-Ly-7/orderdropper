import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function SearchBar({ setSearchQuery }){
    
    const [query, setQuery] = useState("");

    const handleClick = () => {
        setSearchQuery(query);
    }

    return (
        <Container>
            <Form.Label className="d-flex m-auto w-50 mb-5">
                <Form.Control type="text" className="me-3" onChange={(e) => setQuery(e.target.value)}/>
                <Button variant="outline-primary" type="button" size="lg" className="ms-3 outline-btn" onClick={handleClick}>Search</Button>
            </Form.Label>
        </Container>
    )
}