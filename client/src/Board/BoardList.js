/************************************************************************
> File name: BoardList.js
> Project name: vulnerable-bulletin-board
> Author: Shin Chan-Gyu
> Purpose: A page that lists all posts on the bulletin board
> Copyright (c) 2021, Shin Chan-Gyu
*************************************************************************/

// Module
import React from 'react';
import { Table, Button, Pagination, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';

class BoardRow extends React.Component {
    render() {
        return (
            <tr>
                <td>
                    <Link
                        to={{ pathname: "/board/detail", query: { _id: this.props._id } }}
                    >
                        {this.props.title}
                    </Link>
                </td>
                <td>
                    {this.props.writer.name}
                </td>
                <td>
                    {this.props.createdAt.substring(0, 10)}
                </td>
            </tr>
        )
    }
}

class BoardList extends React.Component {
    state = {
        boardList: [],
        currentPage: 0,
        maxPage: 0,
        limit: 0
    };

    pagination = () => {
        const currentPage = this.state.currentPage;
        const maxPage = this.state.maxPage;
        const limit = this.state.limit;

        const offset = 2;
        const previousBtnEnabled = currentPage > 1;
        const nextBtnEnabled = currentPage < maxPage;

        let active = currentPage;
        let items = [];

        items.push(<Pagination.First
            href={`board?page=1&limit=${limit}`}
        />);
        items.push(<Pagination.Prev
            href={`board?page=${currentPage - 1}&limit=${limit}`}
            disabled={previousBtnEnabled ? false : true}
        />);
        for (let i = 1; i <= maxPage; i++) {
            if (i === 1 || i === maxPage || (i >= currentPage - offset && i <= currentPage + offset)) {
                items.push(
                    <Pagination.Item
                        active={i === active}
                        activeLabel={''}
                        href={`/board?page=${i}&limit=${limit}`}
                    >{i}</Pagination.Item>
                );
            } else if (i === 2 || i === maxPage - 1) {
                items.push(<Pagination.Ellipsis />);
            }
        }
        items.push(<Pagination.Next
            href={`board?page=${currentPage + 1}&limit=${limit}`}
            disabled={nextBtnEnabled ? false : true}
        />);
        items.push(<Pagination.Last
            href={`board?page=${maxPage}&limit=${limit}`}
        />);

        return items
    }

    selectLimit = () => {
        return (
            <div>
                <DropdownButton id="dropdown-basic-button" title={`${this.state.limit} each`}>
                    <Dropdown.Item href={`?page=${this.state.currentPage}&limit=5`}>5 each</Dropdown.Item>
                    <Dropdown.Item href={`?page=${this.state.currentPage}&limit=10`}>10 each</Dropdown.Item>
                    <Dropdown.Item href={`?page=${this.state.currentPage}&limit=15`}>15 each</Dropdown.Item>
                    <Dropdown.Item href={`?page=${this.state.currentPage}&limit=20`}>20 each</Dropdown.Item>
                    <Dropdown.Item href={`?page=${this.state.currentPage}&limit=30`}>30 each</Dropdown.Item>
                    <Dropdown.Item href={`?page=${this.state.currentPage}&limit=40`}>40 each</Dropdown.Item>
                    <Dropdown.Item href={`?page=${this.state.currentPage}&limit=50`}>50 each</Dropdown.Item>
                </DropdownButton>
            </div>
        );
    }

    getBoardList = () => {
        const query = queryString.parse(this.props.location.search);
        axios.post('/api/board/list', { page: query.page, limit: query.limit }).then(returnData => {

            const data = returnData.data;
            let boardList;

            if (data.list.length > 0) {
                const boards = data.list;
                boardList = boards.map(item => (
                    <BoardRow
                        key={Date.now() + Math.random() * 500}
                        _id={item._id}
                        createdAt={item.createdAt}
                        title={item.title}
                        writer={item.writer}
                    ></BoardRow>
                ));
            } else {
                boardList = (
                    <tr>
                        <td colSpan="3">The post doesn't exist.</td>
                    </tr>
                );
            }
            this.setState({
                boardList,
                currentPage: data.currentPage,
                maxPage: data.maxPage,
                limit: data.limit
            });
        }).catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {
        this.getBoardList();
    }

    render() {
        const items = this.pagination();
        const selectLimit = this.selectLimit();

        return (
            <div>
                <div style={{ margin: 50 }}>
                    <Button style={{ marginBottom: 20 }}>
                        <Link to='/board/write' style={{ textDecoration: 'none', color: 'white' }}>Write</Link>
                    </Button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Writer</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>{this.state.boardList}</tbody>
                    </Table>
                    <Pagination>{items}</Pagination>
                    <div>{selectLimit}</div>
                </div>
            </div>
        )
    }
}

export default BoardList;