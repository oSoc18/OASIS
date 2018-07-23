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
        this.Building = this.props.buildings.props;
    }

    handleClick(e){
        e.preventDefault();
        let id = this.Building.id;
        let building = this.BuildingStore.getBuildings.find(b => b.props.id === id);

        this.BuildingStore.setBuilding(building);
        this.BuildingStore.setIsInDetailState(true);
    }

    showAccessibilityInformation = () => {
        try{
            <div>
                <p><i className="material-icons">wheelchair</i> {this.Building.door.description}: {this.Building.door.width} cm</p>
                <i className="material-icons">hearing</i>
                <i className="material-icons">accessibility</i>
            </div>
        }catch(e){
            console.log(e);
        }
    }

    render() {
        return (
            <Row>
                <Col m={12} s={12}>
                    <hr />
                    <h4>{this.Building.title}</h4>
                </Col>

                <img className="col m3 s12 sidebar__searchresult__thumbnail" src={this.Building.src}/>

                <Col m={9} s={12}>
                    <span className="sidebar__searchresult__description"><p>{this.Building.description}</p></span>
                </Col>
                <Col m={9} s={12}>
                    {/* {this.showAccessibilityInformation()} */}
                </Col>
                <a className="col m12 s12 center" href="#" onClick={this.handleClick} id={this.Building.id}>Meer details...</a>
            </Row>
        )
    }
}