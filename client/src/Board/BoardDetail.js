/************************************************************************
> File name: BoardDetail.js
> Project name: vulnerable-bulletin-board
> Author: Shin Chan-Gyu
> Purpose: A page showing the details of a post
> Copyright (c) 2021, Shin Chan-Gyu
*************************************************************************/

// Module
import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class BoardDetail extends React.Component {
    state = { board: [], isLogin: false };

    deleteBoard = () => {
        if (window.confirm('Do you really want to delete this post?')) {
            axios.post('/api/board/delete', { post_id: this.props.location.query._id }).then(returnData => {
                if (returnData.data.message) {
                    alert('Post has been deleted.');
                    window.location.href = "/board";
                } else {
                    alert('You can only delete your own posts.');
                }
            }).catch(err => {
                console.log(err);
                alert('Failed to delete post. Please try again.');
            });
        }
    }

    getDetail = () => {
        axios.post('/api/board/detail', { _id: this.props.location.query._id }).then(returnData => {
            if (returnData.data.board[0]) {
                const post = returnData.data.board[0];
                let btn;
                let updatedAt;

                if (post.updatedAt) {
                    updatedAt = <div>Updated At: {post.updatedAt}</div>
                }

                if (post.writer.username === cookies.get('login_username')) {
                    btn = <div>
                            <Button block style={{ marginBottom: 5 }}>
                                <Link
                                    to={{
                                        pathname: "/board/write",
                                        query: {
                                            title: post.title,
                                            content: post.content,
                                            _id: this.props.location.query._id
                                        }
                                    }}
                                    style={{ textDecoration: 'none', color: 'white' }}
                                >
                                    Edit
                                </Link>
                            </Button>
                            <Button
                                block
                                style={{ marginBottom: 5, marginLeft: 5 }}
                                onClick={this.deleteBoard.bind(null)}
                            >
                                Delete
                            </Button>
                        </div>
                }

                const board = (
                    <div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>{post.title}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>
                                        Writer: {post.writer.name}<br></br>
                                        Created At: {post.createdAt}
                                        {updatedAt}
                                    </th>
                                </tr>
                                <tr>
                                    <td
                                        dangerouslySetInnerHTML={{
                                            __html: post.content
                                        }}
                                    ></td>
                                </tr>
                            </tbody>
                        </Table>
                        {btn}
                    </div>
                );
                this.setState({
                    board: board,
                    content: post.content
                });
            } else {
                alert("Failed to search the details of the post. Please try again.");
            }
        }).catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {
        if (this.props.location.query !== undefined) {
            this.getDetail();
        } else {
            window.location.href = "/board";
        }
    }
    
    render() {
        return (
            <div style={{ margin: 50 }}>
                {this.state.board}
            </div>
        );
    }
}

export default BoardDetail;