import React, {Component} from 'react'
import {Col, Row} from "react-materialize";

require('../css/SidebarSearchResult.css');

export default class SidebarSearchResult extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Row>
                <Col m={12} s={12}>
                    <h4>{this.props.title}</h4>
                </Col>

                <img className="col m3 s12 sidebar__searchresult__thumbnail" src={this.props.src}/>

                <Col m={9} s={12}>
                        <span className="sidebar__searchresult__description"><p>{this.props.about}</p></span>
                </Col>
                <Col>
                    <i className="material-icons">accessible</i>
                    <i className="material-icons">hearing</i>
                    <i className="material-icons">accessibility</i>
                </Col>
                <a className="col m12 s12 center" href="#">Meer details...</a>
                <hr />
            </Row>
        )
    }
}

SidebarSearchResult.defaultProps = {
    title: 'Building Name',
    src: 'http://placekitten.com/g/200/200',
    about: 'BeCentral is a new digital campus located in Brussels Central Station. Cofounded & backed-up by more than 40 entrepreneurs, we’re on a mission to close the digital skills gap and help to accelerate Belgium’s Digital Transformation.'
  };