import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

export default function Dish({ dish, dishes, setDishes, updateCart, deleteDish, updateDish, user, modifiable }){
    const [isEditing, setIsEditing] = useState(false);
    const [newDish, setNewDish] = useState({
        name: "",
        price: "",
        base64: undefined
    });

    const convertToBase64 = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setNewDish({...newDish, base64: reader.result});
        };
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedDish = {...dish}
        if(newDish.name !== "") updatedDish.name = newDish.name;
        if(newDish.price !== "") updatedDish.price = newDish.price;
        if(newDish.base64 !== undefined) updatedDish.image = newDish.base64;

        updateDish(dish.id, updatedDish, dishes, setDishes, newDish.base64);

        setIsEditing(false);
    }
    
    return (
        <Col xs={8} lg={5} className= "d-flex flex-row justify-content-between shadow-sm rounded p-0 mb-5 dish-container h-auto">

            { isEditing ? 
                <Form onSubmit={handleSubmit} className="p-3 m-auto">

                    <Form.Group className="mb-2">
                    <Form.Label>New Dish Name</Form.Label>
                    <Form.Control type="text" value={newDish.name} onChange={(e) => setNewDish({...newDish, name: e.target.value})} />
                    </Form.Group>

                    <Form.Group className="mb-2">
                    <Form.Label>New Price</Form.Label>
                    <Form.Control type="number" value={newDish.price} onChange={(e) => setNewDish({...newDish, price: e.target.value === "" ? "" : parseFloat(e.target.value)})} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>New Image</Form.Label>
                        <Form.Control type="file" accept="image/jpg, image/jpeg, image/png, image/webp" onChange={convertToBase64} />
                    </Form.Group>
                    
                    <div className="d-flex justify-content-evenly">
                        <Button variant="outline-danger" type="button" size="md" className="outline-btn" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button variant="outline-warning" type="submit" size="md" className="outline-btn">Update</Button>
                    </div>

                </Form> :
                <>
                    {dish.image ? 
                        <img src={dish.image} className="img-responsive dish-image" /> :
                        <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" fill="slategray" viewBox="0 0 16 16"  className="bi bi-card-image img-responsive dish-image ps-3" >
                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                            <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                    }
                    <div className="d-flex flex-column justify-content-center align-items-end pe-3">
                        { user?.role === "customer" ? <Button variant="outline-primary" type="submit" size="sm" className="mb-3 outline-btn" onClick={() => updateCart(dish, true)} >Add to Cart</Button> : 
                            (
                                modifiable ? 
                                    <div className="d-flex pt-4 pe-2">
                                        <Button variant="outline-warning" type="submit" size="sm" className="me-2 mb-4 outline-btn" onClick={() => setIsEditing(true)}>Edit</Button>
                                        <Button variant="outline-danger" type="submit" size="sm" className="mb-4 outline-btn" onClick={() => deleteDish(dish.id, dishes, setDishes)}>Delete</Button>
                                    </div>
                                    :
                                    <div className="d-flex pt-3"></div>
                            )  
                        }

                        <div className="text-end pe-2">
                            <p className="h2 mb-0">{dish.name}</p>
                            <p className="h6">{dish.restaurant}</p>
                            <p>${dish.price.toFixed(2)}</p>
                        </div>
                    </div>
                </>
            }
        </Col>
    )
}