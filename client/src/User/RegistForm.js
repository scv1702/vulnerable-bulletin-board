/************************************************************************
> File name: RegistForm.js
> Project name: vulnerable-bulletin-board
> Author: Shin Chan-Gyu
> Purpose: Regist page of a website
> Copyright (c) 2021, Shin Chan-Gyu
*************************************************************************/

// Module
import React from 'react';
import axios from 'axios';
import { Form, Button, Card } from 'react-bootstrap';

// My CSS
import '../public/css/cardCenter.css';

class RegistForm extends React.Component {
    regist = () => {
        const username = this.username.value;
        const password = this.password.value;
        const name = this.name.value;
        const email = this.email.value;

        axios.post('/api/user/regist', { username, password, name, email })
            .then(returnData => {
                if (returnData.data.message) {
                    alert(returnData.data.message);
                    if (returnData.data.dupYn === '1') {
                        this.username.value = "";
                        this.username.focus();
                    } else {
                        this.username.value = "";
                        this.password.value = "";
                        this.name.value = "";
                        this.email.value = "";
                        window.location.href = "/";
                    }
                } else {
                    alert('Failed to regist. Please try again.');
                }
            });
    }

    render() {
        const buttonStyle = { marginTop: 10 };
        return (
            <Form className="formStyle">
                <Card style={{ width: '30rem' }}>
                    <Card.Body>
                        <Card.Title style={{ textAlign: 'center' }}>Regist</Card.Title>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                maxLength="20"
                                id="username"
                                ref={ref => (this.username = ref)}
                            />

                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                maxLength="20"
                                id="password"
                                ref={ref => (this.password = ref)}
                            />
                            <Form.Text className="text-muted">
                            Please enter a password with 8 to 16 digits including numbers, letters and special characters.
                            </Form.Text><br></br>

                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                maxLength="20"
                                id="name"
                                ref={ref => (this.name = ref)}
                            />

                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                maxLength="100"
                                id="email"
                                ref={ref => (this.email = ref)}
                            />
                        </Form.Group>
                        <div className="formStyle">
                            <Button
                                style={buttonStyle}
                                onClick={this.regist}
                                variant="dark"
                                type="button"
                                block
                            >
                                Regist
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Form>
        );
    }
}

export default RegistForm;