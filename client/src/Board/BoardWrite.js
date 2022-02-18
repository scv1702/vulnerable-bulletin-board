/************************************************************************
> File name: BoardWrite.js
> Project name: vulnerable-bulletin-board
> Author: Shin Chan-Gyu
> Purpose: A page showing a form for writing a post
> Copyright (c) 2021, Shin Chan-Gyu
*************************************************************************/

// Module
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

class BoardWrite extends React.Component {
    state = { data: "" };

    componentDidMount() {
        if (this.props.location.query !== undefined) {
            this.title.value = this.props.location.query.title; 
            this.setState({
                data: this.props.location.query.content
            });
        }
    }

    writeBoard = () => {
        let url;
        let send_param;

        const title = this.title.value;
        const content = this.state.data;

        if (title === undefined || title === "") {
            alert('Please enter the title.');
            title.focus();
            return;
        } else if (content === undefined || content === "") {
            alert('Please enter the content.');
            content.focus();
        }

        if (this.props.location.query !== undefined) {
            url = '/api/board/update';
            send_param = {
                post_id: this.props.location.query._id,
                title,
                content
            };
        } else {
            url = '/api/board/write';
            send_param = {
                title,
                content
            };
        }

        axios.post(url, send_param).then(returnData => {
            if (returnData.data.message) {
                alert(returnData.data.message);
                window.location = '/board';
            } else {
                alert("Failed to write post. please try again.");
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div style={{ margin: 50 }}>
                <h2>Write</h2>
                <Form>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        style={{ marginBottom: 5 }}
                        placeholder="title"
                        ref={ref => (this.title = ref)}
                    />
                    <Form.Label>Content</Form.Label>
                    <Form.Control 
                        as="textarea"
                        style={{ marginBottom: 5 }}
                        placeholder="Content"
                        value={this.state.data}
                        onChange={(event) => {
                            this.setState({ data: event.target.value })
                        }}
                        rows={3} 
                    />
                </Form>
                <Button
                    style={{ marginTop: 5 }}
                    onClick={this.writeBoard}
                    block
                >
                    Publish
                </Button>
            </div>
        );
    }
}

export default BoardWrite