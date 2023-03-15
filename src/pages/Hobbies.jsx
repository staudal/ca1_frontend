import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Hobbies() {

    const [hobbies, setHobbies] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/hobby/all')
            .then(response => response.json())
            .then(data => setHobbies(data))
    }, [])

    function addHobbyHandler(event) {
        fetch('http://localhost:8080/api/hobby/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: "test",
                description: "test"
            })
        }).then(r => r.json())
        event.preventDefault();
        console.log("addHobbyHandler");
    }

    return (
        <Container>
            <h1 className={"text-center mb-5 mt-5"}>All hobbies</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {hobbies.map(hobby => (
                    <tr key={hobby.id}>
                        <td>{hobby.id}</td>
                        <td>{hobby.name}</td>
                        <td>{hobby.description}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Form onSubmit={addHobbyHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default Hobbies;