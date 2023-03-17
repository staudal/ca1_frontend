import {useEffect, useState} from "react";
import { Container, Form, Button, Table, Accordion } from 'react-bootstrap';

function Home() {

    const [persons, setPersons] = useState([]);

    function searchHandler(event) {
        event.preventDefault();

        if (event.target[0].value == '') {
            fetch('https://staudal.org/rest_start_code/api/person/all')
                .then(response => response.json())
                .then(data => {
                    setPersons(data)
                    console.log(data);
                })
        }
        
        if (event.target[0].value != '') {
            fetch('https://staudal.org/rest_start_code/api/person/hobby/' + event.target[0].value)
                .then(response => response.json())
                .then(data => {
                    setPersons(data)
                    console.log(data);
                })
        }

        event.target.reset();
    }

    const personsExist = () => {
        return (
            <Table striped bordered hover className="mt-4 mb-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Hobbies</th>
                    </tr>
                </thead>
                <tbody>
                    {persons.map(person => (
                        <tr key={person.id}>
                            <td>{person.id}</td>
                            <td>{person.firstName}</td>
                            <td>{person.lastName}</td>
                            <td>{person.email}</td>
                            <td>
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Hobbies</Accordion.Header>
                                        <Accordion.Body>
                                            {person.hobbies.map(hobby => (
                                                <p key={hobby.id} className="mb-0">{hobby.name}</p>
                                            ))}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    }

    const noPersons = () => {
        return (
            <p className="mt-4 text-center">No friends found</p>
        )
    }

    return (
        <Container>
            <Form  onSubmit={searchHandler}>
                <Form.Group className="d-flex gap-4 mt-4">
                    <Form.Control type="text" placeholder="Search (no input = all)"/>
                    <Button type="submit">Search</Button>
                </Form.Group>
            </Form>
            {persons.length > 0 ? personsExist() : noPersons()}
        </Container>
    )
}

export default Home;