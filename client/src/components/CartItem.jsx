import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function CartItem({cartItem, updateCart}){
    return (
        <Col xs={12} sm={12} className="mb-5">
            <Row className="d-flex justify-content-between">
                <Col xs={12} sm={12} className= "d-flex flex-row justify-content-between shadow-sm rounded p-0 dish-container">
                    {cartItem.image ? 
                        <img src={cartItem.image} className="img-responsive dish-image" /> :
                        <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" fill="slategray" viewBox="0 0 16 16"  className="bi bi-card-image img-responsive dish-image ps-3" >
                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                            <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                    }
                    <div className="d-flex flex-column justify-content-center align-items-end pe-3 text-end">
                        <p className="h2 mb-0">{cartItem.name}</p>
                        <p className="h6">{cartItem.restaurant}</p>
                        <p>${cartItem.price.toFixed(2)}</p>
                        <div>
                            <button className="btn btn-light px-2" onClick={() => updateCart(cartItem, false)}><h4 className="p-0 m-0">-</h4></button>
                            <span className="px-2">{cartItem.count}</span>
                            <button className="btn btn-light py-2 px-2" onClick={() => updateCart(cartItem, true)}>+</button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Col>
    )
}