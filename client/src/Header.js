/************************************************************************
> File name: Header.js
> Project name: vulnerable-bulletin-board
> Author: Shin Chan-Gyu
> Purpose: Navigation of a website
> Copyright (c) 2021, Shin Chan-Gyu
*************************************************************************/

// Module
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { isUserLogin } from './public/js/util';

const cookies = new Cookies();

class Header extends React.Component {
    state = { isLogin: false };
    // Logout
    logout = () => {
        axios.get('/api/user/logout').then(returnData => {
            if (returnData.data.message) {
                alert('You are logged out!');
                cookies.remove('login_id');
                cookies.remove('login_username');
                window.location.href = '/';
            }
        });
    }

    componentDidMount() {
        isUserLogin().then(isLogin => { 
            this.setState({isLogin});
        });
    }

    render() {
        let btn;
        
        // if a user login, btn is a logout button
        if (this.state.isLogin) {
            btn = (<Nav className="justify-content-end">
                    <Button onClick={this.logout} variant="light">Logout</Button>
                </Nav>);
        // if a user doesn't login, btn is a login button
        } else {
            btn = (<Nav className="justify-content-end">
                    <Button variant="light"><a href="/login" style={{ textDecoration: 'none', color: 'black' }}>Login</a></Button>
                </Nav>);
        }

        return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">KERT</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/board">Board</Nav.Link>
                        <Nav.Link href="/regist">Sign Up</Nav.Link>
                    </Nav>
                    {btn}
                </Container>
            </Navbar>
        )
    }
}

export default Header;