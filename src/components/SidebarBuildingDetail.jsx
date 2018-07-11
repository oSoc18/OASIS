import React, {Component} from 'react'
import {Col, Row} from "react-materialize";

require('../css/SidebarBuildingDetail.css');

export default class SidebarBuildingDetail extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.preventDefault();
        this.props.onClick();
    }

    render() {
        return (
            <Row>
                <Col>
                    <h2>{this.props.buildings.title}</h2>
                </Col>
                <Col>
                    <p>{this.props.buildings.about}</p>
                </Col>
                <Col className="m12 s12 left">
                    <h4>Details:</h4>
                </Col>
                <a href='#' className="col m12 s12 center" onClick={this.handleClick}>Return to search results</a>
            </Row>
        )
    }
}