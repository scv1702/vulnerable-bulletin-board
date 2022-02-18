/************************************************************************
> File name: LoginForm.js
> Project name: vulnerable-bulletin-board
> Author: Shin Chan-Gyu
> Purpose: Login page of a website
> Copyright (c) 2021, Shin Chan-Gyu
*************************************************************************/

// Module
import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Form, Button, Card } from 'react-bootstrap';

// My CSS
import '../public/css/cardCenter.css';

const cookies = new Cookies();

class LoginForm extends React.Component {
    // Login
    login = () => {
        const username = this.username.value;
        const password = this.password.value;
        
        if (username === "" || username === undefined) {
            alert("Please input your username.");
            this.username.focus();
            return;
        } else if (password === "" || password === undefined) {
            alert("Please input your password.");
            this.password.focus();
            return;
        }

        // Request Login API to Express server
        axios.post("/api/user/login", { username, password })
            .then(returnData => { 
                const THREE_DAYS = 2592000;
                if (returnData.data.auth) {
                    // Save _id value of user to cookie
                    cookies.set('login_id', returnData.data._id, {
                        path: '/',
                        expires: new Date(Date.now() + THREE_DAYS)
                    });
                    // Save username value of user to cookie
                    cookies.set('login_username', returnData.data.username, {
                        path: '/',
                        expires: new Date(Date.now() + THREE_DAYS)
                    });
                    alert(returnData.data.message);
                    window.location.href = "/";
                } else {
                    alert(returnData.data.message);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        const buttonStyle = { marginTop: 10 };
        
        return (
            <Form className="formStyle">
                <Card style={{ width: '30rem' }}>
                    <Card.Body>
                        <Card.Title style={{ textAlign: 'center'}}>Login</Card.Title>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                maxLength="100"
                                ref={ref => (this.username = ref)}
                            />
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                maxLength="20"
                                ref={ref => (this.password = ref)}
                            />
                        </Form.Group>
                        <div className="formStyle">
                                <Button
                                    style={buttonStyle}
                                    onClick={this.login}
                                    variant="dark"
                                    type="button"
                                    block
                                >
                                Login
                                </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Form>
        );
    }
}

export default LoginForm;