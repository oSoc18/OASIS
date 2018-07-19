import React from 'react'
import {Col, Row} from "react-materialize";
import {inject, observer} from 'mobx-react';


@inject('BuildingStore')
@observer
export default class SidebarSearchResult extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.BuildingStore = this.props.BuildingStore;
    }

    handleClick(e){
        e.preventDefault();
        let id = this.props.buildings.id;
        let building = this.BuildingStore.getBuildings.find(b => b.id === id);
        
        this.BuildingStore.setBuilding(building);
        this.BuildingStore.setIsInDetailState(true);
    }

    render() {
        return (
            <Row>
                <Col m={12} s={12}>
                    <h4>{this.props.buildings.title}</h4>
                </Col>

                <img className="col m3 s12 sidebar__searchresult__thumbnail" src={this.props.buildings.src}/>

                <Col m={9} s={12}>
                    <span className="sidebar__searchresult__description"><p>{this.props.buildings.about}</p></span>
                </Col>
                <Col>
                    <i className="material-icons">accessible</i>
                    <i className="material-icons">hearing</i>
                    <i className="material-icons">accessibility</i>
                </Col>
                <a className="col m12 s12 center" href="#" onClick={this.handleClick} id={this.props.buildings.id}>Meer details...</a>
                <hr />
            </Row>
        )
    }
}