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
    }

    handleClick(e){
        e.preventDefault();
        this.BuildingStore.setIsInDetailState(false);
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