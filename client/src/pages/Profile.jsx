import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Profile({ user }) {

    if (!user) return <p>Loading profile...</p>;

    return (
        <Container className="vh-100">
            <Row className="justify-content-evenly h-100">
                <Col xs={12} sm={12} className="d-flex justify-content-center align-items-center">
                    <p className="h2">{user.username}'s Profile</p>
                </Col>
                <Col xs={10} sm={10} className="d-flex flex-row shadow rounded p-0 restaurant-container h-50">
                    <Col xs={6} sm={6} className="d-flex justify-content-center align-items-center">
                        {user.image ? 
                            <img src={user.image} className="restaurant-image ms-2 my-auto rounded" /> : 
                            <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" fill="slategray" viewBox="0 0 16 16"  className="restaurant-image ms-2 my-auto rounded" >
                                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z"/>
                            </svg>
                        }
                    </Col>
                    
                    <Col xs={6} sm={6} className="d-flex flex-column justify-content-center my-auto me-5 text-start">
                        <Container>
                            <p className="h5">Display Name: {user.username}</p>
                            <p className="h5">Email: {user.email}</p>
                            <p className="h5">Delivery Address: {user.address}</p>
                            <p className="h5"><strong>Account Created:</strong> {new Date(user.createdAt).toLocaleString()}</p>
                        </Container>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
}

export default Profile;