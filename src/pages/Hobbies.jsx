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
        event.preventDefault();
        const hobby = {
            name: event.target[0].value,
            description: event.target[1].value
        }
        fetch('http://localhost:8080/api/hobby/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(hobby)
        })
            .then(response => response.json())
            .then(data => {
                setHobbies([...hobbies, data])
            })
        event.target.reset();
    }

    function removeHobbyHandler(event, id) {
        event.preventDefault();
        fetch('http://localhost:8080/api/hobby/delete/' + id, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                setHobbies(hobbies.filter(hobby => hobby.id !== data.id))
            }
        )
    }

    return (
        <Container>
            <Form onSubmit={addHobbyHandler} className="mt-4">
                <div className="row">
                    <div className="col-5">
                        <Form.Group>
                            <Form.Control type="text" placeholder="Hobby name" />
                        </Form.Group>
                    </div>
                    <div className="col-5">
                        <Form.Group>
                            <Form.Control type="text" placeholder="Hobby description" />
                        </Form.Group>
                    </div>
                    <div className="col-2 d-flex">
                        <Button variant="primary" type="submit" className="w-100">Add</Button>
                    </div>
                </div>
            </Form>
            <Table striped bordered hover className="mt-4 mb-4">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Operations</th>
                </tr>
                </thead>
                <tbody>
                {hobbies.map(hobby => (
                    <tr key={hobby.id}>
                        <td>{hobby.id}</td>
                        <td>{hobby.name}</td>
                        <td>{hobby.description}</td>
                        <td>
                            <Form onSubmit={(event) => removeHobbyHandler(event, hobby.id)}>
                                <Button variant="danger" type="submit">Delete</Button>
                            </Form>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default Hobbies;