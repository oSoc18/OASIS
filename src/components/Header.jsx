import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

require('../css/Header.css');


@inject('BuildingStore')
@observer
export default class Header extends Component {
    constructor(props){
        super(props);
        this.BuildingStore = this.props.BuildingStore;
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput = (e) =>{
        this.BuildingStore.setSearchKey(e.target.value);
    }

    render() {
        return (
            <nav className="header navbar">
                <div className="nav-wrapper row">

                    <a href="#" className="brand">
                        <img className="brand__icon" src={require('../images/logo-oasis.svg')} alt="OASIS"></img>
                        <h1 className="brand__name">OASIS</h1>
                    </a>
                    <form className="search__bar">
                        <div className="input-field">
                            <input id="search" type="search" required onInput={this.handleInput}></input>
                                <label className="label-icon" htmlFor="search">
                                    <i className="material-icons">search</i>
                                </label>
                                <i className="material-icons">close</i>
                        </div>
                    </form>
                </div>
            </nav>
        )
    }
}