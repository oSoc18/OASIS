import React, {Component} from 'react'
import SearchResult from "./SidebarSearchResult.jsx";
import {Card, Col} from "react-materialize";

require('../css/Sidebar.css');

export default class OpenStreetMap extends Component {

    render() {
        return (
            <Col m={3} s={12} className="sidebar">
                <Card className='white darken-1' title='Search results'
                      actions={[<a href='#'>This is a link</a>]}>

                    <SearchResult/>
                    <SearchResult/>
                    <SearchResult/>

                </Card>
            </Col>
        )
    }
}