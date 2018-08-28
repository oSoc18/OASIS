import React, {Component} from 'react'
import {Col, Row, Collapsible, CollapsibleItem, Preloader} from "react-materialize";
import {inject, observer} from 'mobx-react';

@inject('BuildingStore')
@observer
export default class SidebarBuildingDetail extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.BuildingStore = this.props.BuildingStore;
        this.Building = this.props.buildings.props;
        this.UID = 0; // To surpress warnings in React render Array --> Each element in an array needs a unique key value
    }

    handleClick(e) {
        e.preventDefault();
        this.BuildingStore.setIsInDetailState(false);
    }

    showAccessibilityInformation = () => {
        try {
            let ar = [];
            let accessInfo = this.Building.accessInfo
            ar.push(<h4 key={++this.UID}>Details</h4>);
            for (let index in accessInfo) {
                ar.push(
                    <div key={++this.UID}>
                        <p><i
                            className="material-icons">accessible</i> {accessInfo[index].description}: {accessInfo[index].width} cm
                        </p>
                    </div>)
            }
            return ar;
        } catch (e) {
            return (<div><p>Er is geen toegankelijkheidsinformatie beschikbaar voor dit gebouw</p></div>);
        }
    }

    showServices = () => {
        try {
            let ar = [];
            ar.push(<h4 key={++this.UID}>Services</h4>);
            for (let index in this.Building.service) {
                ar.push(
                    <Collapsible key={++this.UID}>
                        <CollapsibleItem header={this.Building.service[index].name} icon='toc'>
                            <p>{this.Building.service[index].desc}</p>
                            <p>{this.Building.service[index].accessinfo.description + " is " + this.Building.service[index].accessinfo.width + " cm"}</p>
                        </CollapsibleItem>
                    </Collapsible>
                )
            }
            return ar;

        } catch (e) {
            return (<div><h4>Services</h4><p>Dit gebouw biedt geen publieke diensten aan</p></div>);
        }
    }

    linkOrdescription = () => {
        if (this.Building.description !== "Geen beschrijving beschikbaar") {
            return <a href={this.Building.description}>link</a>;
        }
        return <p>{this.Building.description}</p>;
    }

    render() {
        return (
            <Row>
                <Col>
                    <h2>{this.Building.title.replace(/[&\/\\#,+()$~%.'":;*?<>{}1234567890]/g, '')}</h2>
                </Col>
                <Col s={12}>
                    {this.linkOrdescription()}
                </Col>
                <Col s={12}>
                    {this.showAccessibilityInformation()}
                </Col>
                <Col s={12}>
                    {this.showServices()}
                </Col>
                <a href='#' className="col m12 s12 center" onClick={this.handleClick}>Terug naar zoekresultaten</a>
            </Row>
        )
    }
}
