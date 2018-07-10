import React, {Component} from 'react'

require('../css/Header.css');

export default class Header extends Component {

    render(props) {
        return (
            <nav className="header navbar">
                <div className="nav-wrapper row">

                    <a href="#" className="brand">
                        <img className="brand__icon" src="/src/images/logo-oasis.svg" alt="OASIS"></img>
                        <h1 className="brand__name">OASIS</h1>
                    </a>
                    <form className="search__bar">
                        <div className="input-field">
                            <input id="search" type="search" required></input>
                                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                                <i className="material-icons">close</i>
                        </div>
                    </form>
                    <div className="input-field col s12">
                        <select multiple>
                            <option value="" disabled selected>Choose your option</option>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                        </select>
                        <label>Materialize Multiple Select</label>
                    </div>
                </div>

            </nav>
    )
    }
    }