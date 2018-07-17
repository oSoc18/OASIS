import React, {Component} from 'react'
import {Input, Row} from "react-materialize";
import {SearchFilterContainer} from "./SearchFilterContainer";

require('../css/Header.css');

export default class Header extends Component {

    wheelchairWidthFilter = <span>Filter details</span>;

    render(props) {
        return (
            <nav className="header">
                <div className="search__bar">

                    <a href="#" className="brand">
                        <img className="brand__icon" src={require('../images/logo-oasis.svg')} alt="OASIS"></img>
                        <h1 className="brand__name">OASIS</h1>
                    </a>
                    <form className="search">
                        <div className="input-field">
                            <input id="search" type="search" required></input>
                            <label className="label-icon" htmlFor="search">
                                <i className="material-icons">search</i>
                            </label>
                            <i className="material-icons">close</i>
                        </div>
                    </form>
                </div>
                <div className="search__filters">
                    <Row>
                        <Input s={3} type='select' defaultValue='2' className="search__filters__filter">
                            <option value='1'>Option 1</option>
                            <option value='2'>Option 2</option>
                            <option value='3'>Option 3</option>
                        </Input>

                        <Input s={3} type='select' defaultValue='2' className="search__filters__filter">
                            <option value='1'>Option 1</option>
                            <option value='2'>Option 2</option>
                            <option value='3'>Option 3</option>
                        </Input>

                        <SearchFilterContainer name="Wheelchair Width" content={this.wheelchairWidthFilter}/>
                        <SearchFilterContainer name="Wheelchair Height" content={this.wheelchairWidthFilter}/>
                    </Row>
                </div>

            </nav>


        )
    }
}