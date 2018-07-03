import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { roadMaps } from'../../data';

export default class RoadMaps extends Component {
	state = {
		roadmaps: roadMaps
	}

	render() {
		return(
			<div style={{marginTop: 20, textAlign: 'center'}}>
				<h1 style={{textAlign: 'center', display: 'inline-block'}}>Roadmaps</h1>
				<ul className="roadmaps">
					{this.state.roadmaps.map((roadmap, key) => <Link to={`/roadmap/${roadmap.id}`} key={key}><li><span>{roadmap.title}</span></li></Link>)}
				</ul>
			</div>
		)
	}
}