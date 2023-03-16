import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Layout = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Hobbit</Navbar.Brand>
                    <Nav className="me-0">
                        <Nav.Link href="/">Search</Nav.Link>
                        <Nav.Link href="/hobbies">Hobbies</Nav.Link>
                        <Nav.Link href="/users">Users</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Outlet />
        </>
    )
};

export default Layout;