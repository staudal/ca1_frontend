import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table, Accordion } from 'react-bootstrap';

function Users() {

    const [persons, setPersons] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/person/all')
            .then(response => response.json())
            .then(data => setPersons(data))
    }, [])

    function addPersonHandler(event) {
        event.preventDefault();
        const person = {
            firstName: event.target[0].value,
            lastName: event.target[1].value,
            email: event.target[2].value,
        }
        fetch('http://localhost:8080/api/person/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(person)
        })
            .then(response => response.json())
            .then(data => {
                setPersons([...persons, data])
            })
        event.target.reset();
    }

    return (
        <Container>
            <Form onSubmit={addPersonHandler} className="mt-4">
                <div className="row">
                    <div className="col-3">
                        <Form.Group>
                            <Form.Control type="text" placeholder="First name" />
                        </Form.Group>
                    </div>
                    <div className="col-3">
                        <Form.Group>
                            <Form.Control type="text" placeholder="Last name" />
                        </Form.Group>
                    </div>
                    <div className="col-3">
                        <Form.Group>
                            <Form.Control type="text" placeholder="Email" />
                        </Form.Group>
                    </div>
                    <div className="col-3 d-flex">
                        <Button variant="primary" type="submit" className="align-self-center w-100">Add</Button>
                    </div>
                </div>
            </Form>
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {persons.map(person => (
                        <tr key={person.id}>
                            <td>{person.id}</td>
                            <td>{person.firstName}</td>
                            <td>{person.lastName}</td>
                            <td>{person.email}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default Users;