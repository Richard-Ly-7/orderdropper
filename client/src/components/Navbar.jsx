import { useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavigationBar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AccessibilityMenu from './AccessibilityMenu';

export default function Navbar({ user, onLogout, displayMessage }) {
  const navigate = useNavigate();
  
  const handleLogout = () => {
      onLogout();
      displayMessage("You have logged out.");
      navigate('/');
  };

  return (
    <NavigationBar collapseOnSelect expand="lg" className="navbar-background">
      <Container>
        <NavigationBar.Brand as={Link} to="/" id="brand" className="text-light d-flex align-items-center">
          <img alt="OrderDropper Logo" src="/orderdropper_logo_white.png" height="40" width="50" className="mb-1" />
          OrderDropper
        </NavigationBar.Brand>
        <NavigationBar.Toggle aria-controls="responsive-NavigationBar-nav" />
        <NavigationBar.Collapse id="responsive-NavigationBar-nav">
          <Nav className="ms-auto pt-1 d-flex align-items-center">
            <Nav.Link as={Link} to="/"><p className="text-light h5">Home</p></Nav.Link>
            <Nav.Link as={Link} to="/restaurants"><p className="text-light h5">Restaurants</p></Nav.Link>

            {!user ? (
                <>
                  <Nav.Link as={Link} to="/register"><p className="text-light h5">Register</p></Nav.Link>
                  <Nav.Link as={Link} to="/login"><p className="text-light h5">Login</p></Nav.Link>
                </>
              ) : (
                user.role === "restaurant" ? 
                <>
                  <Nav.Link as={Link} to="/post"><p className="text-light h5">Post</p></Nav.Link>
                  <Nav.Link as={Link} to={`/restaurantDishes?restaurant=${user.restaurantId}`}><p className="text-light h5">Profile</p></Nav.Link>
                  <Nav.Link onClick={handleLogout} ><p className="text-light h5">Logout</p></Nav.Link>
                </>
                :
                <>
                  <Nav.Link as={Link} to="/shoppingcart"><p className="text-light h5">Checkout</p></Nav.Link>
                  <Nav.Link as={Link} to="/profile"><p className="text-light h5">Profile</p></Nav.Link>
                  <Nav.Link onClick={handleLogout} ><p className="text-light h5">Logout</p></Nav.Link>
                </>
              )
            }

            <NavDropdown title={<img src="/accessibility.svg" alt="accessibility"/>}>
              <AccessibilityMenu />
            </NavDropdown>
          </Nav>
        </NavigationBar.Collapse>
      </Container>
    </NavigationBar>
  );
}
