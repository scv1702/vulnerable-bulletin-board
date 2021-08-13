/************************************************************************
> File name: Body.js
> Project name: vulnerable-bulletin-board
> Author: Shin Chan-Gyu
> Purpose: Router of a React.js
> Copyright (c) 2021, Shin Chan-Gyu
*************************************************************************/

// Module
import React from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';

import LoginForm from './User/LoginForm';
import RegistForm from './User/RegistForm';

import BoardList from './Board/BoardList';
import BoardDetail from './Board/BoardDetail';
import BoardWrite from './Board/BoardWrite';

import { isUserLogin } from './public/js/util';

class Body extends React.Component {
    state = { isLogin: false };

    componentDidMount() {
        isUserLogin().then(isLogin => { 
            this.setState({isLogin});
        });
    }

    render() {
        let board;
    
        if (this.state.isLogin) {
            board = <Route path='/board/write' component={BoardWrite}></Route>
        } else {
            board = <Route path='/board/write' component={LoginForm}></Route>
        }

        return (
            <div>
                <Route exact path='/' component={Home}></Route>

                <Route path='/login' component={LoginForm}></Route>
                <Route path='/regist' component={RegistForm}></Route>
                
                <Route exact path='/board' component={BoardList}></Route>
                {board}
                <Route path='/board/detail' component={BoardDetail}></Route>
            </div>
        );
    }
}

export default Body;