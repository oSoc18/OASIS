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
    }

    renderLists = () => {
        let result = [];
        for(let i = 0; i < this.BuildingStore.getBuildings.length; i++){
            result.push(<SearchResult buildings={this.BuildingStore.getBuildings[i]} />);
        }
        return  result;
    };


    renderDetails = () => {
        let details = [];
        details.push(<BuildingDetail buildings={this.BuildingStore.getBuilding}/>);
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