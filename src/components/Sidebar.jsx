import React, {Component} from 'react'
import SearchResult from "./SidebarSearchResult.jsx";
import {Card, Col} from "react-materialize";

require('../css/Sidebar.css');


export default class Sidebar extends React.Component {
    constructor(props){
        super(props);
    }

    createSearchResults = () => {
        let result = [];
        {this.props.buildings.map((building) => {
                result.push(<SearchResult title={building.title} src={building.src} about={building.about}  />);
        })};
        return  result;
    }

    render() {
        return (
            <Col m={3} s={12} className="sidebar">
                <Card className='sidebar__card white darken-1' title='Search results' actions={[<a href='#'>This is a link</a>]}>
                    {this.createSearchResults()}
                </Card>
            </Col>
        )
    }
}

Sidebar.defaultProps = {
    buildings: [
        {title:"building name", src:"http://placekitten.com/200/300", about:"info"}
    ]
}