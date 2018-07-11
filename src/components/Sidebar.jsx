import React, {Component} from 'react'
import SearchResult from "./SidebarSearchResult.jsx";
import {Card, Col} from "react-materialize";
import BuildingDetail from './SidebarBuildingDetail.jsx';

require('../css/Sidebar.css');

const STATE_RESULTS = 'results';
const STATE_DETAILS = 'details';

export default class Sidebar extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            currentView: STATE_RESULTS
        }
    }

    onClick = () => {
        let newState = this.state.currentView === STATE_RESULTS ? STATE_DETAILS : STATE_RESULTS;
        this.setState = {
            currentView: newState
        }
    }

    createSearchResults = () => {
        let result = [];
        {this.props.buildings.map((building) => {
                result.push(<SearchResult buildings={building}  />);
        })};
        return  result;
    }

    createDetails = () => {
        let details = [];
        details.push(<BuildingDetail />);
        return details;
    }    

    show = () => {
        if(this.state.currentView === STATE_RESULTS){
            return this.createSearchResults();
        }else if(this.state.currentView === STATE_DETAILS){
            return this.createDetails();
        }else{
            // Tampered state
        }
    }

    render() {
        return (
            <Col m={3} s={12} className="sidebar">
                <Card className='sidebar__card white darken-1' title='Search results' actions={[<a href='#'>This is a link</a>]}>
                    {this.show()}
                </Card>
            </Col>
        )
    }
}