import React from 'react'
import SearchResult from "./SidebarSearchResult.jsx";
import {Card, Col} from "react-materialize";
import BuildingDetail from './SidebarBuildingDetail.jsx';

require('../css/Sidebar.css');

const STATE_RESULTS = 'results';
const STATE_DETAILS = 'details';
let renderedView = []; // IDs that are visible

export default class Sidebar extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            currentView: STATE_RESULTS
        }
       
    }


    // changeViewState = () => {
    //     let newState = this.state.currentView === STATE_RESULTS ? STATE_DETAILS : STATE_RESULTS;
    //     this.setState({
    //         currentView: newState
    //     })
    // }

    setStateToList = (idArr) => {    
        renderedView = idArr;
        this.setState({
            currentView: STATE_RESULTS
        })
    }

    setStateToDetails = (id) => {
        renderedView = id;
        this.setState({
            currentView: STATE_DETAILS
        })
    }

    renderLists = () => {
        let result = [];
        for(let i = 0; i < renderedView.length; i++){
            let b = this.props.buildings.find(b => b.id == renderedView[i]);
            result.push(<SearchResult buildings={b} onClick={this.setStateToDetails} />);
        }
        // this.props.buildings.map((building) => {
        //     result.push(<SearchResult buildings={building} onClick={this.onClick} />);
        // });
        return  result;
    };


    renderDetails = () => {
        let details = [];
        let building = this.props.buildings.find(b => b.id == renderedView);
        details.push(<BuildingDetail buildings={building} onClick={this.setStateToResults}/>);
        return details;
    };

    show = () => {
        if(this.state.currentView === STATE_RESULTS){
            return this.renderLists();
        }else if(this.state.currentView === STATE_DETAILS){
            return this.renderDetails();
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