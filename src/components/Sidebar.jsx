import React from 'react'
import SearchResult from "./SidebarSearchResult.jsx";
import {Card, Col, Pagination, Preloader} from "react-materialize";
import BuildingDetail from './SidebarBuildingDetail.jsx';
import {inject, observer} from 'mobx-react';


@inject('BuildingStore')
@observer
export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.BuildingStore = this.props.BuildingStore;
        this.UID = 0; // To surpress warnings in React render Array --> Each element in an array needs a unique key value
        this.lastState = "";
        this.lastResult = [];
    }

    renderLists = () => {
        let result = [];
        if (this.lastState != this.BuildingStore.state || this.BuildingStore.getSearchListByMap.length != this.lastResult.length) {
            this.lastState = this.BuildingStore.state;
            this.BuildingStore.getSearchListByMap.map((building) => {
                result.push(<SearchResult buildings={building} key={++this.UID}/>);
            });
            this.lastResult = result;
            return result;
        } else {
            return this.lastResult;
        }
    };


    renderDetails = () => {
        let details = [];
        details.push(<BuildingDetail buildings={this.BuildingStore.getBuilding}  key={++this.UID}/>);
        return details;
    };

    show = () => {
        if (!this.BuildingStore.getIsInDetailState) {
            return this.renderLists();
        } else {
            return this.renderDetails();
        }
    }

    render() {
        let searchTitle = (this.BuildingStore.getSearchKey === "")
            ? this.BuildingStore.getSearchListByMap.length + " resultaten "
            : "Resultaat voor '" + this.BuildingStore.getSearchKey + "' (" + this.renderLists().length + ")";
        return (
            <Col l={4} m={6} s={12} className="no-padding">
                <div className="sidebar__list">
                    {this.show()}
                </div>
                <div className={"sidebar__title " + (this.BuildingStore.getIsInDetailState ? "hide" : "") }>
                    <h4 className="result__text">{searchTitle}</h4>
                </div>
            </Col>

        )
    }
}