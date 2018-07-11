import React, {Component} from 'react'

require('../css/SidebarBuildingDetail.css');

export default class SidebarBuildingDetail extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.preventDefault();
        this.props.onClick();
    }
    
    render() {
        return (
            <div>
                <h1>TODO: BuildingDetail.jsx</h1>
                <a href='#' onClick={this.handleClick}>Return to results</a>
            </div>
        )
    }
}