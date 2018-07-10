import React, {Component} from 'react'
import {Col, Row} from "react-materialize";

require('../css/SidebarSearchResult.css');

export default class OpenStreetMap extends Component {

    render() {
        return (
            <Row className="sidebar__searchresult">
                <Col m={12} s={12}>
                    <h4>Building name</h4>
                </Col>

                <img className="col m3 s12 sidebar__searchresult__thumbnail" src="http://placekitten.com/g/200/200"/>

                <Col m={9} s={12}>
                        <span className="sidebar__searchresult__description">
                            BeCentral is a new digital campus located in Brussels Central Station. Cofounded & backed-up by more than 40 entrepreneurs, we’re on a mission to close the digital skills gap and help to accelerate Belgium’s Digital Transformation.
                        </span>
                </Col>

                <a className="col m12 s12" href="#">Meer details...</a>
            </Row>
        )
    }
}