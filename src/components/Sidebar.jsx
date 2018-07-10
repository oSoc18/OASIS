import React, {Component} from 'react'
import SearchResult from "./SidebarSearchResult.jsx";
import {Card, Col} from "react-materialize";

require('../css/Sidebar.css');

export default class Sidebar extends React.Component {
    render() {
        return (
            <Col m={3} s={12} className="sidebar">
                <Card className='sidebar__card white darken-1' title='Search results'
                      actions={[<a href='#'>This is a link</a>]}>

                    <SearchResult/>
                    <SearchResult title='Other Building' src='http://placekitten.com/200/300' about='Some random information available'/>

                </Card>
            </Col>
        )
    }
}               