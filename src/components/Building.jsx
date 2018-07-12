import React from 'react';

export class Building extends React.Component{

}

Building.propTypes = {
    title: React.PropTypes.string.isRequired,
    about: React.PropTypes.string.isRequired,
	type: React.PropTypes.oneOf(['Restaurant', 'Government', 'School']), // for the moment only these type of building can be acquired ?
	location: React.PropTypes.object.isRequired
};