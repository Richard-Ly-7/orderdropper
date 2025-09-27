import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export default function PageButtons({currentPage, lastPage, decrementPage, incrementPage}) {
  return (
        <Container className="d-flex justify-content-center gap-3">
            {currentPage !== 1 ? <Button size="sm" variant="primary" className="page-btn" onClick={decrementPage}>{"<"}</Button> : ""}
            <p className="h5 pt-2">{currentPage}</p>
            {currentPage < lastPage ? <Button size="sm" variant="primary" className="page-btn" onClick={incrementPage}>{">"}</Button> : ""}
        </Container>
  );
}


