import React from 'react'
import SearchResult from "./SidebarSearchResult.jsx";
import {Card, Col} from "react-materialize";
import BuildingDetail from './SidebarBuildingDetail.jsx';
import {inject, observer} from 'mobx-react';

require('../css/Sidebar.css');
    
@inject('BuildingStore')
@observer
export default class Sidebar extends React.Component {
    constructor(props){
        super(props);
        this.BuildingStore = this.props.BuildingStore;
        console.log(this.BuildingStore)
    }



    // changeViewState = () => {
    //     let newState = this.state.currentView === STATE_RESULTS ? STATE_DETAILS : STATE_RESULTS;
    //     this.setState({
    //         currentView: newState
    //     })
    // }

    // setStateToList = (idArr) => {    
    //     renderedView = idArr;
    //     this.setState({
    //         currentView: STATE_RESULTS
    //     })
    // }

    // setStateToDetails = (id) => {
    //     renderedView = id;
    //     this.setState({
    //         currentView: STATE_DETAILS
    //     })
    // }

    renderLists = () => {
        let result = [];
        for(let i = 0; i < this.BuildingStore.getBuildings.length; i++){
            //let b = this.props.buildings.find(b => b.id == renderedView[i]);
            result.push(<SearchResult buildings={this.BuildingStore.getBuildings[i]} onClick={this.setStateToDetails} />);
        }
        // this.props.buildings.map((building) => {
        //     result.push(<SearchResult buildings={building} onClick={this.onClick} />);
        // });
        return  result;
    };


    renderDetails = () => {
        let details = [];
        details.push(<BuildingDetail buildings={this.BuildingStore.getBuilding} onClick={this.setStateToResults}/>);
        return details;
    };

    show = () => {
        if(!this.BuildingStore.getIsDetailAvailable){
            return this.renderLists();
        }else{
            return this.renderDetails();
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