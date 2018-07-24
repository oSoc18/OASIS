import React, {Component} from 'react'
import {Col, Row, Collapsible, CollapsibleItem} from "react-materialize";
import {inject, observer} from 'mobx-react';

@inject('BuildingStore')
@observer
export default class SidebarBuildingDetail extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.BuildingStore = this.props.BuildingStore;
        this.Building = this.props.buildings.props;
        this.UID = 0;
    }

    handleClick(e){
        e.preventDefault();
        this.BuildingStore.setIsInDetailState(false);
    }

    showAccessibilityInformation = () => {
        try{
            let ar = [];
            ar.push(<h4 key={++this.UID}>Details</h4>);
            ar.push(
            <div key={++this.UID}>
                <p><i className="material-icons">wheelchair</i> {this.Building.door.description}: {this.Building.door.width} cm</p>
                <i className="material-icons">hearing</i>
                <i className="material-icons">accessibility</i>
            </div>)
            return ar;
        }catch(e){
            return (<div><p>No accessibility information available</p></div>);
        }
    }

    showServices = () => {
        try{
            let ar = [];
            ar.push(<h4 key={++this.UID}>Services</h4>);
            for(let index in this.Building.service){
                ar.push(
                    <Collapsible key={++this.UID}>
                        <CollapsibleItem header={this.Building.service[index].name} icon='toc'>
                            <p>{this.Building.service[index].desc}</p>
                            <p>{this.Building.service[index].accessinfo.description+" is "+this.Building.service[index].accessinfo.width+" cm"}</p>
                        </CollapsibleItem>
                    </Collapsible>
                )
            }
            return ar;
            
        }catch(e){ 
            return (<div><h4>Services</h4><p>This building does not contain public services</p></div>);
        }
    }

    render() {
        return (
            <Row>
                <Col>
                    <h2>{this.Building.title}</h2>
                </Col>
                <Col s={12}>
                    <p>{this.Building.description}</p>
                </Col>
                <Col s={12}>
                    {this.showAccessibilityInformation()}
                </Col>
                <Col s={12}>
                    {this.showServices()}
                </Col>
                <a href='#' className="col m12 s12 center" onClick={this.handleClick}>Return to search results</a>
            </Row>
        )
    }
}