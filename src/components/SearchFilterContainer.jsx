import React, {Component} from 'react'

export class SearchFilterContainer extends Component {

    constructor(props) {
        super(props);
        this.state= this.getInitialState();
    }

    getInitialState = function () {
        return {showDetail: false};
    }

    closeModal = function (){
        this.setState({showDetail: false});
    }

    onClick = function () {
        if (!this.state.showDetail){
            this.props.onOpen();
        }
        this.setState({showDetail: !this.state.showDetail});
    }

    render() {
        return (
            <div className="search__filters__filter search__filters__filter--modal"
                 onClick={this.onClick.bind(this)}>
                <div className={'search__filters__filter__caption' + (this.state.showDetail ? ' search__filters__filter__caption--active' : '')}><a id={'search__filters__filter__caption__' + this.props.name.toLowerCase().replace(' ','-')}>{this.props.name}</a></div>
                <div
                    className={'search__filters__filter__detail' + (this.state.showDetail ? ' search__filters__filter__detail--visible' : '')}>
                    {this.props.content}
                </div>
            </div>
        );
    }
}