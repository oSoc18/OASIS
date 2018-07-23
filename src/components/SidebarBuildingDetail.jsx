import React, {Component} from 'react'
import {Col, Row} from "react-materialize";
import {inject, observer} from 'mobx-react';


@inject('BuildingStore')
@observer
export default class SidebarBuildingDetail extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.BuildingStore = this.props.BuildingStore;
        this.Building = this.props.buildings.props;
    }

    handleClick(e){
        e.preventDefault();
        this.BuildingStore.setIsInDetailState(false);
    }

    render() {
        return (
            <Row>
                <Col>
                    <h2>{this.Building.title}</h2>
                </Col>
                <Col>
                    <p>{this.Building.description}</p>
                </Col>
                <Col className="m12 s12 left">
                    <h4>Details:</h4>
                    <p>{this.Building.door.description}: {this.Building.door.width} cm</p>
                </Col>
                <a href='#' className="col m12 s12 center" onClick={this.handleClick}>Return to search results</a>
            </Row>
        )
    }
}