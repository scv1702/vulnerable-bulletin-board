/************************************************************************
> File name: Home.js
> Project name: vulnerable-bulletin-board
> Author: Shin Chan-Gyu
> Purpose: Main page of a website
> Copyright (c) 2021, Shin Chan-Gyu
*************************************************************************/

// Module
import React from 'react';

class Home extends React.Component {
    render() {
        return (
            <div style={{margin: '2rem'}}>
                <h2>vulnerable-bulletin-board</h2>
                <p>This is a website created for the purpose of <b>the 2021 KERT Summer Vacation Project: Web Secure Coding.</b></p>
                <hr></hr>
                <h4>Project team member</h4>
                <ul>
                <li>Chankyu Shin, sophomore</li>
                <li>Kim Eun-hye, freshman</li>
                <li>School Bo-kyung, freshman</li>
                </ul>
                <hr></hr>
                <h4>Technology stack</h4>
                <ul>
                    <li>Back-end: Node.js Exrpess</li>
                    <li>Database: mongoDB</li>
                    <li>Front-end: React.js</li>
                </ul>
            </div>
        )
    }
}

export default Home;